<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    /**
     * Display a listing of services.
     */
    public function index(): Response
    {
        return Inertia::render('admin/services', [
            'services' => Service::orderBy('order')->get(),
        ]);
    }

    /**
     * Store a newly created service.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:services,slug'],
            'short_description' => ['required', 'string', 'max:500'],
            'detailed_description' => ['required', 'string'],
            'additional_info' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'features' => ['nullable', 'array'],
            'technologies' => ['nullable', 'array'],
            'gallery' => ['nullable', 'array'],
            'order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) ?: 'service-'.Str::random(6);
        }

        $validated['order'] = $validated['order'] ?? (Service::max('order') + 1);

        Service::create($validated);

        return back()->with('success', 'تمت إضافة الخدمة بنجاح.');
    }

    /**
     * Update the specified service.
     */
    public function update(Request $request, Service $service): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:services,slug,'.$service->id],
            'short_description' => ['required', 'string', 'max:500'],
            'detailed_description' => ['required', 'string'],
            'additional_info' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:255'],
            'features' => ['nullable', 'array'],
            'technologies' => ['nullable', 'array'],
            'gallery' => ['nullable', 'array'],
            'order' => ['nullable', 'integer'],
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']) ?: $service->slug;
        }

        $service->update($validated);

        return back()->with('success', 'تم تعديل الخدمة بنجاح.');
    }

    /**
     * Remove the specified service.
     */
    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return back()->with('success', 'تم حذف الخدمة بنجاح.');
    }
}
