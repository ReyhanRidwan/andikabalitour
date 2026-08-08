import { Experience, BookingAddon, Review, Vehicle } from './types';

// Let's use the exact generated image paths
export const EXPERIENCES: Experience[] = [
  {
    id: 'nusa-penida-west',
    title: 'NUSA PENIDA - KELINGKING BEACH',
    tagline: 'Nusa Penida West Trip',
    shortDesc: 'Jelajahi keajaiban Kelingking Beach, Broken Beach, Angel’s Billabong, Paluang Hills & Crystal Bay.',
    longDesc: 'Nikmati petualangan eksklusif seharian menjelajahi pesona bahari Nusa Penida bagian Barat. Mengunjungi spot ikonik dunia seperti Kelingking Beach, Broken Beach, Angel’s Billabong, Paluang Hills, dan bersantai di Crystal Bay. Paket sudah termasuk tiket fastboat PP, mobil privat AC, makan siang, dan pemandu lokal.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
    galleryImages: [
      {
        name: 'Kelingking Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
        description: 'Tebing T-Rex spektakuler dengan pemandangan pantai pasir putih dan laut biru bening.'
      },
      {
        name: 'Broken Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
        description: 'Tebing melingkar alami dengan terowongan tebing ikonik tempat laut masuk.'
      },
      {
        name: 'Angel’s Billabong',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188544/70c34f11-a7bd-4249-8ef0-95f6f6c233e6.png',
        description: 'Kolam pasang surut alami dengan air jernih bak kristal di tebing batu karang.'
      },
      {
        name: 'Paluang Hills',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188206/9dc60007-a1d6-40fb-a07f-2db5622654dc.png',
        description: 'Spot foto terbaik dengan latar belakang tebing Kelingking dari sudut pandang berbeda.'
      },
      {
        name: 'Crystal Bay',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188073/7106f686-f6a2-4d9d-85b5-0bd005911e58.png',
        description: 'Pantai indah berpasir putih tempat yang sempurna untuk bersantai dan menikmati perairan jernih.'
      }
    ],
    pricePerPerson: 850000,
    duration: '07:00 - 17:00 (Min. 2 Person)',
    location: 'Nusa Penida, Bali',
    difficulty: 'Eksplorasi Pulau',
    rating: 4.9,
    reviewCount: 320,
    highlights: [
      'Mengunjungi 5 destinasi ikonik: Kelingking, Broken Beach, Angel’s Billabong, Paluang Hills & Crystal Bay',
      'Termasuk Fastboat Ticket Return (PP Sanur - Nusa Penida)',
      'Private Car (Mobil Privat AC) & Driver selama di Nusa Penida',
      'Sudah termasuk Lunch (Makan Siang) & Local Guide',
      'Minimal pemesanan 2 orang (Durasi 07:00 - 17:00)'
    ],
    inclusions: [
      'Private Car (Mobil Privat AC)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu Lokal)',
      'Fastboat Ticket Return (Sanur - Nusa Penida PP)',
      'Tiket Masuk Destinasi'
    ],
    exclusions: [
      'Penjemputan hotel Bali ke Sanur (opsional)',
      'Pengeluaran pribadi & tip'
    ],
    itinerary: [
      { time: '07:00 AM', title: 'Meeting Point Pelabuhan Sanur', desc: 'Registrasi tiket fastboat dan persiapan penyeberangan ke Nusa Penida.' },
      { time: '07:30 AM', title: 'Fastboat ke Nusa Penida', desc: 'Menyeberang laut menuju Nusa Penida (durasi perjalanan ±45 menit).' },
      { time: '08:30 AM', title: 'Start West Trip', desc: 'Disambut driver privat, langsung menuju Kelingking Beach & Paluang Hills.' },
      { time: '11:00 AM', title: 'Broken Beach & Angel’s Billabong', desc: 'Eksplorasi keajaiban tebing tebing karang dan kolam alami menakjubkan.' },
      { time: '12:30 PM', title: 'Makan Siang', desc: 'Santap makan siang di restoran lokal pilihan.' },
      { time: '02:00 PM', title: 'Bersantai di Crystal Bay', desc: 'Menikmati keasrian pantai Crystal Bay untuk santai atau berenang.' },
      { time: '04:00 PM', title: 'Kembali ke Pelabuhan & Fastboat Sanur', desc: 'Kembali naik fastboat menuju Pelabuhan Sanur Bali (tiba ±17:00).' }
    ]
  },
  {
    id: 'nusa-penida-broken',
    title: 'NUSA PENIDA - BROKEN BEACH',
    tagline: 'Nusa Penida West Trip',
    shortDesc: 'Tebing melingkar alami unik dengan teluk laut biru tempat air laut membiru masuk.',
    longDesc: 'Nikmati pesona spektakuler Broken Beach (Pasih Uug) di Nusa Penida Barat. Bagian dari paket Nusa Penida Island West Trip yang mencakup 5 destinasi ikonik: Kelingking Beach, Broken Beach, Angel’s Billabong, Paluang Hills, dan Crystal Bay. IDR 850K/pax (Min. 2 Person) include Mobil Privat AC, Fastboat PP, Lunch & Guide.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
    galleryImages: [
      {
        name: 'Broken Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
        description: 'Tebing melingkar alami dengan terowongan tebing ikonik tempat laut masuk.'
      },
      {
        name: 'Kelingking Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
        description: 'Tebing T-Rex spektakuler dengan pemandangan pantai pasir putih dan laut biru bening.'
      },
      {
        name: 'Angel’s Billabong',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188544/70c34f11-a7bd-4249-8ef0-95f6f6c233e6.png',
        description: 'Kolam pasang surut alami dengan air jernih bak kristal di tebing batu karang.'
      },
      {
        name: 'Paluang Hills',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188206/9dc60007-a1d6-40fb-a07f-2db5622654dc.png',
        description: 'Spot foto terbaik dengan latar belakang tebing Kelingking dari sudut pandang berbeda.'
      },
      {
        name: 'Crystal Bay',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188073/7106f686-f6a2-4d9d-85b5-0bd005911e58.png',
        description: 'Pantai indah berpasir putih tempat yang sempurna untuk bersantai dan menikmati perairan jernih.'
      }
    ],
    pricePerPerson: 850000,
    duration: '07:00 - 17:00 (Min. 2 Person)',
    location: 'Nusa Penida, Bali',
    difficulty: 'Eksplorasi Pulau',
    rating: 4.9,
    reviewCount: 315,
    highlights: [
      'Mengunjungi 5 destinasi ikonik: Kelingking, Broken Beach, Angel’s Billabong, Paluang Hills & Crystal Bay',
      'Termasuk Fastboat Ticket Return (PP Sanur - Nusa Penida)',
      'Private Car (Mobil Privat AC) & Driver selama di Nusa Penida',
      'Sudah termasuk Lunch (Makan Siang) & Local Guide',
      'Minimal pemesanan 2 orang (Durasi 07:00 - 17:00)'
    ],
    inclusions: [
      'Private Car (Mobil Privat AC)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu Lokal)',
      'Fastboat Ticket Return (Sanur - Nusa Penida PP)',
      'Tiket Masuk Destinasi'
    ],
    exclusions: [
      'Penjemputan hotel Bali ke Sanur (opsional)',
      'Pengeluaran pribadi & tip'
    ],
    itinerary: [
      { time: '07:00 AM', title: 'Meeting Point Pelabuhan Sanur', desc: 'Registrasi tiket fastboat dan persiapan penyeberangan ke Nusa Penida.' },
      { time: '07:30 AM', title: 'Fastboat ke Nusa Penida', desc: 'Menyeberang laut menuju Nusa Penida (durasi perjalanan ±45 menit).' },
      { time: '08:30 AM', title: 'Start West Trip', desc: 'Disambut driver privat, langsung menuju Kelingking Beach & Paluang Hills.' },
      { time: '11:00 AM', title: 'Broken Beach & Angel’s Billabong', desc: 'Eksplorasi keajaiban tebing tebing karang dan kolam alami menakjubkan.' },
      { time: '12:30 PM', title: 'Makan Siang', desc: 'Santap makan siang di restoran lokal pilihan.' },
      { time: '02:00 PM', title: 'Bersantai di Crystal Bay', desc: 'Menikmati keasrian pantai Crystal Bay untuk santai atau berenang.' },
      { time: '04:00 PM', title: 'Kembali ke Pelabuhan & Fastboat Sanur', desc: 'Kembali naik fastboat menuju Pelabuhan Sanur Bali (tiba ±17:00).' }
    ]
  },
  {
    id: 'nusa-penida-billabong',
    title: 'NUSA PENIDA - ANGEL’S BILLABONG',
    tagline: 'Nusa Penida West Trip',
    shortDesc: 'Kolam pasang surut alami dengan air bening mengilap di tebing batu karang.',
    longDesc: 'Kolam alami yang memukau karya alam Angel’s Billabong di Nusa Penida Barat. Bagian dari paket Nusa Penida Island West Trip yang mencakup 5 destinasi ikonik: Kelingking Beach, Broken Beach, Angel’s Billabong, Paluang Hills, dan Crystal Bay. IDR 850K/pax (Min. 2 Person) include Mobil Privat AC, Fastboat PP, Lunch & Guide.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188544/70c34f11-a7bd-4249-8ef0-95f6f6c233e6.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188544/70c34f11-a7bd-4249-8ef0-95f6f6c233e6.png',
    galleryImages: [
      {
        name: 'Angel’s Billabong',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188544/70c34f11-a7bd-4249-8ef0-95f6f6c233e6.png',
        description: 'Kolam pasang surut alami dengan air jernih bak kristal di tebing batu karang.'
      },
      {
        name: 'Kelingking Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
        description: 'Tebing T-Rex spektakuler dengan pemandangan pantai pasir putih dan laut biru bening.'
      },
      {
        name: 'Broken Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
        description: 'Tebing melingkar alami dengan terowongan tebing ikonik tempat laut masuk.'
      },
      {
        name: 'Paluang Hills',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188206/9dc60007-a1d6-40fb-a07f-2db5622654dc.png',
        description: 'Spot foto terbaik dengan latar belakang tebing Kelingking dari sudut pandang berbeda.'
      },
      {
        name: 'Crystal Bay',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188073/7106f686-f6a2-4d9d-85b5-0bd005911e58.png',
        description: 'Pantai indah berpasir putih tempat yang sempurna untuk bersantai dan menikmati perairan jernih.'
      }
    ],
    pricePerPerson: 850000,
    duration: '07:00 - 17:00 (Min. 2 Person)',
    location: 'Nusa Penida, Bali',
    difficulty: 'Eksplorasi Pulau',
    rating: 4.9,
    reviewCount: 298,
    highlights: [
      'Mengunjungi 5 destinasi ikonik: Kelingking, Broken Beach, Angel’s Billabong, Paluang Hills & Crystal Bay',
      'Termasuk Fastboat Ticket Return (PP Sanur - Nusa Penida)',
      'Private Car (Mobil Privat AC) & Driver selama di Nusa Penida',
      'Sudah termasuk Lunch (Makan Siang) & Local Guide',
      'Minimal pemesanan 2 orang (Durasi 07:00 - 17:00)'
    ],
    inclusions: [
      'Private Car (Mobil Privat AC)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu Lokal)',
      'Fastboat Ticket Return (Sanur - Nusa Penida PP)',
      'Tiket Masuk Destinasi'
    ],
    exclusions: [
      'Penjemputan hotel Bali ke Sanur (opsional)',
      'Pengeluaran pribadi & tip'
    ],
    itinerary: [
      { time: '07:00 AM', title: 'Meeting Point Pelabuhan Sanur', desc: 'Registrasi tiket fastboat dan persiapan penyeberangan ke Nusa Penida.' },
      { time: '07:30 AM', title: 'Fastboat ke Nusa Penida', desc: 'Menyeberang laut menuju Nusa Penida (durasi perjalanan ±45 menit).' },
      { time: '08:30 AM', title: 'Start West Trip', desc: 'Disambut driver privat, langsung menuju Kelingking Beach & Paluang Hills.' },
      { time: '11:00 AM', title: 'Broken Beach & Angel’s Billabong', desc: 'Eksplorasi keajaiban tebing tebing karang dan kolam alami menakjubkan.' },
      { time: '12:30 PM', title: 'Makan Siang', desc: 'Santap makan siang di restoran lokal pilihan.' },
      { time: '02:00 PM', title: 'Bersantai di Crystal Bay', desc: 'Menikmati keasrian pantai Crystal Bay untuk santai atau berenang.' },
      { time: '04:00 PM', title: 'Kembali ke Pelabuhan & Fastboat Sanur', desc: 'Kembali naik fastboat menuju Pelabuhan Sanur Bali (tiba ±17:00).' }
    ]
  },
  {
    id: 'nusa-penida-paluang',
    title: 'NUSA PENIDA - PALUANG HILLS & CRYSTAL BAY',
    tagline: 'Nusa Penida West Trip',
    shortDesc: 'Spot bukit panorama indah dan teluk pantai bening berpasir putih.',
    longDesc: 'Pemandangan spektakuler Paluang Hills dan ketenangan pantai Crystal Bay di Nusa Penida Barat. Bagian dari paket Nusa Penida Island West Trip yang mencakup 5 destinasi ikonik: Kelingking Beach, Broken Beach, Angel’s Billabong, Paluang Hills, dan Crystal Bay. IDR 850K/pax (Min. 2 Person) include Mobil Privat AC, Fastboat PP, Lunch & Guide.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188206/9dc60007-a1d6-40fb-a07f-2db5622654dc.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188206/9dc60007-a1d6-40fb-a07f-2db5622654dc.png',
    galleryImages: [
      {
        name: 'Paluang Hills',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188206/9dc60007-a1d6-40fb-a07f-2db5622654dc.png',
        description: 'Spot foto terbaik dengan latar belakang tebing Kelingking dari sudut pandang berbeda.'
      },
      {
        name: 'Crystal Bay',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188073/7106f686-f6a2-4d9d-85b5-0bd005911e58.png',
        description: 'Pantai indah berpasir putih tempat yang sempurna untuk bersantai dan menikmati perairan jernih.'
      },
      {
        name: 'Kelingking Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783323538/52232f7d-759e-40de-a9ce-a8aa0fcde84d.png',
        description: 'Tebing T-Rex spektakuler dengan pemandangan pantai pasir putih dan laut biru bening.'
      },
      {
        name: 'Broken Beach',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786187369/3d0b750a-87f1-4374-a71b-d3f58a6e31b7.png',
        description: 'Tebing melingkar alami dengan terowongan tebing ikonik tempat laut masuk.'
      },
      {
        name: 'Angel’s Billabong',
        image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786188544/70c34f11-a7bd-4249-8ef0-95f6f6c233e6.png',
        description: 'Kolam pasang surut alami dengan air jernih bak kristal di tebing batu karang.'
      }
    ],
    pricePerPerson: 850000,
    duration: '07:00 - 17:00 (Min. 2 Person)',
    location: 'Nusa Penida, Bali',
    difficulty: 'Eksplorasi Pulau',
    rating: 4.9,
    reviewCount: 305,
    highlights: [
      'Mengunjungi 5 destinasi ikonik: Kelingking, Broken Beach, Angel’s Billabong, Paluang Hills & Crystal Bay',
      'Termasuk Fastboat Ticket Return (PP Sanur - Nusa Penida)',
      'Private Car (Mobil Privat AC) & Driver selama di Nusa Penida',
      'Sudah termasuk Lunch (Makan Siang) & Local Guide',
      'Minimal pemesanan 2 orang (Durasi 07:00 - 17:00)'
    ],
    inclusions: [
      'Private Car (Mobil Privat AC)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu Lokal)',
      'Fastboat Ticket Return (Sanur - Nusa Penida PP)',
      'Tiket Masuk Destinasi'
    ],
    exclusions: [
      'Penjemputan hotel Bali ke Sanur (opsional)',
      'Pengeluaran pribadi & tip'
    ],
    itinerary: [
      { time: '07:00 AM', title: 'Meeting Point Pelabuhan Sanur', desc: 'Registrasi tiket fastboat dan persiapan penyeberangan ke Nusa Penida.' },
      { time: '07:30 AM', title: 'Fastboat ke Nusa Penida', desc: 'Menyeberang laut menuju Nusa Penida (durasi perjalanan ±45 menit).' },
      { time: '08:30 AM', title: 'Start West Trip', desc: 'Disambut driver privat, langsung menuju Kelingking Beach & Paluang Hills.' },
      { time: '11:00 AM', title: 'Broken Beach & Angel’s Billabong', desc: 'Eksplorasi keajaiban tebing tebing karang dan kolam alami menakjubkan.' },
      { time: '12:30 PM', title: 'Makan Siang', desc: 'Santap makan siang di restoran lokal pilihan.' },
      { time: '02:00 PM', title: 'Bersantai di Crystal Bay', desc: 'Menikmati keasrian pantai Crystal Bay untuk santai atau berenang.' },
      { time: '04:00 PM', title: 'Kembali ke Pelabuhan & Fastboat Sanur', desc: 'Kembali naik fastboat menuju Pelabuhan Sanur Bali (tiba ±17:00).' }
    ]
  },
  {
    id: 'water-sport',
    title: 'WATER SPORT PACKAGE',
    tagline: 'Water Sports Adventure',
    shortDesc: 'Nikmati keseruan olahraga air Bali paling seru: Banana Boat, Donut Boat, Jet Ski, dan Parasailing.',
    longDesc: 'Nikmati keseruan olahraga air terlengkap di Tanjung Benoa, Bali. Paket ini dirancang khusus untuk memberikan pengalaman akuatik paling mendebarkan dengan 4 wahana utama: Banana Boat, Donut Boat, Jet Ski, dan Parasailing. Dilengkapi dengan instruktur berpengalaman dan tim rescue profesional.',
    bgImage: '/water_sport_banner_1786161929728.jpg',
    cardImage: '/water_sport_banner_1786161929728.jpg',
    galleryImages: [
      {
        name: 'Banana Boat',
        image: '/banana_boat_photo_1786161944354.jpg',
        description: 'Sensasi meluncur deras di atas gelombang laut Tanjung Benoa bersama rekan atau keluarga.'
      },
      {
        name: 'Donut Boat',
        image: '/donut_boat_photo_1786161957677.jpg',
        description: 'Perahu karet unik berbentuk donat yang ditarik speedboat untuk sensasi putaran seru.'
      },
      {
        name: 'Jet Ski',
        image: '/jetski_photo_1786161972580.jpg',
        description: 'Kendarai Jet Ski bertenaga tinggi membelah lautan biru jernih dengan kecepatan penuh.'
      },
      {
        name: 'Parasailing',
        image: '/parasailing_photo_1786161983951.jpg',
        description: 'Terbang tinggi parasailing menikmati keindahan panoramik pantai dan pesisir Bali.'
      }
    ],
    pricePerPerson: 1200000,
    duration: 'Maksimal 2 Orang',
    location: 'Tanjung Benoa, Bali',
    difficulty: 'Seru & Berenergi',
    rating: 4.9,
    reviewCount: 280,
    highlights: [
      'Termasuk 4 wahana utama: Banana Boat, Donut Boat, Jet Ski, dan Parasailing',
      'Sudah termasuk Insurance, Lunch, Guide, dan Rescue Team',
      'Maksimal 2 orang per paket aktivitas',
      'Peralatan keselamatan lengkap berstandar internasional',
      'Instruktur profesional siap mendampingi selama wahana'
    ],
    inclusions: [
      'Insurance (Asuransi)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu)',
      'Rescue Team (Tim Penyelamat)',
      'Wahana Banana Boat',
      'Wahana Donut Boat',
      'Wahana Jet Ski',
      'Wahana Parasailing'
    ],
    exclusions: [
      'Dokumentasi foto/video pribadi',
      'Pengeluaran pribadi di luar paket',
      'Tip sukarela'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Tiba di Lokasi & Penyiapan APD', desc: 'Registrasi, pemasangan pelampung, dan pengarahan keselamatan dari tim rescue.' },
      { time: '09:30 AM', title: 'Sesi Banana Boat & Donut Boat', desc: 'Nikmati sensasi meluncur deras di atas gelombang laut dengan Banana & Donut Boat.' },
      { time: '10:30 AM', title: 'Sesi Jet Ski & Parasailing', desc: 'Kendarai Jet Ski dengan kecepatan tinggi dan terbang menikmati pemandangan laut Bali dari ketinggian.' },
      { time: '12:00 PM', title: 'Makan Siang & Istirahat', desc: 'Selesai beraktivitas, bilas diri di shower dan nikmati santapan makan siang lezat.' }
    ]
  },
  {
    id: 'atv-ride',
    title: 'ATV – KUBER ATV',
    tagline: 'Kuber ATV Off-Road',
    shortDesc: 'Petualangan Kuber ATV di Ubud: Single Rp750.000 & Tandem Rp1.200.000.',
    longDesc: 'Pacu adrenalin Anda menembus rute pedesaan, gua alami, terowongan air, dan lintasan berlumpur Ubud dengan Kuber ATV. Tersedia pilihan ride Single (Rp 750.000) dan Tandem (Rp 1.200.000). Dilengkapi asuransi, pemandu profesional, dan tim penyelamat.',
    bgImage: '/activity_atv_jungle_1783677762979.jpg',
    cardImage: '/activity_atv_jungle_1783677762979.jpg',
    pricePerPerson: 750000,
    pricingOptions: [
      { name: 'Single', price: 750000, desc: '1 Orang per unit Kuber ATV' },
      { name: 'Tandem', price: 1200000, desc: '2 Orang berboncengan per unit Kuber ATV' }
    ],
    duration: 'Maksimal 2 Orang',
    location: 'Ubud, Bali',
    difficulty: 'Adrenalin & Menantang',
    rating: 4.8,
    reviewCount: 195,
    highlights: [
      'Pilihan tipe ride: Single (Rp750.000) & Tandem (Rp1.200.000)',
      'Sudah termasuk Insurance, Lunch, Guide, dan Rescue Team',
      'Menelusuri terowongan air dan air terjun tersembunyi',
      'Perlengkapan helm dan sepatu boots disediakan lengkap',
      'Fasilitas bilas dan kamar mandi yang bersih'
    ],
    inclusions: [
      'Insurance (Asuransi)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu)',
      'Rescue Team (Tim Penyelamat)',
      'Wahana Kuber ATV (Single / Tandem)'
    ],
    exclusions: [
      'Dokumentasi pribadi',
      'Pakaian ganti pribadi',
      'Tip sukarela'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Registrasi & Perlengkapan Safety', desc: 'Gunakan helm, boots, dan ikuti brifing keselamatan dari pemandu profesional.' },
      { time: '09:30 AM', title: 'Petualangan Kuber ATV', desc: 'Mengendarai Kuber ATV menelusuri persawahan, terowongan air, sungai, dan kubangan lumpur.' },
      { time: '11:30 AM', title: 'Mandi Bersih & Istirahat', desc: 'Bersihkan sisa lumpur di fasilitas shower air hangat yang telah disediakan.' },
      { time: '12:00 PM', title: 'Makan Siang Bersama', desc: 'Santap makan siang lezat khas Bali sambil menikmati pemandangan alam.' }
    ]
  },
  {
    id: 'atv-king',
    title: 'ATV – KING ATV',
    tagline: 'King ATV Extreme',
    shortDesc: 'Rasakan performa maksimal mengendarai King ATV di trek ekstrem Bali (Rp 850.000 / pax).',
    longDesc: 'Nikmati kenyamanan dan ketangguhan kelas atas dari King ATV. Dirancang untuk menaklukan trek terjal, gua alami, serta jeram lumpur dengan tenaga mesin luar biasa. Pilihan utama bagi penggemar tantangan sejati dengan tarif Rp 850.000 / pax.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786183838/ed568b2f-ebc4-495a-962d-692c5239b1cb.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786183838/ed568b2f-ebc4-495a-962d-692c5239b1cb.png',
    pricePerPerson: 850000,
    duration: 'Maksimal 2 Orang',
    location: 'Ubud, Bali',
    difficulty: 'Sangat Menantang',
    rating: 4.9,
    reviewCount: 210,
    highlights: [
      'Mengendarai unit King ATV berdaya tinggi (Rp 850.000 / pax)',
      'Sudah termasuk Insurance, Lunch, Guide, dan Rescue Team',
      'Maksimal 2 orang per paket aktivitas',
      'Pemandu profesional dan tim rescue yang berpengalaman',
      'Sudah termasuk makan siang dan asuransi keselamatan'
    ],
    inclusions: [
      'Insurance (Asuransi)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu)',
      'Rescue Team (Tim Penyelamat)',
      'Wahana King ATV'
    ],
    exclusions: [
      'Foto & video profesional',
      'Layanan antar-jemput pribadi',
      'Tip sukarela'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Fitting Helm & Safety Check', desc: 'Menerima peralatan keselamatan kelas satu dan penjelasan rute terjal.' },
      { time: '09:30 AM', title: 'King ATV Extreme Trek', desc: 'Menjelajahi trek ekstrem, terowongan batu alami, dan turunan sungai dengan King ATV.' },
      { time: '11:30 AM', title: 'Bilas & Bersihkan Diri', desc: 'Kamar mandi dan handuk bersih disediakan untuk kenyamanan Anda.' },
      { time: '12:00 PM', title: 'Makan Siang', desc: 'Nikmati sajian makan siang yang segar dan lezat di area restoran.' }
    ]
  },
  {
    id: 'horse-riding',
    title: 'HORSE RIDING – LEMBONGAN ½',
    tagline: 'Coastal Horse Riding',
    shortDesc: 'Pengalaman menunggang kuda menyusuri pesisir pantai dan lanskap indah Lembongan.',
    longDesc: 'Rasakan suasana romantis dan tenang menunggang kuda terlatih di sepanjang pesisir pulau dan lanskap indah Lembongan ½. Pengalaman ini dipandu oleh instruktur berpengalaman dan didampingi tim penolong profesional.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786162688/77000547-25b5-4ca1-a3a4-45330dbe54cc.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786162688/77000547-25b5-4ca1-a3a4-45330dbe54cc.png',
    pricePerPerson: 450000,
    duration: 'Maksimal 2 Orang',
    location: 'Lembongan, Bali',
    difficulty: 'Santai & Indah',
    rating: 4.8,
    reviewCount: 160,
    highlights: [
      'Pengalaman Horse Riding di rute eksotis Lembongan ½',
      'Sudah termasuk Insurance, Lunch, Guide, dan Rescue Team',
      'Maksimal 2 orang per paket aktivitas',
      'Kuda yang jinak dan terlatih dengan pemandu profesional',
      'Sangat cocok untuk foto estetik di pinggir pantai'
    ],
    inclusions: [
      'Insurance (Asuransi)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu)',
      'Rescue Team (Tim Penyelamat)',
      'Horse Riding',
      'Lembongan ½ Route'
    ],
    exclusions: [
      'Transportasi kapal penyeberangan ke Lembongan',
      'Pengeluaran pribadi',
      'Tip sukarela'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Pengenalan Kuda & Peralatan', desc: 'Instruktur memberikan perlengkapan keselamatan dan memperkenalkan kuda yang akan Anda tunggangi.' },
      { time: '09:30 AM', title: 'Sesi Horse Riding Lembongan ½', desc: 'Menyusuri pantai berpasir putih dan jalanan pulau yang tenang sambil menunggang kuda.' },
      { time: '11:00 AM', title: 'Selesai Berekspedisi', desc: 'Kembali ke basecamp dan bersantai sejenak.' },
      { time: '11:30 AM', title: 'Makan Siang', desc: 'Menikmati hidangan makan siang yang nikmat.' }
    ]
  },
  {
    id: 'rafting-bmw',
    title: 'RAFTING – BMW',
    tagline: 'BMW Rafting Thrill',
    shortDesc: 'Arung jeram seru di sungai alami Bali dengan paket BMW Rafting.',
    longDesc: 'Taklukkan arus sungai alami Bali bersama BMW Rafting. Nikmati keindahan air terjun tersembunyi, ukiran batu di dinding tebing sungai, dan rimbunnya pemandangan alam. Lengkap dengan panduan pemandu berpengalaman serta asuransi.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786184051/968d1498-d1d6-4267-9b60-b1fb937a44e2.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786184051/968d1498-d1d6-4267-9b60-b1fb937a44e2.png',
    pricePerPerson: 650000,
    duration: 'Maksimal 2 Orang',
    location: 'Karangasem / Telaga Waja, Bali',
    difficulty: 'Petualangan Air',
    rating: 4.9,
    reviewCount: 230,
    highlights: [
      'Sensasi arung jeram BMW Rafting menyusuri tebing indah',
      'Sudah termasuk Insurance, Lunch, Guide, dan Rescue Team',
      'Maksimal 2 orang per paket aktivitas',
      'Perahu karet dan alat keselamatan berstandar internasional',
      'Makan siang lezat dengan pemandangan alam'
    ],
    inclusions: [
      'Insurance (Asuransi)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu)',
      'Rescue Team (Tim Penyelamat)',
      'BMW Rafting'
    ],
    exclusions: [
      'Sewa kamera underwater',
      'Minuman keras / alkohol',
      'Tip sukarela'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Persiapan & Pengarahan', desc: 'Pemakaian jaket pelampung, helm, dan brifing cara mendayung dari pemandu.' },
      { time: '09:30 AM', title: 'Pengarungan BMW Rafting', desc: 'Mengarungi jeram sungai, melewati air terjun, dan tebing alam nan megah.' },
      { time: '11:30 AM', title: 'Bilas & Ganti Pakaian', desc: 'Shower air bersih dan tempat ganti pakaian yang nyaman.' },
      { time: '12:00 PM', title: 'Makan Siang Prasmanan', desc: 'Santap makan siang lezat yang telah disiapkan di restoran tepi sungai.' }
    ]
  },
  {
    id: 'rafting-ubud',
    title: 'RAFTING – UBUD',
    tagline: 'Ubud Ayung Rafting',
    shortDesc: 'Arung jeram menyusuri sungai Ayung Ubud yang indah dan penuh pesona alam.',
    longDesc: 'Satu dari aktivitas paling populer di Bali! Arung jeram di Sungai Ayung Ubud menawarkan arus yang bersahabat, relief batu ukir khas Ubud di dinding tebing, serta pemandangan hutan tropis hijau yang memanjakan mata.',
    bgImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786184128/e0699feb-0cd5-4d84-9055-d2819efa51a4.png',
    cardImage: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1786184128/e0699feb-0cd5-4d84-9055-d2819efa51a4.png',
    pricePerPerson: 550000,
    duration: 'Maksimal 2 Orang',
    location: 'Sungai Ayung, Ubud, Bali',
    difficulty: 'Menyenangkan & Asri',
    rating: 4.8,
    reviewCount: 310,
    highlights: [
      'Ubud Rafting di Sungai Ayung dengan lanskap relief ukir tebing',
      'Sudah termasuk Insurance, Lunch, Guide, dan Rescue Team',
      'Maksimal 2 orang per paket aktivitas',
      'Didampingi instruktur rafting bersertifikasi dan tim rescue',
      'Fasilitas shower dan makan siang gratis di restoran'
    ],
    inclusions: [
      'Insurance (Asuransi)',
      'Lunch (Makan Siang)',
      'Guide (Pemandu)',
      'Rescue Team (Tim Penyelamat)',
      'Ubud Rafting'
    ],
    exclusions: [
      'Foto/video saat arung jeram',
      'Pengeluaran pribadi',
      'Tip sukarela'
    ],
    itinerary: [
      { time: '09:00 AM', title: 'Pemasangan Equipment Safety', desc: 'Fitting helm, pelampung, dan pengarahan teknik arung jeram.' },
      { time: '09:30 AM', title: 'Mulai Ubud Rafting', desc: 'Mengarungi Sungai Ayung sejauh 10-12 KM melintasi relief dinding dan air terjun.' },
      { time: '11:30 AM', title: 'Shower & Handuk', desc: 'Membersihkan diri di fasilitas shower air bersih.' },
      { time: '12:00 PM', title: 'Makan Siang', desc: 'Menikmati sajian makan siang lezat di restoran lembah Ubud.' }
    ]
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'private-photographer',
    name: 'Bespoke Private Photographer',
    description: 'A professional travel photographer to capture candid moments of your adventure (Includes 50+ edited high-res digital shots).',
    price: 95
  },
  {
    id: 'drone-video',
    name: 'Cinematic Drone Videography',
    description: 'Aerial video shooting utilizing 4K cinema drones for dramatic landscape memories (Includes a 1-minute social media reel).',
    price: 120
  },
  {
    id: 'champagne-service',
    name: 'Veuve Clicquot Champagne & Caviar',
    description: 'A chilled bottle of premium champagne accompanied by gourmet local caviar and fresh strawberries on ice.',
    price: 180
  },
  {
    id: 'helicopter-transfer',
    name: 'Ultra-Luxe Helicopter Return (1-Way)',
    description: 'Skip the return roads completely. Fly back directly to southern heliports with jaw-dropping island vistas.',
    price: 850
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Alexander V.',
    rating: 5,
    date: '2026-06-15',
    comment: 'The Mount Batur Off-Road Jeep Adventure was absolutely spectacular. The caldera sunrise was stunning, and our guide drove with incredible skill. The picnic breakfast on the volcano side felt so luxurious!',
    experienceId: 'jeep-adventure',
    verified: true
  },
  {
    id: 'rev-2',
    name: 'Charlotte Dubois',
    rating: 5,
    date: '2026-06-28',
    comment: 'Sailing around Nusa Penida on our own private yacht was a dream come true. We swam with massive manta rays and the onboard chef grilled the best lobster we’ve ever had. Truly professional crew.',
    experienceId: 'ocean-escape',
    verified: true
  },
  {
    id: 'rev-3',
    name: 'Made Suarta',
    rating: 5,
    date: '2026-07-02',
    comment: 'Sewa Toyota Avanza di Andhikabalitour sangat memuaskan. Unitnya sangat bersih dan terawat, AC dingin, dan supirnya sangat ramah serta hafal jalan-jalan tikus di Bali sehingga bebas macet!',
    experienceId: 'jungle-retreat',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Jonathan K.',
    rating: 4,
    date: '2026-05-19',
    comment: 'The jeep ride can get a little bumpy through the forest trails, but that is part of the fun! The view of Mount Batur is breathtaking and the hot spring dip afterward was so relaxing. Recommend 10/10.',
    experienceId: 'jeep-adventure',
    verified: true
  }
];

export const FAQS = [
  {
    question: 'Are all tours completely private?',
    answer: 'Yes. Every booking with andhikabalitour is 100% private. Your vehicles, yachts, tour hosts, and designated resort pavilions are exclusively yours. We do not group multiple independent bookings together.'
  },
  {
    question: 'What is the cancellation policy for weather conditions?',
    answer: 'Your safety is our absolute priority. If a tour is cancelled due to heavy rain, strong winds, or volcanic volcanic activity advisories, we offer free rescheduling or a complete 100% refund.'
  },
  {
    question: 'Can dietary restrictions be accommodated?',
    answer: 'Absolutely. Whether you are vegan, gluten-free, keto, halal, or have specific allergen requirements, our private chefs and partner restaurants will craft a customized culinary menu for you. Please indicate your needs when filling out your booking details.'
  },
  {
    question: 'How far in advance should we secure our dates?',
    answer: 'Because we operate exclusively with high-end private charters and highly specialized local guides, our spots are limited. We highly recommend booking at least 2 to 4 weeks in advance, especially during peak seasons.'
  },
  {
    question: 'What should we bring with us?',
    answer: 'For the Volcano Adventure: bring a warm windbreaker/hoodie (temperatures can drop to 12°C/53°F at sunrise), sunglasses, and closed-toe shoes. For the Ocean Cruise: bring swimsuits, high SPF sunblock, and light linen wear. For the Jungle Retreat: bring comfortable walking sandals and a change of garments for the purifying water ritual.'
  }
];

export const GALLERY_PHOTOS = [
  { url: '/bali_volcano_bg_1783528702622.jpg', category: 'volcano', title: 'Mount Batur Caldera Peak' },
  { url: '/bali_jeep_adventure_1783528719252.jpg', category: 'volcano', title: 'Off-road 4x4 Cruisers' },
  { url: '/bali_ocean_bg_1783528769356.jpg', category: 'ocean', title: 'Nusa Penida Yachting' },
  { url: '/ocean_luxury_escape_1783528733687.jpg', category: 'ocean', title: 'Turquoise Escapes' },
  { url: '/bali_jungle_bg_1783528784335.jpg', category: 'jungle', title: 'Ubud River Valleys' },
  { url: '/serene_jungle_retreat_1783528749017.jpg', category: 'jungle', title: 'Tropical Infinity Bliss' }
];

export const VEHICLES: Vehicle[] = [
  {
    id: 'toyota-avanza',
    name: 'New Avanza',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783761973/24693abb-f732-49b4-ba68-28c882af0c16.png',
    passengers: 6,
    transmission: 'Manual / Automatic',
    engine: '1,500 cc',
    priceWithDriverPerDay: 450000,
    priceWithoutDriverPerDay: 300000,
    description: 'Sewa mobil New Avanza terbaru di Bali. Dilengkapi kabin yang nyaman, AC dingin merata, dan suspensi mumpuni untuk keluarga Anda.',
    features: ['6 Kursi Penumpang', 'Driver Profesional', 'Bahan Bakar Minyak (BBM)', 'AC Double Blower', 'Bersih & Wangi']
  },
  {
    id: 'toyota-innova',
    name: 'Innova Reborn',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762018/64feebd4-e9e7-4ffe-ac80-801b1ab26fd0.png',
    passengers: 6,
    transmission: 'Automatic',
    engine: '2,400 cc Diesel',
    priceWithDriverPerDay: 600000,
    priceWithoutDriverPerDay: 450000,
    description: 'Kabin super luas, suspensi empuk, dan mesin diesel bertenaga tangguh. Kenyamanan perjalanan berkelas VIP bersama keluarga.',
    features: ['6 Kursi Penumpang', 'Driver Profesional', 'Bahan Bakar Minyak (BBM)', 'Kabin Luas & Senyap', 'AC Dingin Maksimal']
  },
  {
    id: 'innova-zenix',
    name: 'Innova Zenix Type Q',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762059/56d3602a-cd36-437e-9a76-eab2be375ce3.png',
    passengers: 5,
    transmission: 'Automatic',
    engine: '2,000 cc Hybrid',
    priceWithDriverPerDay: 1200000,
    priceWithoutDriverPerDay: 0,
    description: 'Armada premium generasi terbaru dengan teknologi Hybrid senyap, captain seat mewah, dan interior eksklusif kelas VIP.',
    features: ['5 Seat Penumpang', 'Driver VIP & BBM', 'Captain Seat Premium', 'Panoramic Roof', 'Kabin Mewah Senyap']
  },
  {
    id: 'toyota-alphard',
    name: 'Toyota Alphard',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762106/74503d32-3371-4191-a619-7b1cd976e1d2.png',
    passengers: 5,
    transmission: 'Automatic',
    engine: '2,500 cc',
    priceWithDriverPerDay: 2500000,
    priceWithoutDriverPerDay: 0,
    description: 'Simbol kemewahan sejati dan kenyamanan VIP First-Class. Dilengkapi dengan suspensi udara super empuk dan interior megah.',
    features: ['5 Seat VIP', 'Driver VIP & BBM', 'Kabin First-Class', 'Electric Sliding Doors', 'AC Double Blower']
  },
  {
    id: 'hiace-commuter',
    name: 'Hiace Commuter',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762136/882d66e6-45b8-429b-a17f-6769179a7221.png',
    passengers: 15,
    transmission: 'Manual',
    engine: '2,500 cc Diesel',
    priceWithDriverPerDay: 1000000,
    priceWithoutDriverPerDay: 0,
    description: 'Mikrobus tangguh untuk rombongan keluarga besar atau rombongan pariwisata. Lapang, nyaman, dan handal menyusuri Bali.',
    features: ['15 Seat Penumpang', 'Sopir Pariwisata & BBM', 'Kabin Sangat Lapang', 'AC Multi-Zone Dingin', 'Sangat Nyaman']
  },
  {
    id: 'bus-29',
    name: 'Bus 29 Seat',
    type: 'car',
    image: 'https://res.cloudinary.com/di6ziqvtp/image/upload/v1783762175/1dcdb7c6-c3ac-4b4a-b509-fa0697eb985f.png',
    passengers: 29,
    transmission: 'Manual',
    engine: 'Diesel Multi',
    priceWithDriverPerDay: 2000000,
    priceWithoutDriverPerDay: 0,
    description: 'Bus pariwisata medium berkapasitas besar. Sangat nyaman untuk rombongan instansi, korporasi, maupun rombongan keluarga besar.',
    features: ['29 Seat Rombongan', 'Sopir Bus Berlisensi & BBM', 'Bagasi Luas', 'Audio Karaoke', 'AC Dingin Merata']
  }
];

