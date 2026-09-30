<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    /**
     * Display a listing of certificates.
     */
    public function index(): Response
    {
        return Inertia::render('admin/certificates', [
            'certificates' => Certificate::orderBy('order')->get(),
        ]);
    }

    /**
     * Store a newly created certificate.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:1000'],
            'fallback_icon' => ['nullable', 'string', 'max:100'],
            'credential_url' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['order'] = $validated['order'] ?? (Certificate::max('order') + 1);

        Certificate::create($validated);

        return back()->with('success', 'تمت إضافة الشهادة بنجاح.');
    }

    /**
     * Update the specified certificate.
     */
    public function update(Request $request, Certificate $certificate): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['required', 'string', 'max:255'],
            'date' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', 'max:100'],
            'category_label' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:1000'],
            'fallback_icon' => ['nullable', 'string', 'max:100'],
            'credential_url' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],
            'order' => ['nullable', 'integer'],
        ]);

        $certificate->update($validated);

        return back()->with('success', 'تم تعديل الشهادة بنجاح.');
    }

    /**
     * Remove the specified certificate.
     */
    public function destroy(Certificate $certificate): RedirectResponse
    {
        $certificate->delete();

        return back()->with('success', 'تم حذف الشهادة بنجاح.');
    }
}
