<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'category',
        'category_label',
        'brief',
        'description',
        'tags',
        'image',
        'gallery',
        'problem',
        'solution',
        'features',
        'role',
        'client',
        'date_range',
        'live_url',
        'github_url',
        'is_featured',
        'order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'gallery' => 'array',
            'features' => 'array',
            'is_featured' => 'boolean',
            'order' => 'integer',
        ];
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
