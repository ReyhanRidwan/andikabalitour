import React, { useState } from 'react';
import { Star, MessageSquare, Check, User, Award, X } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function ReviewsSection() {
  const { language, t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  // Review Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newExpId, setNewExpId] = useState('jeep-adventure');
  const [formSuccess, setFormSuccess] = useState(false);

  // Stats calculation
  const totalReviews = reviews.length;
  const avgRating = Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews) * 10) / 10;

  const filteredReviews = reviews.filter(
    (r) => filterRating === 'all' || r.rating === filterRating
  );

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      alert(language === 'id' ? 'Mohon masukkan nama Anda.' : 'Please enter your name.');
      return;
    }
    if (!newComment.trim()) {
      alert(language === 'id' ? 'Mohon tulis ulasan pengalaman Anda.' : 'Please write your testimonial experience.');
      return;
    }

    const newReview: Review = {
      id: `rev-custom-${Date.now()}`,
      name: newName,
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newComment,
      experienceId: newExpId,
      verified: true, // Auto verify for custom submitted reviews
    };

    setReviews([newReview, ...reviews]);
    setFormSuccess(true);
    
    // reset form fields
    setTimeout(() => {
      setIsFormOpen(false);
      setFormSuccess(false);
      setNewName('');
      setNewComment('');
      setNewRating(5);
    }, 2000);
  };

  return (
    <section id="reviews" className="py-24 bg-luxury-dark border-t border-gold-900/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Review Headers */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold">
            {t.reviews.badge}
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gold-100 font-medium tracking-wide">
            {t.reviews.title}
          </h2>
          <p className="font-sans text-sm md:text-base text-gold-100/50 leading-relaxed font-light">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Testimonials aggregate statistics and interactive controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-center">
          
          {/* Aggregate score card */}
          <div className="lg:col-span-4 bg-luxury-gray border border-gold-400/15 p-6 rounded-sm text-center lg:text-left flex flex-col md:flex-row lg:flex-col items-center justify-around gap-6">
            <div className="space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gold-300/50 block">
                {t.reviews.ratingAverage}
              </span>
              <div className="flex items-baseline justify-center lg:justify-start space-x-2">
                <span className="font-serif text-5xl font-bold text-gold-400">
                  {avgRating}
                </span>
                <span className="text-gold-100/40 text-lg">/ 5.0</span>
              </div>
              <div className="flex justify-center lg:justify-start items-center space-x-1.5 text-gold-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.round(avgRating) ? 'fill-gold-400 text-gold-400' : 'text-gold-900/30'}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-gold-300/40 block pt-1">
                {t.reviews.totalReviews}
              </span>
            </div>

            {/* Form expansion trigger */}
            {!isFormOpen && (
              <button
                onClick={() => setIsFormOpen(true)}
                id="btn-trigger-review-form"
                className="bg-transparent hover:bg-gold-400/10 border border-gold-400/50 hover:border-gold-400 text-gold-200 hover:text-gold-100 px-6 py-3.5 text-xs uppercase tracking-wider font-bold font-mono transition-colors rounded-sm cursor-pointer"
              >
                {t.reviews.writeReview}
              </button>
            )}
          </div>

          {/* Filter pills and info */}
          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-luxury-gray/30 p-6 border border-gold-900/5 rounded-sm">
            <div className="text-left">
              <h4 className="font-serif text-base text-gold-200">{language === 'id' ? 'Filter Ulasan Tamu' : 'Filter Guest Reviews'}</h4>
              <p className="font-sans text-xs text-gold-100/50 mt-1">{language === 'id' ? 'Tampilkan ulasan berdasarkan skor bintang.' : 'Show testimonials based on star scores.'}</p>
            </div>
            
            <div className="flex flex-wrap gap-2" id="review-filters">
              <button
                onClick={() => setFilterRating('all')}
                className={`py-1.5 px-3.5 text-[10px] uppercase font-mono tracking-wider font-semibold border rounded-sm transition-all cursor-pointer ${
                  filterRating === 'all'
                    ? 'bg-gold-400 border-gold-400 text-luxury-dark font-bold'
                    : 'border-gold-900/20 text-gold-100/50 hover:border-gold-400/30'
                }`}
              >
                {language === 'id' ? 'Semua Rating' : 'All Ratings'} ({reviews.length})
              </button>
              {[5, 4, 3].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                return (
                  <button
                    key={star}
                    onClick={() => setFilterRating(star)}
                    className={`py-1.5 px-3.5 text-[10px] uppercase font-mono tracking-wider font-semibold border rounded-sm transition-all flex items-center space-x-1 cursor-pointer ${
                      filterRating === star
                        ? 'bg-gold-400 border-gold-400 text-luxury-dark font-bold'
                        : 'border-gold-900/20 text-gold-100/50 hover:border-gold-400/30'
                    }`}
                  >
                    <span>{star} {language === 'id' ? 'Bintang' : 'Stars'}</span>
                    <span className="opacity-40">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Live Testimonial Builder Form Overlay */}
        {isFormOpen && (
          <div className="bg-luxury-gray border border-gold-400/20 p-6 md:p-8 rounded-sm mb-12 text-left animate-fade-in relative overflow-hidden" id="review-submission-box">
            {/* watermark decoration */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-gold-400/10 pointer-events-none" />

            {formSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center border border-emerald-400">
                  <Check size={20} />
                </div>
                <h4 className="font-serif text-lg text-gold-200">{language === 'id' ? 'Ulasan Terkirim' : 'Review Submitted'}</h4>
                <p className="font-sans text-xs text-gold-100/50">{t.reviews.thankYou}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="flex justify-between items-center border-b border-gold-900/10 pb-4">
                  <h3 className="font-serif text-lg text-gold-200 font-medium flex items-center space-x-2">
                    <MessageSquare size={16} className="text-gold-400" />
                    <span>{t.reviews.modalTitle}</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="text-gold-100/35 hover:text-gold-400 p-1 cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Left fields */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-gold-300/60 font-medium">
                          {t.reviews.yourName}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={language === 'id' ? 'Nama Anda' : 'Your Name'}
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="w-full bg-luxury-dark border border-gold-400/15 px-4 py-2.5 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] uppercase tracking-wider font-mono text-gold-300/60 font-medium">
                          {language === 'id' ? 'Paket yang Diambil' : 'Expedition taken'}
                        </label>
                        <select
                          value={newExpId}
                          onChange={(e) => setNewExpId(e.target.value)}
                          className="w-full bg-luxury-dark border border-gold-400/15 px-4 py-2.5 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 cursor-pointer"
                        >
                          <option value="jeep-adventure">Bali Jeep Adventure</option>
                          <option value="watersport-package">Tanjung Benoa Watersport</option>
                          <option value="ayung-rafting">Ayung River Rafting</option>
                          <option value="atv-ride">Bali ATV Quad Bike</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] uppercase tracking-wider font-mono text-gold-300/60 font-medium">
                        {t.reviews.yourComment}
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={language === 'id' ? 'Ceritakan pengalaman liburan Anda...' : 'Detail your private charter adventure...'}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full bg-luxury-dark border border-gold-400/15 px-4 py-2.5 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 resize-none"
                      />
                    </div>
                  </div>

                  {/* Right interactive stars review */}
                  <div className="md:col-span-5 bg-luxury-dark/40 border border-gold-900/10 p-5 rounded-sm flex flex-col justify-between text-center md:text-left">
                    <div className="space-y-3">
                      <span className="block text-[10px] uppercase tracking-widest font-mono text-gold-300/60 font-medium">
                        {t.reviews.yourRating}
                      </span>
                      <div className="flex justify-center md:justify-start items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            className="text-gold-400 hover:scale-110 transition-transform cursor-pointer p-1"
                          >
                            <Star
                              size={28}
                              className={star <= newRating ? 'fill-gold-400 text-gold-400' : 'text-gold-900/20'}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="font-mono text-[10px] text-gold-400 font-semibold uppercase tracking-wider pt-1">
                        {newRating === 5 && (language === 'id' ? 'Sangat Sempurna (5/5)' : 'Absolutely Flawless (5/5)')}
                        {newRating === 4 && (language === 'id' ? 'Sangat Memuaskan (4/5)' : 'Curated Splendor (4/5)')}
                        {newRating === 3 && (language === 'id' ? 'Cukup Menyenangkan (3/5)' : 'Enjoyable Journey (3/5)')}
                        {newRating === 2 && (language === 'id' ? 'Perlu Ditingkatkan (2/5)' : 'Requires Enhancements (2/5)')}
                        {newRating === 1 && (language === 'id' ? 'Kurang Memuaskan (1/5)' : 'Poor Experience (1/5)')}
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        className="w-full bg-gold-400 hover:bg-gold-500 text-luxury-dark font-sans text-xs uppercase tracking-[0.2em] font-bold py-3 transition-colors rounded-sm cursor-pointer"
                      >
                        {t.reviews.submitReview}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Display grid of filtered reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="reviews-list-grid">
          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="bg-luxury-gray/40 border border-gold-900/5 hover:border-gold-400/15 transition-all p-6 rounded-sm text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gold-500/10 border border-gold-400/20 rounded-full flex items-center justify-center">
                      <User size={16} className="text-gold-300" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-gold-100">
                        {r.name}
                      </h4>
                      <p className="font-mono text-[8px] text-gold-400 tracking-wider uppercase mt-0.5">
                        {r.experienceId === 'jeep-adventure' && 'Volcano Tour'}
                        {r.experienceId === 'watersport-package' && 'Watersport Package'}
                        {r.experienceId === 'ayung-rafting' && 'Ayung Rafting'}
                        {r.experienceId === 'atv-ride' && 'ATV Quad Bike'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-gold-400 justify-end">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={idx < r.rating ? 'fill-gold-400 text-gold-400' : 'text-gold-900/30'}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[8px] text-gold-300/30 block mt-1">
                      {new Date(r.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                {/* Comment testimonial text */}
                <p className="font-sans text-xs md:text-sm text-gold-100/65 leading-relaxed font-light italic">
                  "{r.comment}"
                </p>
              </div>

              {/* Verified seal */}
              {r.verified && (
                <div className="flex items-center space-x-1 text-[9px] uppercase tracking-wider font-mono text-emerald-400 font-semibold pt-4 border-t border-gold-900/5 mt-4">
                  <Award size={10} className="stroke-[3]" />
                  <span>{t.reviews.verifiedTraveler}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

