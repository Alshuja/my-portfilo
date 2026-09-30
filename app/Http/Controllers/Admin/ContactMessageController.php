<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of received contact messages.
     */
    public function index(): Response
    {
        return Inertia::render('admin/messages', [
            'messages' => ContactMessage::latest()->get(),
        ]);
    }

    /**
     * Toggle read status.
     */
    public function toggleRead(ContactMessage $message): RedirectResponse
    {
        $message->update([
            'is_read' => ! $message->is_read,
        ]);

        return back()->with('success', 'تم تحديث حالة الرسالة.');
    }

    /**
     * Remove the specified message.
     */
    public function destroy(ContactMessage $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'تم حذف الرسالة بنجاح.');
    }
}
