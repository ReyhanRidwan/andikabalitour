import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Star,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Calendar,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { Experience } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface PackageDetailPageProps {
  experience: Experience;
  onBack: () => void;
  onBookNow: (experienceId: string) => void;
}

export default function PackageDetailPage({
  experience,
  onBack,
  onBookNow
}: PackageDetailPageProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-neutral-950 text-gold-100 font-sans pt-16 md:pt-20 pb-24">
      {/* Top sticky navigation bar */}
      <div className="bg-neutral-950/95 backdrop-blur-md border-b border-gold-400/15 sticky top-14 md:top-16 z-40 py-2.5 md:py-3.5 px-4 sm:px-6 md:px-12 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gold-300 hover:text-gold-100 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t.common.back}</span>
        </button>
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-gold-200/60 hidden sm:inline">
            Rp {experience.pricePerPerson.toLocaleString('id-ID')} {t.common.perPerson}
          </span>
          <button
            onClick={() => onBookNow(experience.id)}
            className="bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-widest font-extrabold px-4 md:px-5 py-2 rounded-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
          >
            <span>{t.common.bookNow}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 mt-4 md:mt-6">
        {/* Banner Hero Section */}
        <div className="relative rounded-xl overflow-hidden border border-gold-400/20 shadow-2xl min-h-[460px] sm:min-h-[400px] md:h-[480px] md:min-h-0 flex flex-col justify-end">
          <img
            src={experience.bgImage}
            alt={experience.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Multi-stage dark gradient for 100% crystal clear readability on all screens */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 sm:via-neutral-950/55 to-black/30" />
          
          <div className="relative z-10 p-5 sm:p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-5 md:gap-6 text-left">
            <div className="space-y-2.5 sm:space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-gold-400 text-neutral-950 text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-xs">
                  {experience.tagline}
                </span>
                <span className="bg-neutral-950/80 border border-gold-400/30 text-gold-300 font-mono text-[10px] px-2.5 py-1 rounded-sm flex items-center gap-1 backdrop-blur-xs">
                  <Star size={11} className="fill-gold-400 text-gold-400" />
                  <span>{experience.rating} ({experience.reviewCount} {t.common.reviews})</span>
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl md:text-5xl font-medium text-gold-100 tracking-wide leading-tight drop-shadow-md">
                {experience.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-gold-200/90 pt-1">
                <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-xs border border-gold-400/20 px-2.5 py-1 rounded-sm">
                  <Clock size={13} className="text-gold-400 flex-shrink-0" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-xs border border-gold-400/20 px-2.5 py-1 rounded-sm">
                  <MapPin size={13} className="text-gold-400 flex-shrink-0" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-neutral-950/80 backdrop-blur-xs border border-gold-400/20 px-2.5 py-1 rounded-sm">
                  <Users size={13} className="text-gold-400 flex-shrink-0" />
                  <span>{experience.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950/90 border border-gold-400/30 p-4 sm:p-5 rounded-lg backdrop-blur-md text-left md:text-right min-w-[220px] md:min-w-[240px] shadow-xl">
              <p className="text-[10px] font-mono uppercase tracking-widest text-gold-300/70">{t.packageDetail.completePackagePrice}</p>
              {experience.pricingOptions ? (
                <div className="mt-1.5 space-y-1">
                  {experience.pricingOptions.map((opt, idx) => (
                    <div key={idx} className="flex justify-between md:justify-end items-center gap-2 font-mono text-xs sm:text-sm font-bold text-gold-300">
                      <span className="text-gold-200/60 text-[11px] sm:text-xs">{opt.name}:</span>
                      <span>Rp {opt.price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-mono text-xl sm:text-2xl md:text-3xl font-extrabold text-gold-300 mt-1">
                  Rp {experience.pricePerPerson.toLocaleString('id-ID')}
                </p>
              )}
              <p className="text-[10px] text-gold-100/50 font-light mt-1">
                {language === 'ar'
                  ? 'يشمل التأمين الكامل ووجبة الغداء'
                  : language === 'en'
                  ? 'Includes full insurance & lunch'
                  : 'Sudah termasuk asuransi & makan siang'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Gallery Section for Water Sport or Other Package Rides */}
        {experience.galleryImages && experience.galleryImages.length > 0 && (
          <div className="mt-16 text-left">
            <div className="flex items-center space-x-2 text-gold-400 font-mono text-xs uppercase tracking-[0.25em] font-semibold mb-2">
              <Sparkles size={14} />
              <span>
                {language === 'ar'
                  ? 'أبرز معالم الباقة والأنشطة'
                  : language === 'en'
                  ? 'Package Highlights & Spots'
                  : 'Wahana & Spot Utama Paket'}
              </span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-gold-100 font-medium mb-3">
              {t.packageDetail.photoGallery}
            </h2>
            <p className="text-xs md:text-sm text-gold-100/60 max-w-2xl mb-8 font-light leading-relaxed">
              {language === 'ar'
                ? 'جميع الوجهات والأنشطة أدناه مشمولة بالكامل في هذه الباقة الخاصة دون أي رسوم خفية.'
                : language === 'en'
                ? 'All featured destinations and activities below are fully inclusive in this private package.'
                : 'Semua spot dan wahana di bawah ini sudah termasuk secara lengkap dalam paket tanpa biaya tersembunyi.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {experience.galleryImages.map((item, index) => (
                <div
                  key={index}
                  className="bg-neutral-900/60 border border-gold-400/15 rounded-lg overflow-hidden group hover:border-gold-400/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div
                    className="relative h-52 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedPhoto(item.image)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                    <div className="absolute top-3 right-3 bg-neutral-950/80 p-1.5 rounded-sm text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={14} />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-gold-400 text-neutral-950 font-mono font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm">
                        #{index + 1}: {item.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-grow flex flex-col justify-between text-left">
                    <div>
                      <h3 className="font-serif text-lg text-gold-200 font-medium mb-1.5">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gold-100/60 font-sans leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-16 text-left">
          {/* Left Column - Overview & Highlights */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div className="bg-neutral-900/40 border border-gold-400/10 p-6 md:p-8 rounded-xl space-y-4">
              <h2 className="font-serif text-2xl text-gold-100 font-medium border-b border-gold-400/10 pb-4">
                {language === 'en' ? 'Package Overview' : 'Deskripsi Paket Aktivitas'}
              </h2>
              <p className="text-sm md:text-base text-gold-100/70 font-light leading-relaxed">
                {experience.longDesc}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-neutral-900/40 border border-gold-400/10 p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="font-serif text-2xl text-gold-100 font-medium flex items-center gap-2">
                <Sparkles className="text-gold-400" size={20} />
                <span>{t.packageDetail.keyHighlights}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 bg-neutral-950/60 border border-gold-900/20 p-4 rounded-lg"
                  >
                    <div className="bg-gold-400/10 border border-gold-400/30 p-1.5 rounded text-gold-400 mt-0.5 flex-shrink-0">
                      <Check size={14} />
                    </div>
                    <span className="text-xs md:text-sm text-gold-100/80 leading-relaxed font-sans">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary Timeline */}
            <div className="bg-neutral-900/40 border border-gold-400/10 p-6 md:p-8 rounded-xl space-y-6">
              <h2 className="font-serif text-2xl text-gold-100 font-medium flex items-center gap-2">
                <Calendar className="text-gold-400" size={20} />
                <span>{t.packageDetail.dailyItinerary}</span>
              </h2>

              <div className="relative border-l border-gold-400/20 ml-3 space-y-8 pl-6 pt-2">
                {experience.itinerary.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-gold-400 border-2 border-neutral-950" />
                    <span className="font-mono text-xs text-gold-400 font-bold tracking-wider uppercase block mb-1">
                      {item.time}
                    </span>
                    <h3 className="font-serif text-lg text-gold-100 font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gold-100/60 font-sans leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Inclusions, Safety & Quick Booking */}
          <div className="space-y-8">
            {/* Quick Booking Box */}
            <div className="bg-neutral-900 border border-gold-400/20 p-6 rounded-xl space-y-6 sticky top-36 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                  {language === 'ar' ? 'نشاط خاص VIP' : language === 'en' ? 'Private Experience' : 'Aktivitas Privat'}
                </span>
                <h3 className="font-serif text-xl text-gold-100 font-medium">{experience.title}</h3>
                {experience.pricingOptions ? (
                  <div className="pt-2 space-y-1">
                    {experience.pricingOptions.map((opt, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm font-mono">
                        <span className="text-gold-200/60">{opt.name}:</span>
                        <span className="font-bold text-gold-300">Rp {opt.price.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-mono text-2xl font-bold text-gold-300 pt-2">
                    Rp {experience.pricePerPerson.toLocaleString('id-ID')}
                    <span className="text-xs font-normal text-gold-100/40"> {t.common.perPerson}</span>
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-4 border-t border-gold-400/10 text-xs font-mono text-gold-200/70">
                <div className="flex items-center justify-between">
                  <span className="text-gold-100/50">{t.common.location}:</span>
                  <span className="font-bold text-gold-200">{experience.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gold-100/50">{t.common.duration}:</span>
                  <span className="font-bold text-gold-200">{experience.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gold-100/50">{t.common.difficulty}:</span>
                  <span className="font-bold text-gold-200">{experience.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => onBookNow(experience.id)}
                className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-widest font-extrabold py-3.5 rounded-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.packageDetail.reserveThisTrip}</span>
                <ArrowRight size={14} />
              </button>

              <div className="flex items-center justify-center space-x-1.5 text-[10px] text-gold-300/50 font-mono pt-2">
                <ShieldCheck size={13} className="text-gold-400" />
                <span>{t.packageDetail.instantConfirmation}</span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="bg-neutral-900/40 border border-gold-400/10 p-6 rounded-xl space-y-4">
              <h3 className="font-serif text-lg text-gold-100 font-medium flex items-center gap-2">
                <Award className="text-gold-400" size={18} />
                <span>{t.packageDetail.includedWithTour}</span>
              </h3>
              <ul className="space-y-2 text-xs text-gold-100/75">
                {experience.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-neutral-900/40 border border-gold-400/10 p-6 rounded-xl space-y-4">
              <h3 className="font-serif text-lg text-gold-100 font-medium flex items-center gap-2">
                <X className="text-red-400" size={18} />
                <span>{t.packageDetail.notIncludedWithTour}</span>
              </h3>
              <ul className="space-y-2 text-xs text-gold-100/50">
                {experience.exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg border border-gold-400/30">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-black/70 text-gold-300 p-2 rounded-full hover:text-white z-10 cursor-pointer"
            >
              <X size={20} />
            </button>
            <img src={selectedPhoto} alt="Preview Wahana" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
