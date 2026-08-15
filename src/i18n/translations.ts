export type Language = 'id' | 'en' | 'ar';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    tours: string;
    rental: string;
    about: string;
    gallery: string;
    whyus: string;
    contact: string;
    bookNow: string;
    hotline: string;
  };
  // Hero Section
  hero: {
    curatedDestinations: string;
    activeExperience: string;
    viewDetails: string;
    bookNow: string;
    viewPackages: string;
    scrollToExplore: string;
  };
  // Common / Shared
  common: {
    perPerson: string;
    perDay: string;
    minPersons: string;
    maxPersons: string;
    included: string;
    notIncluded: string;
    itinerary: string;
    highlights: string;
    duration: string;
    location: string;
    difficulty: string;
    viewDetails: string;
    bookNow: string;
    selectVehicle: string;
    back: string;
    close: string;
    confirm: string;
    cancel: string;
    download: string;
    print: string;
    copy: string;
    copied: string;
    loading: string;
    processing: string;
    success: string;
    all: string;
    search: string;
    rating: string;
    reviews: string;
    chatWhatsApp: string;
    officialVoucher: string;
  };
  // Destination Grid
  destinations: {
    badge: string;
    title: string;
    subtitle: string;
    viewAll: string;
  };
  // Activity Section
  activities: {
    badge: string;
    title: string;
    subtitle: string;
    badgePopular: string;
    badgeRecommended: string;
    badgeExtreme: string;
    badgeExotic: string;
    badgeIsland: string;
    includesNotice: string;
    insuranceIncluded: string;
    startingFrom: string;
    perPerson: string;
    safeBadge: string;
    vipBadge: string;
    guidesBadge: string;
    flexibleBadge: string;
  };
  // Experiences Deck
  experiences: {
    badge: string;
    title: string;
    subtitle: string;
    highlightsLabel: string;
    guaranteeSeal: string;
  };
  // Experience Details / Spec Sheets
  experienceDetails: {
    badge: string;
    title: string;
    subtitle: string;
    tabOverview: string;
    tabItinerary: string;
    tabInclusions: string;
    tabPricing: string;
    whatsIncluded: string;
    whatsExcluded: string;
    scheduleHighlights: string;
    customPackageQuote: string;
  };
  // Tour Catalog
  catalog: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterAdventure: string;
    filterBeach: string;
    filterCulture: string;
    searchPlaceholder: string;
    showingResults: string;
    noResults: string;
    clearFilter: string;
  };
  // Package Detail Page
  packageDetail: {
    backToCatalog: string;
    completePackagePrice: string;
    includedWithTour: string;
    notIncludedWithTour: string;
    photoGallery: string;
    clickToEnlarge: string;
    dailyItinerary: string;
    keyHighlights: string;
    reserveThisTrip: string;
    askViaWhatsApp: string;
    instantConfirmation: string;
    freeCancellation: string;
  };
  // Rental Home Section
  rentalSection: {
    badge: string;
    title: string;
    subtitle: string;
    carFleet: string;
    viewAllBtn: string;
    passengers: string;
    privateService: string;
    driverFuelIncluded: string;
    ratePerDay: string;
    perDay: string;
    allRiskInsurance: string;
    rentNow: string;
    routeDetails: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
  };
  // Rental Page & Full Flow
  rental: {
    badge: string;
    title: string;
    subtitle: string;
    fleetBadge: string;
    includedDriverFuel: string;
    includedDriverFuelDesc: string;
    tabAll: string;
    tabFamily: string;
    tabVip: string;
    tabGroup: string;
    specsSeats: string;
    specsTransmission: string;
    specsEngine: string;
    specsService: string;
    specsDriverFuel: string;
    viewFleet: string;
    bookCar: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    step4Title: string;
    fullName: string;
    email: string;
    phone: string;
    startDate: string;
    duration: string;
    pickupLocation: string;
    pickupPlaceholder: string;
    specialNotes: string;
    specialNotesPlaceholder: string;
    servicePackage: string;
    servicePackageDesc: string;
    rentalNoticeTitle: string;
    rentalNotice1: string;
    rentalNotice2: string;
    rentalNotice3: string;
    orderSummary: string;
    pricePerDay: string;
    totalDays: string;
    subtotal: string;
    taxVAT: string;
    deliveryFee: string;
    freeDelivery: string;
    totalPayment: string;
    selectPaymentMethod: string;
    payWithCard: string;
    payWithQRIS: string;
    payWithVA: string;
    bankBCA: string;
    bankMandiri: string;
    bankBNI: string;
    eWalletGopay: string;
    eWalletOVO: string;
    eWalletDana: string;
    paymentInstructions: string;
    uploadProof: string;
    confirmPayment: string;
    eTicketTitle: string;
    eTicketSuccess: string;
    eTicketCode: string;
    eTicketVehicle: string;
    eTicketDuration: string;
    eTicketPickup: string;
    eTicketDriver: string;
    eTicketStatus: string;
    confirmed: string;
    backToCatalogBtn: string;
    saveTicketBtn: string;
  };
  // About Page
  about: {
    badge: string;
    title: string;
    subtitle: string;
    missionTitle: string;
    missionDesc: string;
    pillar1Title: string;
    pillar1Desc: string;
    pillar2Title: string;
    pillar2Desc: string;
    pillar3Title: string;
    pillar3Desc: string;
    visualBadge: string;
    visualTitle: string;
    visualDesc: string;
    stat1Label: string;
    stat1Val: string;
    stat2Label: string;
    stat2Val: string;
    stat3Label: string;
    stat3Val: string;
    stat4Label: string;
    stat4Val: string;
  };
  // Why Us Page
  whyUs: {
    badge: string;
    title: string;
    subtitle: string;
    item1Title: string;
    item1Desc: string;
    item2Title: string;
    item2Desc: string;
    item3Title: string;
    item3Desc: string;
    item4Title: string;
    item4Desc: string;
    item5Title: string;
    item5Desc: string;
    item6Title: string;
    item6Desc: string;
    customBoxTitle: string;
    customBoxDesc: string;
    customBoxBtn: string;
  };
  // Gallery Page
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterVolcano: string;
    filterOcean: string;
    filterJungle: string;
    filterVehicles: string;
  };
  // Reviews Page / Section
  reviews: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedTraveler: string;
    ratingAverage: string;
    totalReviews: string;
    writeReview: string;
    modalTitle: string;
    yourName: string;
    yourRating: string;
    yourComment: string;
    submitReview: string;
    thankYou: string;
  };
  // Contact Section
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    headOffice: string;
    address: string;
    phone: string;
    email: string;
    operatingHours: string;
    hoursDetail: string;
    formTitle: string;
    formName: string;
    formEmail: string;
    formPhone: string;
    formSubject: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
  };
  // Booking Modal Flow
  bookingModal: {
    step1Title: string;
    step2Title: string;
    step3Title: string;
    step4Title: string;
    selectPackage: string;
    selectPricingOption: string;
    tripDate: string;
    totalGuests: string;
    guestCounterNote: string;
    participantDetails: string;
    participant: string;
    fullName: string;
    idNumber: string;
    ageCategory: string;
    adult: string;
    child: string;
    contactInfo: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    addonsTitle: string;
    addonsDesc: string;
    proceedToPayment: string;
    pricingSummary: string;
    packageBase: string;
    addonsTotal: string;
    subtotal: string;
    vatTax: string;
    grandTotal: string;
    payNow: string;
    securityNotice: string;
    ticketConfirmed: string;
    ticketDesc: string;
    bookingCode: string;
    downloadVoucher: string;
    printVoucher: string;
    shareWhatsApp: string;
  };
  // Footer
  footer: {
    brandDesc: string;
    registeredBadge: string;
    headOffice: string;
    baliTime: string;
    weatherTitle: string;
    quickLinks: string;
    followUs: string;
    rightsReserved: string;
    termsAndPrivacy: string;
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Beranda',
      tours: 'Paket Tour',
      rental: 'Sewa & Layanan',
      about: 'About',
      gallery: 'Gallery',
      whyus: 'Why Us',
      contact: 'Contact',
      bookNow: 'Book Now',
      hotline: 'andhikabalitour 24/7 Concierge Hotline',
    },
    hero: {
      curatedDestinations: 'Destinasi Pilihan',
      activeExperience: 'Pengalaman Aktif',
      viewDetails: 'Detail Paket',
      bookNow: 'Booking Sekarang',
      viewPackages: 'Lihat Paket',
      scrollToExplore: 'Scroll untuk Menjelajah',
    },
    common: {
      perPerson: '/ pax',
      perDay: '/ hari',
      minPersons: 'Min. 2 Orang',
      maxPersons: 'Maksimal 2 Orang',
      included: 'Termasuk',
      notIncluded: 'Tidak Termasuk',
      itinerary: 'Rencana Perjalanan',
      highlights: 'Sorotan Utama',
      duration: 'Durasi',
      location: 'Lokasi',
      difficulty: 'Tingkat Aktivitas',
      viewDetails: 'Lihat Detail',
      bookNow: 'Pesan Sekarang',
      selectVehicle: 'Pilih Kendaraan',
      back: 'Kembali',
      close: 'Tutup',
      confirm: 'Konfirmasi',
      cancel: 'Batal',
      download: 'Unduh E-Tiket',
      print: 'Cetak Tiket',
      copy: 'Salin',
      copied: 'Tersalin!',
      loading: 'Memuat...',
      processing: 'Memproses Reservasi...',
      success: 'Berhasil!',
      all: 'Semua',
      search: 'Cari destinasi atau paket...',
      rating: 'Penilaian',
      reviews: 'ulasan',
      chatWhatsApp: 'Konfirmasi via WhatsApp',
      officialVoucher: 'VOUCHER RESMI ANDHIKABALITOUR',
    },
    destinations: {
      badge: 'Bespoke Private Expeditions',
      title: 'Destinasi & Aktivitas Pilihan',
      subtitle: 'Setiap pengalaman dirancang khusus secara privat dengan standar kenyamanan, pemandu berpengalaman, dan armada terbaik di Bali.',
      viewAll: 'Lihat Semua Destinasi',
    },
    activities: {
      badge: 'High Adrenaline & Wilderness',
      title: 'Petualangan Aktivitas Outdoor Elit',
      subtitle: 'Pacu adrenalin Anda dengan menembus rimbunnya hutan belantara Bali atau nikmati kesegaran alami menyusuri jeram sungai purba dengan standar keamanan internasional yang mewah.',
      badgePopular: 'Terpopuler',
      badgeRecommended: 'Rekomendasi',
      badgeExtreme: 'Extreme',
      badgeExotic: 'Eksotis',
      badgeIsland: 'Island Trip',
      includesNotice: 'Sudah Termasuk: Asuransi, Makan Siang, Pemandu & Tim Penyelamat',
      insuranceIncluded: 'Asuransi Penuh & Pemandu Berpengalaman',
      startingFrom: 'Tarif Mulai',
      perPerson: 'per orang',
      safeBadge: 'Semua peralatan bersertifikasi internasional',
      vipBadge: 'Layanan privat eksklusif tanpa rombongan lain',
      guidesBadge: 'Pemandu dan instruktur resmi berlisensi',
      flexibleBadge: 'Jadwal dan rute fleksibel sesuai kebutuhan Anda',
    },
    experiences: {
      badge: 'Masterpiece Itineraries',
      title: 'Koleksi Tur Privat Unggulan',
      subtitle: 'Pilihan tur eksklusif yang dirancang untuk memberikan kenyamanan, privasi, dan kenangan abadi di pulau dewata.',
      highlightsLabel: 'Sorotan Eksklusif',
      guaranteeSeal: 'Jaminan Kepuasan & Kenyamanan Privat 100%',
    },
    experienceDetails: {
      badge: 'Masterpiece Itineraries',
      title: 'Rincian Spesifikasi & Jadwal Tur',
      subtitle: 'Standar transparansi tanpa kompromi. Kami menyajikan jadwal lengkap, fasilitas inklusif, dan panduan keamanan untuk kenyamanan perjalanan Anda.',
      tabOverview: 'Ringkasan',
      tabItinerary: 'Rundown Lengkap',
      tabInclusions: 'Fasilitas & Layanan',
      tabPricing: 'Pilihan Tarif',
      whatsIncluded: 'Sudah Termasuk Dalam Paket',
      whatsExcluded: 'Tidak Termasuk',
      scheduleHighlights: 'Sorotan Jadwal Harian',
      customPackageQuote: 'Ingin Menyesuaikan Jadwal Khusus?',
    },
    catalog: {
      badge: 'Bespoke VIP Packages',
      title: 'Katalog Paket Tour Eksklusif',
      subtitle: 'Jelajahi keindahan murni alam Bali dengan layanan VIP privat 100%. Mulai dari jalur off-road gunung berapi, pelayaran yacht mewah, hingga ritual suci pura kuno.',
      filterAll: 'Semua Paket',
      filterAdventure: 'Petualangan & Adrenalin',
      filterBeach: 'Pantai & Pulau Nusa Penida',
      filterCulture: 'Arung Jeram & Alam Asri',
      searchPlaceholder: 'Cari destinasi atau paket wisata...',
      showingResults: 'MENAMPILKAN {count} DARI {total} PAKET AKTIVITAS BALI',
      noResults: 'Tidak ada paket tur yang cocok dengan pencarian Anda.',
      clearFilter: 'Reset Filter',
    },
    packageDetail: {
      backToCatalog: 'Kembali ke Katalog Tour',
      completePackagePrice: 'Harga Paket Lengkap',
      includedWithTour: 'Fasilitas Sudah Termasuk',
      notIncludedWithTour: 'Belum Termasuk',
      photoGallery: 'Galeri Foto & Dokumentasi Wahana',
      clickToEnlarge: 'Klik foto untuk melihat lebih jelas',
      dailyItinerary: 'Rundown & Timeline Perjalanan',
      keyHighlights: 'Sorotan Utama Pengalaman Ini',
      reserveThisTrip: 'Pesan Paket Ini Sekarang',
      askViaWhatsApp: 'Tanya Tim via WhatsApp',
      instantConfirmation: 'Konfirmasi Instan & E-Voucher Langsung Terbit',
      freeCancellation: 'Garansi Reschedule Fleksibel',
    },
    rentalSection: {
      badge: 'Armada Mobil & Transport Premium',
      title: 'Layanan Sewa Mobil Premium Bali',
      subtitle: 'Nikmati kenyamanan berkendara di pulau dewata dengan unit kendaraan ber-AC dingin, wangi, bersih, dan berperfoma prima. Seluruh layanan sewa sudah termasuk supir profesional yang berpengalaman serta bahan bakar minyak (BBM).',
      carFleet: 'Armada Mobil + Supir & BBM',
      viewAllBtn: 'Lihat Semua Armada & Syarat Sewa',
      passengers: 'Penumpang',
      privateService: 'Layanan Privat',
      driverFuelIncluded: 'Supir & BBM Termasuk',
      ratePerDay: 'Tarif Sewa Harian',
      perDay: '/ hari',
      allRiskInsurance: 'Asuransi Kendaraan',
      rentNow: 'Sewa Mobil Ini',
      routeDetails: 'Rute & Detail',
      benefit1Title: 'Supir Berpengalaman & Ramah',
      benefit1Desc: 'Paham seluruh rute tercepat dan destinasi tersembunyi di Bali.',
      benefit2Title: 'Bahan Bakar & Mobil Bersih',
      benefit2Desc: 'Termasuk BBM harian dan interior ber-AC sejuk serta harum.',
      benefit3Title: 'Antar Jemput Hotel Gratis',
      benefit3Desc: 'Layanan antar jemput tepat waktu di seluruh area wisata Bali.',
    },
    rental: {
      badge: 'Armada Mobil & Transport Premium',
      title: 'Layanan Sewa Mobil Premium Bali',
      subtitle: 'Nikmati kenyamanan berkendara di pulau dewata dengan unit kendaraan ber-AC dingin, wangi, bersih, dan berperfoma prima. Seluruh layanan sewa sudah termasuk supir profesional yang berpengalaman serta bahan bakar minyak (BBM).',
      fleetBadge: 'Armada Mobil + Supir & BBM',
      includedDriverFuel: 'Layanan Privat Dengan Supir & BBM',
      includedDriverFuelDesc: 'Sudah termasuk supir VIP berpengalaman, BBM harian, dan mobil bersih ber-AC dingin.',
      tabAll: 'Semua Armada',
      tabFamily: 'MPV & Keluarga',
      tabVip: 'Luxury & VIP',
      tabGroup: 'Minibus & Group',
      specsSeats: 'Kursi Penumpang',
      specsTransmission: 'Transmisi',
      specsEngine: 'Mesin',
      specsService: 'Layanan',
      specsDriverFuel: 'Supir & BBM Termasuk',
      viewFleet: 'Lihat Armada',
      bookCar: 'Pilih & Sewa Mobil',
      step1: '1. Katalog Kendaraan',
      step2: '2. Formulir Reservasi',
      step3: '3. Pembayaran & Konfirmasi',
      step4: '4. E-Tiket Resmi',
      step1Title: 'Pilih Kendaraan Anda',
      step2Title: 'Rincian Penjemputan & Data Penyewa',
      step3Title: 'Metode Pembayaran & Tagihan',
      step4Title: 'E-Tiket & Voucher Sewa Terbit',
      fullName: 'Nama Lengkap Penyewa',
      email: 'Alamat Email',
      phone: 'Nomor WhatsApp / Telepon',
      startDate: 'Tanggal Mulai Sewa',
      duration: 'Durasi Sewa (Hari)',
      pickupLocation: 'Lokasi Penjemputan di Bali',
      pickupPlaceholder: 'Contoh: Bandara Ngurah Rai DPS / Hotel The Westin Nusa Dua / Villa Canggu',
      specialNotes: 'Catatan Tambahan',
      specialNotesPlaceholder: 'Contoh: Nomor penerbangan, waktu penjemputan spesifik, dll.',
      servicePackage: 'Paket Layanan Sewa',
      servicePackageDesc: 'Sudah termasuk supir VIP berpengalaman, BBM harian, dan mobil bersih ber-AC dingin.',
      rentalNoticeTitle: 'Ketentuan & Jaminan Layanan Sewa Mobil:',
      rentalNotice1: 'Dengan Supir & BBM: Seluruh paket sewa sudah termasuk supir profesional berlisensi dan bahan bakar kendaraan (BBM).',
      rentalNotice2: 'Durasi Pemakaian: Durasi pemakaian supir dan mobil hingga 10-12 jam per hari di seluruh area Bali.',
      rentalNotice3: 'Pengiriman Gratis: Antar-jemput penjemputan gratis ke hotel di Kuta, Canggu, Ubud, Seminyak, Nusa Dua, Sanur & Bandara DPS.',
      orderSummary: 'Ringkasan Pemesanan',
      pricePerDay: 'Tarif Sewa Harian',
      totalDays: 'Lama Sewa',
      subtotal: 'Subtotal Sewa',
      taxVAT: 'PPN (10%)',
      deliveryFee: 'Biaya Pengiriman',
      freeDelivery: 'GRATIS (VIP Service)',
      totalPayment: 'Total Pembayaran',
      selectPaymentMethod: 'Pilih Metode Pembayaran',
      payWithCard: 'Kartu Kredit / Debit Online',
      payWithQRIS: 'QRIS (Gopay, OVO, Dana, BCA)',
      payWithVA: 'Virtual Account / Transfer Bank',
      bankBCA: 'BCA Virtual Account',
      bankMandiri: 'Mandiri Virtual Account',
      bankBNI: 'BNI Virtual Account',
      eWalletGopay: 'GoPay Instant',
      eWalletOVO: 'OVO Payment',
      eWalletDana: 'DANA Wallet',
      paymentInstructions: 'Instruksi Pembayaran',
      uploadProof: 'Konfirmasi Pembayaran',
      confirmPayment: 'Bayar Sekarang & Terbitkan E-Tiket',
      eTicketTitle: 'E-Tiket Sewa Kendaraan Resmi',
      eTicketSuccess: 'Reservasi Sewa Mobil Berhasil Dikonfirmasi!',
      eTicketCode: 'Kode Booking',
      eTicketVehicle: 'Unit Kendaraan',
      eTicketDuration: 'Durasi',
      eTicketPickup: 'Lokasi Penjemputan',
      eTicketDriver: 'Supir & BBM',
      eTicketStatus: 'Status Reservasi',
      confirmed: 'TERKONFIRMASI LUNAS',
      backToCatalogBtn: 'Pesan Sewa Lain',
      saveTicketBtn: 'Simpan / Cetak E-Tiket',
    },
    about: {
      badge: 'Our Noble Story',
      title: 'Pelopor Layanan Tour Privat Luxury di Bali',
      subtitle: 'Didirikan dengan visi untuk mendefinisikan kembali arti kemewahan perjalanan, andhikabalitour menghadirkan pengalaman liburan privat yang eksklusif, aman, dan dirancang khusus untuk memenuhi ekspektasi tertinggi Anda.',
      missionTitle: 'Misi Kami: Menghadirkan Momen Liburan Tanpa Batas',
      missionDesc: 'Di andhikabalitour, kami percaya bahwa setiap detik perjalanan Anda di Bali adalah berharga. Kami menolak paket wisata massal yang penuh sesak dan terburu-buru. Itulah sebabnya setiap itinerary yang kami buat bersifat 100% privat, fleksibel, dan ditemani oleh pemandu bersertifikasi internasional.',
      pillar1Title: 'Prioritas Keamanan & Kenyamanan',
      pillar1Desc: 'Semua armada kami melalui pemeriksaan keamanan berkala standar tinggi. Pemandu off-road dan instruktur kami memiliki lisensi resmi internasional.',
      pillar2Title: 'Eksplorasi yang Dipersonalisasi',
      pillar2Desc: 'Rencana perjalanan bersifat santai dan fleksibel. Anda dapat meminta penyesuaian menu kuliner, waktu penjemputan, atau rute tambahan secara langsung.',
      pillar3Title: 'Berdampak pada Lingkungan Lokal',
      pillar3Desc: 'Sebagian hasil dari pesanan Anda disalurkan langsung untuk pelestarian terumbu karang di Nusa Penida serta kesejahteraan komunitas adat pemandu lokal.',
      visualBadge: 'Luxury Hospitality',
      visualTitle: 'Di Balik Layar Kemewahan',
      visualDesc: 'Tim perancang perjalanan, supir VIP, fotografer profesional, dan pramutamu kami siap menyambut kedatangan Anda 24 jam sehari.',
      stat1Label: 'PRO GUIDE BERSERTIFIKAT',
      stat1Val: '100%',
      stat2Label: 'TETAMU VIP TAHUNAN',
      stat2Val: '5,000+',
      stat3Label: 'KEPUASAN MAKSIMAL',
      stat3Val: '4.95/5',
      stat4Label: 'ARMADA LUXURY PRIBADI',
      stat4Val: '25+',
    },
    whyUs: {
      badge: 'Elite Advantages',
      title: 'Standar Pelayanan yang Berbeda',
      subtitle: 'Mengapa memilih andhikabalitour? Kami tidak sekadar merancang tur, melainkan menciptakan karya seni petualangan pribadi yang tak lekang oleh waktu.',
      item1Title: '100% Layanan Privat VIP',
      item1Desc: 'Tidak ada rombongan lain. Seluruh kendaraan, pemandu, dan akomodasi selama perjalanan adalah hak eksklusif Anda demi privasi mutlak.',
      item2Title: 'Garansi Fleksibilitas Jadwal',
      item2Desc: 'Ubah tanggal perjalanan atau jadwal tur Anda secara gratis jika terjadi cuaca buruk, kendala penerbangan, atau perubahan rencana mendadak.',
      item3Title: 'Kurasi Kuliner Kelas Bintang 5',
      item3Desc: 'Mulai dari lobster panggang segar di tepi pantai Jimbaran hingga piknik gourmet hangat di lereng kawah gunung berapi. Pilihan vegan dan bebas alergi selalu tersedia.',
      item4Title: 'Dokumentasi Profesional Eksklusif',
      item4Desc: 'Lupakan foto selfie buram. Opsi add-on fotografer handal dengan kamera DSLR profesional dan drone 4K siap mengabadikan petualangan emas Anda.',
      item5Title: 'Keamanan Standar Internasional',
      item5Desc: 'Semua armada penjelajah 4x4, speed boat, dan yacht telah tersertifikasi kelayakan laut & darat serta dilengkapi asuransi perjalanan penuh.',
      item6Title: 'Pemandu Lokal Berlisensi Resmi',
      item6Desc: 'Pemandu kami bukan sekadar supir biasa. Mereka adalah ahli sejarah lokal, instruktur bersertifikasi nasional, dan pengamat budaya Bali yang berpengetahuan luas.',
      customBoxTitle: 'Butuh Rencana Perjalanan Custom di Luar Paket?',
      customBoxDesc: 'Tim perancang perjalanan VIP kami siap menyusun program liburan eksklusif multi-hari yang disesuaikan dengan jenis hobi, minat, atau perayaan romantis khusus Anda di pulau Bali.',
      customBoxBtn: 'Konsultasi Privat Gratis',
    },
    gallery: {
      badge: 'Visual Masterpieces',
      title: 'Galeri Momen Petualangan Emas',
      subtitle: 'Potret otentik keindahan alam pulau dewata dan ekspedisi eksklusif para tamu andhikabalitour.',
      filterAll: 'Semua Foto',
      filterVolcano: 'Kintamani & Batur',
      filterOcean: 'Nusa Penida & Bahari',
      filterJungle: 'Ubud & Rafting',
      filterVehicles: 'Armada Mobil VIP',
    },
    reviews: {
      badge: 'Unfiltered Testimonials',
      title: 'Kesan & Pengalaman Tamu VIP',
      subtitle: 'Ulasan asli dari wisatawan domestik dan internasional yang telah mempercayakan liburan mereka bersama andhikabalitour.',
      verifiedTraveler: 'Wisatawan Terverifikasi',
      ratingAverage: '4.95 dari 5 Bintang',
      totalReviews: 'Berdasarkan 850+ Ulasan Tamu',
      writeReview: 'Tulis Ulasan Anda',
      modalTitle: 'Bagikan Pengalaman Liburan Anda',
      yourName: 'Nama Lengkap',
      yourRating: 'Penilaian Anda',
      yourComment: 'Cerita & Ulasan Anda',
      submitReview: 'Kirim Ulasan Sekarang',
      thankYou: 'Terima kasih atas ulasan berharga Anda!',
    },
    contact: {
      badge: 'Direct Concierge',
      title: 'Hubungi Pramutamu Eksklusif Kami',
      subtitle: 'Punya pertanyaan khusus atau ingin memesan armada privat? Tim kami siap melayani Anda 24 jam sehari melalui WhatsApp, Telepon, maupun Email.',
      headOffice: 'Kantor Utama & Basecamp',
      address: 'Gg. Perbatasan No.18, Pemogan, Denpasar Selatan, Kota Denpasar, Bali 80222',
      phone: '+62 812-2565-7382',
      email: 'Dewakanto587@gmail.com',
      operatingHours: 'Jam Layanan Operasional',
      hoursDetail: 'Buka Setiap Hari: 06.00 - 23.00 WITA (Concierge 24/7)',
      formTitle: 'Kirim Pesan atau Permintaan Khusus',
      formName: 'Nama Anda',
      formEmail: 'Alamat Email',
      formPhone: 'Nomor WhatsApp / Telepon',
      formSubject: 'Subjek Pertanyaan',
      formMessage: 'Tuliskan pesan atau rencana perjalanan Anda...',
      formSubmit: 'Kirim Pesan Sekarang',
      formSuccess: 'Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.',
    },
    bookingModal: {
      step1Title: '1. Rincian Paket & Tanggal',
      step2Title: '2. Data Peserta & Kontak',
      step3Title: '3. Pembayaran & Konfirmasi',
      step4Title: '4. E-Voucher Resmi Terbit',
      selectPackage: 'Pilih Paket Petualangan',
      selectPricingOption: 'Pilihan Tipe / Opsi Ride',
      tripDate: 'Pilih Tanggal Petualangan',
      totalGuests: 'Jumlah Peserta',
      guestCounterNote: 'Penyelaras akomodasi & peralatan keselamatan',
      participantDetails: 'Data Identitas Peserta (Untuk Asuransi & Izin)',
      participant: 'Peserta',
      fullName: 'Nama Lengkap',
      idNumber: 'Nomor KTP / Paspor',
      ageCategory: 'Kategori Usia',
      adult: 'Dewasa',
      child: 'Anak-anak',
      contactInfo: 'Informasi Kontak Pemesan Utama',
      emailPlaceholder: 'nama@domain.com (E-Tiket dikirim ke sini)',
      phonePlaceholder: 'Nomor WhatsApp aktif untuk koordinasi penjemputan',
      specialRequests: 'Permintaan Tambahan & Catatan Khusus',
      specialRequestsPlaceholder: 'Contoh: Alergi makanan khusus, permintaan jemputan di hotel tertentu, dll.',
      addonsTitle: 'Tingkatkan Pengalaman Anda (Opsional)',
      addonsDesc: 'Layanan ekstra eksklusif untuk menyempurnakan hari istimewa Anda',
      proceedToPayment: 'Lanjut ke Pembayaran',
      pricingSummary: 'Rincian Biaya Reservasi',
      packageBase: 'Biaya Paket Aktivitas',
      addonsTotal: 'Layanan Tambahan (Add-ons)',
      subtotal: 'Subtotal Tagihan',
      vatTax: 'PPN & Biaya Layanan (10%)',
      grandTotal: 'Total Pembayaran Akhir',
      payNow: 'Bayar Sekarang & Konfirmasi',
      securityNotice: 'Semua transaksi dilindungi enkripsi SSL 256-bit berstandar perbankan.',
      ticketConfirmed: 'Reservasi Tur Anda Berhasil Dikonfirmasi!',
      ticketDesc: 'E-Voucher resmi telah diterbitkan. Silakan simpan kode booking atau tunjukkan saat penjemputan.',
      bookingCode: 'KODE BOOKING RESMI',
      downloadVoucher: 'Unduh E-Voucher (PDF)',
      printVoucher: 'Cetak Voucher',
      shareWhatsApp: 'Kirim ke WhatsApp',
    },
    footer: {
      brandDesc: 'andhikabalitour adalah penyedia layanan private tour luxury dan car rental terkemuka di Bali. Menghadirkan petualangan outdoor eksklusif, bahari, off-road, serta transportasi mobil dengan supir profesional dan bahan bakar.',
      registeredBadge: 'Sustainable Luxury Tourism Bali Registered',
      headOffice: 'Kantor Pusat',
      baliTime: 'Waktu Lokal Bali (WITA)',
      weatherTitle: 'Mikroklimat Bali',
      quickLinks: 'Tautan Cepat',
      followUs: 'Ikuti Kami',
      rightsReserved: 'Hak Cipta Dilindungi.',
      termsAndPrivacy: 'Kebijakan Privasi • Syarat & Ketentuan',
    },
  },
  en: {
    nav: {
      home: 'Home',
      tours: 'Tour Packages',
      rental: 'Car Rental & Services',
      about: 'About Us',
      gallery: 'Gallery',
      whyus: 'Why Us',
      contact: 'Contact',
      bookNow: 'Book Now',
      hotline: 'andhikabalitour 24/7 Concierge Hotline',
    },
    hero: {
      curatedDestinations: 'Curated Destinations',
      activeExperience: 'Active Experience',
      viewDetails: 'Package Details',
      bookNow: 'Book Now',
      viewPackages: 'View Packages',
      scrollToExplore: 'Scroll to Explore',
    },
    common: {
      perPerson: '/ pax',
      perDay: '/ day',
      minPersons: 'Min. 2 Persons',
      maxPersons: 'Max. 2 Persons',
      included: 'Included',
      notIncluded: 'Not Included',
      itinerary: 'Itinerary',
      highlights: 'Highlights',
      duration: 'Duration',
      location: 'Location',
      difficulty: 'Activity Level',
      viewDetails: 'View Details',
      bookNow: 'Book Now',
      selectVehicle: 'Select Vehicle',
      back: 'Back',
      close: 'Close',
      confirm: 'Confirm',
      cancel: 'Cancel',
      download: 'Download E-Ticket',
      print: 'Print Ticket',
      copy: 'Copy',
      copied: 'Copied!',
      loading: 'Loading...',
      processing: 'Processing Reservation...',
      success: 'Success!',
      all: 'All',
      search: 'Search destinations or packages...',
      rating: 'Rating',
      reviews: 'reviews',
      chatWhatsApp: 'Confirm via WhatsApp',
      officialVoucher: 'OFFICIAL ANDHIKABALITOUR VOUCHER',
    },
    destinations: {
      badge: 'Bespoke Private Expeditions',
      title: 'Featured Destinations & Activities',
      subtitle: 'Each experience is custom-tailored privately with world-class comfort standards, seasoned local guides, and top-tier fleet in Bali.',
      viewAll: 'Explore All Destinations',
    },
    activities: {
      badge: 'High Adrenaline & Wilderness',
      title: 'Elite Outdoor Adventure Activities',
      subtitle: 'Fuel your adrenaline by venturing through Bali’s lush tropical jungles or navigating ancestral river rapids with luxury international safety standards.',
      badgePopular: 'Most Popular',
      badgeRecommended: 'Recommended',
      badgeExtreme: 'Extreme',
      badgeExotic: 'Exotic',
      badgeIsland: 'Island Trip',
      includesNotice: 'Includes: Insurance, Lunch, Professional Guide & Rescue Team',
      insuranceIncluded: 'Full Insurance & Certified Instructors Included',
      startingFrom: 'Starting Rate',
      perPerson: 'per person',
      safeBadge: 'All safety equipment is internationally certified',
      vipBadge: '100% private VIP charter with zero strangers',
      guidesBadge: 'Licensed local adventure instructors and guides',
      flexibleBadge: 'Flexible schedules and custom pickup timings',
    },
    experiences: {
      badge: 'Masterpiece Itineraries',
      title: 'Signature Private Expeditions',
      subtitle: 'Handpicked private journeys curated to offer unmatched comfort, absolute privacy, and everlasting island memories.',
      highlightsLabel: 'Signature Highlights',
      guaranteeSeal: '100% Satisfaction & Private Luxury Guarantee',
    },
    experienceDetails: {
      badge: 'Masterpiece Itineraries',
      title: 'Tour Specifications & Schedule',
      subtitle: 'Uncompromising transparency. We provide complete itineraries, all-inclusive amenities, and comprehensive safety protocols for your peace of mind.',
      tabOverview: 'Overview',
      tabItinerary: 'Full Itinerary',
      tabInclusions: 'Inclusions & Services',
      tabPricing: 'Pricing Options',
      whatsIncluded: 'What Is Included in Your Package',
      whatsExcluded: 'What Is Excluded',
      scheduleHighlights: 'Daily Schedule Highlights',
      customPackageQuote: 'Looking for a Bespoke Custom Schedule?',
    },
    catalog: {
      badge: 'Bespoke VIP Packages',
      title: 'Exclusive Tour Package Catalog',
      subtitle: 'Explore the pure beauty of Bali with 100% private VIP services. From volcanic off-road paths, luxury yacht charters, to ancestral sacred temple ceremonies.',
      filterAll: 'All Packages',
      filterAdventure: 'Adventure & Adrenaline',
      filterBeach: 'Beach & Nusa Penida Island',
      filterCulture: 'River Rafting & Serene Nature',
      searchPlaceholder: 'Search destinations or tour packages...',
      showingResults: 'SHOWING {count} OF {total} BALI ACTIVITY PACKAGES',
      noResults: 'No tour packages match your search criteria.',
      clearFilter: 'Reset Filters',
    },
    packageDetail: {
      backToCatalog: 'Back to Tour Catalog',
      completePackagePrice: 'Complete Package Price',
      includedWithTour: 'Amenities & Inclusions',
      notIncludedWithTour: 'Exclusions',
      photoGallery: 'Photo Gallery & Experience Documentation',
      clickToEnlarge: 'Click on any photo to enlarge',
      dailyItinerary: 'Daily Itinerary & Timeline',
      keyHighlights: 'Key Highlights of This Experience',
      reserveThisTrip: 'Book This Package Now',
      askViaWhatsApp: 'Inquire via WhatsApp',
      instantConfirmation: 'Instant Confirmation & Official E-Voucher',
      freeCancellation: 'Flexible Rescheduling Guarantee',
    },
    rentalSection: {
      badge: 'Premium Fleet & Transport',
      title: 'Bali Premium Car Rental Services',
      subtitle: 'Enjoy the ultimate driving comfort across the Island of Gods with clean, fragrant, cold-AC, top-performance vehicles. All rentals include an experienced professional driver and fuel (BBM).',
      carFleet: 'Car Fleet + Professional Driver & Fuel',
      viewAllBtn: 'View All Fleet & Terms',
      passengers: 'Passengers',
      privateService: 'Private VIP Service',
      driverFuelIncluded: 'Driver & Fuel Included',
      ratePerDay: 'Daily Rental Rate',
      perDay: '/ day',
      allRiskInsurance: 'Vehicle Insurance Included',
      rentNow: 'Rent This Vehicle',
      routeDetails: 'Routes & Specs',
      benefit1Title: 'Experienced & Courteous Driver',
      benefit1Desc: 'Knows all the fastest scenic routes and hidden gems in Bali.',
      benefit2Title: 'Fuel & Spotless Vehicle Included',
      benefit2Desc: 'Daily fuel (BBM) and crisp, fragrant air-conditioned cabin.',
      benefit3Title: 'Complimentary Hotel Pickup',
      benefit3Desc: 'Punctual door-to-door pickup across all key resort zones.',
    },
    rental: {
      badge: 'Premium Fleet & Transport',
      title: 'Bali Premium Car Rental Services',
      subtitle: 'Enjoy the ultimate driving comfort across the Island of Gods with clean, fragrant, cold-AC, top-performance vehicles. All rentals include an experienced professional driver and fuel (BBM).',
      fleetBadge: 'Car Fleet + Professional Driver & Fuel',
      includedDriverFuel: 'Private Service With Driver & Fuel',
      includedDriverFuelDesc: 'Includes experienced VIP driver, daily fuel, and fresh air-conditioned vehicle.',
      tabAll: 'All Fleet',
      tabFamily: 'MPV & Family',
      tabVip: 'Luxury & VIP',
      tabGroup: 'Minibus & Group',
      specsSeats: 'Passenger Seats',
      specsTransmission: 'Transmission',
      specsEngine: 'Engine',
      specsService: 'Service',
      specsDriverFuel: 'Driver & Fuel Included',
      viewFleet: 'View Fleet',
      bookCar: 'Select & Rent Car',
      step1: '1. Vehicle Catalog',
      step2: '2. Reservation Form',
      step3: '3. Payment & Confirmation',
      step4: '4. Official E-Ticket',
      step1Title: 'Choose Your Vehicle',
      step2Title: 'Pickup Details & Renter Information',
      step3Title: 'Payment Method & Invoice',
      step4Title: 'Official E-Ticket & Voucher Issued',
      fullName: 'Renter Full Name',
      email: 'Email Address',
      phone: 'WhatsApp / Phone Number',
      startDate: 'Rental Start Date',
      duration: 'Rental Duration (Days)',
      pickupLocation: 'Pickup Location in Bali',
      pickupPlaceholder: 'e.g. Ngurah Rai Airport DPS / The Westin Resort Nusa Dua / Villa in Canggu',
      specialNotes: 'Additional Notes',
      specialNotesPlaceholder: 'e.g. Flight number, specific arrival time, child seat request, etc.',
      servicePackage: 'Rental Service Package',
      servicePackageDesc: 'Includes professional VIP driver, daily fuel, and pristine air-conditioned car.',
      rentalNoticeTitle: 'Car Rental Service Terms & Guarantees:',
      rentalNotice1: 'With Driver & Fuel: All rental packages include a licensed professional driver and vehicle fuel (BBM).',
      rentalNotice2: 'Operating Hours: Full-day usage with driver up to 10-12 hours per day anywhere in Bali.',
      rentalNotice3: 'Free Hotel Delivery: Complimentary pickup & drop-off at hotels in Kuta, Canggu, Ubud, Seminyak, Nusa Dua, Sanur & DPS Airport.',
      orderSummary: 'Reservation Summary',
      pricePerDay: 'Daily Rental Rate',
      totalDays: 'Duration',
      subtotal: 'Rental Subtotal',
      taxVAT: 'VAT (10%)',
      deliveryFee: 'Delivery & Pickup Fee',
      freeDelivery: 'FREE (Complimentary VIP Service)',
      totalPayment: 'Total Payment',
      selectPaymentMethod: 'Select Payment Method',
      payWithCard: 'Credit / Debit Card Online',
      payWithQRIS: 'QRIS (Gopay, OVO, Dana, BCA)',
      payWithVA: 'Virtual Account / Bank Transfer',
      bankBCA: 'BCA Virtual Account',
      bankMandiri: 'Mandiri Virtual Account',
      bankBNI: 'BNI Virtual Account',
      eWalletGopay: 'GoPay Instant',
      eWalletOVO: 'OVO Payment',
      eWalletDana: 'DANA Wallet',
      paymentInstructions: 'Payment Instructions',
      uploadProof: 'Confirm Payment',
      confirmPayment: 'Pay Now & Issue E-Ticket',
      eTicketTitle: 'Official Vehicle Rental E-Ticket',
      eTicketSuccess: 'Car Rental Reservation Successfully Confirmed!',
      eTicketCode: 'Booking Code',
      eTicketVehicle: 'Vehicle Unit',
      eTicketDuration: 'Duration',
      eTicketPickup: 'Pickup Location',
      eTicketDriver: 'Driver & Fuel',
      eTicketStatus: 'Reservation Status',
      confirmed: 'PAID & CONFIRMED',
      backToCatalogBtn: 'Book Another Vehicle',
      saveTicketBtn: 'Save / Print E-Ticket',
    },
    about: {
      badge: 'Our Noble Story',
      title: 'Pioneer of Luxury Private Tours in Bali',
      subtitle: 'Founded with the vision to redefine bespoke luxury travel, andhikabalitour delivers private holiday experiences that are exclusive, safe, and crafted to meet your highest standards.',
      missionTitle: 'Our Mission: Delivering Boundless Island Memories',
      missionDesc: 'At andhikabalitour, we believe every moment of your Bali getaway is priceless. We reject rushed, crowded mass tourism. That is why every itinerary we curate is 100% private, flexible, and guided by internationally licensed experts.',
      pillar1Title: 'Safety & Comfort Priority',
      pillar1Desc: 'All our vehicles undergo strict periodic maintenance. Our off-road guides and diving instructors hold certified international safety credentials.',
      pillar2Title: 'Personalized Exploration',
      pillar2Desc: 'Travel at your own relaxed pace. You can request customized culinary menus, flexible pickup timings, or spontaneous itinerary tweaks directly on tour.',
      pillar3Title: 'Local Community Impact',
      pillar3Desc: 'A portion of your booking directly supports coral reef conservation in Nusa Penida and the welfare of local guide communities in Kintamani.',
      visualBadge: 'Luxury Hospitality',
      visualTitle: 'Behind the Scenes of Luxury',
      visualDesc: 'Our itinerary designers, VIP chauffeurs, professional photographers, and hotel concierges are ready to assist you 24 hours a day.',
      stat1Label: 'CERTIFIED PRO GUIDES',
      stat1Val: '100%',
      stat2Label: 'ANNUAL VIP GUESTS',
      stat2Val: '5,000+',
      stat3Label: 'CLIENT SATISFACTION',
      stat3Val: '4.95/5',
      stat4Label: 'PRIVATE LUXURY FLEET',
      stat4Val: '25+',
    },
    whyUs: {
      badge: 'Elite Advantages',
      title: 'The Distinction in Luxury Hospitality',
      subtitle: 'Why choose andhikabalitour? We do not merely assemble tours; we create timeless, bespoke works of travel art.',
      item1Title: '100% Private VIP Exclusivity',
      item1Desc: 'Zero stranger grouping. Every vehicle, guide, and accommodation throughout your trip belongs exclusively to your party for absolute privacy.',
      item2Title: 'Schedule Flexibility Guarantee',
      item2Desc: 'Reschedule your dates or tour itineraries completely free of charge in the event of adverse weather, flight changes, or spontaneous plans.',
      item3Title: '5-Star Curated Gastronomy',
      item3Desc: 'From fresh grilled Jimbaran ocean lobster to warm gourmet picnics atop volcanic ridges. Plant-based and allergen-free menus are always provided.',
      item4Title: 'Exclusive Professional Media',
      item4Desc: 'Say goodbye to blurry selfies. Add-on professional photographers equipped with full-frame DSLRs and 4K cinema drones capture your golden moments.',
      item5Title: 'International Safety Protocols',
      item5Desc: 'All 4x4 expedition rigs, speedboats, and yachts are sea-and-road certified and backed by comprehensive premium travel insurance.',
      item6Title: 'Licensed Indigenous Guides',
      item6Desc: 'Our guides are far more than drivers. They are local historians, certified adventure instructors, and passionate keepers of Bali’s rich culture.',
      customBoxTitle: 'Need a Bespoke Custom Itinerary?',
      customBoxDesc: 'Our VIP travel designers are ready to curate custom multi-day holidays tailored to your private celebrations, passions, or romantic retreats in Bali.',
      customBoxBtn: 'Free Private Consultation',
    },
    gallery: {
      badge: 'Visual Masterpieces',
      title: 'Golden Memories Photo Gallery',
      subtitle: 'Authentic captures showcasing the natural wonders of the Island of the Gods and exclusive guest expeditions by andhikabalitour.',
      filterAll: 'All Photos',
      filterVolcano: 'Kintamani & Volcano',
      filterOcean: 'Nusa Penida & Marine',
      filterJungle: 'Ubud & River Rafting',
      filterVehicles: 'VIP Vehicle Fleet',
    },
    reviews: {
      badge: 'Unfiltered Testimonials',
      title: 'VIP Guest Impressions & Reviews',
      subtitle: 'Genuine reviews from domestic and international travelers who entrusted their dream Bali holidays to andhikabalitour.',
      verifiedTraveler: 'Verified Traveler',
      ratingAverage: '4.95 out of 5 Stars',
      totalReviews: 'Based on 850+ Guest Reviews',
      writeReview: 'Write a Review',
      modalTitle: 'Share Your Bali Holiday Experience',
      yourName: 'Full Name',
      yourRating: 'Your Rating',
      yourComment: 'Your Story & Comments',
      submitReview: 'Submit Review Now',
      thankYou: 'Thank you for sharing your valuable feedback!',
    },
    contact: {
      badge: 'Direct Concierge',
      title: 'Contact Our Exclusive Concierge',
      subtitle: 'Have specific questions or wish to charter a private fleet? Our team is available 24/7 via WhatsApp, Telephone, or Email.',
      headOffice: 'Headquarters & Basecamp',
      address: 'Gg. Perbatasan No.18, Pemogan, South Denpasar, Denpasar City, Bali 80222',
      phone: '+62 812-2565-7382',
      email: 'Dewakanto587@gmail.com',
      operatingHours: 'Operating Service Hours',
      hoursDetail: 'Open Daily: 06:00 AM - 11:00 PM WITA (24/7 Concierge Hotline)',
      formTitle: 'Send a Message or Special Request',
      formName: 'Your Name',
      formEmail: 'Email Address',
      formPhone: 'WhatsApp / Phone Number',
      formSubject: 'Subject / Topic',
      formMessage: 'Write your message or custom travel plans...',
      formSubmit: 'Send Message Now',
      formSuccess: 'Your message has been sent successfully! Our concierge team will reach out shortly.',
    },
    bookingModal: {
      step1Title: '1. Package & Dates',
      step2Title: '2. Guest Information & Contact',
      step3Title: '3. Payment & Confirmation',
      step4Title: '4. Official E-Voucher Issued',
      selectPackage: 'Choose Adventure Package',
      selectPricingOption: 'Ride Option / Type',
      tripDate: 'Select Adventure Date',
      totalGuests: 'Number of Guests',
      guestCounterNote: 'Tailoring equipment, gear sizing, and safety protocols',
      participantDetails: 'Participant Identity (For Insurance & Permits)',
      participant: 'Participant',
      fullName: 'Full Name',
      idNumber: 'KTP / Passport Number',
      ageCategory: 'Age Category',
      adult: 'Adult',
      child: 'Child',
      contactInfo: 'Primary Booker Contact Information',
      emailPlaceholder: 'name@domain.com (E-Tickets sent here)',
      phonePlaceholder: 'Active WhatsApp number for pickup coordination',
      specialRequests: 'Special Requests & Dietary Requirements',
      specialRequestsPlaceholder: 'e.g. Dietary allergies, specific hotel pickup instructions, anniversary setup, etc.',
      addonsTitle: 'Elevate Your Experience (Optional Add-ons)',
      addonsDesc: 'Exclusive luxury upgrades to perfect your memorable day in Bali',
      proceedToPayment: 'Proceed to Payment',
      pricingSummary: 'Reservation Cost Breakdown',
      packageBase: 'Activity Package Base',
      addonsTotal: 'Selected Add-ons',
      subtotal: 'Invoice Subtotal',
      vatTax: 'VAT & Service Fee (10%)',
      grandTotal: 'Final Total Amount',
      payNow: 'Pay Now & Confirm Reservation',
      securityNotice: 'All transactions are secured by 256-bit bank-grade SSL encryption.',
      ticketConfirmed: 'Your Tour Booking Is Confirmed!',
      ticketDesc: 'Your official E-Voucher is ready. Please save your booking code or present it at pickup.',
      bookingCode: 'OFFICIAL BOOKING CODE',
      downloadVoucher: 'Download E-Voucher (PDF)',
      printVoucher: 'Print Voucher',
      shareWhatsApp: 'Send to WhatsApp',
    },
    footer: {
      brandDesc: 'andhikabalitour is Bali’s premier bespoke private tour and luxury car rental provider. Offering exclusive outdoor adventures, marine yachting, off-road expeditions, and private chauffeured cars with fuel included.',
      registeredBadge: 'Sustainable Luxury Tourism Bali Registered',
      headOffice: 'Headquarters',
      baliTime: 'Bali Local Time (WITA)',
      weatherTitle: 'Bali Microclimates',
      quickLinks: 'Quick Links',
      followUs: 'Follow Us',
      rightsReserved: 'All Rights Reserved.',
      termsAndPrivacy: 'Privacy Policy • Terms & Conditions',
    },
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      tours: 'باقات الجولات',
      rental: 'تأجير السيارات',
      about: 'من نحن',
      gallery: 'معرض الصور',
      whyus: 'لماذا نحن',
      contact: 'اتصل بنا',
      bookNow: 'احجز الآن',
      hotline: 'خدمة عملاء andhikabalitour على مدار 24/7',
    },
    hero: {
      curatedDestinations: 'وجهات مختارة',
      activeExperience: 'تجربة نشطة',
      viewDetails: 'تفاصيل الباقة',
      bookNow: 'احجز الآن',
      viewPackages: 'عرض الباقات',
      scrollToExplore: 'مرر للاستكشاف',
    },
    common: {
      perPerson: '/ للشخص',
      perDay: '/ يومياً',
      minPersons: 'شخصين على الأقل',
      maxPersons: 'شخصين كحد أقصى',
      included: 'مشمول',
      notIncluded: 'غير مشمول',
      itinerary: 'جدول الرحلة',
      highlights: 'أبرز المعالم',
      duration: 'المدة',
      location: 'الموقع',
      difficulty: 'مستوى النشاط',
      viewDetails: 'عرض التفاصيل',
      bookNow: 'احجز الآن',
      selectVehicle: 'اختر السيارة',
      back: 'رجوع',
      close: 'إغلاق',
      confirm: 'تأكيد',
      cancel: 'إلغاء',
      download: 'تحميل التذكرة الإلكترونية',
      print: 'طباعة التذكرة',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      loading: 'جارٍ التحميل...',
      processing: 'جارٍ معالجة الحجز...',
      success: 'تم بنجاح!',
      all: 'الكل',
      search: 'ابحث عن وجهة أو باقة...',
      rating: 'التقييم',
      reviews: 'تقييمات',
      chatWhatsApp: 'تأكيد عبر واتساب',
      officialVoucher: 'قسيمة ANDHIKABALITOUR الرسمية',
    },
    destinations: {
      badge: 'رحلات استكشافية خاصة وفاخرة',
      title: 'الوجهات والأنشطة المميزة',
      subtitle: 'تم تصميم كل تجربة بشكل خاص ومميز مع أعلى معايير الراحة، ومرشدين محليين ذوي خبرة، وأسطول سيارات فاخر في بالي.',
      viewAll: 'عرض جميع الوجهات',
    },
    activities: {
      badge: 'مغامرات مليئة بالحماس والإثارة',
      title: 'أنشطة المغامرات الخارجية الفاخرة',
      subtitle: 'عش متعة الإثارة واستمتع بالغابات الاستوائية الساحرة أو انطلق في مياه الأنهار الطبيعية وفق أعلى معايير السلامة الدولية.',
      badgePopular: 'الأكثر طلباً',
      badgeRecommended: 'موصى به',
      badgeExtreme: 'مغامرة قوية',
      badgeExotic: 'استوائي ساحر',
      badgeIsland: 'رحلة الجزر',
      includesNotice: 'يشمل: التأمين، وجبة الغداء، مرشدين وفريق إنقاذ متخصص',
      insuranceIncluded: 'تأمين شامل ومرشدين معتمدين',
      startingFrom: 'الأسعار تبدأ من',
      perPerson: 'للشخص',
      safeBadge: 'جميع معدات السلامة معتمدة دولياً',
      vipBadge: 'خدمة خاصة VIP 100% بدون أي مجموعات أخرى',
      guidesBadge: 'مرشدون ومدربون محليون مرخصون',
      flexibleBadge: 'مواعيد وجداول مرنة ومخصصة حسب رغبتك',
    },
    experiences: {
      badge: 'جولات صممت خصيصاً',
      title: 'باقات الرحلات الخاصة الرائدة',
      subtitle: 'مجموعة رحلات حصرية مصممة لتوفر لك الراحة المطلقة والخصوصية التامة وذكريات لا تُنسى في جزيرة بالي.',
      highlightsLabel: 'أبرز المزايا الحصرية',
      guaranteeSeal: 'ضمان الرضا والراحة الخاصة 100%',
    },
    experienceDetails: {
      badge: 'جداول رحلات متميزة',
      title: 'المواصفات والجدول الزمني للرحلة',
      subtitle: 'شفافية كاملة دون أي تنازلات. نقدم جدولاً تفصيلياً كاملاً ومرافق شاملة وإرشادات السلامة لراحتك أثناء السفر.',
      tabOverview: 'نظرة عامة',
      tabItinerary: 'الجدول الكامل',
      tabInclusions: 'المرافق والخدمات',
      tabPricing: 'خيارات الأسعار',
      whatsIncluded: 'المشمولات في الباقة',
      whatsExcluded: 'غير المشمول',
      scheduleHighlights: 'أبرز محطات الجدول اليومي',
      customPackageQuote: 'هل ترغب في تخصيص برنامج رحلة خاص؟',
    },
    catalog: {
      badge: 'باقات VIP مخصصة',
      title: 'دليل باقات الجولات السياحية الحصرية',
      subtitle: 'استكشف جمال بالي الطبيعي الساحر مع خدمات VIP خاصة 100%. من مغامرات الدفع الرباعي للبراكين واليخوت الفاخرة إلى زيارة المعابد التاريخية العريقة.',
      filterAll: 'جميع الباقات',
      filterAdventure: 'مغامرة وإثارة',
      filterBeach: 'شواطئ وجزيرة نوسا بينيدا',
      filterCulture: 'تجديف النهر والطبيعة الخلابة',
      searchPlaceholder: 'ابحث عن وجهات أو باقات سياحية...',
      showingResults: 'عرض {count} من {total} باقة أنشطة في بالي',
      noResults: 'لم نتمكن من العثور على باقات تطابق بحثك.',
      clearFilter: 'إعادة ضبط البحث',
    },
    packageDetail: {
      backToCatalog: 'العودة إلى دليل الجولات',
      completePackagePrice: 'سعر الباقة الشاملة',
      includedWithTour: 'المرافق والخدمات المشمولة',
      notIncludedWithTour: 'غير مشمول في الجولة',
      photoGallery: 'معرض الصور وتوثيق التجربة',
      clickToEnlarge: 'انقر على أي صورة لتكبيرها',
      dailyItinerary: 'الجدول الزمني والتفاصيل اليومية',
      keyHighlights: 'أبرز معالم هذه التجربة',
      reserveThisTrip: 'احجز هذه الباقة الآن',
      askViaWhatsApp: 'استفسر عبر واتساب',
      instantConfirmation: 'تأكيد فوري وإصدار قسيمة إلكترونية رسمية',
      freeCancellation: 'ضمان إعادة جدولة مرن ومجاني',
    },
    rentalSection: {
      badge: 'أسطول سيارات وخدمات نقل فاخرة',
      title: 'خدمات تأجير السيارات الفاخرة في بالي',
      subtitle: 'استمتع بأقصى درجات الراحة أثناء التنقل في جزيرة بالي بسيارات حديثة ونظيفة ومكيفة بالكامل. تشمل جميع حجوزات التأجير سائقاً محترفاً ووقود السيارة (البنزين).',
      carFleet: 'أسطول السيارات + سائق خاص ووقود',
      viewAllBtn: 'عرض كامل الأسطول والشروط',
      passengers: 'ركاب',
      privateService: 'خدمة خاصة VIP',
      driverFuelIncluded: 'يشمل السائق والوقود',
      ratePerDay: 'سعر الإيجار اليومي',
      perDay: '/ يومياً',
      allRiskInsurance: 'تأمين شامل للسيارة',
      rentNow: 'استأجر هذه السيارة',
      routeDetails: 'المسارات والتفاصيل',
      benefit1Title: 'سائقون محترفون وودودون',
      benefit1Desc: 'معرفة تامة بجميع الطرق السريعة والمعالم السياحية الساحرة في بالي.',
      benefit2Title: 'سيارات نظيفة مع الوقود مشمول',
      benefit2Desc: 'يشمل الوقود اليومي بالكامل ومقصورة مريحة ومكيفة برائحة زكية.',
      benefit3Title: 'خدمة التوصيل من وإلى الفندق مجاناً',
      benefit3Desc: 'استقبال وتوصيل في الموعد المحدد في جميع مناطق بالي السياحية.',
    },
    rental: {
      badge: 'أسطول سيارات ونقل فاخر',
      title: 'خدمات تأجير السيارات الفاخرة في بالي',
      subtitle: 'استمتع بأقصى درجات الراحة أثناء التنقل في جزيرة بالي بسيارات حديثة ونظيفة ومكيفة بالكامل. تشمل جميع حجوزات التأجير سائقاً محترفاً ووقود السيارة (البنزين).',
      fleetBadge: 'أسطول السيارات + سائق محترف ووقود',
      includedDriverFuel: 'خدمة خاصة مع سائق ووقود',
      includedDriverFuelDesc: 'يشمل سائقاً خبيراً خاصاً، الوقود اليومي، وسيارات حديثة ونظيفة ومكيفة.',
      tabAll: 'جميع السيارات',
      tabFamily: 'عائلية و MPV',
      tabVip: 'فاخرة و VIP',
      tabGroup: 'حافلات ومجموعات',
      specsSeats: 'مقاعد الركاب',
      specsTransmission: 'ناقل الحركة',
      specsEngine: 'المحرك',
      specsService: 'الخدمة',
      specsDriverFuel: 'يشمل السائق والوقود',
      viewFleet: 'عرض الأسطول',
      bookCar: 'اختيار وحجز السيارة',
      step1: '1. دليل السيارات',
      step2: '2. بيانات الحجز والاستلام',
      step3: '3. الدفع والتأكيد',
      step4: '4. التذكرة الإلكترونية الرسمية',
      step1Title: 'اختر السيارة المناسبة لك',
      step2Title: 'تفاصيل الاستلام وبيانات المستأجر',
      step3Title: 'طريقة الدفع والفاتورة',
      step4Title: 'تم إصدار التذكرة وقسيمة الإيجار',
      fullName: 'الاسم الكامل للمستأجر',
      email: 'البريد الإلكتروني',
      phone: 'رقم الواتساب / الهاتف',
      startDate: 'تاريخ بدء الإيجار',
      duration: 'مدة الإيجار (بالأيام)',
      pickupLocation: 'مكان الاستلام في بالي',
      pickupPlaceholder: 'مثال: مطار نغوراه راي الدولي DPS / فندق ويستن نوسا دوا / فيلا تشانغو',
      specialNotes: 'ملاحظات إضافية',
      specialNotesPlaceholder: 'مثال: رقم الرحلة الجوية، وقت الاستلام المحدد، مقعد أطفال، إلخ.',
      servicePackage: 'باقة خدمة التأجير',
      servicePackageDesc: 'تشمل سائقاً محترفاً خبيراً، الوقود اليومي، وسيارات مكيفة ونظيفة.',
      rentalNoticeTitle: 'شروط وضمانات خدمة تأجير السيارات:',
      rentalNotice1: 'مع سائق ووقود: تشمل جميع باقات التأجير سائقاً مرخصاً ووقود السيارة (البنزين).',
      rentalNotice2: 'ساعات العمل اليومية: استخدام السيارة مع السائق لمدة 10-12 ساعة يومياً في أي مكان في بالي.',
      rentalNotice3: 'توصيل مجاني: خدمة التوصيل والاستقبال مجاناً من وإلى الفندق في كوتا، تشانغو، أوبود، سيمينياك، نوسا دوا، سانور والمطار.',
      orderSummary: 'ملخص الحجز',
      pricePerDay: 'سعر الإيجار اليومي',
      totalDays: 'مدة الإيجار',
      subtotal: 'المجموع الفرعي',
      taxVAT: 'ضريبة القيمة المضافة (10%)',
      deliveryFee: 'رسوم التوصيل والاستلام',
      freeDelivery: 'مجاناً (خدمة VIP)',
      totalPayment: 'إجمالي المبلغ للدفع',
      selectPaymentMethod: 'اختر طريقة الدفع',
      payWithCard: 'بطاقة ائتمان / خصم مباشر',
      payWithQRIS: 'دفع QRIS السريع',
      payWithVA: 'حساب بنكي افتراضي / تحويل بنكي',
      bankBCA: 'حساب BCA الافتراضي',
      bankMandiri: 'حساب Mandiri الافتراضي',
      bankBNI: 'حساب BNI الافتراضي',
      eWalletGopay: 'محفظة GoPay',
      eWalletOVO: 'محفظة OVO',
      eWalletDana: 'محفظة DANA',
      paymentInstructions: 'تعليمات الدفع',
      uploadProof: 'تأكيد الدفع',
      confirmPayment: 'ادفع الآن واصدر التذكرة الإلكترونية',
      eTicketTitle: 'التذكرة الإلكترونية الرسمية لتأجير السيارة',
      eTicketSuccess: 'تم تأكيد حجز تأجير السيارة بنجاح!',
      eTicketCode: 'رمز الحجز',
      eTicketVehicle: 'نوع السيارة',
      eTicketDuration: 'المدة',
      eTicketPickup: 'موقع الاستلام',
      eTicketDriver: 'السائق والوقود',
      eTicketStatus: 'حالة الحجز',
      confirmed: 'مدفوع ومؤكد رسمياً',
      backToCatalogBtn: 'حجز سيارة أخرى',
      saveTicketBtn: 'حفظ / طباعة التذكرة الإلكترونية',
    },
    about: {
      badge: 'قصتنا العريقة',
      title: 'رواد خدمات الجولات السياحية الخاصة الفاخرة في بالي',
      subtitle: 'تأسست andhikabalitour برؤية تهدف إلى إعادة تعريف مفهوم السفر الفاخر، حيث نقدم تجارب عطلات خاصة وحصرية وآمنة تلبي أعلى تطلعاتك.',
      missionTitle: 'مهمتنا: تقديم لحظات وذكريات لا تُنسى في الجزيرة',
      missionDesc: 'في andhikabalitour نؤمن بأن كل ثانية من رحلتك في بالي لا تقدر بثمن. نحن نبتعد عن السياحة الجماعية المزدحمة ونقدم برامج سياحية خاصة 100% مع مرشدين محليين معتمدين دولياً.',
      pillar1Title: 'أولوية السلامة والراحة',
      pillar1Desc: 'تخضع جميع مركباتنا لفحوصات صيانة دورية صارمة. ويحمل مرشدونا رخص قيادة وتدريب معتمدة دولياً.',
      pillar2Title: 'استكشاف مخصص لكل عميل',
      pillar2Desc: 'سافر بالوتيرة التي تناسبك بحرية وراحة. يمكنك طلب تعديل أوقات الانطلاق أو قوائم الطعام أو المحطات الإضافية مباشرة.',
      pillar3Title: 'دعم المجتمع المحلي والبيئة',
      pillar3Desc: 'يساهم جزء من قيمة حجزك في حماية الشعاب المرجانية في نوسا بينيدا ودعم مجتمعات المرشدين المحليين في بالي.',
      visualBadge: 'ضيافة فاخرة',
      visualTitle: 'كواليس تقديم الفخامة',
      visualDesc: 'فريقنا من مصممي الرحلات، وسائقي VIP، والمصورين المحترفين في خدمتكم على مدار 24 ساعة يومياً.',
      stat1Label: 'مرشدون معتمدون 100%',
      stat1Val: '100%',
      stat2Label: 'ضيوف VIP سنوياً',
      stat2Val: '5,000+',
      stat3Label: 'معدل رضا الضيوف',
      stat3Val: '4.95/5',
      stat4Label: 'أسطول سيارات فاخر خاص',
      stat4Val: '25+',
    },
    whyUs: {
      badge: 'مزايا فريدة',
      title: 'معايير خدمة مختلفة واستثنائية',
      subtitle: 'لماذا تختار andhikabalitour؟ نحن لا نصنع جولات تقليدية، بل نصنع تجارب ومغامرات مخصصة تبقى خالدة في الذاكرة.',
      item1Title: 'خصوصية VIP بنسبة 100%',
      item1Desc: 'بدون مشاركة أي غرباء. جميع المركبات والمرشدين مخصصون حصرياً لرحلتك لضمان الخصوصية والراحة التامة.',
      item2Title: 'ضمان مرونة المواعيد والجدول',
      item2Desc: 'يمكنك تعديل تواريخ الرحلة أو برنامج الجولة مجاناً في حال تغير الطقس أو مواعيد الطيران.',
      item3Title: 'أطباق طعام منتقاة بمستوى 5 نجوم',
      item3Desc: 'من وجبات المأكولات البحرية الطازجة على شاطئ جيمباران إلى النزهات الفاخرة على حواف البراكين، مع توفير خيارات الطعام الحلال والنباتي.',
      item4Title: 'توثيق وتصوير احترافي حصري',
      item4Desc: 'نوفر مصورين محترفين مجهزين بكاميرات احترافية وطائرات درون 4K لتوثيق أجمل لحظاتكم.',
      item5Title: 'معايير أمان وسلامة دولية',
      item5Desc: 'جميع سيارات الدفع الرباعي 4x4 والزوارق واليخوت حاصلة على تراخيص السلامة ومشمولة بتأمين شامل للسفر.',
      item6Title: 'مرشدون محليون مرخصون رسمياً',
      item6Desc: 'مرشدونا خبراء في تاريخ وثقافة بالي ومدربون معتمدون لضمان تجربة سياحية ثرية وممتعة.',
      customBoxTitle: 'هل تحتاج إلى برنامج سياحي مخصص بالكامل؟',
      customBoxDesc: 'فريقنا المتخصص في تصميم رحلات VIP مستعد لتنظيم رحلات متعددة الأيام تلبي رغباتك واهتماماتك الخاصة في جزيرة بالي.',
      customBoxBtn: 'استشارة خاصة مجانية',
    },
    gallery: {
      badge: 'روائع الصور',
      title: 'معرض صور اللحظات الذهبية',
      subtitle: 'لقطات حقيقية تعكس سحر طبيعة جزيرة بالي وتجارب ضيوف andhikabalitour الحصرية.',
      filterAll: 'جميع الصور',
      filterVolcano: 'كينتاماني والبركان',
      filterOcean: 'نوسا بينيدا والبحر',
      filterJungle: 'أوبود وتجديف النهر',
      filterVehicles: 'أسطول سيارات VIP',
    },
    reviews: {
      badge: 'آراء وتجارب حقيقية',
      title: 'انطباعات وتقييمات ضيوفنا',
      subtitle: 'تقييمات حقيقية من مسافرين اختاروا andhikabalitour لقضاء عطلاتهم المميزة في بالي.',
      verifiedTraveler: 'مسافر موثق',
      ratingAverage: '4.95 من 5 نجوم',
      totalReviews: 'استناداً إلى أكثر من 850 تقييم',
      writeReview: 'اكتب تقييمك',
      modalTitle: 'شاركنا تجربتك في بالي',
      yourName: 'الاسم الكامل',
      yourRating: 'تقييمك',
      yourComment: 'رأيك وتفاصيل تجربتك',
      submitReview: 'إرسال التقييم الآن',
      thankYou: 'شكراً جزيلاً على مشاركة تقييمك القيم!',
    },
    contact: {
      badge: 'خدمة العملاء المباشرة',
      title: 'تواصل مع فريق الكونسيرج الخاص بنا',
      subtitle: 'هل لديك استفسار أو ترغب في حجز سيارة خاصة؟ فريقنا في خدمتك 24 ساعة يومياً عبر واتساب أو الهاتف أو البريد الإلكتروني.',
      headOffice: 'المكتب الرئيسي ومقر العمليات',
      address: 'Gg. Perbatasan No.18, Pemogan, Denpasar Selatan, Kota Denpasar, Bali 80222',
      phone: '+62 812-2565-7382',
      email: 'Dewakanto587@gmail.com',
      operatingHours: 'ساعات العمل الرسمية',
      hoursDetail: 'مفتوح يومياً: 06:00 صباحاً - 11:00 مساءً بتوقيت بالي (خدمة الكونسيرج 24/7)',
      formTitle: 'أرسل رسالة أو استفساراً خاصاً',
      formName: 'اسمك الكريم',
      formEmail: 'البريد الإلكتروني',
      formPhone: 'رقم الواتساب / الهاتف',
      formSubject: 'موضوع الاستفسار',
      formMessage: 'اكتب رسالتك أو تفاصيل برنامج الرحلة الذي ترغب به...',
      formSubmit: 'إرسال الرسالة الآن',
      formSuccess: 'تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا في أقرب وقت.',
    },
    bookingModal: {
      step1Title: '1. تفاصيل الباقة والتاريخ',
      step2Title: '2. بيانات الضيوف والتواصل',
      step3Title: '3. الدفع والتأكيد',
      step4Title: '4. تم إصدار القسيمة الإلكترونية الرسمية',
      selectPackage: 'اختر باقة المغامرة',
      selectPricingOption: 'نوع الجولة / الخيار',
      tripDate: 'اختر تاريخ المغامرة',
      totalGuests: 'عدد الضيوف',
      guestCounterNote: 'لتجهيز معدات السلامة والمرافق المناسبة',
      participantDetails: 'بيانات الضيوف (لأغراض التأمين والتصاريح)',
      participant: 'الضيف',
      fullName: 'الاسم الكامل',
      idNumber: 'رقم الهوية / جواز السفر',
      ageCategory: 'الفئة العمرية',
      adult: 'بالغ',
      child: 'طفل',
      contactInfo: 'بيانات التواصل للمسافر الرئيسي',
      emailPlaceholder: 'name@domain.com (سيتم إرسال التذكرة إلى هنا)',
      phonePlaceholder: 'رقم الواتساب النشط للتنسيق والاستقبال',
      specialRequests: 'طلبات خاصة أو ملاحظات غذائية',
      specialRequestsPlaceholder: 'مثال: وجبات خاصة أو حساسية، مكان استقبال محدد، تجهيز لمناسبة، إلخ.',
      addonsTitle: 'ارتقِ بتجربتك (إضافات اختيارية فاخرة)',
      addonsDesc: 'خدمات إضافية حصرية لتكتمل روعة يومك المميز في بالي',
      proceedToPayment: 'المتابعة إلى الدفع',
      pricingSummary: 'تفاصيل تكلفة الحجز',
      packageBase: 'سعر باقة النشاط الأساسي',
      addonsTotal: 'الخدمات الإضافية المختارة',
      subtotal: 'المجموع الفرعي',
      vatTax: 'الضريبة ورسوم الخدمة (10%)',
      grandTotal: 'المبلغ الإجمالي النهائي',
      payNow: 'ادفع الآن وأكد الحجز',
      securityNotice: 'جميع المعاملات محمية بتشفير SSL عالي الأمان بمستوى بنكي 256-bit.',
      ticketConfirmed: 'تم تأكيد حجز جولتك بنجاح!',
      ticketDesc: 'تم إصدار القسيمة الإلكترونية الرسمية. يرجى الاحتفاظ برمز الحجز أو إبرازه عند الاستقبال.',
      bookingCode: 'رمز الحجز الرسمي',
      downloadVoucher: 'تحميل القسيمة الإلكترونية (PDF)',
      printVoucher: 'طباعة القسيمة',
      shareWhatsApp: 'إرسال عبر واتساب',
    },
    footer: {
      brandDesc: 'andhikabalitour هي الشركة الرائدة في تقديم الجولات السياحية الخاصة الفاخرة وتأجير السيارات في بالي. نقدم مغامرات بحرية وبرية وسيارات خاصة مع سائقين محترفين ووقود مشمول بالكامل.',
      registeredBadge: 'مسجل لدى هيئة السياحة الفاخرة المستدامة في بالي',
      headOffice: 'المكتب الرئيسي',
      baliTime: 'توقيت بالي المحلي (WITA)',
      weatherTitle: 'طقس بالي',
      quickLinks: 'روابط سريعة',
      followUs: 'تابعنا على',
      rightsReserved: 'جميع الحقوق محفوظة.',
      termsAndPrivacy: 'سياسة الخصوصية • الشروط والأحكام',
    },
  },
};
