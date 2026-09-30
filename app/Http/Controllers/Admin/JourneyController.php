<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Journey;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JourneyController extends Controller
{
    /**
     * Display a listing of journey milestones.
     */
    public function index(): Response
    {
        return Inertia::render('admin/journey', [
            'journey' => Journey::orderBy('order')->get(),
        ]);
    }

    /**
     * Store a newly created milestone.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'date_range' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'icon' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['order'] = $validated['order'] ?? (Journey::max('order') + 1);

        Journey::create($validated);

        return back()->with('success', 'تمت إضافة المحطة بنجاح.');
    }

    /**
     * Update the specified milestone.
     */
    public function update(Request $request, Journey $journey): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'role' => ['required', 'string', 'max:255'],
            'date_range' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'icon' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
            'order' => ['nullable', 'integer'],
        ]);

        $journey->update($validated);

        return back()->with('success', 'تم تعديل المحطة بنجاح.');
    }

    /**
     * Remove the specified milestone.
     */
    public function destroy(Journey $journey): RedirectResponse
    {
        $journey->delete();

        return back()->with('success', 'تم حذف المحطة بنجاح.');
    }
}
