import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import type { Article } from '@/types/portfolio';

interface BlogProps {
    articles: Article[];
}

export default function BlogPage({ articles }: BlogProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filtered = articles.filter((a) => {
        const matchesCategory =
            selectedCategory === 'all' || a.category === selectedCategory;
        const matchesSearch =
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.tags &&
                a.tags.some((t) =>
                    t.toLowerCase().includes(searchQuery.toLowerCase()),
                ));
        return matchesCategory && matchesSearch;
    });

    const categories = [
        { id: 'all', label: 'جميع المقالات' },
        { id: 'data-ai', label: 'علوم البيانات والذكاء الاصطناعي' },
        { id: 'mobile', label: 'تطبيقات الهواتف' },
        { id: 'startups', label: 'ريادة الأعمال والـ MVP' },
    ];

    return (
        <PortfolioLayout>
            <Head title="المدونة والمقالات التقنية" />

            <div className="container mx-auto space-y-12 px-4 py-16 sm:px-6 md:py-24">
                <div className="max-w-3xl space-y-4">
                    <Badge
                        variant="outline"
                        className="border-primary/30 bg-primary/5 px-3 py-1 text-primary"
                    >
                        المعرفة والتدوين
                    </Badge>
                    <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
                        المدونة والمقالات التقنية
                    </h1>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        مقالات وشروحات معمقة باللغة العربية في علم البيانات،
                        الذكاء الاصطناعي التوليدي، معمارية تطبيقات Flutter، وبناء
                        المنتجات الرقمية.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm md:flex-row md:items-center">
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="بحث في المقالات والوسوم..."
                            className="rounded-xl border-border/80 pr-9 text-xs"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-xl"
                        >
                            {article.image && (
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            (
                                                e.currentTarget as HTMLImageElement
                                            ).src =
                                                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="border border-border bg-background/90 text-[10px] font-semibold text-foreground">
                                            {article.category_label}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-1 flex-col justify-between space-y-4 p-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                                        <Calendar className="size-3 text-primary" />
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <Clock className="size-3 text-primary" />
                                        <span>{article.reading_time}</span>
                                    </div>
                                    <h3 className="text-lg leading-snug font-bold text-foreground transition-colors group-hover:text-primary">
                                        {article.title}
                                    </h3>
                                    <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-border/60 pt-3 text-xs font-bold text-primary">
                                    <span>قراءة المقال كاملاً</span>
                                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-[-2px]" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </PortfolioLayout>
    );
}
