import React, { useState, useEffect } from 'react';
import {
  X, Check, Calendar, Users, ArrowRight, ShieldCheck, CreditCard,
  Sparkles, Printer, Copy, AlertTriangle, Loader2, Wallet, Landmark, CheckCircle2
} from 'lucide-react';
import { Experience, BookingDetails, BookingAddon } from '../types';
import { getExperiences, getBookingAddons } from '../data';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperienceId?: string;
  onBookingSuccess: (booking: BookingDetails) => void;
}

interface Participant {
  name: string;
  idNumber: string; // Passport / KTP
  ageCategory: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialExperienceId,
  onBookingSuccess,
}: BookingModalProps) {
  const { language, t } = useLanguage();
  const experiences = getExperiences(language);
  const addons = getBookingAddons(language);

  // Step state: 'details' | 'payment_gateway' | 'processing' | 'success'
  const [step, setStep] = useState<'details' | 'payment_gateway' | 'processing' | 'success'>('details');

  // Booking fields state
  const [selectedExpId, setSelectedExpId] = useState(initialExperienceId || experiences[0].id);
  const [selectedPricingOptionIndex, setSelectedPricingOptionIndex] = useState<number>(0);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // Blocked Dates State Warning
  const [dateWarning, setDateWarning] = useState<string | null>(null);

  // Dynamic Participants state
  const defaultAge = language === 'en' ? 'Adult' : 'Dewasa';
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', idNumber: '', ageCategory: defaultAge },
    { name: '', idNumber: '', ageCategory: defaultAge },
  ]);

  // Payment State
  const [paymentChannel, setPaymentChannel] = useState<'card' | 'qris' | 'va'>('card');
  const [selectedBank, setSelectedBank] = useState<'bca' | 'mandiri' | 'bni'>('bca');
  const [selectedEWallet, setSelectedEWallet] = useState<'gopay' | 'ovo' | 'dana'>('gopay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [copied, setCopied] = useState(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Sync initial experience ID
  useEffect(() => {
    if (initialExperienceId) {
      setSelectedExpId(initialExperienceId);
      setSelectedPricingOptionIndex(0);
    }
  }, [initialExperienceId, isOpen]);

  // Sync participants list size to guests count
  useEffect(() => {
    setParticipants((prev) => {
      const next = [...prev];
      const ageLabel = language === 'en' ? 'Adult' : 'Dewasa';
      if (next.length < guests) {
        while (next.length < guests) {
          next.push({ name: '', idNumber: '', ageCategory: ageLabel });
        }
      } else if (next.length > guests) {
        return next.slice(0, guests);
      }
      return next;
    });
  }, [guests, language]);

  // Check for fully booked dates
  useEffect(() => {
    if (!date) {
      setDateWarning(null);
      return;
    }
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay(); // 0 Sunday, 1 Monday, etc.

    // 1. Block Mondays
    if (dayOfWeek === 1) {
      setDateWarning(
        language === 'en'
          ? '⚠️ Mondays are scheduled for periodic yacht maintenance and volcanic sanctuary preservation. This date is fully booked. Please choose another date.'
          : '⚠️ Hari Senin adalah jadwal pemeliharaan berkala yacht & area konservasi gunung berapi. Jadwal ini terisi penuh (Fully Booked). Silakan pilih tanggal lain.'
      );
      return;
    }

    // 2. Block specific high-demand dates: July 12, July 15, July 20
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();

    if (year === 2026 && month === 7 && (day === 12 || day === 15 || day === 20)) {
      setDateWarning(
        language === 'en'
          ? '⚠️ This date is fully booked by private VIP expeditions. Please choose another date.'
          : '⚠️ Tanggal ini sudah dipesan penuh oleh tamu kenegaraan (Fully Booked). Silakan pilih tanggal lain.'
      );
      return;
    }

    setDateWarning(null);
  }, [date, language]);

  if (!isOpen) return null;

  const currentExp = experiences.find((e) => e.id === selectedExpId) || experiences[0];
  const selectedPricingOption = currentExp.pricingOptions
    ? currentExp.pricingOptions[selectedPricingOptionIndex] || currentExp.pricingOptions[0]
    : null;

  // Price calculations
  const basePrice = selectedPricingOption
    ? (selectedPricingOption.name.toLowerCase().includes('tandem')
        ? selectedPricingOption.price * Math.max(1, Math.ceil(guests / 2))
        : selectedPricingOption.price * guests)
    : currentExp.pricePerPerson * guests;

  const addonsPrice = addons
    .filter((addon) => selectedAddons.includes(addon.id))
    .reduce((total, addon) => total + addon.price, 0);

  const subtotal = basePrice + addonsPrice;
  const grandTotal = subtotal;

  const handleAddonToggle = (addonId: string) => {
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const handleParticipantChange = (index: number, field: keyof Participant, value: any) => {
    setParticipants((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const validateDetails = () => {
    if (!date) {
      alert(language === 'en' ? 'Please select your preferred tour date.' : 'Mohon pilih tanggal pilihan tur pribadi Anda.');
      return false;
    }
    if (dateWarning) {
      alert(language === 'en' ? 'The selected date is currently fully booked. Please choose another date.' : 'Tanggal yang Anda pilih saat ini sedang penuh (Fully Booked). Silakan pilih tanggal lain.');
      return false;
    }
    if (!fullName.trim()) {
      alert(language === 'en' ? 'Please enter primary booker full name.' : 'Mohon masukkan nama pemesan utama.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      alert(language === 'en' ? 'Please enter a valid email address.' : 'Mohon masukkan alamat email yang valid.');
      return false;
    }
    if (!phone.trim()) {
      alert(language === 'en' ? 'Please enter your active WhatsApp number.' : 'Mohon masukkan nomor WhatsApp aktif Anda.');
      return false;
    }

    // Validate each participant
    for (let i = 0; i < participants.length; i++) {
      if (!participants[i].name.trim()) {
        alert(language === 'en' ? `Please provide name for Guest #${i + 1}` : `Mohon lengkapi nama untuk Peserta #${i + 1}`);
        return false;
      }
      if (!participants[i].idNumber.trim()) {
        alert(language === 'en' ? `Please provide ID / Passport number for Guest #${i + 1}` : `Mohon lengkapi nomor KTP / Paspor untuk Peserta #${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const generateWhatsAppMessage = (booking: any) => {
    const hasAddons = booking.addons && booking.addons.length > 0;
    const listAddons = hasAddons
      ? addons.filter((addon) => booking.addons.includes(addon.id))
          .map((addon) => `• ${addon.name} (+Rp ${addon.price.toLocaleString('id-ID')})`)
          .join('\n')
      : null;

    const listParticipants = booking.participants
      .map((part: any, i: number) => `  ${i + 1}. ${part.name} (${part.ageCategory} - ID: ${part.idNumber})`)
      .join('\n');

    if (language === 'ar') {
      return `⚜️ *تأكيد حجز كبار الشخصيات - أنديكا بالي تور* ⚜️\n\n` +
        `*العميل الرئيسي:*\n` +
        `• الاسم: ${booking.fullName}\n` +
        `• البريد الإلكتروني: ${booking.email}\n` +
        `• رقم الواتساب: ${booking.phone}\n\n` +
        `*تفاصيل الرحلة:*\n` +
        `• باقة الرحلة: ${currentExp.title}\n` +
        `• خيار الباقة: ${selectedPricingOption ? selectedPricingOption.name : '-'}\n` +
        `• تاريخ الرحلة: ${booking.date}\n` +
        `• عدد الضيوف: ${booking.guests} شخص/أشخاص\n\n` +
        `*قائمة المشاركين:*\n${listParticipants}\n\n` +
        (listAddons ? `*الترقيات والخدمات الإضافية:*\n${listAddons}\n\n` : '') +
        `*ملخص الأسعار:*\n` +
        `• السعر الأساسي: Rp ${basePrice.toLocaleString('id-ID')}\n` +
        (addonsPrice > 0 ? `• الخدمات الإضافية: Rp ${addonsPrice.toLocaleString('id-ID')}\n` : '') +
        `• *الإجمالي الكلي:* *Rp ${booking.totalPrice.toLocaleString('id-ID')}*\n\n` +
        `*طلبات خاصة:*\n${booking.specialNotes || '-'}\n\n` +
        `أود إتمام عملية الدفع لهذا الحجز. يرجى تزويدي بتفاصيل الدفع وتأكيد توفر الحجز. شكرًا لك! 🙏`;
    } else if (language === 'en') {
      return `⚜️ *VIP RESERVATION CONFIRMATION - ANDIKA BALI TOUR* ⚜️\n\n` +
        `*Primary Booker:*\n` +
        `• Name: ${booking.fullName}\n` +
        `• Email: ${booking.email}\n` +
        `• WhatsApp No: ${booking.phone}\n\n` +
        `*Trip Details:*\n` +
        `• Tour Package: ${currentExp.title}\n` +
        `• Package Option: ${selectedPricingOption ? selectedPricingOption.name : '-'}\n` +
        `• Tour Date: ${booking.date}\n` +
        `• Total Guests: ${booking.guests} Person(s)\n\n` +
        `*List of Participants:*\n${listParticipants}\n\n` +
        (listAddons ? `*VIP Upgrades / Add-ons:*\n${listAddons}\n\n` : '') +
        `*Pricing Summary:*\n` +
        `• Base Price: Rp ${basePrice.toLocaleString('id-ID')}\n` +
        (addonsPrice > 0 ? `• Add-ons Price: Rp ${addonsPrice.toLocaleString('id-ID')}\n` : '') +
        `• *Grand Total:* *Rp ${booking.totalPrice.toLocaleString('id-ID')}*\n\n` +
        `*Special Requests:*\n${booking.specialNotes || '-'}\n\n` +
        `I would like to complete the payment for this reservation. Please provide the payment details and confirm slot availability. Thank you! 🙏`;
    } else {
      return `⚜️ *KONFIRMASI RESERVASI VIP - ANDIKA BALI TOUR* ⚜️\n\n` +
        `*Pemesan Utama:*\n` +
        `• Nama: ${booking.fullName}\n` +
        `• Email: ${booking.email}\n` +
        `• No. WhatsApp: ${booking.phone}\n\n` +
        `*Detail Perjalanan:*\n` +
        `• Paket Wisata: ${currentExp.title}\n` +
        `• Opsi Paket: ${selectedPricingOption ? selectedPricingOption.name : '-'}\n` +
        `• Tanggal Tour: ${booking.date}\n` +
        `• Jumlah Peserta: ${booking.guests} Orang\n\n` +
        `*Daftar Peserta:*\n${listParticipants}\n\n` +
        (listAddons ? `*Layanan Tambahan / Upgrades:*\n${listAddons}\n\n` : '') +
        `*Rincian Biaya:*\n` +
        `• Harga Dasar: Rp ${basePrice.toLocaleString('id-ID')}\n` +
        (addonsPrice > 0 ? `• Biaya Tambahan: Rp ${addonsPrice.toLocaleString('id-ID')}\n` : '') +
        `• *Total Pembayaran:* *Rp ${booking.totalPrice.toLocaleString('id-ID')}*\n\n` +
        `*Catatan Khusus:*\n${booking.specialNotes || '-'}\n\n` +
        `Saya ingin melakukan pembayaran untuk reservasi ini. Mohon info rekening pembayaran dan konfirmasi ketersediaan slot. Terima kasih! 🙏`;
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      const bookingCode = `BG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingObj = {
        id: `booking-${Date.now()}`,
        experienceId: selectedExpId,
        date,
        guests,
        addons: selectedAddons,
        fullName,
        email,
        phone,
        specialNotes,
        participants,
        totalPrice: grandTotal,
        bookingCode,
        paymentMethod: language === 'en' ? 'WhatsApp (Manual Bank Transfer)' : language === 'ar' ? 'واتساب (تحويل بنكي يدوي)' : 'WhatsApp (Transfer Bank Manual)',
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(bookingObj);
      setStep('success');
      onBookingSuccess(bookingObj as any);

      // Trigger automatic redirect to WhatsApp
      const waMessage = generateWhatsAppMessage(bookingObj);
      const waUrl = `https://wa.me/6281225657382?text=${encodeURIComponent(waMessage)}`;
      window.open(waUrl, '_blank');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const copyVaNumber = () => {
    const vaNum = selectedBank === 'bca' ? '3901081134567890' : selectedBank === 'mandiri' ? '8801281134567890' : '9801481134567890';
    navigator.clipboard.writeText(vaNum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStep('details');
    setDate('');
    setGuests(2);
    setSelectedAddons([]);
    setFullName('');
    setEmail('');
    setPhone('');
    setSpecialNotes('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    const ageLabel = language === 'en' ? 'Adult' : 'Dewasa';
    setParticipants([
      { name: '', idNumber: '', ageCategory: ageLabel },
      { name: '', idNumber: '', ageCategory: ageLabel },
    ]);
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/90 backdrop-blur-sm animate-fade-in text-gold-100 font-sans">
      <div
        id="booking-modal-container"
        className="relative bg-neutral-950 border border-gold-400/25 w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden flex flex-col my-8 max-h-[92vh]"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-900 border-b border-gold-900/10">
          <div className="flex items-center space-x-2">
            <Sparkles size={16} className="text-gold-400" />
            <h2 className="font-serif text-lg text-gold-200 tracking-wide font-medium">
              {step === 'details' && (language === 'en' ? 'VIP Tour Package Reservation' : 'Reservasi Paket Tour VIP')}
              {step === 'payment_gateway' && (language === 'en' ? 'Secure Payment Gateway' : 'Gerbang Pembayaran Aman (Payment Gateway)')}
              {step === 'processing' && (language === 'en' ? 'Processing Payment...' : 'Memproses Pembayaran...')}
              {step === 'success' && (language === 'en' ? 'Official E-Voucher & Ticket Confirmation' : 'E-Tiket & Voucher Resmi Konfirmasi')}
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="text-gold-300/60 hover:text-gold-400 transition-colors p-1 cursor-pointer"
            aria-label={t.common.close}
            id="btn-close-booking"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8">

          {/* STEP 1: SPECIFICATION & DETAILS ENTRY */}
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="form-booking-details">
              
              {/* Left Column Form inputs */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Select Package Dropdown */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono">
                    {t.bookingModal.selectPackage}
                  </label>
                  <select
                    value={selectedExpId}
                    onChange={(e) => {
                      setSelectedExpId(e.target.value);
                      setSelectedPricingOptionIndex(0);
                      setSelectedAddons([]); // reset upgrades
                    }}
                    id="booking-select-experience"
                    className="w-full bg-neutral-900 border border-gold-400/20 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans cursor-pointer"
                  >
                    {experiences.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title} — {exp.pricingOptions ? `Single Rp ${exp.pricingOptions[0].price.toLocaleString('id-ID')} / Tandem Rp ${exp.pricingOptions[1]?.price.toLocaleString('id-ID')}` : `Rp ${exp.pricePerPerson.toLocaleString('id-ID')} ${t.common.perPerson}`}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Ride Option Selector (e.g. Single vs Tandem) */}
                {currentExp.pricingOptions && (
                  <div className="space-y-2 text-left">
                    <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono">
                      <span>{t.bookingModal.selectPricingOption}</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {currentExp.pricingOptions.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedPricingOptionIndex(idx)}
                          className={`p-3 rounded-sm border text-left cursor-pointer transition-all ${
                            selectedPricingOptionIndex === idx
                              ? 'border-gold-400 bg-gold-400/10 text-gold-100 shadow-md'
                              : 'border-gold-400/20 bg-neutral-900/60 text-gold-100/60 hover:border-gold-400/40'
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono font-bold text-xs">
                            <span>{opt.name}</span>
                            <span className="text-gold-300">Rp {opt.price.toLocaleString('id-ID')}</span>
                          </div>
                          {opt.desc && (
                            <p className="text-[10px] text-gold-100/50 mt-1 font-sans leading-tight">{opt.desc}</p>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date & Guest Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold-400" />
                      <span>{t.bookingModal.tripDate}</span>
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      id="booking-input-date"
                      className="w-full bg-neutral-900 border border-gold-400/20 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans [color-scheme:dark] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono flex items-center gap-1.5">
                      <Users size={13} className="text-gold-400" />
                      <span>{t.bookingModal.totalGuests}</span>
                    </label>
                    <div className="flex items-center border border-gold-400/20 rounded-sm bg-neutral-900">
                      <button
                        type="button"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="px-4 py-3 text-gold-300 hover:text-gold-400 font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center text-sm font-semibold text-gold-100 font-mono">
                        {guests} {language === 'en' ? 'Guests' : 'Orang'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        className="px-4 py-3 text-gold-300 hover:text-gold-400 font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Date Warning blockouts */}
                {dateWarning && (
                  <div className="bg-red-950/40 border border-red-500/30 p-4 rounded-md text-left text-xs text-red-200 flex items-start gap-2.5 animate-pulse">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{dateWarning}</p>
                  </div>
                )}

                {/* DYNAMIC PARTICIPANTS FORM FIELDS */}
                <div className="space-y-4 pt-4 border-t border-gold-900/10 text-left">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs uppercase tracking-widest text-gold-300 font-bold font-mono">
                      {t.bookingModal.participantDetails} ({guests} {language === 'en' ? 'Guests' : 'Orang'})
                    </h3>
                    <span className="text-[10px] font-mono text-gold-400/60">
                      {language === 'en' ? 'REQUIRED' : 'WAJIB DIISI'}
                    </span>
                  </div>

                  <div className="space-y-4" id="participants-data-fields">
                    {participants.map((part, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-900/40 border border-gold-400/10 p-4 rounded-md space-y-3 relative"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs font-bold text-gold-400">
                            {t.bookingModal.participant} #{idx + 1} {idx === 0 ? (language === 'en' ? '(Primary Booker)' : '(Kontak Utama)') : ''}
                          </span>
                          
                          {/* Age Category selection */}
                          <div className="flex gap-2">
                            {[
                              { key: 'Adult', label: t.bookingModal.adult },
                              { key: 'Child', label: t.bookingModal.child },
                            ].map((cat) => {
                              const isActive = (cat.key === 'Adult' && (part.ageCategory === 'Adult' || part.ageCategory === 'Dewasa')) ||
                                               (cat.key === 'Child' && (part.ageCategory === 'Child' || part.ageCategory === 'Anak'));
                              return (
                                <button
                                  key={cat.key}
                                  type="button"
                                  onClick={() => handleParticipantChange(idx, 'ageCategory', cat.label)}
                                  className={`px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase border transition-all cursor-pointer ${
                                    isActive
                                      ? 'bg-gold-400 text-neutral-950 border-gold-400'
                                      : 'bg-transparent text-gold-200/40 border-gold-900/10 hover:border-gold-400/30'
                                  }`}
                                >
                                  {cat.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            placeholder={`${t.bookingModal.fullName} #${idx + 1}`}
                            value={part.name}
                            onChange={(e) => handleParticipantChange(idx, 'name', e.target.value)}
                            className="w-full bg-neutral-950 border border-gold-400/15 px-3 py-2.5 text-xs text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                          />
                          <input
                            type="text"
                            required
                            placeholder={t.bookingModal.idNumber}
                            value={part.idNumber}
                            onChange={(e) => handleParticipantChange(idx, 'idNumber', e.target.value)}
                            className="w-full bg-neutral-950 border border-gold-400/15 px-3 py-2.5 text-xs text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Guest Contact details */}
                <div className="space-y-4 pt-4 border-t border-gold-900/10 text-left">
                  <h3 className="text-xs uppercase tracking-widest text-gold-300 font-bold font-mono">
                    {t.bookingModal.contactInfo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder={t.rental.fullName}
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (participants[0]) {
                          handleParticipantChange(0, 'name', e.target.value);
                        }
                      }}
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
                      placeholder={t.bookingModal.specialRequestsPlaceholder}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                  </div>
                </div>

              </div>

              {/* Right Panel Summary Invoice */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-gold-400/15 p-6 rounded-md flex flex-col justify-between h-fit lg:sticky lg:top-4 text-left">
                <div>
                  <h3 className="font-serif text-lg text-gold-200 border-b border-gold-900/10 pb-3 mb-4 font-medium tracking-wide">
                    {t.bookingModal.pricingSummary}
                  </h3>

                  <div className="flex items-center space-x-3 mb-6 bg-neutral-900 p-3 border border-gold-900/10 rounded-sm">
                    <img
                      src={currentExp.cardImage}
                      alt={currentExp.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-12 h-16 object-cover rounded-sm border border-gold-400/20 flex-shrink-0"
                    />
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-gold-400">
                        {language === 'en' ? 'Private Experience' : 'Aktivitas Privat'}
                      </p>
                      <h4 className="font-serif text-sm text-gold-100 font-medium leading-tight">{currentExp.title}</h4>
                      <p className="font-sans text-[11px] text-gold-200/40 mt-0.5">{currentExp.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center text-gold-100/60">
                      <span>{t.bookingModal.packageBase} ({guests} {language === 'en' ? 'Guests' : 'Orang'})</span>
                      <span className="font-mono text-gold-100">Rp {basePrice.toLocaleString('id-ID')}</span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gold-900/10">
                        <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block">
                          {t.bookingModal.addonsTotal}
                        </span>
                        {addons.filter((addon) => selectedAddons.includes(addon.id)).map((addon) => (
                          <div key={addon.id} className="flex justify-between items-start text-xs text-gold-100/50 pl-2">
                            <span>{addon.name}</span>
                            <span className="font-mono text-gold-300">+Rp {addon.price.toLocaleString('id-ID')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-gold-400/20">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-serif text-base text-gold-200">{t.bookingModal.grandTotal}</span>
                    <span className="font-mono text-xl md:text-2xl text-gold-400 font-bold">Rp {grandTotal.toLocaleString('id-ID')}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={!!dateWarning}
                    id="btn-confirm-details"
                    className={`w-full font-mono text-xs uppercase tracking-[0.2em] font-bold py-4 rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer active:scale-95 ${
                      dateWarning
                        ? 'bg-neutral-800 text-gold-100/35 border border-gold-900/10 cursor-not-allowed'
                        : 'bg-gold-400 hover:bg-gold-500 text-neutral-950 shadow-md hover:shadow-gold-500/10'
                    }`}
                  >
                    <span>
                      {language === 'ar'
                        ? 'تأكيد وحجز عبر واتساب'
                        : language === 'en'
                        ? 'Confirm & Book via WhatsApp'
                        : 'Pesan & Selesaikan via WhatsApp'}
                    </span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[9px] text-gold-300/40 font-mono mt-4">
                    <ShieldCheck size={12} className="text-gold-400" />
                    <span>{t.bookingModal.securityNotice}</span>
                  </div>
                </div>
              </div>

            </form>
          )}

          {/* STEP 2: GATEWAY PAYMENT OPTIONS */}
          {step === 'payment_gateway' && (
            <form onSubmit={handlePaymentSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left" id="form-booking-payment">
              
              {/* Left Column Payment Channels Selection */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono">
                    {t.rental.selectPaymentMethod}
                  </label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentChannel('card')}
                      className={`py-3 px-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
                        paymentChannel === 'card'
                          ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-md'
                          : 'bg-neutral-900 text-gold-200 border-gold-900/20 hover:border-gold-400/30'
                      }`}
                    >
                      <CreditCard size={16} />
                      <span>{language === 'en' ? 'Credit Card' : 'Kartu Kredit'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentChannel('qris')}
                      className={`py-3 px-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
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
                      className={`py-3 px-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-all border flex flex-col items-center gap-1.5 cursor-pointer ${
                        paymentChannel === 'va'
                          ? 'bg-gold-400 text-neutral-950 border-gold-400 shadow-md'
                          : 'bg-neutral-900 text-gold-200 border-gold-900/20 hover:border-gold-400/30'
                      }`}
                    >
                      <Landmark size={16} />
                      <span>Transfer VA</span>
                    </button>
                  </div>
                </div>

                {/* 1. KARTU KREDIT BLOCK */}
                {paymentChannel === 'card' && (
                  <div className="space-y-4 animate-fade-in bg-neutral-900/20 border border-gold-900/10 p-5 rounded-md">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">
                        {language === 'en' ? 'Credit Card Number' : 'Nomor Kartu Kredit'}
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
                        {language === 'en' ? 'Cardholder Name' : 'Nama Pemegang Kartu'}
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
                          {language === 'en' ? 'Expiry Date (MM/YY)' : 'Masa Berlaku (MM/YY)'}
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

                {/* 2. QRIS QR CODE MOCKUP */}
                {paymentChannel === 'qris' && (
                  <div className="bg-neutral-900/60 border border-gold-400/15 rounded-lg p-6 space-y-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="font-serif text-gold-200 text-sm font-medium">
                      {language === 'en' ? 'Scan Official VIP QRIS Code' : 'Pindai Kode QRIS VIP Gateway'}
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

                    {/* QR Code Graphic Representation */}
                    <div className="bg-white p-4 rounded-md inline-block relative border-2 border-gold-400/40">
                      <div className="w-40 h-40 bg-[radial-gradient(#000_3px,transparent_3px)] bg-[size:10px_10px] flex items-center justify-center">
                        <div className="absolute top-6 left-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute top-6 right-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute bottom-6 left-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute w-10 h-10 bg-gold-400 flex items-center justify-center font-bold text-black text-[10px] rounded-md shadow-md border border-white">
                          QRIS
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gold-100/60 font-sans leading-relaxed space-y-1">
                      <p>{language === 'en' ? 'Open your banking or e-wallet app and scan this QR code.' : 'Silakan buka aplikasi e-wallet pilihan Anda lalu scan QR code di atas.'}</p>
                      <p className="font-mono text-gold-400 text-[10px] font-bold">{language === 'en' ? 'EXPIRES IN 04:59' : 'WAKTU BAYAR: 04:59'}</p>
                    </div>
                  </div>
                )}

                {/* 3. VIRTUAL BANK ACCOUNT TRANSFER */}
                {paymentChannel === 'va' && (
                  <div className="bg-neutral-900/60 border border-gold-400/15 rounded-lg p-6 space-y-6 text-left animate-fade-in">
                    <div className="flex justify-between items-center border-b border-gold-900/10 pb-4">
                      <p className="font-serif text-gold-200 text-sm font-medium">Virtual Account Transfer</p>
                      
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

                    {/* VA Number display with copy */}
                    <div className="bg-neutral-950 p-4 border border-gold-400/10 rounded flex items-center justify-between font-mono">
                      <div className="text-left">
                        <span className="text-[9px] uppercase tracking-wider text-gold-400/50 block">
                          {language === 'en' ? `VA ACCOUNT NUMBER (${selectedBank.toUpperCase()})` : `NOMOR VIRTUAL ACCOUNT ${selectedBank.toUpperCase()}`}
                        </span>
                        <span className="text-base md:text-lg font-bold text-gold-200 tracking-wider">
                          {selectedBank === 'bca' ? '3901 0811 3456 7890' : selectedBank === 'mandiri' ? '88012 81134 567890' : '98014 0811 3456 7890'}
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

                    <div className="text-xs text-gold-200/50 leading-relaxed font-sans space-y-2">
                      <h5 className="font-bold text-gold-200 text-xs">{t.rental.paymentInstructions}:</h5>
                      <p>{language === 'en' ? '1. Copy the Virtual Account number above.' : '1. Salin nomor Virtual Account di atas.'}</p>
                      <p>{language === 'en' ? '2. Open your mobile banking app and select transfer to Virtual Account.' : '2. Buka mobile banking bank Anda, pilih menu transfer ke Virtual Account.'}</p>
                      <p>{language === 'en' ? '3. Paste the VA number, confirm the invoice total, and complete payment.' : '3. Masukkan nomor VA, periksa nominal pembayaran total, dan selesaikan transaksi.'}</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column Checkout summary */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-gold-400/15 p-6 rounded-md flex flex-col justify-between h-fit lg:sticky lg:top-4">
                <div className="space-y-6">
                  <h3 className="font-serif text-lg text-gold-200 border-b border-gold-900/10 pb-3 mb-4 font-medium tracking-wide">
                    {language === 'en' ? 'Transaction Summary' : 'Summary Transaksi'}
                  </h3>

                  <div className="space-y-4 text-xs font-mono text-gold-200/60">
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Tour Package:' : 'Paket Tur:'}</span>
                      <span className="text-gold-200 font-bold font-serif">{currentExp.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Date:' : 'Tanggal:'}</span>
                      <span className="text-gold-200 font-bold">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? 'Guests:' : 'Peserta:'}</span>
                      <span className="text-gold-200 font-bold">{guests} {language === 'en' ? 'Guests' : 'Orang'}</span>
                    </div>
                    <div className="flex justify-between border-t border-gold-400/20 pt-4 text-sm font-sans">
                      <span className="font-serif text-gold-200">{t.bookingModal.grandTotal}:</span>
                      <span className="font-mono text-lg text-gold-400 font-extrabold">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gold-400/15 mt-8">
                  <button
                    type="submit"
                    className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold py-4 rounded-sm transition-all duration-300 shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                    id="btn-submit-payment"
                  >
                    <CheckCircle2 size={13} />
                    <span>{t.bookingModal.payNow}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="w-full border border-gold-400/20 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-xs uppercase tracking-widest py-3 rounded-sm transition-all mt-3 cursor-pointer"
                  >
                    {language === 'en' ? 'Back to Details Form' : 'Kembali Ke Form Data'}
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* STEP 3: TRANSACTION PROCESSING LOADING SPINNER */}
          {step === 'processing' && (
            <div className="py-24 text-center space-y-6 flex flex-col items-center justify-center" id="payment-processing-spinner">
              <Loader2 className="w-16 h-16 text-gold-400 animate-spin" />
              <div className="space-y-2 max-w-sm">
                <h3 className="font-serif text-2xl text-gold-200">
                  {language === 'en' ? 'Processing Secure Transaction' : 'Memproses Transaksi Aman'}
                </h3>
                <p className="text-gold-100/50 text-xs md:text-sm font-sans leading-relaxed">
                  {language === 'en'
                    ? 'Communicating with banking gateway to verify your reservation securely. Please do not close this window...'
                    : 'Sedang berkomunikasi dengan Gerbang Pembayaran untuk memverifikasi pembayaran Anda secara aman. Mohon tidak menutup halaman ini...'}
                </p>
              </div>
              <div className="w-48 h-1 bg-neutral-900 border border-gold-400/10 rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 bg-gold-400 w-1/2 animate-[progress_2s_ease-in-out_infinite]" />
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS OFFICIAL E-TICKET & VOUCHER */}
          {step === 'success' && confirmedBooking && (
            <div className="space-y-8 text-left animate-fade-in" id="booking-success-layout">
              
              {/* Congratulations Header Banner */}
              <div className="bg-gold-500/5 border border-gold-400/20 rounded-lg p-6 md:p-8 text-center space-y-4 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check size={24} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-gold-200 font-medium tracking-wide">
                    {language === 'en' ? 'Reservation Submitted!' : language === 'ar' ? 'تم إرسال الطلب بنجاح!' : 'Pemesanan Berhasil Dikirim!'}
                  </h3>
                  <p className="text-gold-200/60 text-xs md:text-sm font-sans max-w-xl mx-auto leading-relaxed">
                    {language === 'en'
                      ? `We are redirecting you to WhatsApp to complete your payment and confirm your slot. If the page doesn't open automatically, please click the "Chat WhatsApp" button below.`
                      : language === 'ar'
                      ? `نقوم بتوجيهك الآن إلى واتساب لإتمام عملية الدفع وتأكيد حجزك. إذا لم تفتح الصفحة تلقائياً، يرجى الضغط على زر "دردشة واتساب" أدناه.`
                      : `Kami sedang mengarahkan Anda ke WhatsApp untuk menyelesaikan pembayaran dan konfirmasi jadwal. Jika halaman tidak terbuka otomatis, silakan klik tombol "Hubungi WhatsApp" di bawah ini.`}
                  </p>
                </div>
              </div>

              {/* Printable Voucher Ticket layout styled like an actual luxury ticket */}
              <div
                id="printable-luxury-voucher"
                className="bg-neutral-900 border border-gold-400/30 rounded-lg p-6 md:p-10 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative classic background watermark lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#dfab56_1px,transparent_1px),linear-gradient(to_bottom,#dfab56_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.02]" />
                
                <div className="relative z-10 space-y-8">
                  {/* Voucher Header with Branding and QR Code */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gold-900/15 pb-6">
                    <div className="text-left">
                      <span className="font-serif text-2xl text-gold-200 font-bold tracking-widest uppercase">andhikabalitour</span>
                      <span className="block text-[9px] font-mono tracking-[0.25em] text-gold-300/80 uppercase font-bold mt-0.5">
                        {language === 'en' ? 'EXCLUSIVE PRIVATE EXPEDITIONS' : 'LAYANAN TUR PRIVAT EKSKLUSIF'}
                      </span>
                    </div>

                    <div className="bg-white p-2 rounded-sm border border-gold-400 flex items-center gap-3">
                      <div className="w-16 h-16 bg-[radial-gradient(#000_2px,transparent_2px)] bg-[size:6px_6px]" />
                      <div className="text-left font-mono">
                        <span className="text-[8px] text-neutral-400 block uppercase leading-none">VOUCHER CODE</span>
                        <span className="text-xs text-neutral-900 font-bold block">{confirmedBooking.bookingCode}</span>
                        <span className="text-[8px] text-emerald-600 font-bold block mt-1">CONFIRMED PASS</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Tour Specs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left text-xs font-mono">
                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">
                        {language === 'en' ? 'SELECTED TOUR' : 'PAKET PILIHAN'}
                      </span>
                      <span className="text-gold-100 font-serif font-bold text-sm block">{currentExp.title}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">
                        {language === 'en' ? 'TRIP DATE' : 'TANGGAL TRIP'}
                      </span>
                      <span className="text-gold-100 text-sm font-bold block">{confirmedBooking.date}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">
                        {language === 'en' ? 'PRIMARY BOOKER' : 'PEMESAN UTAMA'}
                      </span>
                      <span className="text-gold-100 text-sm font-bold block">{confirmedBooking.fullName}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">
                        {language === 'en' ? 'PAYMENT METHOD' : 'CARA BAYAR'}
                      </span>
                      <span className="text-gold-100 text-sm font-bold block">{confirmedBooking.paymentMethod}</span>
                    </div>
                  </div>

                  {/* PARTICIPANTS TICKETS GRID */}
                  <div className="space-y-4 pt-6 border-t border-gold-900/10">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold-400 font-bold">
                      {language === 'en' ? 'REGISTERED GUESTS (E-TICKET HOLDERS)' : 'DAFTAR NAMA PESERTA TERDAFTAR (E-TICKET HOLDER)'}
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="success-participants-list">
                      {confirmedBooking.participants.map((part: Participant, i: number) => (
                        <div key={i} className="bg-neutral-950 p-4 border border-gold-400/10 rounded flex flex-col justify-between">
                          <div className="text-left space-y-1">
                            <span className="text-[8px] font-mono text-gold-400/50 uppercase">PASS HOLDER #{i + 1}</span>
                            <p className="font-serif text-sm text-gold-200 font-bold">{part.name}</p>
                            <p className="font-mono text-[10px] text-gold-100/50">ID / Passport: {part.idNumber}</p>
                          </div>
                          <span className="inline-block mt-3 px-2 py-0.5 bg-gold-400/10 border border-gold-400/25 rounded text-[8px] font-mono font-bold text-gold-400 uppercase w-fit">
                            {part.ageCategory}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights and guidelines for user */}
                  <div className="bg-neutral-950 p-5 border border-gold-900/10 rounded-sm text-left grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans text-gold-200/60 leading-relaxed">
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-gold-100">
                        {language === 'en' ? 'Pickup & Logistics Details:' : 'Informasi Penting Penjemputan:'}
                      </h5>
                      <p>
                        {language === 'en'
                          ? '• Your private chauffeur & pro guide will arrive at your hotel lobby at 07:00 AM WITA (customizable on request).'
                          : '• Supir VIP pribadi Anda akan menjemput di lobi hotel akomodasi pukul 07:00 AM WITA (tergantung rute).'}
                      </p>
                      <p>
                        {language === 'en'
                          ? '• Our concierge team will reach out via WhatsApp 1 day prior to synchronize route and pickup timing.'
                          : '• Pihak Concierge kami akan menghubungi Anda kembali via WhatsApp 1 hari sebelum perjalanan untuk sinkronisasi rute jemput.'}
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-gold-100">
                        {language === 'en' ? 'All-Inclusive Services:' : 'Fasilitas All-In:'}
                      </h5>
                      <p>
                        {language === 'en'
                          ? '• Fresh chilled towels, mineral water, comprehensive insurance, attraction admissions, and gourmet lunch are 100% included.'
                          : '• Handuk dingin, air mineral, asuransi penuh, tiket masuk objek wisata, serta makan siang gourmet semuanya sudah termasuk 100%.'}
                      </p>
                      <p>
                        {language === 'en'
                          ? '• Please bring comfortable casual attire, swimsuit, sunglasses, and reef-safe sunscreen.'
                          : '• Silakan siapkan pakaian santai, baju renang, kacamata hitam, atau pelindung matahari sesuai paket Anda.'}
                      </p>
                    </div>
                  </div>

                  {/* Price Summary footer on voucher */}
                  <div className="flex justify-between items-baseline pt-4 border-t border-gold-900/15">
                    <span className="font-mono text-[9px] text-gold-400/50 uppercase">
                      {language === 'en' ? 'TOTAL INVOICE (PAID)' : 'Total Invoice Lunas'}
                    </span>
                    <span className="font-mono text-xl font-bold text-gold-400">
                      Rp {typeof confirmedBooking.totalPrice === 'number' ? confirmedBooking.totalPrice.toLocaleString('id-ID') : confirmedBooking.totalPrice}
                    </span>
                  </div>

                </div>
              </div>

              {/* PDF Action buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`https://wa.me/6281225657382?text=${encodeURIComponent(generateWhatsAppMessage(confirmedBooking))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.013-5.101-2.861-6.951C16.63 1.951 14.162.947 11.53.947c-5.437 0-9.86 4.419-9.864 9.852a9.782 9.782 0 0 0 1.502 5.125l-1.015 3.703 3.792-.994zm13.716-6.19c-.31-.155-1.838-.907-2.122-1.01-.285-.102-.492-.155-.7.155-.207.31-.802 1.01-.984 1.217-.181.206-.362.232-.672.077-.31-.155-1.306-.48-2.487-1.534-.919-.82-1.539-1.834-1.72-2.143-.181-.31-.02-.477.136-.63.14-.139.31-.361.464-.542.155-.181.206-.31.31-.516.103-.207.052-.387-.026-.542-.078-.155-.7-1.688-.958-2.31-.252-.61-.51-.527-.7-.527-.181 0-.388-.026-.596-.026-.206 0-.542.077-.827.387-.284.31-1.086 1.058-1.086 2.58 0 1.524 1.112 2.994 1.267 3.201.155.207 2.188 3.342 5.3 4.685.74.32 1.318.51 1.77.653.743.236 1.419.203 1.953.123.595-.088 1.838-.75 2.1-1.474.26-.724.26-1.344.181-1.474-.077-.13-.284-.207-.595-.362z" />
                  </svg>
                  <span>
                    {language === 'en' ? 'Chat WhatsApp' : language === 'ar' ? 'دردشة واتساب' : 'Hubungi WhatsApp'}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={13} />
                  <span>{t.bookingModal.printVoucher}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-neutral-900 border border-gold-400/20 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-sm transition-all cursor-pointer"
                >
                  {t.common.back}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
