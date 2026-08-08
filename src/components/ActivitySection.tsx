import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Clock, ArrowRight, Shield, Star, Award, Compass, Flame, Waves, Wind } from 'lucide-react';
import { EXPERIENCES } from '../data';

interface ActivitySectionProps {
  onBookNow: (experienceId: string) => void;
  onViewDetails?: (experienceId: string) => void;
}

export default function ActivitySection({ onBookNow, onViewDetails }: ActivitySectionProps) {
  // Extract the new activity packages from the database
  const waterSport = EXPERIENCES.find(e => e.id === 'water-sport') || EXPERIENCES[0];
  const atvRide = EXPERIENCES.find(e => e.id === 'atv-ride') || EXPERIENCES[1];
  const atvKing = EXPERIENCES.find(e => e.id === 'atv-king') || EXPERIENCES[2];
  const horseRiding = EXPERIENCES.find(e => e.id === 'horse-riding') || EXPERIENCES[3];
  const nusaPenida = EXPERIENCES.find(e => e.id === 'nusa-penida-west') || EXPERIENCES[4];

  const activities = [
    {
      ...waterSport,
      badge: 'Terpopuler',
      accentColor: 'text-amber-500',
      borderColor: 'hover:border-amber-500/40',
      icon: <Flame size={14} className="text-amber-500" />
    },
    {
      ...atvRide,
      badge: 'Rekomendasi',
      accentColor: 'text-teal-400',
      borderColor: 'hover:border-teal-400/40',
      icon: <Compass size={14} className="text-teal-400" />
    },
    {
      ...atvKing,
      badge: 'Extreme',
      accentColor: 'text-pink-400',
      borderColor: 'hover:border-pink-400/40',
      icon: <Wind size={14} className="text-pink-400" />
    },
    {
      ...horseRiding,
      badge: 'Eksotis',
      accentColor: 'text-blue-400',
      borderColor: 'hover:border-blue-400/40',
      icon: <Waves size={14} className="text-blue-400" />
    },
    {
      ...nusaPenida,
      badge: 'Island Trip',
      accentColor: 'text-emerald-400',
      borderColor: 'hover:border-emerald-400/40',
      icon: <Sparkles size={14} className="text-emerald-400" />
    }
  ];

  return (
    <section id="luxury-activities" className="py-24 bg-neutral-900/40 border-b border-gold-500/10 relative overflow-hidden">
      {/* Background radial soft light flares */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-gold-400/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-gold-400/10 border border-gold-400/20 px-4 py-1.5 rounded-full mb-4">
            <Sparkles size={11} className="text-gold-400 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-300 font-bold">
              High Adrenaline & Wilderness
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-gold-200 tracking-wide font-medium">
            Petualangan Aktivitas Outdoor Elit
          </h2>
          <p className="font-sans text-xs md:text-sm text-gold-100/60 leading-relaxed mt-4 max-w-2xl mx-auto">
            Pacu adrenalin Anda dengan menembus rimbunnya hutan belantara Bali atau nikmati kesegaran alami menyusuri jeram sungai purba dengan standar keamanan internasional yang mewah.
          </p>
        </div>

        {/* Dynamic Cards Layout: 3 on Top, 2 on Bottom */}
        <div className="space-y-6">
          {/* Top Row: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.slice(0, 3).map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: 'easeOut' }}
                className={`bg-neutral-950/60 border border-gold-900/15 ${activity.borderColor} rounded-xl overflow-hidden flex flex-col group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/5`}
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-neutral-900">
                  <img
                    src={activity.cardImage}
                    alt={activity.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Absolute Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent" />
                  
                  {/* Badge & Rating overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-neutral-950/95 backdrop-blur-md border border-gold-400/25 text-gold-300 font-mono text-[8px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-sm shadow-lg">
                      {activity.tagline}
                    </span>
                    <div className="flex items-center space-x-1 bg-neutral-950/90 backdrop-blur-md border border-gold-900/30 px-2 py-1 rounded-sm shadow-md">
                      <Star size={10} className="fill-gold-400 text-gold-400" />
                      <span className="font-mono text-[9px] font-bold text-gold-100">
                        {activity.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Price Tag Overlay bottom-left */}
                  <div className="absolute bottom-3 left-4 z-10 text-left">
                    <p className="text-[8px] uppercase font-mono tracking-widest text-gold-400/70">
                      {activity.pricingOptions ? 'Tarif Paket' : 'Mulai'}
                    </p>
                    {activity.pricingOptions ? (
                      <div className="font-mono text-xs font-bold text-gold-100 flex flex-col">
                        <span>Single: Rp {activity.pricingOptions[0].price.toLocaleString('id-ID')}</span>
                        <span className="text-gold-300">Tandem: Rp {activity.pricingOptions[1]?.price.toLocaleString('id-ID')}</span>
                      </div>
                    ) : (
                      <p className="font-mono text-base font-bold text-gold-100">
                        Rp {activity.pricePerPerson.toLocaleString('id-ID')} <span className="text-[10px] font-normal text-gold-100/50">/pax</span>
                      </p>
                    )}
                  </div>

                  {/* Quick specs overlay bottom-right */}
                  <div className="absolute bottom-3 right-4 z-10 flex flex-col items-end space-y-0.5 text-right font-mono text-[9px] text-gold-300/80">
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-gold-400" />
                      <span>{activity.duration.split(' ')[0]} {activity.duration.includes('Hari') ? 'Hari' : 'Hours'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-gold-400" />
                      <span>{activity.location.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div>
                    {/* Header */}
                    <div className="flex items-center space-x-1.5 mb-2">
                      {activity.icon}
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold ${activity.accentColor}`}>
                        {activity.badge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-gold-200 group-hover:text-gold-400 transition-colors font-medium mb-2 line-clamp-1">
                      {activity.title}
                    </h3>
                    <p className="font-sans text-[11px] text-gold-100/60 leading-relaxed mb-4 h-12 overflow-hidden line-clamp-3">
                      {activity.shortDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-3.5 border-t border-gold-900/10">
                      <h4 className="font-serif text-[10px] uppercase tracking-widest text-gold-300 font-bold mb-1.5">
                        Highlights:
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {activity.highlights.slice(0, 2).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-1.5 text-[10px] text-gold-100/50 leading-tight">
                            <Shield size={10} className="text-gold-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-5 pt-4 border-t border-gold-900/10 flex flex-col gap-3">
                    <div className="flex items-center gap-1.5">
                      <Award size={12} className="text-gold-400 flex-shrink-0" />
                      <span className="font-mono text-[9px] text-gold-300/70 truncate">Asuransi & Fasilitas Termasuk</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onViewDetails ? onViewDetails(activity.id) : onBookNow(activity.id)}
                        className="w-full border border-gold-400/30 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-[10px] uppercase tracking-widest font-semibold py-2.5 px-2 rounded-sm transition-all duration-300 cursor-pointer hover:bg-gold-500/10 text-center"
                      >
                        Detail Paket
                      </button>
                      <button
                        onClick={() => onBookNow(activity.id)}
                        className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-2 rounded-sm transition-all duration-300 flex items-center justify-center gap-1 shadow-md cursor-pointer active:scale-95"
                      >
                        <span>Pesan</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* Bottom Row: 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-w-4xl lg:mx-auto">
            {activities.slice(3, 5).map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (idx + 3) * 0.1, ease: 'easeOut' }}
                className={`bg-neutral-950/60 border border-gold-900/15 ${activity.borderColor} rounded-xl overflow-hidden flex flex-col group transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/5`}
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden bg-neutral-900">
                  <img
                    src={activity.cardImage}
                    alt={activity.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Absolute Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/25 to-transparent" />
                  
                  {/* Badge & Rating overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="bg-neutral-950/95 backdrop-blur-md border border-gold-400/25 text-gold-300 font-mono text-[8px] uppercase tracking-wider font-bold py-1 px-2.5 rounded-sm shadow-lg">
                      {activity.tagline}
                    </span>
                    <div className="flex items-center space-x-1 bg-neutral-950/90 backdrop-blur-md border border-gold-900/30 px-2 py-1 rounded-sm shadow-md">
                      <Star size={10} className="fill-gold-400 text-gold-400" />
                      <span className="font-mono text-[9px] font-bold text-gold-100">
                        {activity.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Price Tag Overlay bottom-left */}
                  <div className="absolute bottom-3 left-4 z-10 text-left">
                    <p className="text-[8px] uppercase font-mono tracking-widest text-gold-400/70">
                      {activity.pricingOptions ? 'Tarif Paket' : 'Mulai'}
                    </p>
                    {activity.pricingOptions ? (
                      <div className="font-mono text-xs font-bold text-gold-100 flex flex-col">
                        <span>Single: Rp {activity.pricingOptions[0].price.toLocaleString('id-ID')}</span>
                        <span className="text-gold-300">Tandem: Rp {activity.pricingOptions[1]?.price.toLocaleString('id-ID')}</span>
                      </div>
                    ) : (
                      <p className="font-mono text-base font-bold text-gold-100">
                        Rp {activity.pricePerPerson.toLocaleString('id-ID')} <span className="text-[10px] font-normal text-gold-100/50">/pax</span>
                      </p>
                    )}
                  </div>

                  {/* Quick specs overlay bottom-right */}
                  <div className="absolute bottom-3 right-4 z-10 flex flex-col items-end space-y-0.5 text-right font-mono text-[9px] text-gold-300/80">
                    <div className="flex items-center gap-1">
                      <Clock size={10} className="text-gold-400" />
                      <span>{activity.duration.split(' ')[0]} {activity.duration.includes('Hari') ? 'Hari' : 'Hours'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-gold-400" />
                      <span>{activity.location.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-grow flex flex-col justify-between text-left">
                  <div>
                    {/* Header */}
                    <div className="flex items-center space-x-1.5 mb-2">
                      {activity.icon}
                      <span className={`text-[9px] font-mono uppercase tracking-widest font-semibold ${activity.accentColor}`}>
                        {activity.badge}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-gold-200 group-hover:text-gold-400 transition-colors font-medium mb-2 line-clamp-1">
                      {activity.title}
                    </h3>
                    <p className="font-sans text-[11px] text-gold-100/60 leading-relaxed mb-4 h-12 overflow-hidden line-clamp-3">
                      {activity.shortDesc}
                    </p>

                    {/* Features checklist */}
                    <div className="space-y-1.5 pt-3.5 border-t border-gold-900/10">
                      <h4 className="font-serif text-[10px] uppercase tracking-widest text-gold-300 font-bold mb-1.5">
                        Highlights:
                      </h4>
                      <div className="flex flex-col gap-1.5">
                        {activity.highlights.slice(0, 2).map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-1.5 text-[10px] text-gold-100/50 leading-tight">
                            <Shield size={10} className="text-gold-400 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-5 pt-4 border-t border-gold-900/10 flex flex-col gap-3">
                    <div className="flex items-center gap-1.5">
                      <Award size={12} className="text-gold-400 flex-shrink-0" />
                      <span className="font-mono text-[9px] text-gold-300/70 truncate">Asuransi & Fasilitas Termasuk</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onViewDetails ? onViewDetails(activity.id) : onBookNow(activity.id)}
                        className="w-full border border-gold-400/30 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-[10px] uppercase tracking-widest font-semibold py-2.5 px-2 rounded-sm transition-all duration-300 cursor-pointer hover:bg-gold-500/10 text-center"
                      >
                        Detail Paket
                      </button>
                      <button
                        onClick={() => onBookNow(activity.id)}
                        className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-[10px] uppercase tracking-widest font-bold py-2.5 px-2 rounded-sm transition-all duration-300 flex items-center justify-center gap-1 shadow-md cursor-pointer active:scale-95"
                      >
                        <span>Pesan</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>

        {/* Dynamic Safe and Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 bg-neutral-900/30 border border-gold-900/10 rounded-lg p-5">
          <div className="text-center p-3">
            <p className="font-mono text-gold-400 text-lg font-bold">100% SAFE</p>
            <p className="font-sans text-[10px] text-gold-100/40 mt-1">Sertifikasi Keamanan Kelas Dunia</p>
          </div>
          <div className="text-center p-3 border-l border-gold-900/10">
            <p className="font-mono text-gold-400 text-lg font-bold">VIP SERVICE</p>
            <p className="font-sans text-[10px] text-gold-100/40 mt-1">Antar-Jemput Hotel Privat</p>
          </div>
          <div className="text-center p-3 border-l border-gold-900/10">
            <p className="font-mono text-gold-400 text-lg font-bold">TOP GUIDES</p>
            <p className="font-sans text-[10px] text-gold-100/40 mt-1">Instruktur Lisensi Internasional</p>
          </div>
          <div className="text-center p-3 border-l border-gold-900/10">
            <p className="font-mono text-gold-400 text-lg font-bold">FLEXIBLE</p>
            <p className="font-sans text-[10px] text-gold-100/40 mt-1">Bebas Reschedule / Cancel</p>
          </div>
        </div>

      </div>
    </section>
  );
}
