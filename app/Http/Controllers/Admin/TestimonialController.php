<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     */
    public function index(): Response
    {
        return Inertia::render('admin/testimonials', [
            'testimonials' => Testimonial::orderBy('order')->get(),
        ]);
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'string', 'max:1000'],
            'text' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['rating'] = $validated['rating'] ?? 5;
        $validated['order'] = $validated['order'] ?? (Testimonial::max('order') + 1);

        Testimonial::create($validated);

        return back()->with('success', 'تمت إضافة رأي العميل بنجاح.');
    }

    /**
     * Update the specified testimonial.
     */
    public function update(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:255'],
            'company' => ['nullable', 'string', 'max:255'],
            'avatar' => ['nullable', 'string', 'max:1000'],
            'text' => ['required', 'string'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'order' => ['nullable', 'integer'],
        ]);

        $testimonial->update($validated);

        return back()->with('success', 'تم تعديل رأي العميل بنجاح.');
    }

    /**
     * Remove the specified testimonial.
     */
    public function destroy(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return back()->with('success', 'تم حذف رأي العميل بنجاح.');
    }
}
