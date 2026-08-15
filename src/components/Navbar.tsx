import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  activePage: 'home' | 'tours' | 'rental' | 'about' | 'gallery' | 'whyus' | 'contact';
  setActivePage: (page: 'home' | 'tours' | 'rental' | 'about' | 'gallery' | 'whyus' | 'contact') => void;
  onBookNow: () => void;
}

export default function Navbar({ activePage, setActivePage, onBookNow }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active to prevent see-through / jitter
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const menuItems: Array<{ id: typeof activePage; label: string }> = [
    { id: 'home', label: t.nav.home },
    { id: 'tours', label: t.nav.tours },
    { id: 'rental', label: t.nav.rental },
    { id: 'about', label: t.nav.about },
    { id: 'gallery', label: t.nav.gallery },
    { id: 'whyus', label: t.nav.whyus },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleNavClick = (pageId: typeof activePage) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isMobileMenuOpen
          ? 'bg-neutral-950 border-b border-gold-900/30 py-4 shadow-2xl'
          : isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-b border-gold-900/15 py-4 shadow-xl'
          : 'bg-gradient-to-b from-neutral-950/90 via-neutral-950/20 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3.5 select-none group text-left cursor-pointer"
          id="nav-logo"
        >
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl tracking-widest text-gold-200 group-hover:text-gold-400 transition-colors duration-300 lowercase font-semibold">
              andhikabalitour
            </span>
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-gold-300/80 -mt-1 font-semibold group-hover:text-gold-100 transition-colors duration-300">
              Premium Tour & Travel
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8" id="desktop-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-[11px] uppercase tracking-[0.2em] font-mono font-semibold transition-all duration-300 cursor-pointer relative py-1 ${
                activePage === item.id
                  ? 'text-gold-400 font-bold'
                  : 'text-gold-100/75 hover:text-gold-300'
              }`}
            >
              {item.label}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Language Switcher */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
          {/* 3-Language Switcher */}
          <div className="flex items-center bg-neutral-900/80 border border-gold-500/20 rounded-full p-0.5">
            <button
              onClick={() => setLanguage('id')}
              id="lang-btn-id"
              className={`px-2 py-1 text-[10px] font-mono font-bold tracking-wider rounded-full transition-all flex items-center space-x-1 cursor-pointer ${
                language === 'id'
                  ? 'bg-gold-500 text-neutral-950 shadow-xs'
                  : 'text-gold-200/70 hover:text-gold-200'
              }`}
              title="Bahasa Indonesia"
            >
              <span>🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              id="lang-btn-en"
              className={`px-2 py-1 text-[10px] font-mono font-bold tracking-wider rounded-full transition-all flex items-center space-x-1 cursor-pointer ${
                language === 'en'
                  ? 'bg-gold-500 text-neutral-950 shadow-xs'
                  : 'text-gold-200/70 hover:text-gold-200'
              }`}
              title="English"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('ar')}
              id="lang-btn-ar"
              className={`px-2 py-1 text-[10px] font-mono font-bold tracking-wider rounded-full transition-all flex items-center space-x-1 cursor-pointer ${
                language === 'ar'
                  ? 'bg-gold-500 text-neutral-950 shadow-xs'
                  : 'text-gold-200/70 hover:text-gold-200'
              }`}
              title="العربية (Arabic)"
            >
              <span>🇸🇦</span>
              <span>AR</span>
            </button>
          </div>

          <button
            onClick={onBookNow}
            id="btn-nav-book"
            className="bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-3 transition-all duration-300 shadow-md hover:shadow-gold-500/10 cursor-pointer rounded-sm active:scale-95"
          >
            {t.nav.bookNow}
          </button>
        </div>

        {/* Mobile Header Right */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Mobile Language Switcher */}
          <div className="flex items-center bg-neutral-900 border border-gold-500/20 rounded-full p-0.5">
            <button
              onClick={() => setLanguage('id')}
              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full transition-all cursor-pointer ${
                language === 'id' ? 'bg-gold-500 text-neutral-950' : 'text-gold-200/70'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full transition-all cursor-pointer ${
                language === 'en' ? 'bg-gold-500 text-neutral-950' : 'text-gold-200/70'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-full transition-all cursor-pointer ${
                language === 'ar' ? 'bg-gold-500 text-neutral-950' : 'text-gold-200/70'
              }`}
            >
              AR
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gold-200 hover:text-gold-400 transition-colors focus:outline-none p-1.5 rounded bg-neutral-900 border border-gold-500/20 cursor-pointer"
            aria-label="Toggle menu"
            id="btn-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Solid Dark Full Screen Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-[60px] bottom-0 z-40 bg-neutral-950 md:hidden flex flex-col justify-between py-6 px-6 overflow-y-auto border-t border-gold-900/20 animate-fade-in shadow-2xl"
          id="mobile-nav-panel"
        >
          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 mt-2">
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full py-3.5 px-4 rounded-sm text-left flex items-center justify-between font-mono text-sm uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-gold-400/10 border-gold-400/40 text-gold-300 font-bold'
                      : 'bg-neutral-900/60 border-neutral-900 text-gold-100/70 hover:text-gold-200 hover:bg-neutral-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-gold-400 shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions & Controls */}
          <div className="flex flex-col space-y-4 pt-6 mt-4 border-t border-gold-900/20">
            {/* Language Switcher in Mobile Drawer */}
            <div className="grid grid-cols-3 gap-1 bg-neutral-900 border border-gold-500/20 rounded-lg p-1">
              <button
                onClick={() => setLanguage('id')}
                className={`text-[11px] font-mono font-bold uppercase tracking-wider py-2 rounded-md transition-all cursor-pointer text-center ${
                  language === 'id' ? 'bg-gold-500 text-neutral-950 shadow-sm' : 'text-gold-200/60 hover:text-gold-200'
                }`}
              >
                🇮🇩 ID
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`text-[11px] font-mono font-bold uppercase tracking-wider py-2 rounded-md transition-all cursor-pointer text-center ${
                  language === 'en' ? 'bg-gold-500 text-neutral-950 shadow-sm' : 'text-gold-200/60 hover:text-gold-200'
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`text-[11px] font-mono font-bold uppercase tracking-wider py-2 rounded-md transition-all cursor-pointer text-center ${
                  language === 'ar' ? 'bg-gold-500 text-neutral-950 shadow-sm' : 'text-gold-200/60 hover:text-gold-200'
                }`}
              >
                🇸🇦 العربية
              </button>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookNow();
              }}
              id="btn-mobile-book-now"
              className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] font-bold py-4 transition-all rounded-sm shadow-lg active:scale-95 cursor-pointer text-center"
            >
              {t.nav.bookNow}
            </button>

            <div className="flex items-center justify-center space-x-2 text-[10px] font-mono text-gold-300/60 pb-2">
              <Sparkles size={12} className="text-gold-400" />
              <span>{t.nav.hotline}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

