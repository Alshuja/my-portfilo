<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index(): Response
    {
        return Inertia::render('admin/articles', [
            'articles' => Article::latest()->get(),
        ]);
    }

    /**
     * Store a newly created article.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:articles,slug'],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'reading_time' => ['required', 'string', 'max:50'],
            'author' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string', 'max:50'],
            'image' => ['nullable', 'string', 'max:1000'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'body' => ['required', 'string'],
            'tags' => ['nullable'],
            'is_published' => ['boolean'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) ?: 'article-'.time();
        }

        if (is_string($validated['tags'])) {
            $validated['tags'] = array_values(array_filter(array_map('trim', explode(',', $validated['tags']))));
        }

        $validated['published_at'] = ($validated['is_published'] ?? true) ? now() : null;

        Article::create($validated);

        return back()->with('success', 'تم نشر المقال بنجاح.');
    }

    /**
     * Update the specified article.
     */
    public function update(Request $request, Article $article): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:articles,slug,'.$article->id],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'reading_time' => ['required', 'string', 'max:50'],
            'author' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string', 'max:50'],
            'image' => ['nullable', 'string', 'max:1000'],
            'excerpt' => ['required', 'string', 'max:1000'],
            'body' => ['required', 'string'],
            'tags' => ['nullable'],
            'is_published' => ['boolean'],
        ]);

        if (is_string($validated['tags'])) {
            $validated['tags'] = array_values(array_filter(array_map('trim', explode(',', $validated['tags']))));
        }

        if (($validated['is_published'] ?? false) && ! $article->is_published) {
            $validated['published_at'] = now();
        }

        $article->update($validated);

        return back()->with('success', 'تم تعديل المقال بنجاح.');
    }

    /**
     * Remove the specified article.
     */
    public function destroy(Article $article): RedirectResponse
    {
        $article->delete();

        return back()->with('success', 'تم حذف المقال بنجاح.');
    }

    /**
     * Toggle published state.
     */
    public function togglePublish(Article $article): RedirectResponse
    {
        $newStatus = ! $article->is_published;
        $article->update([
            'is_published' => $newStatus,
            'published_at' => $newStatus ? ($article->published_at ?? now()) : null,
        ]);

        return back()->with('success', 'تم تحديث حالة نشر المقال.');
    }
}
