# =========================
# Stage 1: Build frontend
# =========================
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY resources ./resources
COPY public ./public
COPY vite.config.ts ./
COPY tsconfig.json ./

RUN npm run build


# =========================
# Stage 2: PHP dependencies
# =========================
FROM composer:2 AS composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts


# =========================
# Stage 3: Production
# =========================
FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    bash \
    curl \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-dev \
    mysql-client \
    && docker-php-ext-install \
        bcmath \
        intl \
        mbstring \
        pdo \
        pdo_mysql \
        pdo_sqlite \
        zip \
        exif \
        pcntl


# Copy Composer dependencies
COPY --from=composer /app/vendor ./vendor

# Copy application
COPY . .

# Copy built frontend assets
COPY --from=frontend /app/public/build ./public/build


# Laravel permissions
RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data \
        storage \
        bootstrap/cache \
    && chmod -R 775 \
        storage \
        bootstrap/cache


# Nginx configuration
RUN rm -f /etc/nginx/http.d/default.conf && \
    printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    server_name _;' \
    '    root /var/www/html/public;' \
    '' \
    '    index index.php index.html;' \
    '' \
    '    location / {' \
    '        try_files $uri $uri/ /index.php?$query_string;' \
    '    }' \
    '' \
    '    location ~ \.php$ {' \
    '        try_files $uri =404;' \
    '        include fastcgi_params;' \
    '        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;' \
    '        fastcgi_param DOCUMENT_ROOT $document_root;' \
    '        fastcgi_pass 127.0.0.1:9000;' \
    '    }' \
    '' \
    '    location ~ /\.ht {' \
    '        deny all;' \
    '    }' \
    '}' \
    > /etc/nginx/http.d/default.conf


# PHP-FPM configuration
RUN sed -i 's|^listen = .*|listen = 127.0.0.1:9000|' \
    /usr/local/etc/php-fpm.d/www.conf


# Laravel production configuration
RUN php artisan config:clear || true && \
    php artisan route:clear || true && \
    php artisan view:clear || true


EXPOSE 80

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
