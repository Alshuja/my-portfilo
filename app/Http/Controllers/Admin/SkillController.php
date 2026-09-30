<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    /**
     * Display a listing of skills.
     */
    public function index(): Response
    {
        return Inertia::render('admin/skills', [
            'skills' => Skill::orderBy('order')->get(),
        ]);
    }

    /**
     * Store a newly created skill.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'level' => ['required', 'integer', 'min:1', 'max:100'],
            'color' => ['required', 'string', 'max:50'],
            'icon' => ['nullable', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
        ]);

        $validated['order'] = $validated['order'] ?? (Skill::max('order') + 1);

        Skill::create($validated);

        return back()->with('success', 'تمت إضافة المهارة بنجاح.');
    }

    /**
     * Update the specified skill.
     */
    public function update(Request $request, Skill $skill): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:100'],
            'level' => ['required', 'integer', 'min:1', 'max:100'],
            'color' => ['required', 'string', 'max:50'],
            'icon' => ['nullable', 'string', 'max:100'],
            'order' => ['nullable', 'integer'],
        ]);

        $skill->update($validated);

        return back()->with('success', 'تم تعديل المهارة بنجاح.');
    }

    /**
     * Remove the specified skill.
     */
    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return back()->with('success', 'تم حذف المهارة بنجاح.');
    }
}
