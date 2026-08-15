import React from 'react';
import { ShieldCheck, Compass, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  const stats = [
    { label: t.about.stat1Label, value: t.about.stat1Val },
    { label: t.about.stat2Label, value: t.about.stat2Val },
    { label: t.about.stat3Label, value: t.about.stat3Val },
    { label: t.about.stat4Label, value: t.about.stat4Val },
  ];

  return (
    <div className="pt-28 pb-24 bg-neutral-950 text-gold-100 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="max-w-3xl space-y-4 mb-20 text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400 font-bold bg-gold-500/5 px-4 py-2 border border-gold-400/10 rounded-full inline-block">
            {t.about.badge}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-gold-100 font-medium tracking-tight leading-tight">
            {t.about.title}
          </h1>
          <p className="font-sans text-sm md:text-base text-gold-200/60 leading-relaxed font-light">
            {t.about.subtitle}
          </p>
        </div>

        {/* Brand Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24" id="about-brand-grid">
          {/* Left Column Text details */}
          <div className="space-y-8 text-left">
            <h2 className="font-serif text-2xl md:text-3xl text-gold-200 font-medium tracking-wide">
              {t.about.missionTitle}
            </h2>
            
            <p className="text-gold-200/70 text-sm leading-relaxed">
              {t.about.missionDesc}
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold-400/10 border border-gold-400/20 text-gold-400 rounded-sm mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gold-100 font-medium">{t.about.pillar1Title}</h3>
                  <p className="text-gold-200/50 text-xs leading-relaxed mt-1">
                    {t.about.pillar1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold-400/10 border border-gold-400/20 text-gold-400 rounded-sm mt-1">
                  <Compass size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gold-100 font-medium">{t.about.pillar2Title}</h3>
                  <p className="text-gold-200/50 text-xs leading-relaxed mt-1">
                    {t.about.pillar2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gold-400/10 border border-gold-400/20 text-gold-400 rounded-sm mt-1">
                  <Heart size={20} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gold-100 font-medium">{t.about.pillar3Title}</h3>
                  <p className="text-gold-200/50 text-xs leading-relaxed mt-1">
                    {t.about.pillar3Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase */}
          <div className="relative rounded-lg overflow-hidden border border-gold-500/10 h-[480px] group shadow-2xl" id="about-visual-panel">
            <img
              src="/bali_jungle_bg_1783528784335.jpg"
              alt="Bali Tour Travel Team"
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-left space-y-2">
              <span className="font-mono text-[10px] text-gold-400 font-bold uppercase tracking-widest">{t.about.visualBadge}</span>
              <h3 className="font-serif text-2xl text-gold-100 font-medium">{t.about.visualTitle}</h3>
              <p className="text-gold-200/70 text-xs leading-relaxed">
                {t.about.visualDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-neutral-900/40 border border-gold-400/10 p-8 rounded-lg text-center" id="about-stats-strip">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="font-mono text-2xl md:text-4xl text-gold-400 font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="font-mono text-[9px] md:text-[11px] text-gold-200/40 tracking-wider uppercase font-semibold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

