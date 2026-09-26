# =========================================================
# Stage 1 — Build Frontend
# =========================================================
FROM node:22-alpine AS frontend

WORKDIR /app

# Enable Corepack and pnpm
RUN corepack enable

# Copy package manager files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install frontend dependencies
RUN pnpm install --frozen-lockfile

# Copy the complete project
COPY . .

# Build React / Vite frontend
RUN pnpm run build


# =========================================================
# Stage 2 — Install PHP / Laravel Dependencies
# =========================================================
FROM php:8.3-cli-alpine AS composer-deps

WORKDIR /app

# Install required system packages
RUN apk add --no-cache \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-dev \
    libxml2-dev \
    curl \
    unzip \
    git \
    bash

# Install PHP extensions required by Laravel
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

# Copy Composer from official Composer image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Composer files first for Docker cache
COPY composer.json composer.lock ./

# Install production PHP dependencies
RUN composer install \
    --no-dev \
    --no-interaction \
    --no-progress \
    --prefer-dist \
    --optimize-autoloader \
    --no-scripts


# =========================================================
# Stage 3 — Production Laravel Application
# =========================================================
FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

# Install Nginx and required libraries
RUN apk add --no-cache \
    nginx \
    bash \
    curl \
    icu-libs \
    libzip \
    oniguruma \
    sqlite-libs \
    libxml2

# Install PHP extensions
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
# Copy Laravel Application
# =========================================================

COPY . .

# Copy Composer vendor directory
COPY --from=composer-deps /app/vendor ./vendor

# Copy built frontend assets
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
# PHP-FPM Configuration
# =========================================================

RUN sed -i 's|^listen = .*|listen = 127.0.0.1:9000|' \
    /usr/local/etc/php-fpm.d/www.conf


# =========================================================
# Nginx Configuration
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
# Laravel Production Configuration
# =========================================================

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr


# =========================================================
# Port
# =========================================================

EXPOSE 80


# =========================================================
# Start PHP-FPM + Nginx
# =========================================================

CMD ["sh", "-c", "php-fpm -D && nginx -g 'daemon off;'"]
