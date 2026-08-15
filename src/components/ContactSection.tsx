import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, ChevronUp, CheckCircle, Instagram } from 'lucide-react';
import { FAQS, getExperiences } from '../data';
import { useLanguage } from '../context/LanguageContext';

export default function ContactSection() {
  const { language, t } = useLanguage();
  const experiences = getExperiences(language);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTour, setSelectedTour] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !message) {
      alert(language === 'id' ? 'Mohon isi nama lengkap, alamat email, dan pesan Anda.' : 'Please enter your full name, email address, and message.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 bg-neutral-950 text-gold-100 font-sans min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Title */}
        <div className="max-w-3xl space-y-4 mb-16 text-left">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold-400 font-bold bg-gold-500/5 px-4 py-2 border border-gold-400/10 rounded-full inline-block">
            {t.contact.badge}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-gold-100 font-medium tracking-tight leading-tight">
            {t.contact.title}
          </h1>
          <p className="font-sans text-sm md:text-base text-gold-200/60 leading-relaxed font-light">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Form and info split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24" id="contact-split-grid">
          
          {/* Left Column: Direct Contact info */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="bg-neutral-900/40 border border-gold-400/10 p-8 rounded-lg space-y-6">
              <h3 className="font-serif text-2xl text-gold-200 font-medium border-b border-gold-900/10 pb-4">
                {t.contact.headOffice}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-gold-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">{language === 'id' ? 'Lokasi Kantor Denpasar' : 'Denpasar HQ Location'}</h4>
                    <p className="text-gold-200/60 text-xs md:text-sm leading-relaxed mt-1">
                      {t.contact.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-gold-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">WhatsApp Hotline & Concierge</h4>
                    <a
                      href="https://wa.me/6281225657382"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-200 hover:text-gold-400 text-xs md:text-sm leading-relaxed mt-1 block font-mono"
                    >
                      {t.contact.phone} ({language === 'id' ? 'Tersedia 24/7' : 'Available 24/7'})
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-gold-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">VIP Email Desk</h4>
                    <a
                      href={`mailto:${t.contact.email}`}
                      className="text-gold-200 hover:text-gold-400 text-xs md:text-sm leading-relaxed mt-1 block font-mono"
                    >
                      {t.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 pt-2 border-t border-gold-900/10">
                  <Instagram className="text-gold-400 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">Official Instagram</h4>
                    <a
                      href="https://www.instagram.com/andhika_balidriver?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-200 hover:text-gold-400 text-xs md:text-sm leading-relaxed mt-1 block font-mono"
                    >
                      @andhika_balidriver
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-gold-400 mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 fill-gold-400" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.28 0 .54.04.8.1v-3.5a6.37 6.37 0 1 0 5.54 6.29V9a8.21 8.21 0 0 0 4.77 1.51v-3.5a4.84 4.84 0 0 1-1-.32z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-gold-300 font-bold">Official TikTok</h4>
                    <a
                      href="https://www.tiktok.com/@andhika803?_t=8ch0FI0DRlR&_r=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gold-200 hover:text-gold-400 text-xs md:text-sm leading-relaxed mt-1 block font-mono"
                    >
                      @andhika803
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Map Frame */}
              <div className="border border-gold-400/15 rounded-md overflow-hidden relative h-48 bg-neutral-950">
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-950/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 z-20 space-y-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-ping absolute top-16" />
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 absolute top-16" />
                  <p className="font-serif text-sm text-gold-100 font-medium">Bespoke Lounge Map</p>
                  <p className="font-sans text-[11px] text-gold-200/40">{language === 'id' ? 'Koordinat Kantor Resmi Denpasar Bali' : 'Official Coordinates Denpasar Bali'}</p>
                </div>
                {/* Abstract grid backing */}
                <div className="w-full h-full opacity-10 bg-[linear-gradient(to_right,#dfab56_1px,transparent_1px),linear-gradient(to_bottom,#dfab56_1px,transparent_1px)] bg-[size:14px_14px]" />
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-neutral-900/20 border border-gold-400/10 p-8 rounded-lg text-left">
            <h3 className="font-serif text-2xl text-gold-200 font-medium mb-6">
              {t.contact.formTitle}
            </h3>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" id="vip-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gold-300/70 font-semibold block">{t.contact.formName}</label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'id' ? 'Masukkan nama lengkap' : 'Enter your full name'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans transition-colors placeholder-gold-300/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gold-300/70 font-semibold block">{t.contact.formEmail}</label>
                    <input
                      type="email"
                      required
                      placeholder={language === 'id' ? 'Masukkan alamat email' : 'Enter your email address'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans transition-colors placeholder-gold-300/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gold-300/70 font-semibold block">{t.contact.formPhone}</label>
                    <input
                      type="tel"
                      placeholder="+62 812-3456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans transition-colors placeholder-gold-300/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-gold-300/70 font-semibold block">{language === 'id' ? 'Paket Tour yang Diminati' : 'Preferred Tour Package'}</label>
                    <select
                      value={selectedTour}
                      onChange={(e) => setSelectedTour(e.target.value)}
                      className="w-full bg-neutral-900 border border-gold-400/15 px-4 py-3 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans transition-colors cursor-pointer"
                    >
                      <option value="">{language === 'id' ? '-- Silakan Pilih Paket (Opsional) --' : '-- Please Select Package (Optional) --'}</option>
                      {experiences.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {exp.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-gold-300/70 font-semibold block">{language === 'id' ? 'Pesan atau Kebutuhan Khusus Anda' : 'Your Message / Specific Inquiry'}</label>
                  <textarea
                    rows={5}
                    required
                    placeholder={t.contact.formMessage}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-neutral-900 border border-gold-400/15 p-4 text-sm text-gold-100 rounded-sm focus:outline-none focus:border-gold-400 font-sans transition-colors placeholder-gold-300/20"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-400 hover:bg-gold-500 text-neutral-950 text-xs font-mono font-bold uppercase tracking-widest py-4 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  id="btn-submit-contact"
                >
                  <Send size={13} />
                  <span>{t.contact.formSubmit}</span>
                </button>
              </form>
            ) : (
              <div className="py-12 px-6 text-center space-y-6" id="contact-success-state">
                <div className="w-16 h-16 rounded-full bg-gold-400/10 border border-gold-400/30 flex items-center justify-center mx-auto text-gold-400 animate-bounce">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-2xl text-gold-200">{language === 'id' ? 'Pertanyaan Terkirim dengan Sukses' : 'Message Sent Successfully'}</h4>
                  <p className="text-gold-200/60 text-sm font-sans max-w-md mx-auto leading-relaxed">
                    {t.contact.formSuccess}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setPhone('');
                    setSelectedTour('');
                    setMessage('');
                  }}
                  className="text-xs font-mono uppercase tracking-widest bg-gold-400/10 hover:bg-gold-400/20 border border-gold-400/30 text-gold-400 px-6 py-3 rounded-sm transition-all cursor-pointer"
                >
                  {language === 'id' ? 'Kirim Pesan Baru' : 'Send Another Message'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FAQs Accordion embedded beautifully */}
        <div className="border-t border-gold-900/20 pt-20 max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400 font-semibold">
              {language === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
            </p>
            <h2 className="font-serif text-3xl text-gold-100 font-medium tracking-wide">
              {language === 'id' ? 'FAQ Layanan Tour Eksklusif' : 'Exclusive Tour FAQs'}
            </h2>
          </div>

          <div className="space-y-4 text-left" id="contact-faq-accordions">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={index}
                  className="bg-neutral-900/40 border border-gold-900/10 hover:border-gold-400/15 rounded-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 focus:outline-none text-left cursor-pointer"
                    id={`contact-faq-btn-${index}`}
                  >
                    <div className="flex items-start space-x-4 pr-4">
                      <HelpCircle size={16} className="text-gold-400 mt-1 flex-shrink-0" />
                      <span className="font-serif text-base text-gold-100 font-medium tracking-wide">
                        {language === 'id' ? (
                          faq.question === 'Are all tours completely private?' ? 'Apakah semua tur bersifat sepenuhnya privat?' :
                          faq.question === 'What is the cancellation policy for weather conditions?' ? 'Bagaimana kebijakan pembatalan jika terjadi cuaca buruk?' :
                          faq.question === 'Can dietary restrictions be accommodated?' ? 'Apakah bisa melayani pantangan diet khusus?' :
                          faq.question === 'How far in advance should we secure our dates?' ? 'Berapa hari sebelumnya kami harus memesan jadwal?' :
                          'Apa saja yang perlu kami persiapkan dan bawa?'
                        ) : faq.question}
                      </span>
                    </div>
                    <div className="text-gold-400 flex-shrink-0">
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pl-[38px] border-t border-gold-900/5 animate-fade-in">
                      <p className="font-sans text-xs md:text-sm text-gold-100/60 leading-relaxed font-light">
                        {language === 'id' ? (
                          faq.question === 'Are all tours completely private?' ? 'Ya. Setiap pemesanan di andhikabalitour 100% privat. Seluruh mobil, supir pribadi, dan pemandu lokal didedikasikan khusus untuk rombongan Anda saja. Kami berkomitmen untuk menjamin kenyamanan Anda dengan tidak mencampur rombongan.' :
                          faq.question === 'What is the cancellation policy for weather conditions?' ? 'Keselamatan Anda adalah prioritas absolut kami. Jika tur terpaksa dibatalkan karena cuaca buruk, angin kencang di laut, atau kondisi darurat alam, kami menawarkan reschedule tanggal gratis atau pengembalian dana penuh 100% tanpa potongan.' :
                          faq.question === 'Can dietary restrictions be accommodated?' ? 'Tentu saja. Baik Anda seorang vegetarian/vegan, menjalani diet bebas gluten, keto, halal, ataupun memiliki alergi makanan tertentu, koki dan restoran mitra kami akan menyusun menu khusus yang sehat. Mohon cantumkan detail alergi Anda di formulir pemesanan.' :
                          faq.question === 'How far in advance should we secure our dates?' ? 'Karena kami melayani dengan standar privat eksklusif dan armada supir berkualitas tinggi, jadwal kami seringkali terisi penuh. Kami sangat menyarankan Anda melakukan pemesanan minimal 2 hingga 4 minggu sebelumnya, terutama saat musim liburan.' :
                          'Untuk Volcano Jeep Adventure: siapkan jaket tebal (suhu pagi hari di gunung berapi berkisar 12°C). Untuk Watersport & Marine: bawa pakaian renang, tabir surya, dan kacamata hitam. Untuk Ubud & Rafting: siapkan sandal berjalan santai dan pakaian ganti.'
                        ) : faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

