import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/mockData';
import { X, Clock, ArrowUpRight } from 'lucide-react';

export default function Journal() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-6">
        <span className="label-gold">Journal</span>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]">
          Insights written<br />
          <em className="italic text-[#c8a97e]">between deadlines</em>
        </h1>

        <p className="text-base text-neutral-500 leading-relaxed max-w-lg">
          Thoughts on design, strategy, and technology from the studio floor.
        </p>
      </div>

      {/* Articles */}
      <div className="space-y-0">
        {JOURNAL_ARTICLES.length === 0 ? (
          <div className="py-24 text-center border-t border-b border-white/5 space-y-4">
            <p className="text-neutral-500 font-light text-lg">No journal articles published yet.</p>
            <p className="text-neutral-600 text-sm">Check back soon for new insights and updates from the studio floor.</p>
          </div>
        ) : (
          JOURNAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="py-10 border-b border-white/5 first:border-t first:border-white/5 cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#c8a97e]">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-neutral-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-normal text-white group-hover:text-[#c8a97e] transition-colors duration-500 leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-xl">
                    {article.summary}
                  </p>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-[#c8a97e] transition-colors duration-500 flex-shrink-0" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Article Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] overflow-y-auto">
          <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
            
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <span className="text-[11px] tracking-[0.12em] uppercase font-medium text-[#c8a97e]">
                  {selectedArticle.category}
                </span>
                <span className="text-[11px] text-neutral-600">
                  {selectedArticle.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h1 className="font-display text-3xl md:text-5xl font-light text-white leading-tight tracking-tight mb-10">
              {selectedArticle.title}
            </h1>

            <div className="space-y-6 text-neutral-400 text-[15px] leading-[1.8]">
              {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-12 mt-12 border-t border-white/5">
              <button
                onClick={() => setSelectedArticle(null)}
                className="btn-secondary text-[11px] py-3.5 px-7"
              >
                Close article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
