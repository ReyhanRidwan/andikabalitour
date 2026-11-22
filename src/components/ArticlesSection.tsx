import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Calendar, ArrowRight, User, X, BookOpen, MessageCircle, Sparkles, CheckCircle2, ChevronRight, Car, Tag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getArticles } from '../data/articlesData';
import { Article } from '../types';

interface ArticlesSectionProps {
  onBookNow?: (experienceId: string) => void;
  onBookRental?: () => void;
}

export default function ArticlesSection({ onBookNow, onBookRental }: ArticlesSectionProps) {
  const { language } = useLanguage();
  const articles = getArticles(language);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const isId = language === 'id';
  const isEn = language === 'en';
  const isAr = language === 'ar';

  const sectionBadge = isId
    ? 'Wawasan & Panduan Perjalanan'
    : isEn
    ? 'Travel Insights & Guides'
    : 'أحدث مقالات ودليل السفر';

  const sectionTitle = isId
    ? 'Artikel & Tips Tour Bali'
    : isEn
    ? 'Bali Tour & Travel Articles'
    : 'مقالات وأدلة السياحة في بالي';

  const sectionDesc = isId
    ? 'Inspirasi dan panduan praktis dari tim profesional Andika Bali Tour untuk menyempurnakan liburan berharga Anda di Pulau Dewata.'
    : isEn
    ? 'Curated inspiration, local advice, and essential tips from the Andika Bali Tour team to elevate your Bali island journey.'
    : 'نصائح حصرية ودليل إرشادي موثوق من فريق أنديكا بالي تور لقضاء عطلة استثنائية لا تُنسى في بالي.';

  const readMoreText = isId ? 'Baca Selengkapnya' : isEn ? 'Read Article' : 'اقرأ المقال';
  const closeText = isId ? 'Tutup' : isEn ? 'Close' : 'إغلاق';
  const relatedCtaText = isId ? 'Pesan Tur Terkait' : isEn ? 'Book Related Tour' : 'احجز هذه الجولة';
  const rentalCtaText = isId ? 'Lihat Armada Sewa Mobil' : isEn ? 'View Car Rental Fleet' : 'عرض أسطول السيارات';
  const consultWaText = isId ? 'Tanya di WhatsApp' : isEn ? 'Inquire on WhatsApp' : 'استفسر عبر واتساب';

  // Deep-link support for ?article=<slug> organic URLs
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('article');
    if (slug) {
      const matched = articles.find((a) => a.slug === slug);
      if (matched) {
        setSelectedArticle(matched);
      }
    }
  }, [language]);

  const handleOpenArticle = (article: Article) => {
    setSelectedArticle(article);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('article', article.slug);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('article');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://andikabalitour.com';

  // Schema.org Blog & ItemList JSON-LD for organic search visibility
  const blogSchema = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: sectionTitle,
      description: sectionDesc,
      url: `${origin}/#articles`,
      publisher: {
        '@type': 'TravelAgency',
        name: 'Andika Bali Tour',
        url: origin,
      },
      blogPost: articles.map((art) => ({
        '@type': 'BlogPosting',
        headline: art.title,
        description: art.metaDescription || art.summary,
        image: art.coverImage.startsWith('http') ? art.coverImage : `${origin}${art.coverImage}`,
        datePublished: art.isoDate || '2026-09-01',
        author: {
          '@type': 'Organization',
          name: art.author,
        },
        url: `${origin}/?article=${art.slug}`,
        keywords: art.seoKeywords?.join(', ') || art.tag,
      })),
    }),
    [articles, origin, sectionTitle, sectionDesc]
  );

  // Dynamic BlogPosting JSON-LD when an individual article is open
  const activeArticleSchema = useMemo(() => {
    if (!selectedArticle) return null;
    const imgUrl = selectedArticle.coverImage.startsWith('http')
      ? selectedArticle.coverImage
      : `${origin}${selectedArticle.coverImage}`;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: selectedArticle.title,
      description: selectedArticle.metaDescription || selectedArticle.summary,
      image: imgUrl,
      datePublished: selectedArticle.isoDate || '2026-11-18',
      author: {
        '@type': 'Organization',
        name: selectedArticle.author,
      },
      publisher: {
        '@type': 'TravelAgency',
        name: 'Andika Bali Tour',
        url: origin,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${origin}/?article=${selectedArticle.slug}`,
      },
      keywords: selectedArticle.seoKeywords?.join(', ') || selectedArticle.tag,
    };
  }, [selectedArticle, origin]);

  return (
    <section
      id="articles"
      dir={isAr ? 'rtl' : 'ltr'}
      className="py-20 md:py-28 bg-neutral-950/80 border-t border-gold-400/15 relative overflow-hidden"
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
        {selectedArticle && (
          <title>{`${selectedArticle.title} | Andika Bali Tour`}</title>
        )}
        {selectedArticle && (
          <meta
            name="description"
            content={selectedArticle.metaDescription || selectedArticle.summary}
          />
        )}
        {selectedArticle && selectedArticle.seoKeywords && (
          <meta name="keywords" content={selectedArticle.seoKeywords.join(', ')} />
        )}
        {selectedArticle && (
          <meta property="og:type" content="article" />
        )}
        {selectedArticle && (
          <meta property="og:title" content={selectedArticle.title} />
        )}
        {selectedArticle && (
          <meta
            property="og:description"
            content={selectedArticle.metaDescription || selectedArticle.summary}
          />
        )}
        {selectedArticle && (
          <meta
            property="og:image"
            content={
              selectedArticle.coverImage.startsWith('http')
                ? selectedArticle.coverImage
                : `${origin}${selectedArticle.coverImage}`
            }
          />
        )}
        {activeArticleSchema && (
          <script type="application/ld+json">{JSON.stringify(activeArticleSchema)}</script>
        )}
      </Helmet>
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-400/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-400/30 text-gold-300 text-xs tracking-widest uppercase font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>{sectionBadge}</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-100 font-medium tracking-wide mb-5">
            {sectionTitle}
          </h2>

          <p className="font-sans text-sm md:text-base text-gold-200/70 leading-relaxed font-light">
            {sectionDesc}
          </p>
        </div>

        {/* 6 Articles Grid (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <article
              key={article.id}
              id={`article-card-${index + 1}`}
              className="group bg-neutral-900/60 rounded-xl border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-2xl hover:shadow-gold-950/30"
            >
              {/* Card Image Header */}
              <div className="relative h-56 overflow-hidden bg-neutral-950">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                {/* Tag Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md rounded-full text-gold-300 text-[11px] font-mono tracking-wider border border-gold-400/30 shadow-md">
                    {article.tag}
                  </span>
                </div>

                {/* Reading metadata */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-gold-200/80 font-mono">
                  <span className="flex items-center gap-1.5 bg-neutral-950/60 px-2 py-0.5 rounded">
                    <Calendar className="w-3 h-3 text-gold-400" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5 bg-neutral-950/60 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-gold-400" />
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-gold-100 group-hover:text-gold-300 font-medium mb-3 line-clamp-2 leading-snug transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gold-200/70 text-xs md:text-sm font-sans line-clamp-3 leading-relaxed mb-6 font-light">
                    {article.summary}
                  </p>
                </div>

                {/* Author & Read More button */}
                <div className="pt-4 border-t border-gold-400/15 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs text-gold-200/60 font-sans">
                    <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-300">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="truncate max-w-[120px]">{article.author}</span>
                  </div>

                  <button
                    onClick={() => handleOpenArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-gold-400 hover:text-gold-200 transition-colors group/btn"
                  >
                    <span>{readMoreText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/85 backdrop-blur-md overflow-y-auto animate-fade-in"
          onClick={handleCloseArticle}
        >
          <div
            dir={isAr ? 'rtl' : 'ltr'}
            className={`relative w-full max-w-3xl my-8 bg-neutral-900 border border-gold-400/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
              isAr ? 'text-right' : 'text-left'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with Close Button */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-neutral-900/95 backdrop-blur border-b border-gold-400/20">
              <div className="flex items-center gap-2 text-xs text-gold-400 font-mono">
                <BookOpen className="w-4 h-4" />
                <span>{selectedArticle.tag}</span>
              </div>

              <button
                onClick={handleCloseArticle}
                className="p-1.5 rounded-lg text-gold-200/70 hover:text-gold-100 hover:bg-neutral-800 transition-colors"
                aria-label={closeText}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-6">
              {/* Cover Image banner */}
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3 text-xs text-gold-200/90 font-mono">
                  <span className="flex items-center gap-1 bg-neutral-950/80 px-2.5 py-1 rounded">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    {selectedArticle.date}
                  </span>
                  <span className="flex items-center gap-1 bg-neutral-950/80 px-2.5 py-1 rounded">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    {selectedArticle.readTime}
                  </span>
                  <span className="flex items-center gap-1 bg-neutral-950/80 px-2.5 py-1 rounded">
                    <User className="w-3.5 h-3.5 text-gold-400" />
                    {selectedArticle.author}
                  </span>
                </div>
              </div>

              {/* Title & Summary */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-gold-100 font-semibold tracking-wide mb-3 leading-snug">
                  {selectedArticle.title}
                </h2>
                <p className="text-gold-200/80 text-sm md:text-base leading-relaxed italic border-l-2 border-gold-400/60 pl-4 py-1">
                  "{selectedArticle.summary}"
                </p>
              </div>

              {/* Key Takeaways Highlight Box */}
              {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-xl bg-gold-950/30 border border-gold-400/30">
                  <h4 className="font-serif text-sm md:text-base text-gold-200 font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span>{isId ? 'Poin Utama & Tips Cepat' : isEn ? 'Key Takeaways & Quick Tips' : 'أهم النقاط والنصائح السريعة'}</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-gold-100/80 font-light">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Article Body Sections */}
              <div className="space-y-6 pt-2">
                {selectedArticle.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <h3 className="font-serif text-lg md:text-xl text-gold-200 font-medium tracking-wide">
                      {section.heading}
                    </h3>
                    <div className="font-sans text-xs md:text-sm text-gold-100/75 leading-relaxed font-light whitespace-pre-line">
                      {section.body}
                    </div>
                  </div>
                ))}
              </div>

              {/* Organic SEO Topic Tags */}
              {selectedArticle.seoKeywords && selectedArticle.seoKeywords.length > 0 && (
                <div className="pt-4 border-t border-gold-400/10 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-gold-400/80 uppercase tracking-wider mr-1">
                    <Tag className="w-3 h-3" />
                    {isId ? 'Topik Terkait:' : isEn ? 'Related Topics:' : 'مواضيع ذات صلة:'}
                  </span>
                  {selectedArticle.seoKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="text-[11px] font-sans text-gold-200/70 bg-neutral-950/70 border border-gold-400/20 px-2.5 py-0.5 rounded"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Interactive Booking / Inquire CTA Box */}
              <div className="mt-6 pt-6 border-t border-gold-400/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-950/60 p-5 rounded-xl border">
                <div>
                  <h4 className="font-serif text-base text-gold-100 font-semibold mb-1">
                    {isId ? 'Siap Merencanakan Liburan Anda?' : isEn ? 'Ready to Plan Your Bali Trip?' : 'جاهز للتخطيط لرحلتك في بالي؟'}
                  </h4>
                  <p className="text-xs text-gold-200/60 font-sans">
                    {isId ? 'Konsultasikan paket private tour atau pesan langsung bersama kami.' : isEn ? 'Consult custom itineraries or book your private tour directly.' : 'استشر فريقنا حول خطة رحلتك الخاصة أو احجز مباشرة.'}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedArticle.relatedActionType === 'rental' && onBookRental ? (
                    <button
                      onClick={() => {
                        handleCloseArticle();
                        onBookRental();
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-neutral-950 text-xs font-semibold tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Car className="w-3.5 h-3.5" />
                      <span>{rentalCtaText}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    selectedArticle.relatedTourId && onBookNow && (
                      <button
                        onClick={() => {
                          handleCloseArticle();
                          onBookNow(selectedArticle.relatedTourId || 'water-sport');
                        }}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-neutral-950 text-xs font-semibold tracking-wider transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>{relatedCtaText}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  )}

                  <a
                    href={`https://wa.me/6281225657382?text=${encodeURIComponent(
                      `Halo Andika Bali Tour, saya baru membaca artikel "${selectedArticle.title}" dan ingin konsultasi / reservasi.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-gold-400/40 hover:bg-gold-500/10 text-gold-300 text-xs font-semibold tracking-wider transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                    <span>{consultWaText}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
