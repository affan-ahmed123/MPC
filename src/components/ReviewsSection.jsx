import React from 'react';
import { TESTIMONIALS } from '../data/menuData';
import { Star, Quote, Sparkles } from 'lucide-react';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-10 sm:py-20 bg-black/20 backdrop-blur-sm relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full max-w-full">

        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Testimonials & Love</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            What Our Food Lovers <span className="gold-text-gradient">Are Saying</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1 sm:mt-2">
            Our true pride is your continuous satisfaction and memorable flavors
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6 w-full max-w-full">
          {TESTIMONIALS.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#141926]/85 backdrop-blur-md border border-gray-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-6 relative flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl min-w-0 w-full overflow-hidden"
            >
              <Quote className="w-5 h-5 sm:w-8 sm:h-8 text-amber-500/20 absolute top-2 right-2 sm:top-4 sm:right-4 pointer-events-none" />

              <div>
                <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-2.5 h-2.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-[9px] sm:text-sm text-gray-200 leading-relaxed italic mb-2 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-1.5 sm:pt-4 border-t border-gray-800 flex items-center justify-between gap-1 min-w-0">
                <div className="min-w-0 pr-1 flex-1">
                  <h4 className="text-[10px] sm:text-sm font-bold text-white leading-tight truncate">{review.name}</h4>
                  <p className="text-[9px] sm:text-xs text-amber-400 font-medium truncate">{review.role}</p>
                </div>
                <span className="text-[8px] sm:text-[11px] text-gray-400 flex-shrink-0">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
