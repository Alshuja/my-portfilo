<?php

use App\Models\ContactMessage;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

test('unauthenticated users are redirected from admin routes', function () {
    $this->get('/dashboard')->assertRedirect('/login');
    $this->get('/admin/services')->assertRedirect('/login');
    $this->get('/admin/testimonials')->assertRedirect('/login');
    $this->get('/admin/projects')->assertRedirect('/login');
    $this->get('/admin/skills')->assertRedirect('/login');
    $this->get('/admin/certificates')->assertRedirect('/login');
    $this->get('/admin/journey')->assertRedirect('/login');
    $this->get('/admin/articles')->assertRedirect('/login');
    $this->get('/admin/messages')->assertRedirect('/login');
});

test('authenticated user can view dashboard overview', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->has('stats')
        ->has('recentMessages')
        ->has('recentProjects')
        ->has('settings')
    );
});

test('authenticated user can view admin projects list', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/admin/projects');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('admin/projects')
        ->has('projects')
    );
});

test('authenticated user can create and delete a project', function () {
    $user = User::factory()->create();

    $payload = [
        'title' => 'مشروع تجريبي جديد',
        'slug' => 'test-new-project',
        'category' => 'web',
        'category_label' => 'تطوير الويب',
        'brief' => 'موجز عن المشروع التجريبي',
        'description' => 'وصف تفصيلي كامل للمشروع التجريبي الجديد.',
        'tags' => 'Laravel, Vue, Tailwind',
        'image' => 'https://example.com/cover.jpg',
        'gallery' => "https://example.com/screen1.jpg\nhttps://example.com/screen2.jpg",
        'problem' => 'مشكلة التنسيق والتكامل القديمة',
        'solution' => 'هندسة معمارية حديثة باستخدام Laravel',
        'features' => "ميزة الدفع السريع\nنظام التتبع اللحظي",
        'role' => 'Lead Developer',
        'client' => 'Acme Corporation',
        'date_range' => '2026',
        'live_url' => 'https://example.com',
        'github_url' => 'https://github.com/example/test',
        'is_featured' => true,
    ];

    $response = $this->actingAs($user)->post('/admin/projects', $payload);

    $response->assertSessionHas('success');
    $this->assertDatabaseHas('projects', [
        'slug' => 'test-new-project',
        'title' => 'مشروع تجريبي جديد',
        'role' => 'Lead Developer',
        'client' => 'Acme Corporation',
    ]);

    $project = Project::where('slug', 'test-new-project')->first();
    expect($project->gallery)->toBeArray()
        ->and($project->gallery)->toHaveCount(2)
        ->and($project->features)->toBeArray()
        ->and($project->features)->toHaveCount(2);

    // Toggle featured
    $toggleRes = $this->actingAs($user)->patch("/admin/projects/{$project->id}/toggle-featured");
    $toggleRes->assertSessionHas('success');
    expect($project->fresh()->is_featured)->toBeFalse();

    // Delete
    $deleteRes = $this->actingAs($user)->delete("/admin/projects/{$project->id}");
    $deleteRes->assertSessionHas('success');
    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});

test('authenticated user can create and delete a skill', function () {
    $user = User::factory()->create();

    $payload = [
        'name' => 'GraphQL API',
        'category' => 'programming',
        'level' => 88,
        'color' => '#E535AB',
        'icon' => 'code',
    ];

    $response = $this->actingAs($user)->post('/admin/skills', $payload);

    $response->assertSessionHas('success');
    $this->assertDatabaseHas('skills', [
        'name' => 'GraphQL API',
    ]);

    $skill = Skill::where('name', 'GraphQL API')->first();

    $this->actingAs($user)->delete("/admin/skills/{$skill->id}");
    $this->assertDatabaseMissing('skills', ['id' => $skill->id]);
});

test('authenticated user can toggle read status and delete contact messages', function () {
    $user = User::factory()->create();

    $message = ContactMessage::create([
        'name' => 'زائر تجريبي',
        'email' => 'visitor@example.com',
        'message' => 'رسالة تجريبية للاختبار.',
        'is_read' => false,
    ]);

    $response = $this->actingAs($user)->patch("/admin/messages/{$message->id}/toggle-read");
    $response->assertSessionHas('success');
    expect($message->fresh()->is_read)->toBeTrue();

    $deleteResponse = $this->actingAs($user)->delete("/admin/messages/{$message->id}");
    $deleteResponse->assertSessionHas('success');
    $this->assertDatabaseMissing('contact_messages', ['id' => $message->id]);
});

test('authenticated user can export database as json backup', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->get('/admin/backup/export');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'application/json');
    expect($response->headers->get('Content-Disposition'))->toContain('attachment');
});

test('authenticated user can import database from json backup', function () {
    $user = User::factory()->create();

    $backupData = [
        'projects' => [
            [
                'title' => 'مشروع مستورد من النسخة',
                'slug' => 'imported-backup-project',
                'category' => 'platform',
                'category_label' => 'المنصات الكبرى',
                'brief' => 'مشروع تم استيراده من ملف JSON',
                'description' => 'وصف تفصيلي كامل للمشروع المستورد.',
                'tags' => ['Flutter', 'Laravel'],
                'date_range' => '2025',
                'is_featured' => true,
                'order' => 1,
            ],
        ],
        'skills' => [
            [
                'name' => 'Next.js Framework',
                'category' => 'programming',
                'level' => 88,
                'color' => '#000000',
                'order' => 1,
            ],
        ],
    ];

    $file = UploadedFile::fake()->createWithContent('backup.json', json_encode($backupData));

    $response = $this->actingAs($user)->post('/admin/backup/import', [
        'backup_file' => $file,
    ]);

    $response->assertSessionHas('success');
    $this->assertDatabaseHas('projects', ['slug' => 'imported-backup-project']);
    $this->assertDatabaseHas('skills', ['name' => 'Next.js Framework']);
});

test('authenticated user can upload image to public storage', function () {
    Storage::fake('public');
    $user = User::factory()->create();

    $image = UploadedFile::fake()->image('cover.jpg', 800, 600);

    $response = $this->actingAs($user)->postJson('/admin/upload/image', [
        'image' => $image,
    ]);

    $response->assertOk();
    $response->assertJsonStructure(['url', 'path']);

    $path = $response->json('path');
    Storage::disk('public')->assertExists($path);
});

test('authenticated user can view, create and delete services', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get('/admin/services')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/services')
            ->has('services')
        );

    $payload = [
        'title' => 'خدمة اختبارية جديدة',
        'slug' => 'test-new-service',
        'short_description' => 'وصف مختصر للخدمة الاختبارية',
        'detailed_description' => 'شرح تفصيلي كامل للخدمة الاختبارية الجديدة.',
        'icon' => '/images/s1.png',
        'features' => ['Feature A', 'Feature B'],
        'technologies' => ['Tech 1', 'Tech 2'],
    ];

    $createResponse = $this->actingAs($user)->post('/admin/services', $payload);
    $createResponse->assertSessionHas('success');

    $service = Service::where('slug', 'test-new-service')->first();
    expect($service)->not->toBeNull();

    $deleteResponse = $this->actingAs($user)->delete("/admin/services/{$service->id}");
    $deleteResponse->assertSessionHas('success');
    expect(Service::find($service->id))->toBeNull();
});

test('authenticated user can view, create and delete testimonials', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get('/admin/testimonials')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/testimonials')
            ->has('testimonials')
        );

    $payload = [
        'name' => 'عميل اختباري جديد',
        'role' => 'المدير التنفيذي',
        'company' => 'شركة الاختبار',
        'avatar' => '/images/main-img.jpg',
        'text' => 'تجربة مميزة وتعاون راقي وجودة برمجية ممتازة.',
        'rating' => 5,
    ];

    $createResponse = $this->actingAs($user)->post('/admin/testimonials', $payload);
    $createResponse->assertSessionHas('success');

    $testimonial = Testimonial::where('name', 'عميل اختباري جديد')->first();
    expect($testimonial)->not->toBeNull();

    $deleteResponse = $this->actingAs($user)->delete("/admin/testimonials/{$testimonial->id}");
    $deleteResponse->assertSessionHas('success');
    expect(Testimonial::find($testimonial->id))->toBeNull();
});
