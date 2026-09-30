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
        const matchesCategory = selectedCategory === 'all' || a.category === selectedCategory;
        const matchesSearch =
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (a.tags && a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
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

            <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 space-y-12">
                <div className="max-w-3xl space-y-4">
                    <Badge variant="outline" className="text-primary border-primary/30 px-3 py-1 bg-primary/5">
                        المعرفة والتدوين
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                        المدونة والمقالات التقنية
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        مقالات وشروحات معمقة باللغة العربية في علم البيانات، الذكاء الاصطناعي التوليدي، معمارية تطبيقات Flutter، وبناء المنتجات الرقمية.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-sm">
                    <div className="flex flex-wrap items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-72">
                        <Search className="size-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="بحث في المقالات والوسوم..."
                            className="pr-9 rounded-xl border-border/80 text-xs"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((article) => (
                        <Link
                            key={article.id}
                            href={`/blog/${article.slug}`}
                            className="group rounded-3xl border border-border/80 bg-card overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between"
                        >
                            {article.image && (
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.currentTarget as HTMLImageElement).src =
                                                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-background/90 text-foreground text-[10px] font-semibold border border-border">
                                            {article.category_label}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                        <Calendar className="size-3 text-primary" />
                                        <span>{article.date}</span>
                                        <span>•</span>
                                        <Clock className="size-3 text-primary" />
                                        <span>{article.reading_time}</span>
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-border/60 text-xs font-bold text-primary flex items-center justify-between">
                                    <span>قراءة المقال كاملاً</span>
                                    <ArrowUpRight className="size-3.5 group-hover:translate-x-[-2px] transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </PortfolioLayout>
    );
}
