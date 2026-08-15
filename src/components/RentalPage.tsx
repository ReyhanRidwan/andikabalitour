import React, { useState, useEffect } from 'react';
import {
  Car, Users, Settings, Fuel, Shield, Check, Calendar, 
  Sparkles, ArrowRight, CreditCard, Wallet, Landmark, Copy, CheckCircle2, 
  Info, ArrowLeft, Clock, Search, Star
} from 'lucide-react';
import { getVehicles } from '../data';
import { Vehicle } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface RentalPageProps {
  initialVehicleId?: string;
}

export default function RentalPage({ initialVehicleId }: RentalPageProps) {
  const { language, t } = useLanguage();
  const vehicles = getVehicles(language);

  // Page states: 'catalog' | 'booking' | 'payment' | 'success'
  const [step, setStep] = useState<'catalog' | 'booking' | 'payment' | 'success'>('catalog');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'car' | 'motorbike'>('all');
  
  // Active selected vehicle
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(
    vehicles.find(v => v.id === initialVehicleId) || vehicles[0]
  );

  // Keep selected vehicle localized if language switches
  useEffect(() => {
    const match = vehicles.find(v => v.id === selectedVehicle.id);
    if (match) {
      setSelectedVehicle(match);
    }
  }, [language, vehicles]);

  // Booking details state
  const [startDate, setStartDate] = useState('');
  const [durationDays, setDurationDays] = useState(3);
  const driverOption = 'with';
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Payment states
  const [paymentChannel, setPaymentChannel] = useState<'card' | 'qris' | 'va'>('card');
  const [selectedBank, setSelectedBank] = useState<'bca' | 'mandiri' | 'bni'>('bca');
  const [selectedEWallet, setSelectedEWallet] = useState<'gopay' | 'ovo' | 'dana'>('gopay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Confirmed booking details
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Update selected vehicle if initialVehicleId changes
  useEffect(() => {
    if (initialVehicleId) {
      const match = vehicles.find(v => v.id === initialVehicleId);
      if (match) {
        setSelectedVehicle(match);
        setStep('booking');
      }
    }
  }, [initialVehicleId, vehicles]);

  // Pricing calculations (All-inclusive with driver & fuel)
  const pricePerDay = selectedVehicle ? selectedVehicle.priceWithDriverPerDay : 0;
  const basePriceTotal = pricePerDay * durationDays;
  const deliveryFee = 0; // VIP complimentary service
  const tax = Math.round(basePriceTotal * 0.1); // 10% VAT
  const grandTotal = basePriceTotal + deliveryFee + tax;

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          vehicle.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' ? true : vehicle.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleStartBooking = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setStep('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) {
      alert(language === 'ar' ? 'يرجى اختيار تاريخ بدء الإيجار.' : language === 'en' ? 'Please select a rental start date.' : 'Mohon pilih tanggal mulai sewa.');
      return;
    }
    if (!fullName.trim() || !email.trim() || !phone.trim() || !deliveryLocation.trim()) {
      alert(language === 'ar' ? 'يرجى ملء جميع بيانات المستأجر وموقع الاستلام.' : language === 'en' ? 'Please fill in all renter details and pickup location.' : 'Mohon lengkapi seluruh formulir data diri & lokasi penyerahan.');
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentChannel === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        alert(language === 'ar' ? 'يرجى إدخال رقم بطاقة ائتمان صحيح مكون من 16 رقماً.' : language === 'en' ? 'Please enter a valid 16-digit credit card number.' : 'Mohon masukkan nomor kartu kredit 16-digit yang valid.');
        return;
      }
      if (!cardExpiry || !cardExpiry.includes('/')) {
        alert(language === 'ar' ? 'يرجى إدخال تاريخ انتهاء صلاحية صالح (MM/YY).' : language === 'en' ? 'Please enter a valid expiry date (MM/YY).' : 'Mohon masukkan masa berlaku kartu MM/YY.');
        return;
      }
      if (cardCvv.length < 3) {
        alert(language === 'ar' ? 'يرجى إدخال رمز CVV صالح.' : language === 'en' ? 'Please enter a valid CVV.' : 'Mohon masukkan CVV yang valid.');
        return;
      }
    }

    setIsProcessing(true);
    // Simulate 2 seconds of high-end secure payment loading
    setTimeout(() => {
      setIsProcessing(false);
      const bookingCode = `BG-RENT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      let finalPaymentLabel = language === 'ar' ? 'بطاقة ائتمان (فيزا / ماستركارد)' : language === 'en' ? 'Credit Card (Visa/Mastercard)' : 'Kartu Kredit (Visa/Mastercard)';
      if (paymentChannel === 'qris') {
        finalPaymentLabel = language === 'ar' ? `دفع QRIS (${selectedEWallet.toUpperCase()})` : `E-Wallet QRIS (${selectedEWallet.toUpperCase()})`;
      } else if (paymentChannel === 'va') {
        finalPaymentLabel = language === 'ar' ? `حساب افتراضي (${selectedBank.toUpperCase()})` : `Virtual Account (${selectedBank.toUpperCase()})`;
      }

      const bookingObj = {
        bookingCode,
        vehicle: selectedVehicle,
        startDate,
        durationDays,
        driverOption,
        fullName,
        email,
        phone,
        deliveryLocation,
        specialNotes,
        totalPrice: grandTotal,
        paymentMethod: finalPaymentLabel,
        createdAt: new Date().toISOString()
      };

      setConfirmedBooking(bookingObj);
      setStep('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
  };

  const copyVaNumber = () => {
    const vaNum = selectedBank === 'bca' ? '3901089945678912' : selectedBank === 'mandiri' ? '8801289945678912' : '9801489945678912';
    navigator.clipboard.writeText(vaNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep('catalog');
    setStartDate('');
    setDurationDays(3);
    setFullName('');
    setEmail('');
    setPhone('');
    setDeliveryLocation('');
    setSpecialNotes('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setConfirmedBooking(null);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-gold-100 pt-28 pb-20 font-sans relative">
      
      {/* Top Graphic Banner Accent */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-gold-900/10 via-gold-500/0 to-transparent pointer-events-none" />
      <div className="absolute top-48 left-1/4 w-[350px] h-[350px] bg-gold-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ------------------------------------------- */}
        {/* STEP 1: CATALOG VEHICLES LISTING */}
        {/* ------------------------------------------- */}
        {step === 'catalog' && (
          <div className="animate-fade-in text-left">
            {/* Header section */}
            <div className="mb-12">
              <div className="inline-flex items-center space-x-2 bg-gold-400/10 border border-gold-400/20 px-3 py-1 rounded-full mb-4">
                <Sparkles size={11} className="text-gold-400" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-300 font-bold">{t.rental.badge}</span>
              </div>
              <h1 className="font-serif text-4xl md:text-6xl text-gold-200 tracking-wide font-medium leading-tight">
                {t.rental.title}
              </h1>
              <p className="font-sans text-sm md:text-base text-gold-100/60 max-w-3xl mt-4 leading-relaxed">
                {t.rental.subtitle}
              </p>
            </div>

            {/* Filter controls row */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-neutral-900/50 p-4 border border-gold-900/15 rounded-md mb-8">
              {/* Type toggle tabs */}
              <div className="flex bg-neutral-950 p-1 rounded-sm border border-gold-400/10 w-full md:w-auto">
                <span className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-gold-400 flex items-center gap-2">
                  <Car size={13} />
                  {t.rental.fleetBadge}
                </span>
              </div>

              {/* Search input field */}
              <div className="relative flex-grow md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-300/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'ابحث عن سيارة (مثال: Avanza, Alphard)...' : language === 'en' ? 'Search vehicle (e.g. Avanza, Alphard)...' : 'Cari kendaraan (misal: Avanza, Alphard)...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-neutral-950 border border-gold-400/15 pl-10 pr-4 py-2.5 rounded-sm text-xs text-gold-100 focus:outline-none focus:border-gold-400 placeholder-gold-300/20 font-sans"
                />
              </div>
            </div>

            {/* Catalog Grid */}
            {filteredVehicles.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gold-900/15 rounded-lg bg-neutral-900/20">
                <Info className="mx-auto text-gold-400/50 w-10 h-10 mb-4" />
                <p className="font-serif text-lg text-gold-200">
                  {language === 'ar' ? 'لم يتم العثور على سيارات' : language === 'en' ? 'No vehicles found' : 'Tidak ada armada ditemukan'}
                </p>
                <p className="font-sans text-xs text-gold-100/40 mt-1">
                  {language === 'ar' ? 'يرجى محاولة استخدام كلمات بحث أخرى.' : language === 'en' ? 'Try using a different search keyword.' : 'Coba gunakan kata kunci pencarian yang lain.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredVehicles.map((vehicle) => {
                  const isCar = vehicle.type === 'car';
                  return (
                    <div
                      key={vehicle.id}
                      className="bg-neutral-900/30 border border-gold-900/15 hover:border-gold-400/40 rounded-lg overflow-hidden flex flex-col group transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/5"
                    >
                      {/* Image Frame */}
                      <div className="relative h-56 bg-neutral-950 overflow-hidden">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Type Tag */}
                        {vehicle.passengers && (
                          <span className="absolute top-4 left-4 bg-neutral-950/95 backdrop-blur-md border border-gold-400/25 text-gold-300 font-mono text-[9px] uppercase tracking-wider font-bold py-1.5 px-3 rounded-sm shadow-md">
                            {vehicle.passengers} {language === 'ar' ? 'مقاعد' : language === 'en' ? 'Seats' : 'Penumpang'}
                          </span>
                        )}
                        
                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent p-4 flex items-end justify-between">
                          <div className="w-full flex justify-between items-end">
                            <div>
                              <p className="text-[9px] uppercase font-mono tracking-widest text-gold-400/70">
                                {language === 'ar' ? 'خدمة خاصة VIP' : language === 'en' ? 'Private Service' : 'Layanan Privat'}
                              </p>
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-sm">
                                {t.rental.specsDriverFuel}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-[9px] uppercase font-mono tracking-widest text-gold-400/70">
                                {t.rental.pricePerDay}
                              </p>
                              <p className="font-mono text-base font-bold text-gold-300">
                                Rp {vehicle.priceWithDriverPerDay.toLocaleString('id-ID')} <span className="text-[9px] font-normal text-gold-300/60">/ {language === 'ar' ? 'يومياً' : language === 'en' ? 'day' : 'hari'}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Info body */}
                      <div className="p-6 flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-serif text-xl text-gold-200 group-hover:text-gold-400 transition-colors font-medium">
                              {vehicle.name}
                            </h3>
                            <div className="flex items-center space-x-1">
                              <Star size={11} className="fill-gold-400 text-gold-400" />
                              <span className="text-[10px] font-mono font-bold text-gold-300">4.9</span>
                            </div>
                          </div>
                          <p className="font-sans text-xs text-gold-100/60 mt-2.5 leading-relaxed">
                            {vehicle.description}
                          </p>

                          {/* Technical Features Specs */}
                          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gold-900/10 text-[11px] font-mono text-gold-300/80">
                            {isCar && vehicle.passengers && (
                              <div className="flex items-center gap-2">
                                <Users size={12} className="text-gold-400" />
                                <span>{vehicle.passengers} {t.rental.specsSeats}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Settings size={12} className="text-gold-400" />
                              <span>{vehicle.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Fuel size={12} className="text-gold-400" />
                              <span>{vehicle.engine}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield size={12} className="text-gold-400" />
                              <span>{language === 'ar' ? 'تأمين شامل' : language === 'en' ? 'All-Risk Protection' : 'Proteksi All-Risk'}</span>
                            </div>
                          </div>

                          {/* Bullet points inclusions */}
                          <div className="mt-4 pt-4 border-t border-gold-900/10 space-y-1.5 text-left">
                            {vehicle.features.slice(0, 3).map((feat, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-[10px] font-sans text-gold-100/50">
                                <span className="w-1 h-1 rounded-full bg-gold-400" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA button */}
                        <div className="mt-6 pt-4 border-t border-gold-900/10">
                          <button
                            onClick={() => handleStartBooking(vehicle)}
                            className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] font-bold py-3.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                          >
                            <span>{t.rental.bookCar}</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Why Rent with Us row info */}
            <div className="mt-20 border border-gold-400/20 bg-neutral-900/20 rounded-md p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <h3 className="font-serif text-2xl text-gold-200 tracking-wide font-medium">
                    {language === 'ar' ? 'خدمة توصيل واستقبال VIP مجانية في جميع أنحاء بالي' : language === 'en' ? 'Complimentary Island-Wide VIP Delivery' : 'Layanan Antar Jemput Gratis Se-Bali Selatan'}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-gold-100/60 leading-relaxed mt-2.5">
                    {language === 'ar'
                      ? 'لراحتكم التامة، نقوم بتسليم جميع السيارات مع السائق مباشرة إلى مطار نغوراه راي الدولي (DPS)، كوتا، سيمينياك، ليغيان، سانور، نوسا دوا، جيمباران، تشانغو، أو وسط أوبود دون أي رسوم إضافية مخفية!'
                      : language === 'en'
                      ? 'For your utmost convenience, we deliver all vehicles with driver straight to I Gusti Ngurah Rai International Airport (DPS), Kuta, Seminyak, Legian, Sanur, Nusa Dua, Jimbaran, Canggu, or Ubud Central without any hidden delivery surcharge!'
                      : 'Demi kemudahan Anda, kami mengirimkan mobil bersama supir secara cuma-cuma ke Bandara Internasional I Gusti Ngurah Rai (DPS), area Kuta, Seminyak, Legian, Sanur, Nusa Dua, Jimbaran, Canggu, hingga Ubud Central. Bebas biaya tersembunyi!'}
                  </p>
                </div>
                <div className="lg:col-span-5 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-neutral-950/60 border border-gold-900/10 p-4 rounded-sm">
                    <p className="text-gold-400 font-bold mb-1">{language === 'ar' ? 'دعم VIP على مدار 24/7' : '24/7 VIP SUPPORT'}</p>
                    <p className="text-gold-100/40 text-[10px]">
                      {language === 'ar' ? 'استجابة فورية لحالات الطوارئ وخدمة كونسيرج سريعة.' : language === 'en' ? 'Emergency dispatch & responsive concierge.' : 'Bantuan darurat & customer service responsif.'}
                    </p>
                  </div>
                  <div className="bg-neutral-950/60 border border-gold-900/10 p-4 rounded-sm">
                    <p className="text-gold-400 font-bold mb-1">{language === 'ar' ? 'سائق ووقود مشمول' : language === 'en' ? 'DRIVER & FUEL' : 'SUPIR & BBM'}</p>
                    <p className="text-gold-100/40 text-[10px]">
                      {language === 'ar' ? 'سائق VIP مرخص ومحترف والوقود اليومي مشمول بالكامل.' : language === 'en' ? 'Licensed professional VIP driver & daily fuel included.' : 'Driver profesional ramah, berlisensi, & BBM sudah termasuk.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* STEP 2: BOOKING INFORMATION INPUTS */}
        {/* ------------------------------------------- */}
        {step === 'booking' && selectedVehicle && (
          <div className="animate-fade-in text-left">
            {/* Back button */}
            <button
              onClick={() => setStep('catalog')}
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold-400 hover:text-gold-300 mb-8 cursor-pointer group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{language === 'ar' ? 'العودة إلى دليل السيارات' : language === 'en' ? 'Back to Fleet Catalog' : 'Kembali Ke Katalog Sewa'}</span>
            </button>

            <h1 className="font-serif text-3xl md:text-5xl text-gold-200 tracking-wide font-medium mb-10">
              {language === 'ar' ? `حجز استئجار ${selectedVehicle.name}` : language === 'en' ? `Reservation for ${selectedVehicle.name}` : `Formulir Reservasi Sewa ${selectedVehicle.name}`}
            </h1>

            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="form-rental-details">
              
              {/* Left Column inputs */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Driver service info banner */}
                <div className="space-y-2">
                  <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono">
                    {t.rental.servicePackage}
                  </label>
                  <div className="p-4 rounded-sm border border-gold-400/40 bg-gold-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-gold-400" />
                        <span className="font-serif text-sm font-semibold text-gold-200">{t.rental.includedDriverFuel}</span>
                      </div>
                      <p className="font-sans text-xs text-gold-100/60 leading-relaxed">
                        {t.rental.includedDriverFuelDesc}
                      </p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <span className="font-mono text-xs font-bold text-gold-400 block">Rp {selectedVehicle.priceWithDriverPerDay.toLocaleString('id-ID')} / {language === 'ar' ? 'يومياً' : language === 'en' ? 'day' : 'hari'}</span>
                      <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-sm inline-block mt-0.5">
                        {language === 'ar' ? 'شامل بالكامل' : language === 'en' ? 'All Inclusive' : 'Sudah Termasuk'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rental dates and durations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold-400" />
                      <span>{t.rental.startDate}</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans [color-scheme:dark] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono flex items-center gap-1.5">
                      <Clock size={13} className="text-gold-400" />
                      <span>{t.rental.duration}</span>
                    </label>
                    <div className="flex items-center border border-gold-400/15 rounded-sm bg-neutral-900">
                      <button
                        type="button"
                        onClick={() => setDurationDays(Math.max(1, durationDays - 1))}
                        className="px-4 py-3 text-gold-300 hover:text-gold-400 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center text-sm font-semibold text-gold-100 font-mono">
                        {durationDays} {language === 'ar' ? 'أيام' : language === 'en' ? 'Days' : 'Hari'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDurationDays(Math.min(30, durationDays + 1))}
                        className="px-4 py-3 text-gold-300 hover:text-gold-400 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Client contacts */}
                <div className="space-y-4 pt-4 border-t border-gold-900/10">
                  <h3 className="text-xs uppercase tracking-widest text-gold-300 font-bold font-mono">
                    {t.rental.step2Title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={language === 'ar' ? 'الاسم الكامل حسب جواز السفر / الهوية' : language === 'en' ? 'Full Name as per Passport / ID' : 'Nama Lengkap Sesuai KTP / Paspor'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                    <input
                      type="email"
                      required
                      placeholder={t.bookingModal.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      required
                      placeholder={t.bookingModal.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                    <input
                      type="text"
                      required
                      placeholder={t.rental.pickupPlaceholder}
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                  </div>
                  
                  <textarea
                    rows={3}
                    placeholder={t.rental.specialNotesPlaceholder}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                  />
                </div>

                {/* Terms and benefits checklist */}
                <div className="bg-neutral-900/30 border border-gold-900/10 rounded p-4 space-y-2.5">
                  <h4 className="font-serif text-sm text-gold-300 font-medium">{t.rental.rentalNoticeTitle}</h4>
                  <div className="space-y-1.5 text-xs text-gold-100/50 pl-1.5 font-sans leading-relaxed">
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{t.rental.rentalNotice1}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{t.rental.rentalNotice2}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{t.rental.rentalNotice3}</span>
                    </p>
                  </div>
                </div>

              </div>

              {/* Right Panel Summary Invoice */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-gold-400/15 p-6 rounded-md flex flex-col justify-between h-fit lg:sticky lg:top-24">
                <div>
                  <h3 className="font-serif text-lg text-gold-200 border-b border-gold-900/10 pb-3 mb-4 font-medium tracking-wide">
                    {t.rental.orderSummary}
                  </h3>

                  {/* Tiny vehicle badge */}
                  <div className="flex items-center space-x-3 mb-6 bg-neutral-900 p-3 border border-gold-900/10 rounded-sm">
                    <img
                      src={selectedVehicle.image}
                      alt={selectedVehicle.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-20 h-14 object-cover rounded-sm border border-gold-400/20 flex-shrink-0"
                    />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-gold-400">
                        {selectedVehicle.type === 'car' ? (language === 'ar' ? 'تأجير سيارة VIP' : language === 'en' ? 'Car Rental VIP' : 'Rental Mobil VIP') : (language === 'ar' ? 'تأجير دراجة نارية' : 'Motorbike Rental')}
                      </p>
                      <h4 className="font-serif text-sm text-gold-100 font-medium leading-tight">{selectedVehicle.name}</h4>
                      <p className="font-mono text-[10px] text-emerald-400 mt-1 uppercase font-bold">
                        {t.rental.specsDriverFuel}
                      </p>
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-4 text-sm font-mono text-gold-200/60">
                    <div className="flex justify-between">
                      <span>{t.rental.pricePerDay}:</span>
                      <span className="text-gold-100 font-bold">Rp {pricePerDay.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.totalDays}:</span>
                      <span className="text-gold-100 font-bold">{durationDays} {language === 'ar' ? 'أيام' : language === 'en' ? 'Days' : 'Hari'}</span>
                    </div>
                    <div className="flex justify-between border-t border-gold-900/10 pt-3">
                      <span>{t.rental.subtotal}:</span>
                      <span className="text-gold-100 font-bold">Rp {basePriceTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.deliveryFee}:</span>
                      <span className="text-gold-400 font-sans text-xs font-semibold">{t.rental.freeDelivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.taxVAT}:</span>
                      <span className="text-gold-100 font-bold">Rp {tax.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-gold-400/20">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-serif text-base text-gold-200">{t.rental.totalPayment}</span>
                    <span className="font-mono text-2xl md:text-3xl text-gold-400 font-bold">Rp {grandTotal.toLocaleString('id-ID')}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] font-bold py-4 rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-md hover:shadow-gold-500/10 active:scale-95"
                  >
                    <span>{t.bookingModal.proceedToPayment}</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[9px] text-gold-300/40 font-mono mt-4">
                    <ShieldCheckIcon />
                    <span>SECURE SSL 256-BIT RESERVATION</span>
                  </div>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* STEP 3: PAYMENT GATEWAY SELECTIONS */}
        {/* ------------------------------------------- */}
        {step === 'payment' && (
          <div className="animate-fade-in text-left">
            <button
              onClick={() => setStep('booking')}
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-gold-400 hover:text-gold-300 mb-8 cursor-pointer group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>{t.common.back}</span>
            </button>

            <h1 className="font-serif text-3xl md:text-5xl text-gold-200 tracking-wide font-medium mb-10">
              {t.rental.step3Title}
            </h1>

            <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="form-rental-payment">
              
              {/* Left Column channels */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono">
                    {t.rental.selectPaymentMethod}
                  </label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentChannel('card')}
                      className={`py-3.5 px-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
                        paymentChannel === 'card'
                          ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-md'
                          : 'bg-neutral-900 text-gold-200 border-gold-900/20 hover:border-gold-400/30'
                      }`}
                    >
                      <CreditCard size={16} />
                      <span>{language === 'ar' ? 'بطاقة ائتمان' : language === 'en' ? 'Credit Card' : 'Kartu Kredit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentChannel('qris')}
                      className={`py-3.5 px-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
                        paymentChannel === 'qris'
                          ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-md'
                          : 'bg-neutral-900 text-gold-200 border-gold-900/20 hover:border-gold-400/30'
                      }`}
                    >
                      <Wallet size={16} />
                      <span>E-Wallet QRIS</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentChannel('va')}
                      className={`py-3.5 px-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
                        paymentChannel === 'va'
                          ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-md'
                          : 'bg-neutral-900 text-gold-200 border-gold-900/20 hover:border-gold-400/30'
                      }`}
                    >
                      <Landmark size={16} />
                      <span>{language === 'ar' ? 'تحويل VA' : language === 'en' ? 'VA Transfer' : 'Transfer VA'}</span>
                    </button>
                  </div>
                </div>

                {/* 1. CREDIT CARD FORM */}
                {paymentChannel === 'card' && (
                  <div className="space-y-4 animate-fade-in bg-neutral-900/20 border border-gold-900/10 p-5 rounded-md">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">
                        {language === 'ar' ? 'رقم بطاقة الائتمان' : language === 'en' ? 'Credit Card Number' : 'Nomor Kartu Kredit'}
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(val);
                        }}
                        className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">
                        {language === 'ar' ? 'اسم صاحب البطاقة' : language === 'en' ? 'Cardholder Name' : 'Nama Pemegang Kartu'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MR. REYHAN RIDWAN"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">
                          {language === 'ar' ? 'تاريخ الانتهاء (MM/YY)' : language === 'en' ? 'Expiry Date (MM/YY)' : 'Masa Berlaku (MM/YY)'}
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length > 2) {
                              val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                            }
                            setCardExpiry(val);
                          }}
                          className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-mono text-center"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-mono text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. QRIS QR CODE DISPLAY */}
                {paymentChannel === 'qris' && (
                  <div className="bg-neutral-900/60 border border-gold-400/15 rounded-lg p-6 space-y-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="font-serif text-gold-200 text-sm font-medium">
                      {language === 'ar' ? 'امسح رمز QRIS الرسمي' : language === 'en' ? 'Scan Official VIP QRIS Code' : 'Pindai Kode QRIS VIP Gateway'}
                    </p>
                    
                    <div className="flex gap-2">
                      {['gopay', 'ovo', 'dana'].map((ew) => (
                        <button
                          type="button"
                          key={ew}
                          onClick={() => setSelectedEWallet(ew as any)}
                          className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold border cursor-pointer ${
                            selectedEWallet === ew
                              ? 'bg-gold-400 text-neutral-950 border-gold-400'
                              : 'bg-neutral-950 text-gold-100/40 border-gold-900/10'
                          }`}
                        >
                          {ew}
                        </button>
                      ))}
                    </div>

                    {/* Simple geometric QR display */}
                    <div className="bg-white p-4 rounded-md inline-block relative border-2 border-gold-400/40">
                      <div className="w-40 h-40 bg-[radial-gradient(#000_3px,transparent_3px)] bg-[size:10px_10px] flex items-center justify-center">
                        <div className="absolute top-6 left-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute top-6 right-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute bottom-6 left-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute w-10 h-10 bg-gold-400 flex items-center justify-center font-bold text-black text-[10px] rounded shadow border border-white">
                          QRIS
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gold-100/60 leading-relaxed space-y-1">
                      <p>{language === 'ar' ? 'افتح تطبيق المحفظة الإلكترونية أو البنك الخاص بك وامسح هذا الرمز.' : language === 'en' ? 'Open your banking or e-wallet app and scan this QR code.' : 'Buka aplikasi perbankan atau e-wallet pilihan Anda lalu scan QR code.'}</p>
                      <p className="font-mono text-gold-400 text-[10px] font-bold">{language === 'ar' ? 'الوقت المتبقي: 04:59' : language === 'en' ? 'TIME REMAINING: 04:59' : 'WAKTU BAYAR: 04:59'}</p>
                    </div>
                  </div>
                )}

                {/* 3. VIRTUAL ACCOUNT DETAILS */}
                {paymentChannel === 'va' && (
                  <div className="bg-neutral-900/60 border border-gold-400/15 rounded-lg p-6 space-y-6 text-left animate-fade-in">
                    <div className="flex justify-between items-center border-b border-gold-900/10 pb-4">
                      <p className="font-serif text-gold-200 text-sm font-medium">{language === 'ar' ? 'تحويل الحساب الافتراضي' : 'Virtual Account Transfer'}</p>
                      <div className="flex gap-2">
                        {['bca', 'mandiri', 'bni'].map((bank) => (
                          <button
                            type="button"
                            key={bank}
                            onClick={() => setSelectedBank(bank as any)}
                            className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold border cursor-pointer ${
                              selectedBank === bank
                                ? 'bg-gold-400 text-neutral-950 border-gold-400'
                                : 'bg-neutral-950 text-gold-100/40 border-gold-900/10'
                            }`}
                          >
                            {bank.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-neutral-950 p-4 border border-gold-400/10 rounded flex items-center justify-between font-mono">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-gold-400/50 block">
                          {language === 'ar' ? `رقم الحساب الافتراضي (${selectedBank.toUpperCase()})` : language === 'en' ? `VA ACCOUNT NUMBER (${selectedBank.toUpperCase()})` : `NOMOR REKENING VA ${selectedBank.toUpperCase()}`}
                        </span>
                        <span className="text-sm md:text-base font-bold text-gold-200 tracking-wider">
                          {selectedBank === 'bca' ? '3901 0899 4567 8912' : selectedBank === 'mandiri' ? '88012 89945 678912' : '98014 0899 4567 8912'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={copyVaNumber}
                        className="bg-gold-400/10 border border-gold-400/25 hover:bg-gold-400 text-gold-400 hover:text-neutral-950 p-2 rounded-sm transition-all flex items-center gap-1 text-[10px] font-bold cursor-pointer"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        <span>{copied ? t.common.copied : t.common.copy}</span>
                      </button>
                    </div>

                    <div className="text-xs text-gold-200/50 leading-relaxed space-y-2">
                      <h5 className="font-bold text-gold-200 text-xs">{t.rental.paymentInstructions}:</h5>
                      <p>{language === 'ar' ? '1. انسخ رقم الحساب الافتراضي أعلاه.' : language === 'en' ? '1. Copy the Virtual Account number above.' : '1. Salin nomor Virtual Account di atas.'}</p>
                      <p>{language === 'ar' ? '2. أكمل التحويل عبر تطبيق البنك الخاص بك.' : language === 'en' ? '2. Complete the transfer via Mobile/Internet Banking.' : '2. Lakukan transfer dari Mobile Banking dengan tujuan Virtual Account pilihan Anda.'}</p>
                      <p>{language === 'ar' ? '3. سيتم التحقق من المبلغ الإجمالي ومطابقته تلقائياً.' : language === 'en' ? '3. The exact invoice amount will automatically reconcile.' : '3. Nominal akan otomatis cocok dengan total tagihan sewa di sebelah kanan.'}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Panel Summary Invoice */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-gold-400/15 p-6 rounded-md flex flex-col justify-between h-fit lg:sticky lg:top-24">
                <div className="space-y-6">
                  <h3 className="font-serif text-lg text-gold-200 border-b border-gold-900/10 pb-3 mb-4 font-medium tracking-wide">
                    {t.rental.orderSummary}
                  </h3>

                  <div className="space-y-4 text-xs font-mono text-gold-200/60">
                    <div className="flex justify-between">
                      <span>{t.rental.eTicketVehicle}:</span>
                      <span className="text-gold-200 font-bold font-serif">{selectedVehicle.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.startDate}:</span>
                      <span className="text-gold-200 font-bold">{startDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.duration}:</span>
                      <span className="text-gold-200 font-bold">{durationDays} {language === 'ar' ? 'أيام' : language === 'en' ? 'Days' : 'Hari'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.specsService}:</span>
                      <span className="text-gold-200 font-bold">{t.rental.specsDriverFuel}</span>
                    </div>
                    <div className="flex justify-between border-t border-gold-900/10 pt-4">
                      <span>{t.rental.subtotal}:</span>
                      <span className="text-gold-200 font-bold">Rp {basePriceTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.rental.taxVAT}:</span>
                      <span className="text-gold-200 font-bold">Rp {tax.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between border-t border-gold-400/20 pt-4 text-sm font-sans">
                      <span className="font-serif text-gold-200">{t.rental.totalPayment}:</span>
                      <span className="font-mono text-lg text-gold-400 font-extrabold">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gold-400/15 mt-8">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold py-4 rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full" />
                        <span>{t.common.processing}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={13} />
                        <span>{t.rental.confirmPayment}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* STEP 4: SUCCESS RECEIPT & VOUCHER DISPLAY */}
        {/* ------------------------------------------- */}
        {step === 'success' && confirmedBooking && (
          <div className="animate-fade-in max-w-2xl mx-auto text-center">
            {/* Round success check */}
            <div className="w-16 h-16 bg-gold-400 text-neutral-950 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-gold-500/10">
              <CheckCircle2 size={36} className="stroke-[2.5]" />
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-gold-200 tracking-wide font-medium">
              {t.rental.eTicketSuccess}
            </h1>
            <p className="font-sans text-xs md:text-sm text-gold-100/50 mt-3 max-w-lg mx-auto">
              {language === 'ar'
                ? `تم إرسال التذكرة الإلكترونية وتفاصيل السائق وإيصال الدفع الرسمي إلى ${confirmedBooking.email}.`
                : language === 'en'
                ? `E-Ticket, chauffeur pickup details, and official proof of payment have been dispatched to ${confirmedBooking.email}.`
                : `E-Tiket, rincian serah terima, serta bukti bayar resmi telah berhasil diterbitkan dan dikirimkan ke email Anda (${confirmedBooking.email}).`}
            </p>

            {/* Premium Paper Receipt Block */}
            <div className="bg-neutral-900 border border-gold-400/25 rounded-lg shadow-2xl p-6 md:p-8 mt-10 text-left relative font-sans overflow-hidden">
              {/* Paper cut jagged borders on sides */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-[linear-gradient(45deg,transparent_33.333%,#171717_33.333%,#171717_66.667%,transparent_66.667%),linear-gradient(-45deg,transparent_33.333%,#171717_33.333%,#171717_66.667%,transparent_66.667%)] bg-[size:12px_24px]" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold-900/15 pb-6 mb-6">
                <div>
                  <h3 className="font-serif text-xl text-gold-200 tracking-wide lowercase font-semibold">andhikabalitour</h3>
                  <p className="font-sans text-[10px] text-gold-400 uppercase tracking-widest font-mono mt-0.5">{t.rental.eTicketTitle}</p>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="text-[9px] uppercase text-gold-300/40 block">{t.rental.eTicketCode}</span>
                  <span className="text-sm font-extrabold text-gold-400">{confirmedBooking.bookingCode}</span>
                </div>
              </div>

              {/* Grid content specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed border-b border-gold-900/10 pb-6 mb-6">
                <div className="space-y-2 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gold-300/40">
                    {language === 'ar' ? 'مواصفات السيارة والخدمة' : language === 'en' ? 'Vehicle & Service Specs' : 'Data Kendaraan & Skema'}
                  </p>
                  <p className="text-gold-200 text-sm font-bold">{confirmedBooking.vehicle.name}</p>
                  <p className="text-gold-100/60 uppercase">
                    {t.rental.specsService}: <span className="text-emerald-400 font-bold">{t.rental.specsDriverFuel}</span>
                  </p>
                  <p className="text-gold-100/60">
                    {t.rental.eTicketDuration}: <span className="text-gold-200 font-bold">{confirmedBooking.durationDays} {language === 'ar' ? 'أيام' : language === 'en' ? 'Days' : 'Hari'}</span>
                  </p>
                </div>

                <div className="space-y-2 text-left">
                  <p className="font-mono text-[9px] uppercase tracking-wider text-gold-300/40">
                    {language === 'ar' ? 'بيانات الاستلام والمستأجر' : language === 'en' ? 'Handover & Renter Info' : 'Data Serah Terima'}
                  </p>
                  <p className="text-gold-200 text-sm font-bold">{t.rental.startDate}: {confirmedBooking.startDate}</p>
                  <p className="text-gold-100/60">{t.rental.fullName}: <span className="text-gold-100 font-medium">{confirmedBooking.fullName}</span></p>
                  <p className="text-gold-100/60">{t.rental.pickupLocation}: <span className="text-gold-100 font-medium">{confirmedBooking.deliveryLocation}</span></p>
                </div>
              </div>

              {/* Contact Warning Note */}
              <div className="bg-neutral-950 p-4 border border-gold-900/10 rounded-sm mb-6 flex items-start gap-3">
                <Info size={16} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <div className="text-[11px] text-gold-100/50 leading-relaxed text-left">
                  <p className="font-bold text-gold-300">
                    {language === 'ar' ? 'تنسيق آلي عبر واتساب' : language === 'en' ? 'Automatic WhatsApp Coordination' : 'Konfirmasi WhatsApp Otomatis'}
                  </p>
                  <p className="mt-0.5">
                    {language === 'ar'
                      ? `سيتواصل معك فريق العمليات مباشرة على الرقم ${confirmedBooking.phone} قبل يوم واحد من بدء الإيجار لتأكيد تفاصيل الاستلام والسائق.`
                      : language === 'en'
                      ? `Our concierge logistics team will reach out directly to ${confirmedBooking.phone} 1 day prior to your rental start date to verify all pickup and chauffeur details.`
                      : `Staff operasional pengantaran kami akan menghubungi Anda di nomor ${confirmedBooking.phone} 1 hari sebelum tanggal mulai sewa untuk memvalidasi detail serah terima kunci.`}
                  </p>
                </div>
              </div>

              {/* Total Invoice calculations */}
              <div className="space-y-3 pt-4 border-t border-gold-900/15 font-mono text-xs text-gold-200/50">
                <div className="flex justify-between">
                  <span>{language === 'ar' ? 'طريقة الدفع:' : language === 'en' ? 'Payment Method:' : 'Metode Pembayaran:'}</span>
                  <span className="text-gold-200 font-sans">{confirmedBooking.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.rental.eTicketStatus}:</span>
                  <span className="text-emerald-400 font-bold tracking-wider">{t.rental.confirmed}</span>
                </div>
                <div className="flex justify-between border-t border-gold-900/10 pt-3 text-sm text-gold-100 font-sans">
                  <span className="font-serif">{t.rental.totalPayment}:</span>
                  <span className="font-mono text-lg text-gold-400 font-extrabold">Rp {confirmedBooking.totalPrice.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Dynamic QR block fake representation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-dashed border-gold-900/20">
                <div className="text-[9px] font-mono text-gold-100/30 text-left">
                  <p>{t.common.officialVoucher}</p>
                  <p className="mt-0.5">
                    {language === 'ar'
                      ? 'يرجى إبراز رمز الاستجابة السريعة (QR) لسائق VIP عند الاستقبال.'
                      : language === 'en'
                      ? 'Present this digital voucher QR to your VIP chauffeur at pickup.'
                      : 'Tunjukkan kode QR di samping kepada staff pengirim kendaraan kami saat serah terima.'}
                  </p>
                </div>
                {/* Visual QR Mini */}
                <div className="p-1 bg-white rounded border border-gold-400/20">
                  <div className="w-14 h-14 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[size:6px_6px]" />
                </div>
              </div>

            </div>

            {/* Back home action button */}
            <button
              onClick={handleReset}
              className="mt-10 bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-[0.2em] font-bold py-4 px-10 rounded-sm transition-all duration-300 shadow-md cursor-pointer inline-block active:scale-95"
            >
              {t.rental.backToCatalogBtn}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

function ShieldCheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400">
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l8-2a1 1 0 0 1 .48 0l8 2A1 1 0 0 1 20 6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
