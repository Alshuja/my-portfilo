import React, { useState, useEffect, useRef } from 'react';
import {
    Bot,
    Send,
    X,
    ChevronUp,
    Sparkles,
    PhoneCall,
    ExternalLink,
} from 'lucide-react';
import { playClickSound } from '@/components/portfolio/sound-effects';

interface Message {
    id: string;
    sender: 'bot' | 'user';
    text: string;
    time: string;
    link?: { url: string; label: string };
}

const KNOWLEDGE_BASE: Array<{
    keywords: string[];
    answer: string;
    link?: { url: string; label: string };
}> = [
    {
        keywords: ['سندباد', 'sinbad', 'متجر', 'تجارة', 'سوق'],
        answer: 'مشروع "سندباد" (Sinbad Marketplace) هو منصة تجارة إلكترونية متعددة التجار وتطبيق هواتف ذكية متكامل، عمل فيه المهندس عبدالرحمن كـ Lead Full-Stack & Mobile Developer. النظام مبني باستخدام Laravel كـ Backend عالي الأداء مع تطبيقات هجينة بـ Flutter لنظامي Android و iOS، ويدعم تتبع الشحنات بالخرائط اللحظية وبوابات الدفع الإلكتروني.',
        link: { url: '/projects/sinbad', label: 'استعراض صفحة مشروع سندباد' },
    },
    {
        keywords: ['ريال', 'rial', 'محفظة', 'مالية', 'fintech', 'qr'],
        answer: 'تطبيق "محفظة ريال الرقمية" (Riyal Wallet) هو تطبيق خدمات مالية وتكنولوجيا مالية (FinTech) مبني بإطار Flutter. يوفر تحويلاً مالياً فورياً عبر رقم الهاتف أو مسح رمز QR Code، مع تشفير ثنائي آمن للبيانات، وسجل عمليات موثق وفواتير إلكترونية.',
        link: { url: '/projects/rial', label: 'استعراض صفحة محفظة ريال' },
    },
    {
        keywords: [
            'فكرة مبرمج',
            'مبرمج',
            'مبادرة',
            'مجتمع',
            'تعليم',
            'قناة',
            'يوتيوب',
        ],
        answer: 'مبادرة "فكرة مبرمج" (Programmer Idea) هي منصة ومجتمع تقني أسسه م. عبدالرحمن عادل الشجاع لتبسيط علوم البرمجة وهندسة البرمجيات والذكاء الاصطناعي باللغة العربية، وقد استفاد منها أكثر من 10,000 طالب ومطور عبر قنوات التلجرام واليوتيوب والموقع الرسمي.',
        link: { url: '/programmer-idea', label: 'زيارة صفحة فكرة مبرمج' },
    },
    {
        keywords: [
            'بايثون',
            'python',
            'ذكاء',
            'ai',
            'بيانات',
            'تعلم',
            'data',
            'pandas',
            'power bi',
        ],
        answer: 'يتخصص م. عبدالرحمن في علوم البيانات والذكاء الاصطناعي؛ حيث يتقن لغة بايثون ومكتبات التحليل الرياضي (NumPy, pandas, Matplotlib) ونماذج تعلم الآلة (Machine Learning عبر Scikit-Learn)، وبناء لوحات المؤشرات التفاعلية بـ Power BI، وحاصل على شهادة معتمدة من IBM في هذا المجال.',
        link: { url: '/skills', label: 'استعراض مصفوفة المهارات' },
    },
    {
        keywords: [
            'تواصل',
            'رقم',
            'واتساب',
            'ايميل',
            'واتس',
            'اتصال',
            'phone',
            'contact',
        ],
        answer: 'يمكنك التواصل المباشر مع م. عبدالرحمن عادل الشجاع عبر:\n• واتساب 1: +967 773 853 853\n• واتساب 2: +967 777 580 845\n• تيليجرام: @Alshuja_ai\n• أو عبر نموذج الرسائل في الموقع.',
        link: { url: '/contact', label: 'الانتقال لصفحة التواصل' },
    },
    {
        keywords: ['جامعة', 'دراسة', 'تعليم', 'تخصص', 'كلية', 'اكاديمي'],
        answer: 'عبدالرحمن طالب في المستوى الرابع بكلية الحاسوب وتكنولوجيا المعلومات بجامعة إب، وحاصل على تكريم رسمي للتميز الأكاديمي لجهوده ومبادراته البرمجية.',
        link: { url: '/about', label: 'استعراض السيرة والمسار' },
    },
    {
        keywords: [
            'عمل',
            'حر',
            'مشروع',
            'توظيف',
            'سعر',
            'برمجة تطبيق',
            'freelance',
        ],
        answer: 'نعم! م. عبدالرحمن متاح حالياً للعمل الحر، وتطوير المشاريع الرقمية الجديدة سواء تطبيقات هواتف بـ Flutter، منصات ويب بـ Laravel، أو حلول تحليل البيانات والذكاء الاصطناعي.',
        link: { url: '/contact', label: 'طلب مشروع الآن' },
    },
];

const DEFAULT_ANSWER =
    'شكراً لسؤالك! أنا المساعد الذكي الخاص بالمهندس عبدالرحمن. يمكنك استعراض أعماله عبر قائمة المشاريع، أو السؤال عن خبراته في Flutter و Laravel والذكاء الاصطناعي، أو مراسلته مباشرة عبر الواتساب: +967 773 853 853.';

const SUGGESTIONS = [
    'ما هو مشروع سندباد؟',
    'ما هي محفظة ريال؟',
    'ما هي مبادرة فكرة مبرمج؟',
    'ما هي مهارات بايثون والذكاء الاصطناعي؟',
    'كيف أتواصل مع عبدالرحمن؟',
    'هل هو متاح للعمل الحر؟',
];

export function SmartAiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'bot',
            text: 'مرحباً بك! 👋 أنا المساعد الذكي الخاص بـ م. عبدالرحمن عادل الشجاع. يمكنك سؤالي عن مشاريعه (سندباد، محفظة ريال)، مساره الدراسي، مهاراته التقنية، أو طلب استشارة.',
            time: 'الآن',
        },
    ]);

    const chatBodyRef = useRef<HTMLDivElement>(null);

    // Scroll to Top monitoring
    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 250);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll chat body to bottom when messages update
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = (textToSend?: string) => {
        const query = (textToSend || input).trim();
        if (!query) return;

        playClickSound(650, 0.02);

        const userMsg: Message = {
            id: String(Date.now()),
            sender: 'user',
            text: query,
            time: new Date().toLocaleTimeString('ar-YE', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        // Find answer in knowledge base
        const lower = query.toLowerCase();
        let matched = KNOWLEDGE_BASE.find((item) =>
            item.keywords.some((k) => lower.includes(k.toLowerCase())),
        );

        setTimeout(() => {
            setIsTyping(false);
            playClickSound(500, 0.03);
            const botMsg: Message = {
                id: String(Date.now() + 1),
                sender: 'bot',
                text: matched ? matched.answer : DEFAULT_ANSWER,
                time: new Date().toLocaleTimeString('ar-YE', {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                link: matched?.link,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    const scrollToTop = () => {
        playClickSound(600, 0.02);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* ==================== FLOATING ACTION BUTTONS (FABs) ==================== */}
            <div
                className="fixed bottom-6 left-6 z-40 flex flex-col gap-3"
                dir="ltr"
            >
                {/* Scroll To Top Button */}
                <button
                    type="button"
                    onClick={scrollToTop}
                    className={`flex size-12 items-center justify-center rounded-full border border-border/80 bg-card text-foreground shadow-lg transition-all duration-300 hover:scale-110 hover:border-primary hover:text-primary ${
                        showScrollTop
                            ? 'translate-y-0 opacity-100'
                            : 'pointer-events-none translate-y-4 opacity-0'
                    }`}
                    title="العودة للأعلى"
                    aria-label="العودة للأعلى"
                >
                    <ChevronUp className="size-5" />
                </button>

                {/* WhatsApp Direct Floating Button */}
                <a
                    href="https://wa.me/967773853853?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85.%20%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%D8%D8%AD%D9%85%D9%86%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AA%D9%82%D9%86%D9%8A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex size-13 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-xl transition-all hover:scale-110 hover:shadow-emerald-500/30"
                    title="محادثة واتساب مباشرة"
                    aria-label="محادثة واتساب"
                >
                    <PhoneCall className="size-5" />
                </a>

                {/* AI Assistant Toggle Button */}
                <button
                    type="button"
                    onClick={() => {
                        playClickSound(700, 0.03);
                        setIsOpen(!isOpen);
                    }}
                    className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-red-700 via-primary to-orange-500 text-white shadow-2xl transition-all hover:scale-110 hover:shadow-primary/40"
                    title="المساعد الذكي (AI Assistant)"
                    aria-label="المساعد الذكي"
                >
                    <Bot className="size-6" />
                    <span className="absolute -top-1 -right-1 rounded-full border border-primary/20 bg-white px-1.5 py-0.5 text-[10px] font-black text-primary shadow-md">
                        AI
                    </span>
                    <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/25" />
                </button>
            </div>

            {/* ==================== SMART AI ASSISTANT CHAT WINDOW ==================== */}
            {isOpen && (
                <div
                    className="fixed bottom-24 left-6 z-50 flex h-[520px] max-h-[calc(100vh-8rem)] w-96 max-w-[calc(100vw-3rem)] animate-in flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-2xl duration-200 zoom-in-95 fade-in"
                    dir="rtl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-red-700 via-primary to-orange-500 p-4 text-white shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-2xl bg-white/20 font-bold backdrop-blur-md">
                                <Bot className="size-5" />
                            </div>
                            <div>
                                <h4 className="flex items-center gap-1.5 text-sm font-bold">
                                    مساعد عبدالرحمن الذكي
                                    <Sparkles className="size-3 text-amber-300" />
                                </h4>
                                <div className="flex items-center gap-1.5 text-[11px] text-white/85">
                                    <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                                    متصل وجاهز للرد
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex size-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/25"
                            aria-label="إغلاق نافذة المحادثة"
                        >
                            <X className="size-4 text-white" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div
                        ref={chatBodyRef}
                        className="flex-1 space-y-3 overflow-y-auto bg-muted/20 p-4"
                    >
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex flex-col ${m.sender === 'user' ? 'items-start' : 'items-end'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed sm:text-sm ${
                                        m.sender === 'user'
                                            ? 'rounded-br-sm bg-primary text-primary-foreground shadow-sm'
                                            : 'rounded-bl-sm border border-border/80 bg-card text-foreground shadow-sm'
                                    }`}
                                >
                                    <p className="whitespace-pre-line">
                                        {m.text}
                                    </p>
                                    {m.link && (
                                        <div className="mt-2 border-t border-border/50 pt-2">
                                            <a
                                                href={m.link.url}
                                                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                                            >
                                                <span>{m.link.label}</span>
                                                <ExternalLink className="size-3" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <span className="mt-1 px-1 text-[10px] text-muted-foreground">
                                    {m.time}
                                </span>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex max-w-24 items-end gap-1 rounded-2xl border border-border/60 bg-card p-2">
                                <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                                <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                                <span className="size-2 animate-bounce rounded-full bg-primary" />
                            </div>
                        )}
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex scrollbar-none items-center gap-1.5 overflow-x-auto border-t border-border/60 bg-card p-2.5">
                        {SUGGESTIONS.map((s, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleSendMessage(s)}
                                className="flex-shrink-0 rounded-full bg-muted/80 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-muted-foreground transition-colors hover:bg-primary hover:text-white"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Footer Input */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="flex items-center gap-2 border-t border-border bg-card p-3"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اكتب سؤالك هنا..."
                            className="h-9 flex-1 rounded-full border border-border/80 bg-muted/50 px-3.5 text-xs text-foreground focus:border-primary focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
                            aria-label="إرسال"
                        >
                            <Send className="size-4 -scale-x-100" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
