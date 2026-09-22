export const packages = [
  {
    id: "bali-bliss-7d",
    title: "Bali Bliss Retreat",
    destinationId: "bali-indonesia",
    destination: "Bali, Indonesia",
    duration: 7,
    price: 899,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 412,
    groupSize: "2-12",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc32?q=80&w=1200&auto=format&fit=crop"
    ],
    highlights: ["Private villa with pool", "Sunrise Mount Batur trek", "Traditional Balinese spa day", "Ubud art village tour"],
    itinerary: [
      { day: 1, title: "Arrival in Denpasar", details: "Airport pickup, transfer to Seminyak villa, welcome dinner on the beach." },
      { day: 2, title: "Uluwatu & Kecak Fire Dance", details: "Cliffside temple visit followed by a sunset Kecak performance." },
      { day: 3, title: "Ubud Rice Terraces", details: "Tegallalang terraces, Sacred Monkey Forest, local art market." },
      { day: 4, title: "Mount Batur Sunrise Trek", details: "Early departure for a guided sunrise summit hike with breakfast at the top." },
      { day: 5, title: "Spa & Leisure Day", details: "Full-day Balinese spa ritual, free time by the villa pool." },
      { day: 6, title: "Nusa Penida Island Hop", details: "Speedboat to Nusa Penida for Kelingking Beach and snorkeling." },
      { day: 7, title: "Departure", details: "Final breakfast, souvenir shopping, airport transfer." }
    ],
    included: ["6 nights villa accommodation", "Daily breakfast", "Airport transfers", "All listed excursions", "English-speaking guide"],
    excluded: ["International flights", "Travel insurance", "Personal expenses", "Optional activities"]
  },
  {
    id: "santorini-romance-5d",
    title: "Santorini Romance",
    destinationId: "santorini-greece",
    destination: "Santorini, Greece",
    duration: 5,
    price: 1299,
    originalPrice: 1499,
    rating: 4.9,
    reviews: 356,
    groupSize: "2-6",
    category: "Island",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601581875039-e899893d520c?q=80&w=1200&auto=format&fit=crop"
    ],
    highlights: ["Caldera-view suite", "Private catamaran cruise", "Wine tasting in Pyrgos", "Oia sunset dinner"],
    itinerary: [
      { day: 1, title: "Arrival in Fira", details: "Transfer to caldera-view hotel, welcome cocktail." },
      { day: 2, title: "Oia Village Exploration", details: "Blue-domed churches, boutique shopping, sunset viewpoint." },
      { day: 3, title: "Catamaran Cruise", details: "Sail past the volcano, hot springs swim, onboard BBQ lunch." },
      { day: 4, title: "Wine & Vineyards", details: "Guided tasting across three family-run wineries in Pyrgos." },
      { day: 5, title: "Departure", details: "Leisure morning, transfer to airport." }
    ],
    included: ["4 nights caldera suite", "Daily breakfast", "Catamaran cruise", "Wine tour with tastings", "Airport transfers"],
    excluded: ["International flights", "Travel insurance", "Lunch & dinner (except noted)", "Gratuities"]
  },
  {
    id: "kyoto-heritage-6d",
    title: "Kyoto Heritage Trail",
    destinationId: "kyoto-japan",
    destination: "Kyoto, Japan",
    duration: 6,
    price: 1099,
    originalPrice: 1249,
    rating: 4.9,
    reviews: 289,
    groupSize: "2-14",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?q=80&w=1200&auto=format&fit=crop"
    ],
    highlights: ["Fushimi Inari at dawn", "Tea ceremony with a geisha", "Arashiyama bamboo grove", "Nishiki Market food tour"],
    itinerary: [
      { day: 1, title: "Arrival in Kyoto", details: "Ryokan check-in, evening stroll through Gion." },
      { day: 2, title: "Fushimi Inari & Kiyomizu-dera", details: "Dawn shrine walk, historic temple district." },
      { day: 3, title: "Arashiyama Day", details: "Bamboo grove, monkey park, riverside lunch." },
      { day: 4, title: "Tea Ceremony & Crafts", details: "Traditional tea ceremony, pottery workshop." },
      { day: 5, title: "Nishiki Market & Nijo Castle", details: "Food tour and castle grounds visit." },
      { day: 6, title: "Departure", details: "Free morning, transfer to Kansai airport." }
    ],
    included: ["5 nights ryokan stay", "Daily breakfast", "Tea ceremony", "All entrance fees", "Local guide"],
    excluded: ["International flights", "Travel insurance", "Most lunches/dinners", "Personal shopping"]
  },
  {
    id: "alps-adventure-8d",
    title: "Swiss Alps Adventure",
    destinationId: "swiss-alps-switzerland",
    destination: "Swiss Alps, Switzerland",
    duration: 8,
    price: 1599,
    originalPrice: 1899,
    rating: 4.7,
    reviews: 198,
    groupSize: "4-16",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499426600726-a950358acf16?q=80&w=1200&auto=format&fit=crop"
    ],
    highlights: ["Jungfraujoch summit train", "Lake Lucerne cruise", "Interlaken paragliding", "Matterhorn glacier walk"],
    itinerary: [
      { day: 1, title: "Arrival in Zurich", details: "Transfer to Lucerne, evening lake walk." },
      { day: 2, title: "Lake Lucerne Cruise", details: "Boat cruise, Chapel Bridge, Old Town exploration." },
      { day: 3, title: "Interlaken", details: "Transfer to Interlaken, optional paragliding." },
      { day: 4, title: "Jungfraujoch — Top of Europe", details: "Cogwheel train to Europe's highest railway station." },
      { day: 5, title: "Zermatt Transfer", details: "Scenic train to Zermatt, Matterhorn views." },
      { day: 6, title: "Glacier Paradise", details: "Cable car to Matterhorn Glacier Paradise." },
      { day: 7, title: "Free Alpine Day", details: "Optional hiking or leisure in the village." },
      { day: 8, title: "Departure", details: "Transfer to Zurich airport." }
    ],
    included: ["7 nights hotel stay", "Daily breakfast", "All scenic train rides", "Lake cruise", "Cable car passes"],
    excluded: ["International flights", "Travel insurance", "Lunch & dinner", "Paragliding (optional add-on)"]
  },
  {
    id: "marrakech-explorer-5d",
    title: "Marrakech Explorer",
    destinationId: "marrakech-morocco",
    destination: "Marrakech, Morocco",
    duration: 5,
    price: 749,
    originalPrice: 899,
    rating: 4.6,
    reviews: 231,
    groupSize: "2-10",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553603227-2358aabe821e?q=80&w=1200&auto=format&fit=crop"
    ],
    highlights: ["Riad stay in the Medina", "Atlas Mountains day trip", "Camel ride at sunset", "Souk shopping tour"],
    itinerary: [
      { day: 1, title: "Arrival in Marrakech", details: "Riad check-in, rooftop welcome tea." },
      { day: 2, title: "Medina & Souks", details: "Jemaa el-Fnaa, spice souks, Bahia Palace." },
      { day: 3, title: "Atlas Mountains", details: "Berber village visit, valley trek, camel ride." },
      { day: 4, title: "Majorelle Garden & Spa", details: "Garden visit, traditional hammam experience." },
      { day: 5, title: "Departure", details: "Final breakfast, airport transfer." }
    ],
    included: ["4 nights riad stay", "Daily breakfast", "Atlas Mountains excursion", "Hammam spa session", "Airport transfers"],
    excluded: ["International flights", "Travel insurance", "Lunch & dinner", "Personal shopping"]
  },
  {
    id: "maldives-luxury-6d",
    title: "Maldives Overwater Escape",
    destinationId: "maldives",
    destination: "Maldives",
    duration: 6,
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviews: 512,
    groupSize: "2-4",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=1200&auto=format&fit=crop"
    ],
    highlights: ["Overwater villa with pool", "Sunset dolphin cruise", "Private sandbank dinner", "Guided reef snorkeling"],
    itinerary: [
      { day: 1, title: "Arrival", details: "Seaplane transfer to resort, villa check-in." },
      { day: 2, title: "Reef Snorkeling", details: "Guided snorkel trip over the house reef." },
      { day: 3, title: "Sandbank Picnic", details: "Private lunch on a secluded sandbank." },
      { day: 4, title: "Dolphin Cruise", details: "Sunset cruise with resident dolphin pods." },
      { day: 5, title: "Spa Day", details: "Overwater spa treatments, free leisure time." },
      { day: 6, title: "Departure", details: "Seaplane transfer back to Male." }
    ],
    included: ["5 nights overwater villa", "All meals (full board)", "Seaplane transfers", "One excursion daily", "Snorkeling gear"],
    excluded: ["International flights", "Travel insurance", "Alcoholic beverages", "Spa treatments"]
  }
];

export const durationOptions = ["Any", "1-3 Days", "4-6 Days", "7+ Days"];
