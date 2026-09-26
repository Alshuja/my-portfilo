# =========================================================
# Stage 1 — Install Laravel / PHP Dependencies
# =========================================================
FROM php:8.4-cli-alpine AS composer-deps

WORKDIR /app

# System dependencies
RUN apk add --no-cache \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-dev \
    libxml2-dev \
    nodejs \
    npm \
    bash \
    git

# PHP extensions required by Laravel
RUN docker-php-ext-install \
    bcmath \
    intl \
    mbstring \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    zip \
    exif \
    pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Composer files
COPY composer.json composer.lock ./

# Install Laravel dependencies
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts


# =========================================================
# Stage 2 — Build Frontend
# =========================================================
FROM php:8.4-cli-alpine AS frontend

WORKDIR /app

# Install PHP dependencies required by Laravel
RUN apk add --no-cache \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-dev \
    libxml2-dev \
    nodejs \
    npm \
    bash \
    git

# Install PHP extensions
RUN docker-php-ext-install \
    bcmath \
    intl \
    mbstring \
    pdo \
    pdo_mysql \
    pdo_sqlite \
    zip \
    exif \
    pcntl

# Enable pnpm through Corepack
RUN npm install -g pnpm@10

# Copy Composer dependencies
COPY --from=composer-deps /app/vendor ./vendor

# Copy project
COPY . .

# Create environment file for build if it doesn't exist
RUN if [ ! -f .env ]; then cp .env.example .env; fi

# Install frontend dependencies
RUN pnpm install --frozen-lockfile

# Build frontend
# Wayfinder needs PHP + artisan during this step
RUN pnpm run build


# =========================================================
# Stage 3 — Production Laravel Application
# =========================================================
FROM php:8.4-fpm-alpine

WORKDIR /var/www/html

# Runtime packages
RUN apk add --no-cache \
    nginx \
    bash \
    curl \
    icu-libs \
    libzip \
    oniguruma \
    sqlite-libs \
    libxml2

# PHP extensions
RUN apk add --no-cache --virtual .build-deps \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-dev \
    libxml2-dev \
    && docker-php-ext-install \
        bcmath \
        intl \
        mbstring \
        pdo \
        pdo_mysql \
        pdo_sqlite \
        zip \
        exif \
        pcntl \
        opcache \
    && apk del .build-deps


# =========================================================
# Copy Application
# =========================================================

COPY . .

# Copy Composer dependencies
COPY --from=composer-deps /app/vendor ./vendor

# Copy compiled frontend
COPY --from=frontend /app/public/build ./public/build


# =========================================================
# Laravel Permissions
# =========================================================

RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

RUN chmod -R 775 \
    storage \
    bootstrap/cache


# =========================================================
# PHP-FPM
# =========================================================

RUN sed -i 's|^listen = .*|listen = 127.0.0.1:9000|' \
    /usr/local/etc/php-fpm.d/www.conf


# =========================================================
# Nginx
# =========================================================

RUN rm -f /etc/nginx/http.d/default.conf

RUN printf '%s\n' \
    'server {' \
    '    listen 80;' \
    '    listen [::]:80;' \
    '    server_name _;' \
    '' \
    '    root /var/www/html/public;' \
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


# =========================================================
# Production
# =========================================================

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

EXPOSE 80

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
