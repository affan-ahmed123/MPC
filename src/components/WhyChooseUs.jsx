import React from 'react';
import { ShieldCheck, Flame, Award, UtensilsCrossed, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Halal & Farm Fresh",
      desc: "Daily fresh chicken and beef procured and prepared under strict Islamic halal guidelines with zero compromises on quality."
    },
    {
      icon: Flame,
      title: "Traditional Dum Cooking Method",
      desc: "Authentic slow-steamed dum process locking rich aroma, spice layers, and succulent tenderness in every single rice grain."
    },
    {
      icon: Award,
      title: "Pure Aged Basmati Rice",
      desc: "Long grain, naturally aged aromatic basmati cooked with saffron strands, fragrant ghee, and heirloom spice blends."
    },
    {
      icon: UtensilsCrossed,
      title: "Master Culinary Chefs",
      desc: "Heirloom recipes perfected over decades by expert chefs delivering consistent, mouth-watering flavor every time."
    }
  ];

  return (
    <section className="py-10 sm:py-16 bg-black/30 backdrop-blur-sm border-y border-amber-500/20 relative w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 w-full max-w-full">

        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Why Food Lovers Choose Madina Biryani</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
            Uncompromising Quality & <span className="gold-text-gradient">Timeless Heritage</span>
          </h2>
          <p className="text-xs sm:text-base text-gray-300 mt-1 sm:mt-2">
            Delicious Taste with Quality, Always with You
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 w-full max-w-full">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#121622]/85 backdrop-blur-md border border-gray-800/90 hover:border-[#e6b343]/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1 group shadow-xl flex flex-col justify-between min-w-0 w-full overflow-hidden"
              >
                <div>
                  <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg sm:rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#e6b343] flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-4 h-4 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-[11px] sm:text-base font-bold text-white mb-1 sm:mb-2 leading-tight truncate">{item.title}</h3>
                  <p className="text-[9px] sm:text-xs text-gray-300 leading-relaxed line-clamp-3 sm:line-clamp-none">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
