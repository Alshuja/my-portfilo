<?php

use App\Models\Article;
use App\Models\Project;
use App\Models\Service;
use Database\Seeders\PortfolioSeeder;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->seed(PortfolioSeeder::class);
});

test('home page renders with portfolio data', function () {
    $response = $this->get('/');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
        ->has('featuredProjects')
        ->has('allProjects')
        ->has('services')
        ->has('testimonials')
        ->has('skills')
        ->has('certificates')
        ->has('journey')
        ->has('recentArticles')
        ->has('settings')
        ->has('stats')
    );
});

test('services catalog page renders', function () {
    $response = $this->get('/services');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/services')
        ->has('services')
        ->has('testimonials')
    );
});

test('single service detail page renders', function () {
    $service = Service::first();

    $response = $this->get('/services/'.$service->slug);

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/service-show')
        ->has('service')
        ->has('relatedServices')
    );
});

test('interactive and printable cv page renders', function () {
    $response = $this->get('/cv');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/cv')
        ->has('settings')
        ->has('projects')
        ->has('skills')
        ->has('journey')
        ->has('certificates')
        ->has('services')
    );
});

test('projects catalog page renders', function () {
    $response = $this->get('/projects');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/projects')
        ->has('projects')
        ->has('categories')
    );
});

test('single project showcase page renders', function () {
    $project = Project::first();

    $response = $this->get('/projects/'.$project->slug);

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/project-show')
        ->has('project')
        ->has('relatedProjects')
    );
});

test('single project showcase returns 404 for nonexistent slug', function () {
    $response = $this->get('/projects/nonexistent-project-slug-12345');

    $response->assertNotFound();
});

test('skills page renders', function () {
    $response = $this->get('/skills');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/skills')
        ->has('skills')
    );
});

test('certificates page renders', function () {
    $response = $this->get('/certificates');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/certificates')
        ->has('certificates')
    );
});

test('journey timeline page renders', function () {
    $response = $this->get('/journey');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/journey')
        ->has('journey')
    );
});

test('blog archive page renders', function () {
    $response = $this->get('/blog');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/blog')
        ->has('articles')
    );
});

test('single article reader page renders for published article', function () {
    $article = Article::where('is_published', true)->first();

    $response = $this->get('/blog/'.$article->slug);

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/article')
        ->has('article')
        ->has('relatedArticles')
    );
});

test('single article reader returns 404 for unpublished article', function () {
    $article = Article::create([
        'title' => 'Unpublished Draft',
        'slug' => 'draft-post',
        'category' => 'web',
        'category_label' => 'الويب',
        'reading_time' => '3 دقائق',
        'author' => 'Author',
        'date' => '2026',
        'excerpt' => 'Draft excerpt',
        'body' => 'Draft body',
        'is_published' => false,
    ]);

    $response = $this->get('/blog/'.$article->slug);

    $response->assertNotFound();
});

test('programmer idea dedicated page renders', function () {
    $response = $this->get('/programmer-idea');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/programmer-idea')
        ->has('settings')
        ->has('stats')
    );
});

test('contact page renders', function () {
    $response = $this->get('/contact');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/contact')
        ->has('settings')
    );
});

test('contact form stores message in database', function () {
    $payload = [
        'name' => 'محمد أحمد',
        'email' => 'mohammed@example.com',
        'phone' => '+967771234567',
        'subject' => 'استفسار عن تطوير تطبيق',
        'message' => 'السلام عليكم، أرغب في بناء تطبيق مماثل لمحفظة ريال.',
    ];

    $response = $this->post('/contact', $payload);

    $response->assertSessionHas('success');
    $this->assertDatabaseHas('contact_messages', [
        'email' => 'mohammed@example.com',
        'name' => 'محمد أحمد',
    ]);
});

test('about page renders with journey milestones and settings', function () {
    $response = $this->get('/about');

    $response->assertOk();
    $response->assertInertia(fn (Assert $page) => $page
        ->component('portfolio/about')
        ->has('settings')
        ->has('journey')
    );
});
