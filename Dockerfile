# =========================================================
# Stage 1 — Install Laravel / PHP Dependencies
# =========================================================
FROM php:8.4-cli-alpine AS composer-deps

WORKDIR /app

# System dependencies for Composer
RUN apk add --no-cache \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    sqlite-dev \
    libxml2-dev \
    bash \
    git \
    unzip

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

# Install PHP & Node dependencies for frontend build
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

# Install PHP extensions required by Wayfinder & Artisan
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

# Install pnpm v10
RUN npm install -g pnpm@10

# Copy package files first for Docker layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install frontend dependencies
RUN pnpm install --frozen-lockfile

# Copy Composer dependencies for Wayfinder route extraction
COPY --from=composer-deps /app/vendor ./vendor

# Copy project source
COPY . .

# Wayfinder requires Laravel to boot and discover routes
RUN if [ ! -f .env ]; then cp .env.example .env; fi \
    && php artisan key:generate --no-interaction

# Build frontend assets
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

# Copy Composer binary for dump-autoload & artisan operations
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy configurations
COPY docker/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf
COPY docker/nginx.conf /etc/nginx/http.d/default.conf

# Copy Application files
COPY . .

# Copy Composer vendor from stage 1
COPY --from=composer-deps /app/vendor ./vendor

# Copy compiled frontend from stage 2
COPY --from=frontend /app/public/build ./public/build

# Regenerate autoloader for production
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

# Ensure storage, database, and cache directories exist with correct permissions
RUN mkdir -p \
    database \
    storage/app/public \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    /run/nginx \
    /var/lib/nginx

RUN chown -R www-data:www-data \
    database \
    storage \
    bootstrap/cache \
    /run/nginx \
    /var/lib/nginx

RUN chmod -R 775 \
    database \
    storage \
    bootstrap/cache

# Copy entrypoint script and make executable
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Production Environment Variables
ENV APP_ENV=production
ENV APP_DEBUG=false
ENV LOG_CHANNEL=stderr

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
