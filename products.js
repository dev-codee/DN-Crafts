// Helper function to generate a random price in a given range
const getRandomPrice = (min, max) => {
  // Generates a random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const products = [
  // Acrylic Products
  {
    id: 1,
    name: '1 Pound Cake Box 8*8 Inches',
    category: 'Acrylic Products',
    price: getRandomPrice(800, 1500),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available', // Placeholder for your image URL
    description: 'Acrylic cake box for a 1-pound cake, 8x8 inches.',
  },
  {
    id: 2,
    name: '2 Pound Cake Box 10*10 Inches',
    category: 'Acrylic Products',
    price: getRandomPrice(1200, 2500),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Acrylic cake box for a 2-pound cake, 10x10 inches.',
  },
  {
    id: 3,
    name: '3 Pound Cake Box 12*12 Inches',
    category: 'Acrylic Products',
    price: getRandomPrice(1800, 3500),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Acrylic cake box for a 3-pound cake, 12x12 inches.',
  },
  {
    id: 4,
    name: '5 Pound Cake Box 14*14 Inches',
    category: 'Acrylic Products',
    price: getRandomPrice(2500, 5000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Acrylic cake box for a 5-pound cake, 14x14 inches.',
  },
  {
    id: 5,
    name: 'Wedding Bid Boxes',
    category: 'Acrylic Products',
    price: getRandomPrice(3000, 8000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Elegant acrylic boxes for wedding bids.',
  },
  {
    id: 6,
    name: 'Wedding Favor Boxes',
    category: 'Acrylic Products',
    price: getRandomPrice(500, 1500),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Small acrylic boxes for wedding favors.',
  },
  {
    id: 7,
    name: 'Customized Size Box',
    category: 'Acrylic Products',
    price: getRandomPrice(1500, 10000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Acrylic box with custom dimensions and design.',
  },
  {
    id: 8,
    name: 'Gift Bag',
    category: 'Acrylic Products',
    price: getRandomPrice(300, 800),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Stylish acrylic gift bag for various occasions.',
  },
  {
    id: 9,
    name: 'Bangles Box',
    category: 'Acrylic Products',
    price: getRandomPrice(1000, 3000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Acrylic box designed to store bangles.',
  },
  {
    id: 10,
    name: 'Quran Pak Box',
    category: 'Acrylic Products',
    price: getRandomPrice(2000, 6000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Decorative acrylic box for the Quran Pak.',
  },

  // Invitation Cards
  {
    id: 11,
    name: 'Luxury Acrylic Box Wedding Invite',
    category: 'Invitation Cards',
    price: getRandomPrice(4000, 12000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Premium wedding invitation card in a luxurious acrylic box.',
  },
  {
    id: 12,
    name: 'Simple Acrylic Box Wedding Invite',
    category: 'Invitation Cards',
    price: getRandomPrice(2000, 7000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Elegant wedding invitation card in a simple acrylic box.',
  },
  {
    id: 13,
    name: 'Ultra-Luxury Acrylic Box Wedding Invite With Dry Fruit Portion',
    category: 'Invitation Cards',
    price: getRandomPrice(8000, 20000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'High-end wedding invitation with a dedicated dry fruit compartment.',
  },
  {
    id: 14,
    name: 'Ultra Pro Max Acrylic Box Luxury Wedding Invite With 3 Dry Fruit Portion',
    category: 'Invitation Cards',
    price: getRandomPrice(15000, 35000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'The ultimate luxury wedding invite with three dry fruit compartments.',
  },
  {
    id: 15,
    name: 'Simple Foldable Wedding Invite',
    category: 'Invitation Cards',
    price: getRandomPrice(500, 1500),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Classic foldable wedding invitation card.',
  },

  // Favor Boxes
  {
    id: 16,
    name: 'Acrylic Favor Box',
    category: 'Favor Boxes',
    price: getRandomPrice(300, 800),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Small acrylic boxes for event favors.',
  },
  {
    id: 17,
    name: 'Customized Acrylic Favor Box with Tag',
    category: 'Favor Boxes',
    price: getRandomPrice(500, 1200),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Custom acrylic favor boxes with a personalized tag.',
  },
  {
    id: 18,
    name: 'Tin Wedding Favor Box',
    category: 'Favor Boxes',
    price: getRandomPrice(200, 600),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Stylish tin boxes for wedding favors.',
  },
  {
    id: 19,
    name: 'Cardboard Wedding Favor Box',
    category: 'Favor Boxes',
    price: getRandomPrice(150, 400),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Eco-friendly cardboard boxes for wedding favors.',
  },
  
  // Personalized Nikkah Namas
  {
    id: 20,
    name: 'Personalized Nikkah Namah Frame',
    category: 'Personalized Nikkah Namas',
    price: getRandomPrice(5000, 15000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Beautifully framed and personalized Nikkah Namah.',
  },
  {
    id: 21,
    name: 'Customized Nikkah Namah Frame',
    category: 'Personalized Nikkah Namas',
    price: getRandomPrice(7000, 20000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Fully customized Nikkah Namah frame with unique designs.',
  },
  
  // Customized Bride Dupata
  {
    id: 22,
    name: 'Customized Bride Dupata with Dua’s',
    category: 'Customized Bride Dupata',
    price: getRandomPrice(8000, 25000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bridal dupatta customized with sacred duas.',
  },
  {
    id: 23,
    name: 'Customized Bride Dupata with Groom Name',
    category: 'Customized Bride Dupata',
    price: getRandomPrice(10000, 30000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bridal dupatta customized with the groom’s name.',
  },
  
  // Tabarak Boxes
  {
    id: 24,
    name: 'Acrylic Umrah Tabarak Box',
    category: 'Tabarak Boxes',
    price: getRandomPrice(1500, 5000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Acrylic box for Umrah souvenirs.',
  },
  {
    id: 25,
    name: 'Cardboard Umrah Tabarak Box',
    category: 'Tabarak Boxes',
    price: getRandomPrice(800, 2000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Cardboard box for Umrah souvenirs.',
  },
  {
    id: 26,
    name: 'Umrah Tabarak Bags',
    category: 'Tabarak Boxes',
    price: getRandomPrice(500, 1500),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Special bags for Umrah souvenirs.',
  },

  // Occasion Gifts
  {
    id: 27,
    name: 'Eid Gifts',
    category: 'Occasion Gifts',
    price: getRandomPrice(1000, 5000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Curated gift items for Eid celebrations.',
  },
  {
    id: 28,
    name: 'Birthday Gifts',
    category: 'Occasion Gifts',
    price: getRandomPrice(1000, 6000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Personalized gifts for birthdays.',
  },
  {
    id: 29,
    name: 'Ramzan Gifts',
    category: 'Occasion Gifts',
    price: getRandomPrice(1200, 7000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Thoughtful gifts for the holy month of Ramzan.',
  },
  {
    id: 30,
    name: 'Father’s Day Gifts',
    category: 'Occasion Gifts',
    price: getRandomPrice(1500, 8000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Unique gift items for Father’s Day.',
  },
  {
    id: 31,
    name: 'Mother’s Day Gifts',
    category: 'Occasion Gifts',
    price: getRandomPrice(1500, 9000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Heartfelt gifts for Mother’s Day.',
  },

  // Flower Bouquets
  {
    id: 32,
    name: 'Fresh Flowers Bouquet',
    category: 'Flower Bouquets',
    price: getRandomPrice(2000, 10000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bouquet made with fresh flowers.',
  },
  {
    id: 33,
    name: 'Ribbon Petal Bouquet',
    category: 'Flower Bouquets',
    price: getRandomPrice(1500, 7000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bouquet of handcrafted ribbon petals.',
  },
  {
    id: 34,
    name: 'Cash Bouquet',
    category: 'Flower Bouquets',
    price: getRandomPrice(3000, 20000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Creative bouquet made with cash notes.',
  },
  {
    id: 35,
    name: 'Snacks Bouquet',
    category: 'Flower Bouquets',
    price: getRandomPrice(1800, 8000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bouquet filled with a variety of snacks.',
  },
  {
    id: 36,
    name: 'Money Bouquet',
    category: 'Flower Bouquets',
    price: getRandomPrice(4000, 25000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bouquet featuring money as the main element.',
  },
  {
    id: 37,
    name: 'Jewelry Bouquet',
    category: 'Flower Bouquets',
    price: getRandomPrice(5000, 30000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Bouquet adorned with beautiful jewelry pieces.',
  },

  // Gift Baskets
  {
    id: 38,
    name: 'Snacks Basket',
    category: 'Gift Baskets',
    price: getRandomPrice(2500, 10000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Basket filled with an assortment of snacks.',
  },
  {
    id: 39,
    name: 'Food Basket',
    category: 'Gift Baskets',
    price: getRandomPrice(3000, 15000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Basket with various food items and treats.',
  },
  {
    id: 40,
    name: 'Fruit Basket',
    category: 'Gift Baskets',
    price: getRandomPrice(2800, 12000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Basket containing a selection of fresh fruits.',
  },
  {
    id: 41,
    name: 'Dry Fruit Basket',
    category: 'Gift Baskets',
    price: getRandomPrice(3500, 18000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Basket with a premium selection of dry fruits.',
  },
  {
    id: 42,
    name: 'Makeup Basket',
    category: 'Gift Baskets',
    price: getRandomPrice(5000, 25000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Curated basket of makeup products.',
  },
  {
    id: 43,
    name: 'Chocolate Basket',
    category: 'Gift Baskets',
    price: getRandomPrice(2000, 10000),
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Basket filled with assorted chocolates.',
  },
  {
    "id": 44,
    "name": "Chocolate Cake",
    "category": "Cakes",
    "price": 880,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A classic chocolate cake."
  },
  {
    "id": 45,
    "name": "Oreo Cake",
    "category": "Cakes",
    "price": 850,
    "image": "pics\\oreoCake.png",
    "description": "A cake with the rich flavor of Oreo cookies."
  },
  {
    "id": 46,
    "name": "Pineapple Cake",
    "category": "Cakes",
    "price": 1200,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A light and fruity pineapple cake."
  },
  {
    "id": 47,
    "name": "Coffee Cake",
    "category": "Cakes",
    "price": 950,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A cake with a distinctive coffee flavor."
  },
  {
    "id": 48,
    "name": "Almond Cake",
    "category": "Cakes",
    "price": 1000,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A moist cake with a rich almond taste."
  },
  {
    "id": 49,
    "name": "Fudge Cake",
    "category": "Cakes",
    "price": 1500,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A decadent and dense fudge cake."
  },
  {
    "id": 50,
    "name": "Brownie Cake",
    "category": "Cakes",
    "price": 900,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A rich and chewy brownie-based cake."
  },
  {
    "id": 51,
    "name": "Chocolate Cupcake",
    "category": "Cupcake",
    "price": 120,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single chocolate cupcake."
  },
  {
    "id": 52,
    "name": "Pineapple Cupcake",
    "category": "Cupcake",
    "price": 120,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single pineapple cupcake."
  },
  {
    "id": 53,
    "name": "Oreo Cupcake",
    "category": "Cupcake",
    "price": 120,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single Oreo cupcake."
  },
  {
    "id": 54,
    "name": "Fudge Cupcake",
    "category": "Cupcake",
    "price": 300,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single fudge cupcake."
  },
  {
    "id": 55,
    "name": "Chocolate Sundae",
    "category": "Sundae",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A sundae with rich chocolate sauce."
  },
  {
    "id": 56,
    "name": "Pineapple Sundae",
    "category": "Sundae",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A refreshing sundae with pineapple topping."
  },
  {
    "id": 57,
    "name": "Caramel Sundae",
    "category": "Sundae",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A classic sundae with sweet caramel."
  },
  {
    "id": 58,
    "name": "Butterscotch Sundae",
    "category": "Sundae",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A sundae with a creamy butterscotch flavor."
  },
  {
    "id": 59,
    "name": "Oreo Sundae",
    "category": "Sundae",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A sundae topped with crushed Oreo cookies."
  },
  {
    "id": 60,
    "name": "Plain Nan Khatai",
    "category": "Biscuits",
    "price": 1000,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "Traditional plain nan khatai biscuits."
  },
  {
    "id": 61,
    "name": "Almond Nan Khatai",
    "category": "Biscuits",
    "price": 1500,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "Nan khatai biscuits with almond pieces."
  },
  {
    "id": 62,
    "name": "Cake Rusk",
    "category": "Biscuits",
    "price": 1000,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "Crispy and crunchy cake rusk."
  },
  {
    "id": 63,
    "name": "Brownie",
    "category": "Biscuits",
    "price": 200,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single rich and chewy brownie."
  },
  {
    "id": 64,
    "name": "Special Anniversery Cake",
    "category": "Cakes",
    "price": 3500,
    "image": "pics\\c1.jpg",
    "description": "3 pound speical cake."
  },
];