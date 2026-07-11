import React, { useState, useEffect } from 'react';
import {
  X, Check, Calendar, Users, Star, ArrowRight, ShieldCheck, CreditCard,
  Sparkles, Printer, Download, Copy, AlertTriangle, Loader2, Wallet, Landmark, CheckCircle2
} from 'lucide-react';
import { Experience, BookingDetails, BookingAddon } from '../types';
import { EXPERIENCES, BOOKING_ADDONS } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperienceId?: string;
  onBookingSuccess: (booking: BookingDetails) => void;
}

interface Participant {
  name: string;
  idNumber: string; // Passport / KTP
  ageCategory: 'Dewasa' | 'Anak';
}

export default function BookingModal({
  isOpen,
  onClose,
  initialExperienceId,
  onBookingSuccess,
}: BookingModalProps) {
  // Step state: 'details' | 'payment_gateway' | 'processing' | 'success'
  const [step, setStep] = useState<'details' | 'payment_gateway' | 'processing' | 'success'>('details');

  // Booking fields state
  const [selectedExpId, setSelectedExpId] = useState(initialExperienceId || EXPERIENCES[0].id);
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
  const [participants, setParticipants] = useState<Participant[]>([
    { name: '', idNumber: '', ageCategory: 'Dewasa' },
    { name: '', idNumber: '', ageCategory: 'Dewasa' },
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
    }
  }, [initialExperienceId, isOpen]);

  // Sync participants list size to guests count
  useEffect(() => {
    setParticipants((prev) => {
      const next = [...prev];
      if (next.length < guests) {
        // Add new blank participants
        while (next.length < guests) {
          next.push({ name: '', idNumber: '', ageCategory: 'Dewasa' });
        }
      } else if (next.length > guests) {
        // Trim participants
        return next.slice(0, guests);
      }
      return next;
    });
  }, [guests]);

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
      setDateWarning('⚠️ Hari Senin adalah jadwal pemeliharaan berkala yacht & area konservasi gunung berapi. Jadwal ini terisi penuh (Fully Booked). Silakan pilih tanggal lain.');
      return;
    }

    // 2. Block specific high-demand dates: July 12, July 15, July 20
    const month = selectedDate.getMonth() + 1; // 1-indexed
    const day = selectedDate.getDate();
    const year = selectedDate.getFullYear();

    if (year === 2026 && month === 7 && (day === 12 || day === 15 || day === 20)) {
      setDateWarning('⚠️ Tanggal ini sudah dipesan penuh oleh tamu kenegaraan (Fully Booked). Silakan pilih tanggal lain.');
      return;
    }

    setDateWarning(null);
  }, [date]);

  if (!isOpen) return null;

  const currentExp = EXPERIENCES.find((e) => e.id === selectedExpId) || EXPERIENCES[0];

  // Price calculations
  const basePrice = currentExp.pricePerPerson * guests;
  const addonsPrice = BOOKING_ADDONS.filter((addon) => selectedAddons.includes(addon.id)).reduce(
    (total, addon) => total + addon.price,
    0
  );
  const subtotal = basePrice + addonsPrice;
  const tax = Math.round(subtotal * 0.1); // 10% Luxury tax
  const grandTotal = subtotal + tax;

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
      alert('Mohon pilih tanggal pilihan tur pribadi Anda.');
      return false;
    }
    if (dateWarning) {
      alert('Tanggal yang Anda pilih saat ini sedang penuh (Fully Booked). Silakan pilih tanggal lain.');
      return false;
    }
    if (!fullName.trim()) {
      alert('Mohon masukkan nama pemesan utama.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      alert('Mohon masukkan alamat email yang valid.');
      return false;
    }
    if (!phone.trim()) {
      alert('Mohon masukkan nomor WhatsApp aktif Anda.');
      return false;
    }

    // Validate each participant
    for (let i = 0; i < participants.length; i++) {
      if (!participants[i].name.trim()) {
        alert(`Mohon lengkapi nama untuk Peserta #${i + 1}`);
        return false;
      }
      if (!participants[i].idNumber.trim()) {
        alert(`Mohon lengkapi nomor KTP / Paspor untuk Peserta #${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment_gateway');
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentChannel === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        alert('Mohon masukkan nomor kartu kredit 16-digit yang valid.');
        return;
      }
      if (!cardExpiry || !cardExpiry.includes('/')) {
        alert('Mohon masukkan tanggal kedaluwarsa MM/YY.');
        return;
      }
      if (cardCvv.length < 3) {
        alert('Mohon masukkan kode keamanan CVV yang valid.');
        return;
      }
    }

    // Trigger loading spinner
    setStep('processing');

    // Simulate 2.5s secure gateway processing
    setTimeout(() => {
      const bookingCode = `BG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      
      let finalPaymentLabel = 'Kartu Kredit (Visa/Mastercard)';
      if (paymentChannel === 'qris') {
        finalPaymentLabel = `E-Wallet QRIS (${selectedEWallet.toUpperCase()})`;
      } else if (paymentChannel === 'va') {
        finalPaymentLabel = `Virtual Account (${selectedBank.toUpperCase()})`;
      }

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
        paymentMethod: finalPaymentLabel,
        createdAt: new Date().toISOString(),
      };

      setConfirmedBooking(bookingObj);
      setStep('success');
      onBookingSuccess(bookingObj as any);
    }, 2500);
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
    setParticipants([
      { name: '', idNumber: '', ageCategory: 'Dewasa' },
      { name: '', idNumber: '', ageCategory: 'Dewasa' },
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
              {step === 'details' && 'Reservasi Paket Tour VIP'}
              {step === 'payment_gateway' && 'Gerbang Pembayaran Aman (Payment Gateway)'}
              {step === 'processing' && 'Memproses Pembayaran...'}
              {step === 'success' && 'E-Tiket & Voucher Resmi Konfirmasi'}
            </h2>
          </div>
          <button
            onClick={handleReset}
            className="text-gold-300/60 hover:text-gold-400 transition-colors p-1 cursor-pointer"
            aria-label="Tutup"
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
                    Pilih Paket Perjalanan Eksklusif
                  </label>
                  <select
                    value={selectedExpId}
                    onChange={(e) => {
                      setSelectedExpId(e.target.value);
                      setSelectedAddons([]); // reset upgrades
                    }}
                    id="booking-select-experience"
                    className="w-full bg-neutral-900 border border-gold-400/20 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans cursor-pointer"
                  >
                    {EXPERIENCES.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title} — ${exp.pricePerPerson} per orang
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Guest Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase tracking-widest text-gold-300/70 font-semibold font-mono flex items-center gap-1.5">
                      <Calendar size={13} className="text-gold-400" />
                      <span>Pilih Tanggal</span>
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
                      <span>Jumlah Peserta</span>
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
                        {guests} Orang
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
                      Data Informasi Seluruh Peserta ({guests} Orang)
                    </h3>
                    <span className="text-[10px] font-mono text-gold-400/60">WAJIB DISI</span>
                  </div>

                  <div className="space-y-4" id="participants-data-fields">
                    {participants.map((part, idx) => (
                      <div
                        key={idx}
                        className="bg-neutral-900/40 border border-gold-400/10 p-4 rounded-md space-y-3 relative"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs font-bold text-gold-400">
                            Peserta #{idx + 1} {idx === 0 ? '(Kontak Utama)' : ''}
                          </span>
                          
                          {/* Age Category selection */}
                          <div className="flex gap-2">
                            {['Dewasa', 'Anak'].map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => handleParticipantChange(idx, 'ageCategory', cat)}
                                className={`px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold uppercase border transition-all ${
                                  part.ageCategory === cat
                                    ? 'bg-gold-400 text-neutral-950 border-gold-400'
                                    : 'bg-transparent text-gold-200/40 border-gold-900/10 hover:border-gold-400/30'
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            required
                            placeholder={`Nama Lengkap Peserta #${idx + 1}`}
                            value={part.name}
                            onChange={(e) => handleParticipantChange(idx, 'name', e.target.value)}
                            className="w-full bg-neutral-950 border border-gold-400/15 px-3 py-2.5 text-xs text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                          />
                          <input
                            type="text"
                            required
                            placeholder="Nomor KTP / Paspor"
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
                    Informasi Kontak Pemesan & Pengiriman E-Tiket
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Nama Pemesan Utama"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        // Sync first participant name by default
                        if (participants[0]) {
                          handleParticipantChange(0, 'name', e.target.value);
                        }
                      }}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Alamat Email (E-Tiket dikirim kesini)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      required
                      placeholder="Nomor WhatsApp Utama (aktif)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                    <input
                      type="text"
                      placeholder="Permintaan Khusus (Diet, Alergi, dll.)"
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 placeholder-gold-300/20"
                    />
                  </div>
                </div>

                {/* VIP Upgrades Checklist */}
                <div className="space-y-3 text-left">
                  <h3 className="text-xs uppercase tracking-widest text-gold-300 font-bold font-mono">
                    Peningkatan Premium (VIP Upgrades)
                  </h3>
                  <div className="space-y-3">
                    {BOOKING_ADDONS.map((addon) => {
                      const isChecked = selectedAddons.includes(addon.id);
                      return (
                        <div
                          key={addon.id}
                          onClick={() => handleAddonToggle(addon.id)}
                          className={`flex items-start justify-between p-4 border rounded-sm transition-all duration-300 cursor-pointer ${
                            isChecked
                              ? 'bg-gold-500/5 border-gold-400'
                              : 'bg-neutral-900/20 border-gold-900/10 hover:border-gold-400/30'
                          }`}
                        >
                          <div className="flex items-start space-x-3 pr-4">
                            <div
                              className={`mt-1 w-4 h-4 rounded-sm border flex items-center justify-center transition-all ${
                                isChecked ? 'bg-gold-400 border-gold-400 text-neutral-950' : 'border-gold-400/30'
                              }`}
                            >
                              {isChecked && <Check size={12} className="stroke-[3]" />}
                            </div>
                            <div className="text-left">
                              <h4 className="font-serif text-sm text-gold-200 font-medium">
                                {addon.name === 'Bespoke Private Photographer' ? 'Fotografer Pribadi Profesional' :
                                 addon.name === 'Cinematic Drone Videography' ? 'Videografi Drone Sinematik 4K' :
                                 addon.name === 'Veuve Clicquot Champagne & Caviar' ? 'Champagne Premium & Kaviar' :
                                 'Transfer Helikopter Eksklusif (1 Arah)'}
                              </h4>
                              <p className="font-sans text-[11px] text-gold-100/50 leading-relaxed mt-0.5">
                                {addon.description === 'A professional travel photographer to capture candid moments of your adventure (Includes 50+ edited high-res digital shots).' ? 'Dokumentasikan momen-momen emas perjalanan privat Anda dengan fotografer berpengalaman (Termasuk 50+ file digital diedit high-res).' :
                                 addon.description === 'Aerial video shooting utilizing 4K cinema drones for dramatic landscape memories (Includes a 1-minute social media reel).' ? 'Video udara berkelas tinggi menggunakan drone sinematik 4K untuk klip memori lanskap spektakuler.' :
                                 addon.description === 'A chilled bottle of premium champagne accompanied by gourmet local caviar and fresh strawberries on ice.' ? 'Sajian sebotol Champagne mewah dingin dipadukan kaviar lokal segar di atas es serut.' :
                                 'Lewati lalu lintas jalan raya Bali. Terbang langsung dari pelabuhan heli langsung ke helipad resort Anda.'}
                              </p>
                            </div>
                          </div>
                          <span className="font-mono text-sm font-semibold text-gold-400 flex-shrink-0">
                            +${addon.price}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Panel Summary Invoice */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-gold-400/15 p-6 rounded-md flex flex-col justify-between h-fit lg:sticky lg:top-4 text-left">
                <div>
                  <h3 className="font-serif text-lg text-gold-200 border-b border-gold-900/10 pb-3 mb-4 font-medium tracking-wide">
                    Rincian Pembayaran
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
                      <p className="font-mono text-[9px] uppercase tracking-wider text-gold-400">Private Experience</p>
                      <h4 className="font-serif text-sm text-gold-100 font-medium leading-tight">{currentExp.title}</h4>
                      <p className="font-sans text-[11px] text-gold-200/40 mt-0.5">{currentExp.location}</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center text-gold-100/60">
                      <span>Tarif Dasar ({guests} Orang)</span>
                      <span className="font-mono text-gold-100">${basePrice}</span>
                    </div>

                    {selectedAddons.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-gold-900/10">
                        <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block">Upgrade Tambahan</span>
                        {BOOKING_ADDONS.filter((addon) => selectedAddons.includes(addon.id)).map((addon) => (
                          <div key={addon.id} className="flex justify-between items-start text-xs text-gold-100/50 pl-2">
                            <span>
                              {addon.name === 'Bespoke Private Photographer' ? 'Fotografer Pribadi' :
                               addon.name === 'Cinematic Drone Videography' ? 'Videografi Drone 4K' :
                               addon.name === 'Veuve Clicquot Champagne & Caviar' ? 'Champagne & Kaviar' :
                               'Transfer Helikopter'}
                            </span>
                            <span className="font-mono text-gold-300">+${addon.price}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center text-gold-100/60 pt-4 border-t border-gold-900/10">
                      <span>Subtotal</span>
                      <span className="font-mono text-gold-100">${subtotal}</span>
                    </div>

                    <div className="flex justify-between items-center text-gold-100/60">
                      <span className="flex items-center gap-1">
                        <span>Pajak Pariwisata & Layanan VIP</span>
                        <span className="bg-gold-500/10 text-gold-300 font-mono text-[9px] px-1.5 py-0.5 rounded">10%</span>
                      </span>
                      <span className="font-mono text-gold-100">${tax}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-8 border-t border-gold-400/20">
                  <div className="flex justify-between items-baseline mb-6">
                    <span className="font-serif text-base text-gold-200">Total Pembayaran</span>
                    <span className="font-mono text-2xl md:text-3xl text-gold-400 font-bold">${grandTotal}</span>
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
                    <span>Lanjutkan ke Pembayaran Aman</span>
                    <ArrowRight size={14} />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[9px] text-gold-300/40 font-mono mt-4">
                    <ShieldCheck size={12} className="text-gold-400" />
                    <span>SECURE SSL 256-BIT RESERVATION DESK</span>
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
                    Pilih Metode Pembayaran
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
                      <span>Kartu Kredit</span>
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
                  <div className="space-y-4 animate-fade-in">
                    <div className="space-y-1.5">
                      <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">Nomor Kartu Kredit</label>
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
                      <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">Nama Pemegang Kartu</label>
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
                        <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">Masa Berlaku (Expiry Date)</label>
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
                        <label className="block text-[10px] uppercase tracking-widest text-gold-300/60 font-mono font-medium">Kode CVV</label>
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
                    <p className="font-serif text-gold-200 text-sm font-medium">Pindai Kode QRIS VIP Gateway</p>
                    
                    <div className="flex gap-2">
                      {['gopay', 'ovo', 'dana'].map((ew) => (
                        <button
                          type="button"
                          key={ew}
                          onClick={() => setSelectedEWallet(ew as any)}
                          className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold border ${
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
                        {/* QR Corners */}
                        <div className="absolute top-6 left-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute top-6 right-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute bottom-6 left-6 w-8 h-8 border-4 border-black" />
                        <div className="absolute w-10 h-10 bg-gold-400 flex items-center justify-center font-bold text-black text-[10px] rounded-md shadow-md border border-white">
                          QRIS
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-gold-100/60 font-sans leading-relaxed space-y-1">
                      <p>Silakan buka aplikasi e-wallet pilihan Anda lalu scan QR code di atas.</p>
                      <p className="font-mono text-gold-400 text-[10px] font-bold">EXPIRES IN 04:59</p>
                    </div>
                  </div>
                )}

                {/* 3. VIRTUAL BANK ACCOUNT TRANSFER */}
                {paymentChannel === 'va' && (
                  <div className="bg-neutral-900/60 border border-gold-400/15 rounded-lg p-6 space-y-6 text-left animate-fade-in">
                    <div className="flex justify-between items-center border-b border-gold-900/10 pb-4">
                      <p className="font-serif text-gold-200 text-sm font-medium">Nomor Rekening Virtual Account</p>
                      
                      <div className="flex gap-2">
                        {['bca', 'mandiri', 'bni'].map((bank) => (
                          <button
                            type="button"
                            key={bank}
                            onClick={() => setSelectedBank(bank as any)}
                            className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold border ${
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
                        <span className="text-[9px] uppercase tracking-wider text-gold-400/50 block">NOMOR VIRTUAL ACCOUNT {selectedBank.toUpperCase()}</span>
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
                        <span>{copied ? 'Tersalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-gold-200/50 leading-relaxed font-sans space-y-2">
                      <h5 className="font-bold text-gold-200 text-xs">Petunjuk Pembayaran singkat:</h5>
                      <p>1. Salin nomor Virtual Account di atas.</p>
                      <p>2. Buka mobile banking bank Anda, pilih menu transfer ke Virtual Account.</p>
                      <p>3. Masukkan nomor VA, periksa nominal pembayaran total, dan selesaikan transaksi.</p>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Column Checkout summary */}
              <div className="lg:col-span-5 bg-neutral-900/60 border border-gold-400/15 p-6 rounded-md flex flex-col justify-between h-fit lg:sticky lg:top-4">
                <div className="space-y-6">
                  <h3 className="font-serif text-lg text-gold-200 border-b border-gold-900/10 pb-3 mb-4 font-medium tracking-wide">
                    Summary Transaksi
                  </h3>

                  <div className="space-y-4 text-xs font-mono text-gold-200/60">
                    <div className="flex justify-between">
                      <span>Paket Tur:</span>
                      <span className="text-gold-200 font-bold font-serif">{currentExp.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tanggal:</span>
                      <span className="text-gold-200 font-bold">{date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peserta:</span>
                      <span className="text-gold-200 font-bold">{guests} Orang</span>
                    </div>
                    <div className="flex justify-between border-t border-gold-900/10 pt-4">
                      <span>Subtotal:</span>
                      <span className="text-gold-200 font-bold">${subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Levy & PPN (10%):</span>
                      <span className="text-gold-200 font-bold">${tax}</span>
                    </div>
                    <div className="flex justify-between border-t border-gold-400/20 pt-4 text-sm font-sans">
                      <span className="font-serif text-gold-200">Grand Total:</span>
                      <span className="font-mono text-lg text-gold-400 font-extrabold">${grandTotal}</span>
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
                    <span>Konfirmasi Pembayaran</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    className="w-full border border-gold-400/20 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-xs uppercase tracking-widest py-3 rounded-sm transition-all mt-3 cursor-pointer"
                  >
                    Kembali Ke Form Data
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
                <h3 className="font-serif text-2xl text-gold-200">Memproses Transaksi Aman</h3>
                <p className="text-gold-100/50 text-xs md:text-sm font-sans leading-relaxed">
                  Sedang berkomunikasi dengan Gerbang Pembayaran BCA / Visa Gateway untuk memverifikasi pembayaran Anda secara aman. Mohon tidak menutup halaman ini...
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
                <div className="w-12 h-12 rounded-full bg-gold-400 text-neutral-950 flex items-center justify-center">
                  <Check size={24} className="stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl md:text-3xl text-gold-200 font-medium tracking-wide">Pembayaran Terverifikasi & Sukses</h3>
                  <p className="text-gold-200/60 text-xs md:text-sm font-sans max-w-xl mx-auto leading-relaxed">
                    E-Tiket VIP Anda telah berhasil diterbitkan. Salinan resmi PDF & tanda terima Invoice pembayaran telah dikirimkan ke email Anda: <strong className="text-gold-300">{confirmedBooking.email}</strong>
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
                      <span className="font-serif text-2xl text-gold-200 font-bold tracking-widest uppercase">BALI GORGEOUS</span>
                      <span className="block text-[9px] font-mono tracking-[0.25em] text-gold-300/80 uppercase font-bold mt-0.5">EXCLUSIVE PRIVATE DAY CHARTER</span>
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
                      <span className="text-gold-400/50 block uppercase tracking-wider">PAKET PILIHAN</span>
                      <span className="text-gold-100 font-serif font-bold text-sm block">{currentExp.title}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">TANGGAL TRIP</span>
                      <span className="text-gold-100 text-sm font-bold block">{confirmedBooking.date}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">PEMESAN UTAMA</span>
                      <span className="text-gold-100 text-sm font-bold block">{confirmedBooking.fullName}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-gold-400/50 block uppercase tracking-wider">CARA BAYAR</span>
                      <span className="text-gold-100 text-sm font-bold block">{confirmedBooking.paymentMethod}</span>
                    </div>
                  </div>

                  {/* PARTICIPANTS TICKETS GRID */}
                  <div className="space-y-4 pt-6 border-t border-gold-900/10">
                    <h4 className="font-mono text-[10px] uppercase tracking-wider text-gold-400 font-bold">
                      DAFTAR NAMA PESERTA TERDAFTAR (E-TICKET HOLDER)
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="success-participants-list">
                      {confirmedBooking.participants.map((part: Participant, i: number) => (
                        <div key={i} className="bg-neutral-950 p-4 border border-gold-400/10 rounded flex flex-col justify-between">
                          <div className="text-left space-y-1">
                            <span className="text-[8px] font-mono text-gold-400/50 uppercase">PASS HOLDER #{i + 1}</span>
                            <p className="font-serif text-sm text-gold-200 font-bold">{part.name}</p>
                            <p className="font-mono text-[10px] text-gold-100/50">ID/Paspor: {part.idNumber}</p>
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
                      <h5 className="font-bold text-gold-100">Informasi Penting Penjemputan:</h5>
                      <p>• Supir VIP pribadi Anda akan menjemput di lobi hotel akomodasi pukul <strong>07:00 AM</strong> WITA (tergantung rute).</p>
                      <p>• Pihak Concierge kami akan menghubungi Anda kembali via WhatsApp 1 hari sebelum perjalanan untuk sinkronisasi rute jemput.</p>
                    </div>
                    <div className="space-y-1.5">
                      <h5 className="font-bold text-gold-100">Fasilitas All-In:</h5>
                      <p>• Handuk dingin, air mineral, asuransi penuh, tiket masuk objek wisata, serta makan siang gourmet semuanya sudah termasuk 100%.</p>
                      <p>• Silakan siapkan pakaian santai, baju renang, kacamata hitam, atau pelindung matahari sesuai paket Anda.</p>
                    </div>
                  </div>

                  {/* Price Summary footer on voucher */}
                  <div className="flex justify-between items-baseline pt-4 border-t border-gold-900/15">
                    <span className="font-mono text-[9px] text-gold-400/50 uppercase">Total Invoice Lunas</span>
                    <span className="font-mono text-xl font-bold text-gold-400">${confirmedBooking.totalPrice}</span>
                  </div>

                </div>
              </div>

              {/* PDF Action buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-gold-400 hover:bg-gold-500 text-neutral-950 font-mono text-xs uppercase tracking-widest font-bold px-7 py-3.5 rounded-sm transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer size={13} />
                  <span>Cetak E-Tiket (Print)</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-neutral-900 border border-gold-400/20 hover:border-gold-400 text-gold-300 hover:text-gold-100 font-mono text-xs uppercase tracking-widest px-7 py-3.5 rounded-sm transition-all cursor-pointer"
                >
                  Kembali Ke Beranda
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
