import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DestinationGrid from './components/DestinationGrid';
import ActivitySection from './components/ActivitySection';
import ExperienceDetails from './components/ExperienceDetails';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

// Brand New Multi-page components
import TourCatalog from './components/TourCatalog';
import AboutSection from './components/AboutSection';
import WhyUsSection from './components/WhyUsSection';
import ContactSection from './components/ContactSection';
import RentalSection from './components/RentalSection';
import RentalPage from './components/RentalPage';
import PackageDetailPage from './components/PackageDetailPage';

import { BookingDetails } from './types';
import { getExperiences } from './data';
import { useLanguage } from './context/LanguageContext';

type Page = 'home' | 'tours' | 'rental' | 'about' | 'gallery' | 'whyus' | 'contact' | 'package-detail';

export default function App() {
  const { language } = useLanguage();
  const experiences = getExperiences(language);

  const [activePage, setActivePage] = useState<Page>('home');
  const [heroActiveIndex, setHeroActiveIndex] = useState<number>(0);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preSelectedExperienceId, setPreSelectedExperienceId] = useState<string>('water-sport');
  const [selectedDetailExperienceId, setSelectedDetailExperienceId] = useState<string>('water-sport');
  const [preSelectedVehicleId, setPreSelectedVehicleId] = useState<string>('toyota-avanza');

  // Open booking modal preselected with a specific experience
  const handleOpenBooking = (experienceId: string) => {
    setPreSelectedExperienceId(experienceId);
    setIsBookingOpen(true);
  };

  // General booking click (pre-select current active experience in hero)
  const handleGeneralBookNow = () => {
    if (activePage === 'home') {
      const currentId = experiences[heroActiveIndex]?.id || 'water-sport';
      handleOpenBooking(currentId);
    } else {
      // Default to first experience on other pages
      handleOpenBooking(experiences[0]?.id || 'water-sport');
    }
  };

  const handleBookingSuccess = (booking: BookingDetails) => {
    console.log('Premium booking finalized:', booking);
  };

  const handleViewDetails = (expId: string) => {
    setSelectedDetailExperienceId(expId);
    setActivePage('package-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVehicle = (vehicleId: string) => {
    setPreSelectedVehicleId(vehicleId);
    setActivePage('rental');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentDetailExperience =
    experiences.find((e) => e.id === selectedDetailExperienceId) || experiences[0];

  return (
    <div className="relative min-h-screen bg-neutral-950 text-gold-100 font-sans selection:bg-gold-500/20 selection:text-gold-200">
      
      {/* 1. Universal Luxury Navbar */}
      <Navbar
        activePage={activePage === 'package-detail' ? 'tours' : activePage}
        setActivePage={setActivePage}
        onBookNow={handleGeneralBookNow}
      />

      {/* 2. Page Content Switcher Router */}
      <main className="min-h-[80vh]">
        {activePage === 'home' && (
          <div className="animate-fade-in">
            {/* Showstopper Hero Carousel */}
            <HeroSection
              activeIndex={heroActiveIndex}
              setActiveIndex={setHeroActiveIndex}
              onExploreClick={(exp) => handleOpenBooking(exp.id)}
              onBookNowClick={handleGeneralBookNow}
              onViewDetails={handleViewDetails}
            />

            {/* Bento Grid "Our Elite Expeditions" Quick Showcase */}
            <DestinationGrid onBookNow={handleOpenBooking} onViewDetails={handleViewDetails} />

            {/* Premium Outdoor Adventure & Wilderness Activities */}
            <ActivitySection onBookNow={handleOpenBooking} onViewDetails={handleViewDetails} />

            {/* Signature 3-Column Experience Spec Sheets */}
            <ExperienceDetails onBookNow={handleOpenBooking} onViewDetails={handleViewDetails} />

            {/* Premium Car & Motorbike Rental Section */}
            <RentalSection
              onSelectVehicle={handleSelectVehicle}
              onNavigateToRentalPage={() => {
                setPreSelectedVehicleId('toyota-avanza');
                setActivePage('rental');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Frequently Asked Questions */}
            <FaqSection />

            {/* Testimonials Review section */}
            <ReviewsSection />
          </div>
        )}

        {activePage === 'tours' && (
          <div className="animate-fade-in">
            <TourCatalog
              onBookNow={handleOpenBooking}
              onViewDetails={handleViewDetails}
            />
          </div>
        )}

        {activePage === 'package-detail' && (
          <div className="animate-fade-in">
            <PackageDetailPage
              experience={currentDetailExperience}
              onBack={() => {
                setActivePage('tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBookNow={handleOpenBooking}
            />
          </div>
        )}

        {activePage === 'rental' && (
          <div className="animate-fade-in">
            <RentalPage initialVehicleId={preSelectedVehicleId} />
          </div>
        )}

        {activePage === 'about' && (
          <div className="animate-fade-in">
            <AboutSection />
            <FaqSection />
          </div>
        )}

        {activePage === 'gallery' && (
          <div className="animate-fade-in">
            <GallerySection />
          </div>
        )}

        {activePage === 'whyus' && (
          <div className="animate-fade-in">
            <WhyUsSection />
            <FaqSection />
          </div>
        )}

        {activePage === 'contact' && (
          <div className="animate-fade-in">
            <ContactSection />
          </div>
        )}
      </main>

      {/* 3. Universal Coordinates Footer */}
      <Footer />

      {/* 4. The Dynamic Booking & Checkout Modal System */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialExperienceId={preSelectedExperienceId}
        onBookingSuccess={handleBookingSuccess}
      />

    </div>
  );
}
