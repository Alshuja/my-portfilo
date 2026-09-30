<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Service extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'detailed_description',
        'additional_info',
        'icon',
        'features',
        'technologies',
        'gallery',
        'order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'features' => 'array',
            'technologies' => 'array',
            'gallery' => 'array',
            'order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::creating(function (Service $service) {
            if (empty($service->slug)) {
                $service->slug = Str::slug($service->title) ?: 'service-'.Str::random(6);
            }
        });
    }
}
