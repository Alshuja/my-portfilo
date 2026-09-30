<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Article;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Journey;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PortfolioController extends Controller
{
    /**
     * Display the main portfolio landing page.
     */
    public function home(): Response
    {
        $settings = ProfileSetting::all()->pluck('value', 'key');

        return Inertia::render('welcome', [
            'featuredProjects' => Project::where('is_featured', true)->orderBy('order')->get(),
            'allProjects' => Project::orderBy('order')->get(),
            'services' => Service::orderBy('order')->get(),
            'testimonials' => Testimonial::orderBy('order')->get(),
            'skills' => Skill::orderBy('order')->get(),
            'certificates' => Certificate::orderBy('order')->get(),
            'journey' => Journey::orderBy('order')->get(),
            'recentArticles' => Article::where('is_published', true)->latest('published_at')->take(4)->get(),
            'settings' => $settings,
            'stats' => [
                'projects' => Project::count(),
                'services' => Service::count(),
                'testimonials' => Testimonial::count(),
                'certificates' => Certificate::count(),
                'skills' => Skill::count(),
                'journey' => Journey::count(),
                'articles' => Article::where('is_published', true)->count(),
            ],
        ]);
    }

    /**
     * Display the about and career journey page.
     */
    public function about(): Response
    {
        $settings = ProfileSetting::all()->pluck('value', 'key');

        return Inertia::render('portfolio/about', [
            'settings' => $settings,
            'journey' => Journey::orderBy('order')->get(),
            'stats' => [
                'projects' => Project::count(),
                'services' => Service::count(),
                'certificates' => Certificate::count(),
                'skills' => Skill::count(),
                'journey' => Journey::count(),
            ],
        ]);
    }

    /**
     * Display the services catalog page.
     */
    public function services(): Response
    {
        return Inertia::render('portfolio/services', [
            'services' => Service::orderBy('order')->get(),
            'testimonials' => Testimonial::orderBy('order')->get(),
        ]);
    }

    /**
     * Display a single service details page.
     */
    public function serviceShow(Service $service): Response
    {
        $relatedServices = Service::where('id', '!=', $service->id)
            ->orderBy('order')
            ->take(3)
            ->get();

        return Inertia::render('portfolio/service-show', [
            'service' => $service,
            'relatedServices' => $relatedServices,
        ]);
    }

    /**
     * Display the printable and interactive CV page.
     */
    public function cv(): Response
    {
        $settings = ProfileSetting::all()->pluck('value', 'key');

        return Inertia::render('portfolio/cv', [
            'settings' => $settings,
            'projects' => Project::orderBy('order')->get(),
            'skills' => Skill::orderBy('order')->get(),
            'journey' => Journey::orderBy('order')->get(),
            'certificates' => Certificate::orderBy('order')->get(),
            'services' => Service::orderBy('order')->get(),
        ]);
    }

    /**
     * Display the projects showcase page.
     */
    public function projects(): Response
    {
        return Inertia::render('portfolio/projects', [
            'projects' => Project::orderBy('order')->get(),
            'categories' => [
                ['id' => 'all', 'label' => 'الكل'],
                ['id' => 'platform', 'label' => 'المنصات والتجارة الإلكترونية'],
                ['id' => 'mobile', 'label' => 'تطبيقات الهواتف (Flutter)'],
                ['id' => 'ai-data', 'label' => 'الذكاء الاصطناعي وعلم البيانات'],
                ['id' => 'web', 'label' => 'تطوير الويب والخوادم'],
            ],
        ]);
    }

    /**
     * Display a single project detail and showcase page.
     */
    public function projectShow(Project $project): Response
    {
        $related = Project::where('id', '!=', $project->id)
            ->where(function ($query) use ($project) {
                $query->where('category', $project->category)
                    ->orWhere('is_featured', true);
            })
            ->orderBy('order')
            ->take(3)
            ->get();

        if ($related->isEmpty()) {
            $related = Project::where('id', '!=', $project->id)->orderBy('order')->take(3)->get();
        }

        return Inertia::render('portfolio/project-show', [
            'project' => $project,
            'relatedProjects' => $related,
        ]);
    }

    /**
     * Display the technical skills page.
     */
    public function skills(): Response
    {
        return Inertia::render('portfolio/skills', [
            'skills' => Skill::orderBy('order')->get(),
        ]);
    }

    /**
     * Display the certificates and awards gallery.
     */
    public function certificates(): Response
    {
        return Inertia::render('portfolio/certificates', [
            'certificates' => Certificate::orderBy('order')->get(),
        ]);
    }

    /**
     * Display the career and academic journey page.
     */
    public function journey(): Response
    {
        return Inertia::render('portfolio/journey', [
            'journey' => Journey::orderBy('order')->get(),
        ]);
    }

    /**
     * Display the blog and technical articles archive.
     */
    public function blog(): Response
    {
        return Inertia::render('portfolio/blog', [
            'articles' => Article::where('is_published', true)->latest('published_at')->get(),
        ]);
    }

    /**
     * Display a single technical article.
     */
    public function article(Article $article): Response
    {
        abort_unless($article->is_published, 404);

        $related = Article::where('is_published', true)
            ->where('id', '!=', $article->id)
            ->where('category', $article->category)
            ->take(3)
            ->get();

        if ($related->isEmpty()) {
            $related = Article::where('is_published', true)
                ->where('id', '!=', $article->id)
                ->take(3)
                ->get();
        }

        return Inertia::render('portfolio/article', [
            'article' => $article,
            'relatedArticles' => $related,
        ]);
    }

    /**
     * Display the Programmer Idea (فكرة مبرمج) platform page.
     */
    public function programmerIdea(): Response
    {
        $settings = ProfileSetting::all()->pluck('value', 'key');

        return Inertia::render('portfolio/programmer-idea', [
            'settings' => $settings,
            'stats' => [
                'students' => '10,000+',
                'courses' => '15+',
                'videos' => '50+',
                'telegramMembers' => '8,500+',
            ],
        ]);
    }

    /**
     * Display the contact channels page.
     */
    public function contact(): Response
    {
        $settings = ProfileSetting::all()->pluck('value', 'key');

        return Inertia::render('portfolio/contact', [
            'settings' => $settings,
        ]);
    }

    /**
     * Handle contact message submissions.
     */
    public function storeContact(ContactRequest $request): RedirectResponse
    {
        ContactMessage::create($request->validated());

        return back()->with('success', 'شكراً لتواصلك! تم استلام رسالتك بنجاح وسأقوم بالرد عليك في أقرب وقت.');
    }

    /**
     * Display the 3D interactive not found 404 page.
     */
    public function notFound(): Response
    {
        return Inertia::render('portfolio/not-found');
    }
}
