<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->index(); // platform, mobile, ai-data, web
            $table->string('category_label');
            $table->text('brief');
            $table->longText('description');
            $table->json('tags');
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->text('problem')->nullable();
            $table->text('solution')->nullable();
            $table->json('features')->nullable();
            $table->string('role')->nullable();
            $table->string('client')->nullable();
            $table->string('date_range');
            $table->string('live_url')->nullable();
            $table->string('github_url')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->index(); // data-ai, programming, mobile, tools
            $table->integer('level')->default(80);
            $table->string('color')->default('#D71916');
            $table->string('icon')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('certificates', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('issuer');
            $table->string('date');
            $table->string('category')->index(); // data-ai, academic, mobile, web
            $table->string('category_label');
            $table->string('image')->nullable();
            $table->string('fallback_icon')->nullable();
            $table->string('credential_url')->nullable();
            $table->text('description')->nullable();
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('journeys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('role');
            $table->string('date_range');
            $table->string('category')->index(); // work, learning, community, education
            $table->string('category_label');
            $table->string('icon')->default('fas fa-rocket');
            $table->text('description');
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->index();
            $table->string('category_label');
            $table->string('reading_time')->default('5 دقائق قراءة');
            $table->string('author')->default('عبدالرحمن عادل الشجاع');
            $table->string('date');
            $table->string('image')->nullable();
            $table->text('excerpt');
            $table->longText('body');
            $table->json('tags')->nullable();
            $table->boolean('is_published')->default(true)->index();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('is_read')->default(false)->index();
            $table->timestamps();
        });

        Schema::create('profile_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_settings');
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('journeys');
        Schema::dropIfExists('certificates');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('projects');
    }
};
