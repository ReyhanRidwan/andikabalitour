import React from 'react';
import { motion } from 'motion/react';
import { Star, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { optimizeCloudinaryUrl } from '../utils/imageOptimizer';

interface DestinationCard {
  id: string;
  title: string;
  tagline: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  cols: string;
  rows: string;
  heightClass: string;
}

interface DestinationGridProps {
  onBookNow: (experienceId: string) => void;
  onViewDetails?: (experienceId: string) => void;
}

export default function DestinationGrid({ onBookNow, onViewDetails }: DestinationGridProps) {
  const { language, t } = useLanguage();

  const getDestinations = (): DestinationCard[] => {
    if (language === 'ar') {
      return [
        {
          id: 'water-sport',
          title: 'باقة الألعاب المائية الشاملة',
          tagline: 'مغامرة الرياضات المائية',
          rating: 4.9,
          reviews: 340,
          description: 'تشمل قارب الموز، قارب الدونات، جيت سكي، والباراسيلينغ في تانجونغ بينوا مع التأمين والغداء والمرشد وفريق الإنقاذ.',
          image: '/water_sport_banner_1786161929728.jpg',
          cols: 'lg:col-span-2',
          rows: 'lg:row-span-2',
          heightClass: 'h-[420px] lg:h-[520px]',
        },
        {
          id: 'nusa-penida-west',
          title: 'رحلة غرب نوسا بينيدا',
          tagline: 'استكشاف غرب الجزيرة',
          rating: 4.9,
          reviews: 320,
          description: 'استكشاف كيلينغكينغ، بروكن بيتش، أنجلز بيلا بونغ، تلال بالوانغ، وكريستال باي. 850 ألف روبية للشخص (شخصين كحد أدنى). سيارة خاصة، زورق سريع، غداء، ومرشد.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[240px]',
        },
        {
          id: 'atv-king',
          title: 'ATV – كينغ ATV',
          tagline: 'كينغ ATV إكستريم',
          rating: 4.9,
          reviews: 220,
          description: 'أداء كينغ ATV الفائق على المسارات الوعرة والتلال المنحدرة (850,000 روبية / للشخص). يشمل التأمين والغداء والمرشد.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786183838/ed568b2f-ebc4-495a-962d-692c5239b1cb.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[264px] lg:h-[256px]',
        },
        {
          id: 'horse-riding',
          title: 'ركوب الخيل – ليمبونغان ½',
          tagline: 'فروسية الشواطئ الساحلية',
          rating: 4.8,
          reviews: 190,
          description: 'ركوب الخيل على شواطئ ليمبونغان ½ الرملية الخلابة مع نسيم البحر الاستوائي المنعش.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786162688/77000547-25b5-4ca1-a3a4-45330dbe54cc.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[256px]',
        },
        {
          id: 'rafting-bmw',
          title: 'تجديف قوارب النهر – BMW',
          tagline: 'تجديف BMW المثير',
          rating: 4.9,
          reviews: 290,
          description: 'تجديف نهري ممتع عبر جدران الأخاديد والشلالات الطبيعية في بالي. يشمل التأمين، الغداء، المرشد، وفريق الإنقاذ.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786184051/968d1498-d1d6-4267-9b60-b1fb937a44e2.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[256px]',
        },
        {
          id: 'nusa-penida-broken',
          title: 'بروكن بيتش - نوسا بينيدا',
          tagline: 'استكشاف باسيه أوغ',
          rating: 4.9,
          reviews: 315,
          description: 'جرف دائري طبيعي مذهل ومياه فيروزية صافية في غرب نوسا بينيدا. تشمل الزورق السريع، سيارة خاصة، غداء، ومرشد.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[256px]',
        }
      ];
    }
    if (language === 'id') {
      return [
        {
          id: 'water-sport',
          title: 'WATER SPORT PACKAGE',
          tagline: 'WATER SPORTS ADVENTURE',
          rating: 4.9,
          reviews: 340,
          description: 'Termasuk Banana Boat, Donut Boat, Jet Ski, dan Parasailing di Tanjung Benoa. Include Insurance, Lunch, Guide, dan Rescue Team.',
          image: '/water_sport_banner_1786161929728.jpg',
          cols: 'lg:col-span-2',
          rows: 'lg:row-span-2',
          heightClass: 'h-[420px] lg:h-[520px]',
        },
        {
          id: 'nusa-penida-west',
          title: 'NUSA PENIDA WEST TRIP',
          tagline: 'ISLAND WEST EXPLORATION',
          rating: 4.9,
          reviews: 320,
          description: 'Eksplorasi Kelingking, Broken Beach, Angel Billabong, Paluang Hills & Crystal Bay. IDR 850K / pax (Min. 2 Person). Include Private Car, Fastboat PP, Lunch & Guide.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[240px]',
        },
        {
          id: 'atv-king',
          title: 'ATV – KING ATV',
          tagline: 'KING ATV EXPERIENCE',
          rating: 4.9,
          reviews: 220,
          description: 'Performa King ATV di lintasan terjal dan menantang (Rp850.000 / pax). Includes Insurance, Lunch & Guide.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786183838/ed568b2f-ebc4-495a-962d-692c5239b1cb.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[264px] lg:h-[256px]',
        },
        {
          id: 'horse-riding',
          title: 'HORSE RIDING – LEMBONGAN ½',
          tagline: 'LEMBONGAN HORSE RIDING',
          rating: 4.8,
          reviews: 190,
          description: 'Menunggang kuda menyusuri pantai eksotis Lembongan ½ dengan suasana tropis menenangkan.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786162688/77000547-25b5-4ca1-a3a4-45330dbe54cc.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[256px]',
        },
        {
          id: 'rafting-bmw',
          title: 'RAFTING – BMW',
          tagline: 'BMW RAFTING THRILL',
          rating: 4.9,
          reviews: 290,
          description: 'Arung jeram mendebarkan menyusuri tebing sungai purba Bali. Includes Insurance, Lunch, Guide, & Rescue Team.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786184051/968d1498-d1d6-4267-9b60-b1fb937a44e2.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[256px]',
        },
        {
          id: 'nusa-penida-broken',
          title: 'BROKEN BEACH - NUSA PENIDA',
          tagline: 'PASIH UUG EXPLORATION',
          rating: 4.9,
          reviews: 315,
          description: 'Tebing melingkar alami spektakuler dengan laut biru jernih di Nusa Penida Barat. Include Fastboat PP, Mobil Privat AC, Lunch & Guide.',
          image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
          cols: 'lg:col-span-1',
          rows: 'lg:row-span-1',
          heightClass: 'h-[256px]',
        }
      ];
    }
    return [
      {
        id: 'water-sport',
        title: 'WATER SPORT PACKAGE',
        tagline: 'WATER SPORTS ADVENTURE',
        rating: 4.9,
        reviews: 340,
        description: 'Includes Banana Boat, Donut Boat, Jet Ski, and Parasailing at Tanjung Benoa. Includes Insurance, Lunch, Guide, and Rescue Team.',
        image: '/water_sport_banner_1786161929728.jpg',
        cols: 'lg:col-span-2',
        rows: 'lg:row-span-2',
        heightClass: 'h-[420px] lg:h-[520px]',
      },
      {
        id: 'nusa-penida-west',
        title: 'NUSA PENIDA WEST TRIP',
        tagline: 'ISLAND WEST EXPLORATION',
        rating: 4.9,
        reviews: 320,
        description: 'Explore Kelingking, Broken Beach, Angel Billabong, Paluang Hills & Crystal Bay. IDR 850K / pax (Min. 2 Persons). Includes Private AC Car, Return Fastboat, Lunch & Guide.',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
        cols: 'lg:col-span-1',
        rows: 'lg:row-span-1',
        heightClass: 'h-[240px]',
      },
      {
        id: 'atv-king',
        title: 'ATV – KING ATV',
        tagline: 'KING ATV EXPERIENCE',
        rating: 4.9,
        reviews: 220,
        description: 'Extreme King ATV performance on challenging tracks (Rp850,000 / pax). Includes Insurance, Lunch & Guide.',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786183838/ed568b2f-ebc4-495a-962d-692c5239b1cb.png',
        cols: 'lg:col-span-1',
        rows: 'lg:row-span-1',
        heightClass: 'h-[264px] lg:h-[256px]',
      },
      {
        id: 'horse-riding',
        title: 'HORSE RIDING – LEMBONGAN ½',
        tagline: 'LEMBONGAN HORSE RIDING',
        rating: 4.8,
        reviews: 190,
        description: 'Horse riding along the tranquil coastal beaches of Lembongan ½ with soothing tropical ocean breeze.',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786162688/77000547-25b5-4ca1-a3a4-45330dbe54cc.png',
        cols: 'lg:col-span-1',
        rows: 'lg:row-span-1',
        heightClass: 'h-[256px]',
      },
      {
        id: 'rafting-bmw',
        title: 'RAFTING – BMW',
        tagline: 'BMW RAFTING THRILL',
        rating: 4.9,
        reviews: 290,
        description: 'Thrilling whitewater rafting through ancient Bali river canyons. Includes Insurance, Lunch, Guide, & Rescue Team.',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786184051/968d1498-d1d6-4267-9b60-b1fb937a44e2.png',
        cols: 'lg:col-span-1',
        rows: 'lg:row-span-1',
        heightClass: 'h-[256px]',
      },
      {
        id: 'nusa-penida-broken',
        title: 'BROKEN BEACH - NUSA PENIDA',
        tagline: 'PASIH UUG EXPLORATION',
        rating: 4.9,
        reviews: 315,
        description: 'Spectacular natural circular cliff and turquoise bay in West Nusa Penida. Includes Return Fastboat, Private AC Car, Lunch & Guide.',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/f_auto,q_auto,w_800/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
        cols: 'lg:col-span-1',
        rows: 'lg:row-span-1',
        heightClass: 'h-[256px]',
      }
    ];
  };

  const destinations = getDestinations();

  return (
    <section id="exclusive-destinations" className="py-20 px-4 md:px-8 bg-neutral-900 border-t border-b border-gold-500/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-gold-400" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400 font-bold">
                {t.destinations.badge}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl text-gold-100 font-medium tracking-wide">
              {t.destinations.title}
            </h2>
          </div>
          <p className="max-w-md text-gold-200/60 text-sm font-sans leading-relaxed">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="bento-grid-destinations">
          {destinations.map((dest, idx) => (
            <motion.div
              key={`${dest.id}-${idx}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              className={`${dest.cols} ${dest.rows} ${dest.heightClass} relative rounded-xl overflow-hidden group shadow-xl shadow-black/40 cursor-pointer border border-gold-500/10`}
              onClick={() => onBookNow(dest.id)}
            >
              {/* Background Image */}
              <img
                src={optimizeCloudinaryUrl(dest.image)}
                alt={dest.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />

              {/* Dark Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 transition-opacity duration-300 group-hover:via-black/50" />
              <div className="absolute inset-0 bg-gold-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top Section: Pill Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center bg-black/60 backdrop-blur-md text-[9px] font-mono uppercase tracking-[0.18em] text-gold-300 font-bold px-3 py-1.5 rounded-sm border border-gold-500/20">
                  {dest.tagline}
                </span>
              </div>

              {/* Bottom Section: Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end h-3/4 z-10">
                
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                  <span className="font-mono text-[11px] text-gold-300 font-bold">
                    {dest.rating.toFixed(1)}
                  </span>
                  <span className="text-gold-200/50 text-[10px]">
                    ({dest.reviews} {t.common.reviews})
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl md:text-2xl text-gold-100 font-medium tracking-wide mb-2 group-hover:text-gold-300 transition-colors duration-300">
                  {dest.title}
                </h3>

                {/* Description */}
                <p className="text-gold-200/70 text-xs md:text-sm font-sans line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed group-hover:text-gold-100/90 transition-colors duration-300">
                  {dest.description}
                </p>

                {/* Action CTA */}
                <div className="flex items-center justify-between gap-3 mt-1 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewDetails) onViewDetails(dest.id);
                      else onBookNow(dest.id);
                    }}
                    className="border border-gold-400/40 hover:border-gold-400 text-gold-300 hover:text-gold-100 bg-neutral-950/70 text-[10px] font-mono uppercase tracking-widest px-3 py-2 rounded-sm transition-all"
                  >
                    {t.common.viewDetails}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookNow(dest.id);
                    }}
                    className="bg-gold-400 hover:bg-gold-500 text-neutral-950 text-[10px] font-mono uppercase tracking-widest font-extrabold px-3 py-2 rounded-sm transition-all flex items-center gap-1 shadow-md"
                  >
                    <span>{t.common.bookNow}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Gold border accent */}
              <div className="absolute inset-0 border border-gold-400/0 group-hover:border-gold-400/30 rounded-xl transition-colors duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

