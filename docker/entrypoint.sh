#!/bin/sh
set -e

echo "==> [Portfolio] Starting application container..."

# 1. Ensure .env exists
if [ ! -f /var/www/html/.env ]; then
    if [ -f /var/www/html/.env.example ]; then
        echo "==> [Portfolio] .env not found, initializing from .env.example..."
        cp /var/www/html/.env.example /var/www/html/.env
    fi
fi

# 2. Ensure APP_KEY exists
if [ -z "$APP_KEY" ]; then
    HAS_KEY=$(grep -E '^APP_KEY=[A-Za-z0-9+/=:]+' /var/www/html/.env 2>/dev/null || true)
    if [ -z "$HAS_KEY" ]; then
        echo "==> [Portfolio] Generating application key..."
        php artisan key:generate --force --no-interaction
    fi
fi

# 3. Ensure SQLite database file and directory permissions if SQLite is used
DB_CONN="${DB_CONNECTION:-sqlite}"
if [ "$DB_CONN" = "sqlite" ]; then
    SQLITE_PATH="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
    echo "==> [Portfolio] Ensuring SQLite database at: $SQLITE_PATH"
    mkdir -p "$(dirname "$SQLITE_PATH")"
    if [ ! -f "$SQLITE_PATH" ]; then
        touch "$SQLITE_PATH"
    fi
    chown -R www-data:www-data /var/www/html/database
    chmod -R 775 /var/www/html/database
    chmod 664 "$SQLITE_PATH" 2>/dev/null || true
fi

# 4. Ensure storage directories and permissions
mkdir -p \
    /var/www/html/storage/app/public \
    /var/www/html/storage/framework/cache/data \
    /var/www/html/storage/framework/sessions \
    /var/www/html/storage/framework/views \
    /var/www/html/storage/logs \
    /var/www/html/bootstrap/cache

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 5. Link public storage if not already linked
if [ ! -L /var/www/html/public/storage ]; then
    echo "==> [Portfolio] Creating storage symbolic link..."
    php artisan storage:link --no-interaction || true
fi

# 6. Run database migrations safely
echo "==> [Portfolio] Running database migrations..."
php artisan migrate --force --no-interaction

# 7. Optimize caches for production
if [ "${APP_ENV:-production}" = "production" ]; then
    echo "==> [Portfolio] Warming production caches (config, routes, views)..."
    php artisan config:cache --no-interaction || true
    php artisan route:cache --no-interaction || true
    php artisan view:cache --no-interaction || true
else
    php artisan optimize:clear --no-interaction || true
fi

echo "==> [Portfolio] Container initialization complete. Starting PHP-FPM and Nginx..."
php-fpm -D
exec nginx -g 'daemon off;'
