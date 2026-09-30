import { Head, Link } from '@inertiajs/react';
import { Calendar, Clock, User, ArrowRight, Share2, Tag } from 'lucide-react';
import { PortfolioLayout } from '@/layouts/portfolio-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Article } from '@/types/portfolio';

interface ArticleProps {
    article: Article;
    relatedArticles: Article[];
}

export default function ArticlePage({ article, relatedArticles }: ArticleProps) {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
            }).catch(() => {});
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('تم نسخ رابط المقال للمشاركة!');
        }
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>{`${article.title} | عبدالرحمن عادل الشجاع`}</title>
                <meta name="description" content={article.excerpt} />
            </Head>

            <article className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-4xl space-y-10">
                {/* Back button */}
                <div>
                    <Button asChild variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                        <Link href="/blog">
                            <ArrowRight className="size-4" />
                            العودة إلى قائمة المقالات
                        </Link>
                    </Button>
                </div>

                {/* Article Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                            {article.category_label}
                        </Badge>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mr-2">
                            <span className="flex items-center gap-1">
                                <Calendar className="size-3.5 text-primary" />
                                {article.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="size-3.5 text-primary" />
                                {article.reading_time}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.25]">
                        {article.title}
                    </h1>

                    <p className="text-base sm:text-lg text-muted-foreground font-medium leading-relaxed bg-muted/30 p-5 rounded-2xl border border-border/60">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border/60">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                                <User className="size-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-foreground">{article.author}</div>
                                <div className="text-xs text-muted-foreground">كاتب ومبرمج</div>
                            </div>
                        </div>

                        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 rounded-xl">
                            <Share2 className="size-3.5" />
                            مشاركة المقال
                        </Button>
                    </div>
                </div>

                {/* Article Cover Image */}
                {article.image && (
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-muted border border-border/80 shadow-md">
                        <img
                            src={article.image}
                            alt={article.title}
                            className="size-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80';
                            }}
                        />
                    </div>
                )}

                {/* Article Body Content */}
                <div
                    className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 leading-relaxed font-sans space-y-6 pt-4"
                    dangerouslySetInnerHTML={{ __html: article.body }}
                />

                {/* Tags row */}
                {article.tags && article.tags.length > 0 && (
                    <div className="pt-6 border-t border-border/60 space-y-3">
                        <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                            <Tag className="size-3.5" />
                            الوسوم والكلمات المفتاحية:
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary" className="px-3 py-1 font-mono text-xs">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="pt-12 border-t border-border/60 space-y-6">
                        <h3 className="text-2xl font-bold text-foreground">
                            مقالات ذات صلة
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all hover:-translate-y-1 space-y-2 block"
                                >
                                    <div className="text-[10px] text-muted-foreground font-mono">{rel.date}</div>
                                    <h4 className="font-bold text-sm text-foreground line-clamp-2">
                                        {rel.title}
                                    </h4>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {rel.excerpt}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </PortfolioLayout>
    );
}
