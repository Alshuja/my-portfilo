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

export default function ArticlePage({
    article,
    relatedArticles,
}: ArticleProps) {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: article.title,
                    text: article.excerpt,
                    url: window.location.href,
                })
                .catch(() => {});
        } else {
            void navigator.clipboard.writeText(window.location.href);
            alert('تم نسخ رابط المقال للمشاركة!');
        }
    };

    return (
        <PortfolioLayout>
            <Head>
                <title>{`${article.title} | عبدالرحمن عادل الشجاع`}</title>
                <meta name="description" content={article.excerpt} />
            </Head>

            <article className="container mx-auto max-w-4xl space-y-10 px-4 py-16 sm:px-6 md:py-24">
                {/* Back button */}
                <div>
                    <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-muted-foreground hover:text-foreground"
                    >
                        <Link href="/blog">
                            <ArrowRight className="size-4" />
                            العودة إلى قائمة المقالات
                        </Link>
                    </Button>
                </div>

                {/* Article Header */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-primary px-3 py-1 font-semibold text-primary-foreground">
                            {article.category_label}
                        </Badge>
                        <div className="mr-2 flex items-center gap-3 font-mono text-xs text-muted-foreground">
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

                    <h1 className="text-3xl leading-[1.25] font-black tracking-tight text-foreground sm:text-5xl">
                        {article.title}
                    </h1>

                    <p className="rounded-2xl border border-border/60 bg-muted/30 p-5 text-base leading-relaxed font-medium text-muted-foreground sm:text-lg">
                        {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between border-t border-border/60 pt-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                                <User className="size-5" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-foreground">
                                    {article.author}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    كاتب ومبرمج
                                </div>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            className="gap-2 rounded-xl"
                        >
                            <Share2 className="size-3.5" />
                            مشاركة المقال
                        </Button>
                    </div>
                </div>

                {/* Article Cover Image */}
                {article.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border/80 bg-muted shadow-md">
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
                    className="prose prose-lg dark:prose-invert max-w-none space-y-6 pt-4 font-sans leading-relaxed text-foreground/90"
                    dangerouslySetInnerHTML={{ __html: article.body }}
                />

                {/* Tags row */}
                {article.tags && article.tags.length > 0 && (
                    <div className="space-y-3 border-t border-border/60 pt-6">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                            <Tag className="size-3.5" />
                            الوسوم والكلمات المفتاحية:
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, idx) => (
                                <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="px-3 py-1 font-mono text-xs"
                                >
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <div className="space-y-6 border-t border-border/60 pt-12">
                        <h3 className="text-2xl font-bold text-foreground">
                            مقالات ذات صلة
                        </h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {relatedArticles.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="block space-y-2 rounded-2xl border border-border/80 bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50"
                                >
                                    <div className="font-mono text-[10px] text-muted-foreground">
                                        {rel.date}
                                    </div>
                                    <h4 className="line-clamp-2 text-sm font-bold text-foreground">
                                        {rel.title}
                                    </h4>
                                    <p className="line-clamp-2 text-xs text-muted-foreground">
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
