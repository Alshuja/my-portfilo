<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Certificate;
use App\Models\ContactMessage;
use App\Models\Journey;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin command center dashboard.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'services' => Service::count(),
                'testimonials' => Testimonial::count(),
                'skills' => Skill::count(),
                'certificates' => Certificate::count(),
                'journey' => Journey::count(),
                'articles' => Article::count(),
                'messages' => ContactMessage::count(),
                'unreadMessages' => ContactMessage::where('is_read', false)->count(),
            ],
            'recentMessages' => ContactMessage::latest()->take(5)->get(),
            'recentProjects' => Project::latest()->take(4)->get(),
            'recentServices' => Service::latest()->take(4)->get(),
            'settings' => ProfileSetting::pluck('value', 'key'),
        ]);
    }

    /**
     * Update profile settings.
     */
    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'settings' => ['required', 'array'],
        ]);

        foreach ($validated['settings'] as $key => $value) {
            $serialized = is_string($value) ? $value : json_encode($value);
            ProfileSetting::setValue($key, $serialized !== false ? $serialized : null);
        }

        return back()->with('success', 'تم حفظ إعدادات الملف الشخصي بنجاح.');
    }

    /**
     * Export full portfolio database as a JSON file download.
     */
    public function exportJson(): \Symfony\Component\HttpFoundation\Response
    {
        $backup = [
            'exported_at' => now()->toIso8601String(),
            'version' => '2.1',
            'projects' => Project::all(),
            'services' => Service::all(),
            'testimonials' => Testimonial::all(),
            'skills' => Skill::all(),
            'certificates' => Certificate::all(),
            'journey' => Journey::all(),
            'articles' => Article::all(),
            'settings' => ProfileSetting::all(),
        ];

        $json = json_encode($backup, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) ?: '{}';

        return response($json, 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="alshujaa-portfolio-backup-'.date('Y-m-d').'.json"',
        ]);
    }

    /**
     * Import portfolio database from an uploaded JSON backup file.
     */
    public function importJson(Request $request): RedirectResponse
    {
        $request->validate([
            'backup_file' => ['required', 'file', 'mimes:json,txt'],
        ]);

        $file = $request->file('backup_file');
        $realPath = $file ? $file->getRealPath() : false;
        $content = $realPath ? file_get_contents($realPath) : false;

        if ($content === false) {
            return back()->with('error', 'تعذر قراءة ملف النسخة الاحتياطية.');
        }

        $data = json_decode($content, true);

        if (! is_array($data)) {
            return back()->with('error', 'ملف النسخة الاحتياطية غير صالح أو تالف.');
        }

        if (isset($data['projects']) && is_array($data['projects'])) {
            foreach ($data['projects'] as $p) {
                unset($p['id'], $p['created_at'], $p['updated_at']);
                Project::updateOrCreate(['slug' => $p['slug']], $p);
            }
        }

        if (isset($data['services']) && is_array($data['services'])) {
            foreach ($data['services'] as $srv) {
                unset($srv['id'], $srv['created_at'], $srv['updated_at']);
                Service::updateOrCreate(['slug' => $srv['slug']], $srv);
            }
        }

        if (isset($data['testimonials']) && is_array($data['testimonials'])) {
            foreach ($data['testimonials'] as $tst) {
                unset($tst['id'], $tst['created_at'], $tst['updated_at']);
                Testimonial::updateOrCreate(['name' => $tst['name']], $tst);
            }
        }

        if (isset($data['skills']) && is_array($data['skills'])) {
            foreach ($data['skills'] as $s) {
                unset($s['id'], $s['created_at'], $s['updated_at']);
                Skill::updateOrCreate(['name' => $s['name']], $s);
            }
        }

        if (isset($data['certificates']) && is_array($data['certificates'])) {
            foreach ($data['certificates'] as $c) {
                unset($c['id'], $c['created_at'], $c['updated_at']);
                Certificate::updateOrCreate(['title' => $c['title']], $c);
            }
        }

        if (isset($data['journey']) && is_array($data['journey'])) {
            foreach ($data['journey'] as $j) {
                unset($j['id'], $j['created_at'], $j['updated_at']);
                Journey::updateOrCreate(['title' => $j['title']], $j);
            }
        }

        if (isset($data['articles']) && is_array($data['articles'])) {
            foreach ($data['articles'] as $a) {
                unset($a['id'], $a['created_at'], $a['updated_at']);
                Article::updateOrCreate(['slug' => $a['slug']], $a);
            }
        }

        if (isset($data['settings']) && is_array($data['settings'])) {
            foreach ($data['settings'] as $st) {
                if (isset($st['key'], $st['value'])) {
                    ProfileSetting::setValue($st['key'], $st['value']);
                }
            }
        }

        return back()->with('success', 'تم استيراد بيانات النسخة الاحتياطية وتحديث الموقع بنجاح!');
    }

    /**
     * Upload an image to public storage.
     */
    public function uploadImage(Request $request): JsonResponse
    {
        $request->validate([
            'image' => ['required', 'file', 'image', 'max:10240'],
        ]);

        $image = $request->file('image');
        $path = $image ? $image->store('uploads', 'public') : false;

        if (! $path) {
            return response()->json(['message' => 'تعذر رفع الصورة.'], 500);
        }

        $url = Storage::url($path);

        return response()->json([
            'url' => $url,
            'path' => $path,
        ]);
    }
}
