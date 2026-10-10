import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SEO } from '../lib/seo';
import { articlesData } from '../content/articles';
import { Article } from '../types';
import { ArrowRight, Clock, User, Calendar, X, Share2, Check } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSlug = searchParams.get('slug');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(() => {
    if (initialSlug) {
      return articlesData.find(a => a.slug === initialSlug) || null;
    }
    return null;
  });
  const [copied, setCopied] = useState(false);

  const handleShare = (article: Article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://ckdpharma.com/news?slug=${article.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Clinical News & Corporate Releases | CKD Pharma"
        description="Stay informed with CKD Pharma official news, DRAP recertifications, clinical mineral nutrition findings, and nationwide supply chain updates."
        canonicalPath="/news"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'News & Media', url: '/news' }
        ]}
      />

      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              06 — COMMUNICATIONS & REGULATORY MEDIA
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
              Clinical bulletins, regulatory updates, and <span className="italic font-serif">corporate releases</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed">
              Official disclosures from our Quality Assurance Directorate, research divisions, and nationwide pharmaceutical operations.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Listing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-2xl border border-[#0E2A2B]/8 overflow-hidden hover:border-[#0E2A2B]/20 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-16/9 overflow-hidden bg-[#FAF8F4]">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-[#5B6B6C]">
                      <span className="font-semibold text-[#0F5E5A]">{article.category}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h2 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B] group-hover:text-[#0F5E5A] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-[#5B6B6C] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-[10px] text-[#5B6B6C] bg-[#FAF8F4] px-2 py-0.5 rounded border border-[#0E2A2B]/5">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#0E2A2B]/5 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-[#5B6B6C]">{article.date}</span>
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="text-xs font-semibold text-[#0F5E5A] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2A2B]/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F4] rounded-2xl border border-[#0E2A2B]/10 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Modal Header Bar */}
            <div className="sticky top-0 bg-[#FAF8F4]/95 backdrop-blur-xs border-b border-[#0E2A2B]/8 p-4 px-6 flex items-center justify-between z-10">
              <span className="text-xs font-bold text-[#0F5E5A] uppercase tracking-wider">
                {selectedArticle.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="p-2 text-[#5B6B6C] hover:text-[#0E2A2B] rounded-lg hover:bg-[#0E2A2B]/5 flex items-center gap-1 text-xs"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-[#0F5E5A]" /> : <Share2 className="w-4 h-4" />}
                  <span>{copied ? 'Link Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-[#5B6B6C] hover:text-[#0E2A2B] rounded-lg hover:bg-[#0E2A2B]/5"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#5B6B6C]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{selectedArticle.date}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{selectedArticle.author}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{selectedArticle.readTime}</span>
                  </span>
                </div>

                <h1 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-[#0E2A2B] leading-tight">
                  {selectedArticle.title}
                </h1>
              </div>

              <div className="rounded-xl overflow-hidden aspect-16/9 border border-[#0E2A2B]/10">
                <img
                  src={selectedArticle.coverImage}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#0E2A2B]/8 text-xs sm:text-sm font-medium text-[#0E2A2B] leading-relaxed italic">
                {selectedArticle.excerpt}
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#0E2A2B] leading-relaxed">
                {selectedArticle.paragraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#0E2A2B]/8 flex items-center justify-between text-xs text-[#5B6B6C]">
                <div>Published by CKD Pharmaceuticals Corporate Communications</div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="font-semibold text-[#0F5E5A] hover:underline"
                >
                  Close article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
