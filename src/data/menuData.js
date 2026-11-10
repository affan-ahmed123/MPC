export const SHOP_CONFIG = {
  name: "Madina Pakwan Center",
  shortName: "Madina Pakwan Center (MPC)",
  logo: "/images/mpc-logo.png",
  slogan: "Delicious Taste with Quality, Always with You",
  subSlogan: "Delicious Food • Premium Taste • Your Choice",
  iceCreamTagline: "Premium Ice Cream For a Sweeter Moment",
  iceCreamSub: "Rich Flavors • Creamy Delight • Pure Happiness",
  phone: "+92 300 1234567",
  whatsappNumber: "923001234567",
  address: "Main Commercial Area, Near City Chowk",
  city: "Karachi, Pakistan",
  timings: "Daily: 11:30 AM - 1:30 AM",
  deliveryFee: 100,
  freeDeliveryThreshold: 2000, // FREE delivery on orders Rs. 2000 and above
  minOrder: 100,
};

export const MENU_CATEGORIES = [
  { id: 'all', name: 'All Items', icon: 'Sparkles' },
  { id: 'biryani', name: 'Biryani & Pulao', icon: 'Flame' },
  { id: 'extras', name: 'Raita, Sides & Drinks', icon: 'Coffee' },
  { id: 'icecream', name: 'Ice Cream', icon: 'IceCream' }
];

export const MENU_ITEMS = [
  // --- 1. BIRYANI & PULAO SECTION (From Menu Card 1) ---
  {
    id: 'chicken-biryani',
    category: 'biryani',
    name: 'Special Chicken Biryani',
    badge: 'Most Popular / Best Seller',
    description: 'Aromatic long-grain basmati rice cooked with juicy chicken, rich saffron layers, potatoes, and traditional Madina spices slow dum-cooked to perfection.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    startingPrice: 160,
    portions: [
      { id: 'pao', name: 'Quarter Portion (250g)', price: 160, piece: 'Quarter Portion (250g)' },
      { id: 'derh-pao', name: 'Single Serving (375g)', price: 220, piece: 'Standard Single Serving (375g)' },
      { id: 'half-single', name: 'Half Kg - Single Piece', price: 260, piece: '500g Rice with 1 Big Juicy Piece' },
      { id: 'half-double', name: 'Half Kg - Double Piece', price: 320, piece: '500g Rice with 2 Juicy Chicken Pieces' },
      { id: 'one-double', name: '1 Kg - Double Piece', price: 500, piece: '1000g Family Pack with 2 Pieces' },
      { id: 'one-four', name: '1 Kg - 4 Pieces', price: 640, piece: '1000g Mega Family Feast with 4 Pieces' },
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
    startingPrice: 180,
    portions: [
      { id: 'pao', name: 'Quarter Portion (250g)', price: 180, piece: 'Quarter Portion' },
      { id: 'derh-pao', name: 'Single Serving (375g)', price: 260, piece: 'Medium Serving' },
      { id: 'half-kg', name: 'Half Kg (500g)', price: 350, piece: 'Half Kg with Succulent Beef Chunks' },
      { id: 'one-kg', name: '1 Kg (1000g)', price: 700, piece: 'Full 1 Kg Family Feast' },
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

  // --- 2. RAITA, SIDES & DRINKS SECTION (Positioned right above Ice Cream as requested) ---
  {
    id: 'millac-raita',
    category: 'extras',
    name: 'Millac Special Mint & Cumin Raita',
    badge: 'Must-Have Side',
    description: 'Chilled creamy yogurt dip infused with roasted cumin seeds, crushed mint leaves, green chillies, and secret herbs.',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=800&auto=format&fit=crop&q=80',
    hasPortions: false,
    startingPrice: 60,
    price: 60,
    portionLabel: '1 Sealed Cup (150ml)'
  },
  {
    id: 'fresh-salad',
    category: 'extras',
    name: 'Fresh Kachumar Garden Salad',
    badge: 'Fresh & Crisp',
    description: 'Crisp sliced onions, garden cucumbers, juicy tomatoes, and green lemon wedges seasoned with chaat masala.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    hasPortions: false,
    startingPrice: 40,
    price: 40,
    portionLabel: '1 Fresh Plate Serving'
  },
  {
    id: 'cold-drinks',
    category: 'extras',
    name: 'Chilled Soft Drinks & Beverages',
    badge: 'Ice Chilled',
    description: 'Pepsi, Coca-Cola, 7Up, Pakola, or Mountain Dew (mention preferred flavor in order instructions).',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&auto=format&fit=crop&q=80',
    hasPortions: true,
    startingPrice: 70,
    portions: [
      { id: 'can-345ml', name: 'Regular 345ml Bottle', price: 70, piece: 'Single Drink' },
      { id: 'can-500ml', name: '500ml Pet Bottle', price: 120, piece: 'Medium Drink' },
      { id: 'jumbo-1.5l', name: '1.5 Litre Family Bottle', price: 230, piece: 'Family Pack' },
    ]
  },

  // --- 3. ICE CREAM MENU SECTION (Dessert at the bottom) ---
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
        image: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=600&auto=format&fit=crop&q=80'
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
