import React, { useState, useRef, useEffect } from 'react';
import {
    Bot,
    MessageSquare,
    Send,
    X,
    ExternalLink,
    Sparkles,
    User,
    CornerDownLeft,
} from 'lucide-react';
import { playClickSound } from '@/components/portfolio/sound-effects';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    timestamp: Date;
}

export function FloatingFabs() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 'init-1',
            role: 'assistant',
            text: 'مرحباً بك! أنا المساعد الذكي لموقع عبدالرحمن عادل الشجاع. كيف يمكنني مساعدتك اليوم؟ يمكنك سؤالي عن مشاريعه (سندباد، فكرة مبرمج، محفظة ريال)، أو مهاراته في بايثون وفلاتر ولارافيل، أو طرق التواصل المباشر معه.',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = (textToSend?: string) => {
        const query = (textToSend || input).trim();
        if (!query) return;

        playClickSound();

        const userMsg: ChatMessage = {
            id: String(Date.now()),
            role: 'user',
            text: query,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const answer = generateAssistantResponse(query);
            setMessages((prev) => [
                ...prev,
                {
                    id: String(Date.now() + 1),
                    role: 'assistant',
                    text: answer,
                    timestamp: new Date(),
                },
            ]);
            setIsTyping(false);
            playClickSound();
        }, 800);
    };

    const generateAssistantResponse = (query: string): string => {
        const q = query.toLowerCase();

        if (
            q.includes('سندباد') ||
            q.includes('sinbad') ||
            q.includes('متجر') ||
            q.includes('ماركت')
        ) {
            return 'مشروع "سندباد" (Sinbad) هو منصة تجارة إلكترونية متعددة التجار متكاملة تربط العملاء والتجار ومندوبي التوصيل، قام عبدالرحمن بهندسة الباك اند باستخدام Laravel وبناء التطبيقات باستخدام Flutter، مع تتبع حي عبر الخرائط ونظام إدارة فواتير ومخزون فوري.';
        }

        if (
            q.includes('فكرة مبرمج') ||
            q.includes('تعليم') ||
            q.includes('قناة') ||
            q.includes('يوتيوب') ||
            q.includes('تلجرام')
        ) {
            return 'مبادرة "فكرة مبرمج" (Programmer Idea) هي منصة تعليمية ومجتمع تقني أسسه عبدالرحمن الشجاع لنشر المحتوى البرمجي العربي واليمني، مع سلاسل شروحات في بايثون، الذكاء الاصطناعي، وفلاتر، يستفيد منها أكثر من 10,000 طالب ومطور.';
        }

        if (
            q.includes('محفظة') ||
            q.includes('ريال') ||
            q.includes('مالي') ||
            q.includes('fintech')
        ) {
            return 'مشروع "محفظة ريال" (Riyal Wallet) هو تطبيق خدمات مالية ودفع رقمي مبني بـ Flutter يتيح التحويل السريع عبر الهواتف، ومسح رموز QR، وسداد الفواتير مع معايير أمان وتشفير عالية.';
        }

        if (
            q.includes('مهارات') ||
            q.includes('skills') ||
            q.includes('بايثون') ||
            q.includes('فلاتر') ||
            q.includes('لارافيل') ||
            q.includes('ذكاء')
        ) {
            return 'يمتلك عبدالرحمن خبرة قوية في: Python (تحليل بيانات وذكاء اصطناعي عبر pandas, scikit-learn)، وتطوير تطبيقات الموبايل بـ Flutter و Dart، والـ Backend بـ Laravel و PHP، وقواعد البيانات SQL/MySQL، ولوحات Power BI، مع معمارية النظم النظيفة Clean Architecture.';
        }

        if (
            q.includes('تواصل') ||
            q.includes('واتساب') ||
            q.includes('ايميل') ||
            q.includes('رقم') ||
            q.includes('اتصال') ||
            q.includes('contact')
        ) {
            return 'يمكنك التواصل مباشرة مع عبدالرحمن عبر واتساب على الرقم: 00967777580845 أو 00967773853853، أو عبر البريد الإلكتروني Abdulrahman_Alshujaa@gmail.com، أو زيارة صفحة التواصل في الموقع.';
        }

        if (
            q.includes('سيرة') ||
            q.includes('cv') ||
            q.includes('شهادة') ||
            q.includes('شهادات')
        ) {
            return 'يمكنك استعراض السيرة الذاتية التفاعلية وطباعتها بصيغة PDF عبر صفحة /cv في الموقع، كما يمكنك الاطلاع على أكثر من 9 شهادات معتمدة من IBM و Stanford في صفحة الشهادات /certificates.';
        }

        return 'شكراً لسؤالك! عبدالرحمن عادل الشجاع مبرمج وطالب علوم حاسوب بجامعة إب، متخصص في بناء المنتجات الرقمية (Marketplaces، تطبيقات الموبايل، وعلوم البيانات والذكاء الاصطناعي). هل ترغب في معرفة تفاصيل أكثر عن مشاريعه أو التواصل المباشر معه؟';
    };

    const quickQuestions = [
        'ما هي أبرز مشاريع عبدالرحمن؟',
        'ما هي مهاراته التقنية؟',
        'كيف أتواصل معه لبدء مشروع؟',
        'أين يمكنني رؤية سيرته الذاتية (CV)؟',
    ];

    return (
        <aside
            id="floating-fabs"
            aria-label="أدوات المساعدة السريعة والتواصل"
            className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3"
        >
            {/* Chat Modal */}
            {isOpen && (
                <div className="mb-2 flex h-[480px] w-[330px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl fade-in sm:w-[380px]">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-[#D71916] to-[#FF6A32] p-4 text-white">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                <Bot className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h4 className="text-sm leading-none font-bold">
                                    المساعد الذكي (AI Assistant)
                                </h4>
                                <span className="mt-0.5 block text-[11px] font-medium text-white/80">
                                    عبدالرحمن عادل الشجاع
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => {
                                playClickSound();
                                setIsOpen(false);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 transition-colors hover:bg-black/30"
                        >
                            <X className="h-4 w-4 text-white" />
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs leading-relaxed">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {m.role === 'assistant' && (
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D71916]/10">
                                        <Sparkles className="h-3.5 w-3.5 text-[#D71916]" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[80%] rounded-2xl p-3 ${
                                        m.role === 'user'
                                            ? 'rounded-br-sm bg-gradient-to-r from-[#D71916] to-[#FF6A32] text-white'
                                            : 'rounded-bl-sm border border-border/60 bg-secondary/70 text-foreground'
                                    }`}
                                >
                                    {m.text}
                                </div>
                                {m.role === 'user' && (
                                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary">
                                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-2 py-1 text-xs text-muted-foreground">
                                <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#D71916]" />
                                <span>جاري التفكير وصياغة الرد...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions */}
                    <div className="no-scrollbar flex gap-1.5 overflow-x-auto border-t border-border/50 bg-secondary/40 px-3 py-2">
                        {quickQuestions.map((q, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSend(q)}
                                className="rounded-full border border-border/60 bg-card px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-foreground/80 transition-colors hover:bg-secondary"
                            >
                                {q}
                            </button>
                        ))}
                    </div>

                    {/* Input Footer */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="flex items-center gap-2 border-t border-border bg-card p-3"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="اكتب استفسارك هنا..."
                            className="flex-1 rounded-xl border border-border bg-secondary/50 px-3 py-2 text-xs text-foreground focus:border-[#D71916] focus:outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#D71916] to-[#FF6A32] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            )}

            {/* Buttons Row */}
            <div className="flex items-center gap-2.5">
                {/* AI Chatbot FAB */}
                <button
                    type="button"
                    onClick={() => {
                        playClickSound();
                        setIsOpen(!isOpen);
                    }}
                    className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#D71916] to-[#FF6A32] text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#D71916]/30 active:scale-95"
                    title="المساعد الذكي"
                >
                    {isOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Bot className="h-5 w-5" />
                    )}
                    <span className="sr-only">المساعد الذكي</span>
                    <span className="absolute -top-1 -right-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-background bg-emerald-500" />
                </button>

                {/* WhatsApp FAB */}
                <a
                    href="https://wa.me/967777580845"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound()}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-all hover:scale-105 hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30 active:scale-95"
                    title="محادثة واتساب مباشرة"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="sr-only">واتساب</span>
                </a>

                {/* Telegram FAB */}
                <a
                    href="https://t.me/Alshuja_ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClickSound()}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30 active:scale-95"
                    title="تلجرام"
                >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.942z" />
                    </svg>
                    <span className="sr-only">تلجرام</span>
                </a>
            </div>
        </aside>
    );
}
