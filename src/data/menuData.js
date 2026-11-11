export const DELIVERY_TIERS = [
  { id: 'nearby', name: 'Nearby Area', shortName: 'Nearby', fee: 70, desc: 'Local & nearby area delivery' },
  { id: 'medium', name: 'Medium Distance', shortName: 'Medium Distance', fee: 150, desc: 'Medium distance delivery' },
  { id: 'outside', name: 'Long Distance', shortName: 'Long Distance', fee: 250, desc: 'Long distance delivery' },
];

export const SHOP_CONFIG = {
  name: "Madina Pakwan Center",
  shortName: "Madina Pakwan Center (MPC)",
  logo: "/images/mpc-logo.png",
  slogan: "Delicious Taste with Quality, Always with You",
  subSlogan: "Delicious Food • Premium Taste • Your Choice",
  iceCreamTagline: "Premium Ice Cream For a Sweeter Moment",
  iceCreamSub: "Rich Flavors • Creamy Delight • Pure Happiness",
  phone: "+92 314 1281986",
  whatsappNumber: "923141281986",
  address: "Near 10 Number Market, Orangi Town",
  city: "Karachi, Pakistan",
  timings: "Daily: 11:00 AM - 12:00 AM",
  deliveryFee: 70,
  freeDeliveryThreshold: 3000, // FREE delivery on orders Rs. 3000 and above
  minOrder: 100,
  deliveryTiers: DELIVERY_TIERS
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Sparkles' },
  { id: 'biryani', name: 'Biryani & Pulao', icon: 'Flame' },
  { id: 'salad-raita', name: 'Salad & Raita', icon: 'Utensils' },
  { id: 'drinks', name: 'Chilled Drinks & Juices', icon: 'Coffee' },
  { id: 'icecream', name: 'Ice Cream', icon: 'IceCream' }
];

export const MENU_ITEMS = [
  // --- 1. BIRYANI & PULAO SECTION ---
  {
    id: 'chicken-biryani',
    category: 'biryani',
    name: 'Special Chicken Biryani',
    badge: 'Most Popular / Best Seller',
    description: 'Aromatic long-grain basmati rice cooked with juicy chicken, rich saffron layers, potatoes, and traditional Madina spices slow dum-cooked to perfection.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    startingPrice: 170,
    portions: [
      { id: 'pao', name: 'Quarter Portion (250g)', price: 170, piece: 'Quarter Portion (250g)' },
      { id: 'derh-pao', name: 'Single Serving (375g)', price: 230, piece: 'Standard Single Serving (375g)' },
      { id: 'half-single', name: 'Half Kg - Single Piece', price: 280, piece: '500g Rice with 1 Big Juicy Piece' },
      { id: 'half-double', name: 'Half Kg - Double Piece', price: 340, piece: '500g Rice with 2 Juicy Chicken Pieces' },
      { id: 'one-double', name: '1 Kg - Double Piece', price: 540, piece: '1000g Family Pack with 2 Pieces' },
      { id: 'one-four', name: '1 Kg - 4 Pieces', price: 680, piece: '1000g Mega Family Feast with 4 Pieces' },
    ],
    spiceLevel: 'Medium Spicy',
    serves: '1 to 4 Persons'
  },
  {
    id: 'beef-pulao',
    category: 'biryani',
    name: 'Special Beef Yakhni Pulao',
    badge: 'Chef Recommendation',
    description: 'Slow-cooked melt-in-mouth beef simmered in rich bone broth yakhni with seasoned long grain basmati rice, caramelized onions, and whole spices.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    startingPrice: 200,
    portions: [
      { id: 'pao', name: 'Quarter Portion (250g)', price: 200, piece: '1 Pao (250g) Tender Beef Pulao' },
      { id: 'half-kg', name: 'Half Kg (500g)', price: 400, piece: '2 Pao / Half Kg (500g)' },
      { id: 'teen-pao', name: '3 Quarter Portion (750g)', price: 600, piece: '3 Pao / 750g Serving' },
      { id: 'one-kg', name: '1 Kg (1000g)', price: 800, piece: '4 Pao / Full 1 Kg Family Pack' },
    ],
    spiceLevel: 'Aromatic & Mild Spice',
    serves: '1 to 4 Persons'
  },
  {
    id: 'aloo-biryani',
    category: 'biryani',
    name: 'Aloo Biryani (Potato Dum Biryani)',
    badge: 'Budget Value Special',
    description: 'Fragrant saffron basmati rice layered with flavorful, tender golden marinated potatoes in traditional Karachi masala style.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    startingPrice: 100,
    portions: [
      { id: 'pao', name: 'Quarter Portion (250g)', price: 100, piece: 'Quarter Serving' },
      { id: 'half-kg', name: 'Half Kg (500g)', price: 200, piece: 'Generous 500g Portion' },
      { id: 'one-kg', name: '1 Kg (1000g)', price: 400, piece: '1 Kg Family Portion' },
    ],
    spiceLevel: 'Medium Spicy',
    serves: '1 to 3 Persons'
  },
  {
    id: 'sada-pulao',
    category: 'biryani',
    name: 'Plain Basmati Pulao (Sada Pulao)',
    badge: 'Classic Heritage',
    description: 'Light, fragrant and fluffy long grain basmati rice infused with bone-broth essence, roasted cumin seeds, and delicate whole spices.',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    startingPrice: 100,
    portions: [
      { id: 'pao', name: 'Quarter Portion (250g)', price: 100, piece: 'Quarter Serving' },
      { id: 'half-kg', name: 'Half Kg (500g)', price: 200, piece: 'Half Kg Serving' },
      { id: 'one-kg', name: '1 Kg (1000g)', price: 400, piece: '1 Kg Family Serving' },
    ],
    spiceLevel: 'Mild & Light',
    serves: '1 to 3 Persons'
  },

  // --- 2. SALAD & RAITA SECTION (Together in one dedicated section) ---
  {
    id: 'millac-raita',
    category: 'salad-raita',
    name: 'Raita',
    badge: 'Must-Have Side',
    description: 'Chilled creamy yogurt dip infused with roasted cumin seeds, crushed mint leaves, green chillies, and secret herbs.',
    image: '/images/raita.jpg',
    hasPortions: false,
    startingPrice: 60,
    price: 60,
    portionLabel: '1 Sealed Cup (150ml)'
  },
  {
    id: 'fresh-salad',
    category: 'salad-raita',
    name: 'Salad',
    badge: 'Fresh & Crisp',
    description: 'Crisp sliced onions, garden cucumbers, juicy tomatoes, and green lemon wedges seasoned with chaat masala.',
    image: '/images/salad.png',
    hasPortions: false,
    startingPrice: 40,
    price: 40,
    portionLabel: '1 Fresh Plate Serving'
  },
  {
    id: 'mineral-water',
    category: 'salad-raita',
    name: 'Water Bottle',
    badge: 'Pure & Crisp',
    description: 'Fresh, pure, crystal-clear chilled drinking mineral water sealed in hygienic bottles.',
    image: '/images/water-bottle.jpg',
    hasPortions: true,
    hasTwoButtons: true,
    startingPrice: 60,
    portions: [
      { id: 'small-water', name: 'Small Bottle (500ml)', price: 60, piece: '500ml Chilled Bottle' },
      { id: 'large-water', name: 'Large Bottle (1.5 Litre)', price: 120, piece: '1.5L Family Chilled Bottle' },
    ]
  },

  // --- 3. DEDICATED DRINKS & JUICES SECTION ---
  // Standard Sodas with 4 sizes: 300ml (90), 500ml (120), 1.5L (220), 2.5L (280)
  {
    id: 'pepsi',
    category: 'drinks',
    name: 'Pepsi',
    badge: 'Chilled Soda',
    description: 'Classic ice-chilled refreshing Pepsi. Available in 300ml, 500ml, 1.5L and 2.5L jumbo family bottles.',
    image: '/images/pepsi.jpg',
    hasPortions: true,
    startingPrice: 90,
    portions: [
      { id: '300ml', name: '300ml Regular Bottle', price: 90, piece: 'Single Chilled 300ml' },
      { id: '500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Chilled 500ml' },
      { id: '1.5l', name: '1.5 Litre Family Bottle', price: 220, piece: 'Family Chilled 1.5L' },
      { id: '2.5l', name: '2.5 Litre Jumbo Bottle', price: 280, piece: 'Mega Party Size 2.5L' },
    ]
  },
  {
    id: '7up',
    category: 'drinks',
    name: '7Up',
    badge: 'Chilled Soda',
    description: 'Crisp, sparkling lemon-lime refreshment. Perfect pairing with Biryani and Pulao.',
    image: '/images/7up.jpg',
    hasPortions: true,
    startingPrice: 90,
    portions: [
      { id: '300ml', name: '300ml Regular Bottle', price: 90, piece: 'Single Chilled 300ml' },
      { id: '500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Chilled 500ml' },
      { id: '1.5l', name: '1.5 Litre Family Bottle', price: 220, piece: 'Family Chilled 1.5L' },
      { id: '2.5l', name: '2.5 Litre Jumbo Bottle', price: 280, piece: 'Mega Party Size 2.5L' },
    ]
  },
  {
    id: 'sprite',
    category: 'drinks',
    name: 'Sprite',
    badge: 'Chilled Soda',
    description: 'Clear, crisp lemon-lime sparkling taste served ice-cold to beat the spice.',
    image: '/images/sprite.jpg',
    hasPortions: true,
    startingPrice: 90,
    portions: [
      { id: '300ml', name: '300ml Regular Bottle', price: 90, piece: 'Single Chilled 300ml' },
      { id: '500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Chilled 500ml' },
      { id: '1.5l', name: '1.5 Litre Family Bottle', price: 220, piece: 'Family Chilled 1.5L' },
      { id: '2.5l', name: '2.5 Litre Jumbo Bottle', price: 280, piece: 'Mega Party Size 2.5L' },
    ]
  },
  {
    id: 'dew',
    category: 'drinks',
    name: 'Mountain Dew',
    badge: 'Citrus Kick',
    description: 'Bold, invigorating citrus flavor with high energy charge served chilled.',
    image: '/images/dew.png',
    hasPortions: true,
    startingPrice: 90,
    portions: [
      { id: '300ml', name: '300ml Regular Bottle', price: 90, piece: 'Single Chilled 300ml' },
      { id: '500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Chilled 500ml' },
      { id: '1.5l', name: '1.5 Litre Family Bottle', price: 220, piece: 'Family Chilled 1.5L' },
      { id: '2.5l', name: '2.5 Litre Jumbo Bottle', price: 280, piece: 'Mega Party Size 2.5L' },
    ]
  },
  {
    id: 'cola-next',
    category: 'drinks',
    name: 'Cola Next',
    badge: 'Popular Choice',
    description: 'Delicious national favorite cola with rich fizz and refreshing taste.',
    image: '/images/cola-next.png',
    hasPortions: true,
    startingPrice: 90,
    portions: [
      { id: '300ml', name: '300ml Regular Bottle', price: 90, piece: 'Single Chilled 300ml' },
      { id: '500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Chilled 500ml' },
      { id: '1.5l', name: '1.5 Litre Family Bottle', price: 220, piece: 'Family Chilled 1.5L' },
      { id: '2.5l', name: '2.5 Litre Jumbo Bottle', price: 280, piece: 'Mega Party Size 2.5L' },
    ]
  },
  {
    id: 'fizz-up',
    category: 'drinks',
    name: 'Fizz Up',
    badge: 'Clear Fizz',
    description: 'Crisp and bubbly lemon-lime soda for instant refreshment.',
    image: '/images/fizz-up.jpg',
    hasPortions: true,
    startingPrice: 90,
    portions: [
      { id: '300ml', name: '300ml Regular Bottle', price: 90, piece: 'Single Chilled 300ml' },
      { id: '500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Chilled 500ml' },
      { id: '1.5l', name: '1.5 Litre Family Bottle', price: 220, piece: 'Family Chilled 1.5L' },
      { id: '2.5l', name: '2.5 Litre Jumbo Bottle', price: 280, piece: 'Mega Party Size 2.5L' },
    ]
  },
  {
    id: 'sting',
    category: 'drinks',
    name: 'Sting',
    badge: 'Energy Boost ⚡',
    description: 'High-energy sweet berry punch flavor served ice-chilled for an instant boost.',
    image: '/images/sting.jpg',
    hasPortions: true,
    hasTwoButtons: true,
    startingPrice: 100,
    portions: [
      { id: '300ml', name: '300ml Regular', price: 100, piece: '300ml Chilled Bottle' },
      { id: '500ml', name: '500ml Pet Bottle', price: 140, piece: '500ml Chilled Bottle' },
    ]
  },
  {
    id: 'slice-juice',
    category: 'drinks',
    name: 'Slice Juice',
    badge: 'Thick Mango Nectar 🥭',
    description: 'Rich, thick, sweet Alphonso mango nectar juice served chilled.',
    image: '/images/slice-juice.jpg',
    hasPortions: false,
    startingPrice: 70,
    price: 70,
    portionLabel: '1 Chilled Pack / Bottle (Rs. 70)'
  },
  {
    id: 'pakola',
    category: 'drinks',
    name: 'Pakola Juice',
    badge: 'Karachi Classic 💚',
    description: 'Delicious Zafran with Almonds & Cardamom milk drink and traditional flavor, sweet and aromatic.',
    image: '/images/pakola-juice.jpg',
    hasPortions: false,
    startingPrice: 110,
    price: 110,
    portionLabel: '1 Chilled Pack / Bottle (Rs. 110)'
  },

  // --- 4. ARTISANAL ICE CREAM MENU SECTION ---
  {
    id: 'icecream-flavors',
    category: 'icecream',
    name: 'Royal Artisanal Ice Cream',
    badge: 'Pure Dairy & Creamy Delight',
    description: 'Handcrafted luxury dairy ice cream in 11 mouthwatering signature flavors served in chilled dessert cups. Single Scoop Cup Rs. 120 | Double Scoop Cup Rs. 220.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    isIceCream: true,
    startingPrice: 120,
    portions: [
      { id: '1-scoop', name: '1 Scoop Cup', price: 120, piece: '1 Generous Scoop in Chilled Cup' },
      { id: '2-scoop', name: 'Double Scoop Cup', price: 220, piece: 'Two Scoops in Chilled Cup (Save Rs. 20)' }
    ],
    flavors: [
      {
        id: 'king-kulfa',
        name: 'King Kulfa (Special)',
        tag: 'House Special ⭐',
        desc: 'Traditional condensed milk, crushed almonds, pistachios & royal saffron essence served in a cup.',
        color: '#facc15',
        image: 'https://images.unsplash.com/photo-1576506295286-5cda18df43e7?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'r-chocolate',
        name: 'R Chocolate (Rich Dark)',
        tag: 'Chocolate Lover 🍫',
        desc: 'Decadent deep Belgian cocoa fudge with velvety dark chocolate ribbons in a dessert cup.',
        color: '#582f0e',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'pista',
        name: 'Pista (Royal Pistachio)',
        tag: 'Nutty Delight 🥜',
        desc: 'Rich dairy cream infused with crushed roasted Iranian green pistachios served in a cup.',
        color: '#84cc16',
        image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'caramel-crunch',
        name: 'Caramel Crunch',
        tag: 'Crunchy Treat 🍯',
        desc: 'Golden buttery caramel ripple loaded with crunchy toasted praline pieces in a cup.',
        color: '#d97706',
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'mango',
        name: 'Mango Delight',
        tag: 'Tropical Alphonso 🥭',
        desc: 'Real sun-kissed mango pulp blended with rich fresh dairy cream in a chilled cup.',
        color: '#f59e0b',
        image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'strawberry',
        name: 'Strawberry Bliss',
        tag: 'Berry Sweet 🍓',
        desc: 'Juicy ripe field strawberries churned into smooth, luscious pink cream in a cup.',
        color: '#ff4d6d',
        image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'butterscotch',
        name: 'Butterscotch Royal',
        tag: 'Classic Gold 🧈',
        desc: 'Caramelized brown sugar and butter with sweet molasses crunch nuggets in a cup.',
        color: '#ea580c',
        image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'cheesecake',
        name: 'New York Cheesecake',
        tag: 'Gourmet Dessert 🍰',
        desc: 'Smooth cream cheese gelato swirled with buttery graham biscuit crust in a dessert cup.',
        color: '#fcd34d',
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'king-kulfa-economy',
        name: 'King Kulfa Economy',
        tag: 'Classic Value 🍨',
        desc: 'Authentic traditional kulfa flavor with rich condensed milk sweetness in a takeaway cup.',
        color: '#fef08a',
        image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'cotton-candy',
        name: 'Cotton Candy Dream',
        tag: 'Carnival Fun 🎪',
        desc: 'Pastel spun-sugar carnival sweetness served in a colorful dessert cup.',
        color: '#ec4899',
        image: 'https://images.unsplash.com/photo-1516559828984-fb3b99548b21?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'dairy-vanilla',
        name: 'Dairy Pure Vanilla',
        tag: 'Pure Classic 🍦',
        desc: 'Finest pure vanilla beans infused into thick, velvety rich dairy cream in a cup.',
        color: '#fef9c3',
        image: '/images/vanilla-icecream.jpg'
      }
    ]
  }
];

export const TESTIMONIALS = [
  {
    name: "Muhammad Usman",
    rating: 5,
    comment: "The taste of Madina Biryani is unbelievable! The chicken piece was so tender and juicy, and the rice had incredible aroma. Ordering on WhatsApp was super smooth and fast.",
    role: "Verified Foodie",
    date: "2 days ago"
  },
  {
    name: "Tariq Mahmood",
    rating: 5,
    comment: "Ordered Beef Pulao for our family dinner. Every single person praised the authentic taste and quality. Madina Biryani Center is definitely #1!",
    role: "Regular Customer",
    date: "1 week ago"
  },
  {
    name: "Ayesha Siddiqui",
    rating: 5,
    comment: "Pairing their Chicken Biryani with the King Kulfa ice cream is the ultimate treat! Genuine Karachi taste, generous portions, and very reasonable prices.",
    role: "Regular Customer",
    date: "3 days ago"
  }
];
