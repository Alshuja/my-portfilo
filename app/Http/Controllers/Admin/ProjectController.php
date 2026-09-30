<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(): Response
    {
        return Inertia::render('admin/projects', [
            'projects' => Project::orderBy('order')->latest()->get(),
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:projects,slug'],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'brief' => ['required', 'string', 'max:1000'],
            'description' => ['required', 'string'],
            'tags' => ['required'],
            'image' => ['nullable', 'string', 'max:1000'],
            'gallery' => ['nullable'],
            'problem' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'features' => ['nullable'],
            'role' => ['nullable', 'string', 'max:255'],
            'client' => ['nullable', 'string', 'max:255'],
            'date_range' => ['required', 'string', 'max:100'],
            'live_url' => ['nullable', 'string', 'max:500'],
            'github_url' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) ?: 'proj-'.time();
        }

        $validated['tags'] = $this->normalizeArrayField($validated['tags'] ?? []);
        $validated['gallery'] = $this->normalizeArrayField($validated['gallery'] ?? []);
        $validated['features'] = $this->normalizeArrayField($validated['features'] ?? []);

        $validated['order'] = $validated['order'] ?? (Project::max('order') + 1);

        Project::create($validated);

        return back()->with('success', 'تمت إضافة المشروع بنجاح.');
    }

    /**
     * Update the specified project.
     */
    public function update(Request $request, Project $project): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:projects,slug,'.$project->id],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'brief' => ['required', 'string', 'max:1000'],
            'description' => ['required', 'string'],
            'tags' => ['required'],
            'image' => ['nullable', 'string', 'max:1000'],
            'gallery' => ['nullable'],
            'problem' => ['nullable', 'string'],
            'solution' => ['nullable', 'string'],
            'features' => ['nullable'],
            'role' => ['nullable', 'string', 'max:255'],
            'client' => ['nullable', 'string', 'max:255'],
            'date_range' => ['required', 'string', 'max:100'],
            'live_url' => ['nullable', 'string', 'max:500'],
            'github_url' => ['nullable', 'string', 'max:500'],
            'is_featured' => ['boolean'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['tags'] = $this->normalizeArrayField($validated['tags'] ?? []);
        $validated['gallery'] = $this->normalizeArrayField($validated['gallery'] ?? []);
        $validated['features'] = $this->normalizeArrayField($validated['features'] ?? []);

        $project->update($validated);

        return back()->with('success', 'تم تعديل بيانات المشروع بنجاح.');
    }

    /**
     * Normalize comma or newline delimited strings into a clean array.
     *
     * @return array<int, string>
     */
    private function normalizeArrayField(mixed $value): array
    {
        if (is_array($value)) {
            return array_values(array_filter(array_map('strval', $value), fn (string $item): bool => trim($item) !== ''));
        }

        if (is_string($value) && trim($value) !== '') {
            $parts = preg_split('/[\r\n,]+/', $value) ?: [];

            return array_values(array_filter(array_map('trim', $parts), fn (string $item): bool => $item !== ''));
        }

        return [];
    }

    /**
     * Remove the specified project.
     */
    public function destroy(Project $project): RedirectResponse
    {
        $project->delete();

        return back()->with('success', 'تم حذف المشروع بنجاح.');
    }

    /**
     * Toggle featured status of the project.
     */
    public function toggleFeatured(Project $project): RedirectResponse
    {
        $project->update([
            'is_featured' => ! $project->is_featured,
        ]);

        return back()->with('success', 'تم تحديث حالة المشروع بنجاح.');
    }
}
