import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Language } from '../i18n/translations';
import { Experience } from '../types';

interface SEOHandlerProps {
  activePage: 'home' | 'tours' | 'rental' | 'about' | 'gallery' | 'whyus' | 'contact' | 'package-detail';
  language: Language;
  currentDetailExperience?: Experience;
}

const SEO_DATA: Record<
  Exclude<SEOHandlerProps['activePage'], 'package-detail'>,
  Record<Language, { title: string; description: string; ogImage: string }>
> = {
  home: {
    id: {
      title: 'Andika Bali Tour - Penyedia Paket Wisata, Sewa Mobil & Aktivitas Bali Murah',
      description: 'Sedia paket tour Bali murah, sewa mobil, dan aktivitas wisata terlengkap bersama Andika Bali Tour.',
      ogImage: '/bali_ocean_bg_1783528769356.jpg',
    },
    en: {
      title: 'Andika Bali Tour - Affordable Bali Tour Packages, Car Rental & Activities',
      description: 'Provide affordable Bali tour packages, car rental, and the most complete travel activities with Andika Bali Tour.',
      ogImage: '/bali_ocean_bg_1783528769356.jpg',
    },
    ar: {
      title: 'Andika Bali Tour - باقات جولات بالي بأسعار مناسبة، تأجير السيارات والأنشطة',
      description: 'نقدم باقات جولات بالي بأسعار مناسبة، وتأجير السيارات، والأنشطة السياحية الأكثر تكاملاً مع أنديكا بالي تور.',
      ogImage: '/bali_ocean_bg_1783528769356.jpg',
    },
  },
  tours: {
    id: {
      title: 'Paket Wisata Bali Murah & Terlengkap - Andika Bali Tour',
      description: 'Temukan pilihan paket tour Bali terlengkap dan murah. Tersedia paket harian, bulan madu, keluarga, dan petualangan kustom.',
      ogImage: '/nusa_penida_golden_beach_1783579187768.jpg',
    },
    en: {
      title: 'Affordable & Complete Bali Tour Packages - Andika Bali Tour',
      description: 'Discover the most complete and affordable Bali tour packages. Daily, honeymoon, family, and custom adventure packages available.',
      ogImage: '/nusa_penida_golden_beach_1783579187768.jpg',
    },
    ar: {
      title: 'باقات جولات بالي السياحية الكاملة والميسورة - أنديكا بالي تور',
      description: 'اكتشف باقات جولات بالي السياحية الأكثر تكاملاً وبأسعار مناسبة. تتوفر باقات يومية، وشهر عسل، وعائلية، ومغامرات مخصصة.',
      ogImage: '/nusa_penida_golden_beach_1783579187768.jpg',
    },
  },
  rental: {
    id: {
      title: 'Sewa Mobil & Motor Murah di Bali - Andika Bali Tour',
      description: 'Jasa penyewaan mobil dan sepeda motor murah di Bali. Pilihan armada lengkap, bersih, terawat, dengan supir profesional atau lepas kunci.',
      ogImage: '/car_innova_1783582975292.jpg',
    },
    en: {
      title: 'Affordable Car & Bike Rental in Bali - Andika Bali Tour',
      description: 'Affordable car and motorbike rental services in Bali. Complete, clean, well-maintained fleet with professional drivers or self-drive.',
      ogImage: '/car_innova_1783582975292.jpg',
    },
    ar: {
      title: 'تأجير السيارات والدراجات النارية في بالي - أنديكا بالي تور',
      description: 'خدمات تأجير السيارات والدراجات النارية بأسعار مناسبة في بالي. أسطول كامل ونظيف ومصان جيدًا مع سائقين محترفين أو بدون سائق.',
      ogImage: '/car_innova_1783582975292.jpg',
    },
  },
  about: {
    id: {
      title: 'Tentang Kami - Andika Bali Tour',
      description: 'Pelajari lebih lanjut tentang Andika Bali Tour, agen perjalanan wisata terpercaya di Bali dengan layanan prima dan harga bersahabat.',
      ogImage: '/bali_jungle_bg_1783528784335.jpg',
    },
    en: {
      title: 'About Us - Andika Bali Tour',
      description: 'Learn more about Andika Bali Tour, a trusted travel agency in Bali with premium services and friendly prices.',
      ogImage: '/bali_jungle_bg_1783528784335.jpg',
    },
    ar: {
      title: 'معلومات عنا - أنديكا بالي تور',
      description: 'تعرف على المزيد حول أنديكا بالي تور، وكالة السفر الموثوقة في بالي التي تقدم خدمات ممتازة وأسعارًا مناسبة.',
      ogImage: '/bali_jungle_bg_1783528784335.jpg',
    },
  },
  gallery: {
    id: {
      title: 'Galeri Foto Wisata Bali - Andika Bali Tour',
      description: 'Lihat keindahan destinasi wisata di Bali, keseruan aktivitas pelanggan, dan armada rental kami di galeri Andika Bali Tour.',
      ogImage: '/uluwatu_cliff_1783579271777.jpg',
    },
    en: {
      title: 'Bali Tour Photo Gallery - Andika Bali Tour',
      description: 'View the beauty of tourist destinations in Bali, exciting customer activities, and our rental fleet in the Andika Bali Tour gallery.',
      ogImage: '/uluwatu_cliff_1783579271777.jpg',
    },
    ar: {
      title: 'معرض صور جولات بالي - أنديكا بالي تور',
      description: 'شاهد جمال الوجهات السياحية في بالي، وأنشطة العملاء المثيرة، وأسطول التأجير لدينا في معرض أنديكا بالي تور.',
      ogImage: '/uluwatu_cliff_1783579271777.jpg',
    },
  },
  whyus: {
    id: {
      title: 'Mengapa Memilih Kami - Andika Bali Tour',
      description: 'Andika Bali Tour menawarkan jaminan harga terbaik, supir profesional, armada terbaru, dan layanan kustom gratis untuk liburan Bali impian Anda.',
      ogImage: '/bali_volcano_bg_1783528702622.jpg',
    },
    en: {
      title: 'Why Choose Us - Andika Bali Tour',
      description: 'Andika Bali Tour offers best price guarantee, professional drivers, latest fleet, and free custom services for your dream Bali holiday.',
      ogImage: '/bali_volcano_bg_1783528702622.jpg',
    },
    ar: {
      title: 'لماذا تختارنا - أنديكا بالي تور',
      description: 'تقدم أنديكا بالي تور ضمانًا لأفضل الأسعار، وسائقين محترفين، وأحدث أسطول، وخدمات مخصصة مجانية لقضاء عطلة أحلامك في بالي.',
      ogImage: '/bali_volcano_bg_1783528702622.jpg',
    },
  },
  contact: {
    id: {
      title: 'Hubungi Kami - Andika Bali Tour',
      description: 'Hubungi Andika Bali Tour untuk konsultasi liburan gratis, pemesanan paket wisata Bali, sewa mobil, dan reservasi tiket aktivitas.',
      ogImage: '/bali_ocean_bg_1783528769356.jpg',
    },
    en: {
      title: 'Contact Us - Andika Bali Tour',
      description: 'Contact Andika Bali Tour for free vacation consultations, Bali tour package bookings, car rentals, and activity ticket reservations.',
      ogImage: '/bali_ocean_bg_1783528769356.jpg',
    },
    ar: {
      title: 'اتصل بنا - أنديكا بالي تور',
      description: 'اتصل بأنديكا بالي تور للحصول على استشارات عطلات مجانية، وحجز باقات جولات بالي، وتأجير السيارات، وحجوزات تذاكر الأنشطة.',
      ogImage: '/bali_ocean_bg_1783528769356.jpg',
    },
  },
};

export const SEOHandler: React.FC<SEOHandlerProps> = ({ activePage, language, currentDetailExperience }) => {
  let title = '';
  let description = '';
  let ogImage = '';

  if (activePage === 'package-detail' && currentDetailExperience) {
    title = `${currentDetailExperience.name} - Andika Bali Tour`;
    description = currentDetailExperience.description || `Nikmati keindahan ${currentDetailExperience.name} bersama Andika Bali Tour. Paket liburan Bali terlengkap dengan pelayanan profesional.`;
    ogImage = currentDetailExperience.image || '/bali_ocean_bg_1783528769356.jpg';
  } else {
    const pageData = SEO_DATA[activePage === 'package-detail' ? 'tours' : activePage] || SEO_DATA.home;
    const langData = pageData[language] || pageData.id;
    title = langData.title;
    description = langData.description;
    ogImage = langData.ogImage;
  }

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://andikabalitour.com';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
