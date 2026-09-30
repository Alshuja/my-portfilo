<?php

use App\Http\Controllers\Admin\ArticleController as AdminArticleController;
use App\Http\Controllers\Admin\CertificateController as AdminCertificateController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\JourneyController as AdminJourneyController;
use App\Http\Controllers\Admin\ProjectController as AdminProjectController;
use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\SkillController as AdminSkillController;
use App\Http\Controllers\Admin\TestimonialController as AdminTestimonialController;
use App\Http\Controllers\PortfolioController;
use Illuminate\Support\Facades\Route;

// Public Portfolio Routes
Route::get('/', [PortfolioController::class, 'home'])->name('home');
Route::get('/about', [PortfolioController::class, 'about'])->name('portfolio.about');
Route::get('/services', [PortfolioController::class, 'services'])->name('portfolio.services');
Route::get('/services/{service:slug}', [PortfolioController::class, 'serviceShow'])->name('portfolio.services.show');
Route::get('/cv', [PortfolioController::class, 'cv'])->name('portfolio.cv');
Route::get('/projects', [PortfolioController::class, 'projects'])->name('portfolio.projects');
Route::get('/projects/{project:slug}', [PortfolioController::class, 'projectShow'])->name('portfolio.projects.show');
Route::get('/skills', [PortfolioController::class, 'skills'])->name('portfolio.skills');
Route::get('/certificates', [PortfolioController::class, 'certificates'])->name('portfolio.certificates');
Route::get('/journey', [PortfolioController::class, 'journey'])->name('portfolio.journey');
Route::get('/blog', [PortfolioController::class, 'blog'])->name('portfolio.blog');
Route::get('/blog/{article:slug}', [PortfolioController::class, 'article'])->name('portfolio.article');
Route::get('/programmer-idea', [PortfolioController::class, 'programmerIdea'])->name('portfolio.programmer-idea');
Route::get('/contact', [PortfolioController::class, 'contact'])->name('portfolio.contact');
Route::post('/contact', [PortfolioController::class, 'storeContact'])->name('portfolio.contact.store');

// Authenticated Admin Dashboard Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
    Route::post('/admin/settings', [AdminDashboardController::class, 'updateSettings'])->name('admin.settings.update');
    Route::get('/admin/backup/export', [AdminDashboardController::class, 'exportJson'])->name('admin.backup.export');
    Route::post('/admin/backup/import', [AdminDashboardController::class, 'importJson'])->name('admin.backup.import');
    Route::post('/admin/upload/image', [AdminDashboardController::class, 'uploadImage'])->name('admin.upload.image');

    // Services Management
    Route::get('/admin/services', [AdminServiceController::class, 'index'])->name('admin.services.index');
    Route::post('/admin/services', [AdminServiceController::class, 'store'])->name('admin.services.store');
    Route::put('/admin/services/{service}', [AdminServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/admin/services/{service}', [AdminServiceController::class, 'destroy'])->name('admin.services.destroy');

    // Testimonials Management
    Route::get('/admin/testimonials', [AdminTestimonialController::class, 'index'])->name('admin.testimonials.index');
    Route::post('/admin/testimonials', [AdminTestimonialController::class, 'store'])->name('admin.testimonials.store');
    Route::put('/admin/testimonials/{testimonial}', [AdminTestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::delete('/admin/testimonials/{testimonial}', [AdminTestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');

    // Projects Management
    Route::get('/admin/projects', [AdminProjectController::class, 'index'])->name('admin.projects.index');
    Route::post('/admin/projects', [AdminProjectController::class, 'store'])->name('admin.projects.store');
    Route::put('/admin/projects/{project:id}', [AdminProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/admin/projects/{project:id}', [AdminProjectController::class, 'destroy'])->name('admin.projects.destroy');
    Route::patch('/admin/projects/{project:id}/toggle-featured', [AdminProjectController::class, 'toggleFeatured'])->name('admin.projects.toggle-featured');

    // Skills Management
    Route::get('/admin/skills', [AdminSkillController::class, 'index'])->name('admin.skills.index');
    Route::post('/admin/skills', [AdminSkillController::class, 'store'])->name('admin.skills.store');
    Route::put('/admin/skills/{skill}', [AdminSkillController::class, 'update'])->name('admin.skills.update');
    Route::delete('/admin/skills/{skill}', [AdminSkillController::class, 'destroy'])->name('admin.skills.destroy');

    // Certificates Management
    Route::get('/admin/certificates', [AdminCertificateController::class, 'index'])->name('admin.certificates.index');
    Route::post('/admin/certificates', [AdminCertificateController::class, 'store'])->name('admin.certificates.store');
    Route::put('/admin/certificates/{certificate}', [AdminCertificateController::class, 'update'])->name('admin.certificates.update');
    Route::delete('/admin/certificates/{certificate}', [AdminCertificateController::class, 'destroy'])->name('admin.certificates.destroy');

    // Journey Milestones Management
    Route::get('/admin/journey', [AdminJourneyController::class, 'index'])->name('admin.journey.index');
    Route::post('/admin/journey', [AdminJourneyController::class, 'store'])->name('admin.journey.store');
    Route::put('/admin/journey/{journey}', [AdminJourneyController::class, 'update'])->name('admin.journey.update');
    Route::delete('/admin/journey/{journey}', [AdminJourneyController::class, 'destroy'])->name('admin.journey.destroy');

    // Blog Articles Management
    Route::get('/admin/articles', [AdminArticleController::class, 'index'])->name('admin.articles.index');
    Route::post('/admin/articles', [AdminArticleController::class, 'store'])->name('admin.articles.store');
    Route::put('/admin/articles/{article:id}', [AdminArticleController::class, 'update'])->name('admin.articles.update');
    Route::delete('/admin/articles/{article:id}', [AdminArticleController::class, 'destroy'])->name('admin.articles.destroy');
    Route::patch('/admin/articles/{article:id}/toggle-publish', [AdminArticleController::class, 'togglePublish'])->name('admin.articles.toggle-publish');

    // Messages Management
    Route::get('/admin/messages', [AdminContactMessageController::class, 'index'])->name('admin.messages.index');
    Route::patch('/admin/messages/{message}/toggle-read', [AdminContactMessageController::class, 'toggleRead'])->name('admin.messages.toggle-read');
    Route::delete('/admin/messages/{message}', [AdminContactMessageController::class, 'destroy'])->name('admin.messages.destroy');
});

require __DIR__.'/settings.php';

// 3D Interactive 404 Fallback
Route::fallback([PortfolioController::class, 'notFound'])->name('portfolio.not-found');
