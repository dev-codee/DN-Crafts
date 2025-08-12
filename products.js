// Helper function to generate a random price in a given range
const getRandomPrice = (min, max) => {
  // Generates a random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const products = [
  // Acrylic Products
  {
    id: 1,
    name: 'Acrylic Umrah Tabarak Box',
    category: 'Tabarak Boxes',
    price: 750,
    image: 'pics\\ummrah Box.jpg',
    description: 'Acrylic box for Umrah souvenirs.',
  },
  {
    id: 2,
    name: 'Cardboard Umrah Tabarak Box',
    category: 'Tabarak Boxes',
    price: 450,
    image: 'pics\\ummrah card.jpg',
    description: 'Cardboard box for Umrah souvenirs.',
  },
  {
    id: 3,
    name: 'Umrah Tabarak Bags',
    category: 'Tabarak Boxes',
    price: 230,
    image: 'pics\\carboard box.jpg',
    description: 'Special bags for Umrah souvenirs.',
  },
  {
    id: 24,
    name: 'Cake Box 8*8 Inches',
    category: 'Acrylic Products',
    price: 1800,
    image: 'pics/cakeBox.jpg', 
    description: 'Acrylic cake box for a 1-pound cake, 8x8 inches.',
  },
  {
    id: 25,
    name: 'Wedding Bid Boxes',
    category: 'Acrylic Products',
    price: 250,
    image: 'pics\\bidBox.jpg',
    description: 'Elegant acrylic boxes for wedding bids.',
  },
  {
    id: 26,
    name: 'Wedding Favor Boxes',
    category: 'Acrylic Products',
    price: 180,
    image: 'pics\\favorBox.jpg',
    description: 'Small acrylic boxes for wedding favors.',
  },
  {
    id: 7,
    name: 'Customized Size Box',
    category: 'Acrylic Products',
    price: 3000,
    image: 'pics\\box.jpg_.webp',
    description: 'Acrylic box with custom dimensions and design.',
  },
  {
    id: 8,
    name: 'Gift Bag',
    category: 'Acrylic Products',
    price: 1400,
    image: 'pics\\giftBox.jpg',
    description: 'Stylish acrylic gift bag for various occasions.',
  },
  {
    id: 9,
    name: 'Bangles Box',
    category: 'Acrylic Products',
    price: 2200,
    image: 'pics\\bangleBox.jpg',
    description: 'Acrylic box designed to store bangles.',
  },
  {
    id: 10,
    name: 'Quran Pak Box',
    category: 'Acrylic Products',
    price: 2700,
    image: 'pics\\blackquranbox1.jpg',
    description: 'Decorative acrylic box for the Quran Pak.',
  },
  {
    id: 11,
    name: 'Personalized Nikkah Namah Frame',
    category: 'Personalized Nikkah Namas',
    price: 1500,
    image: 'pics\\frame.jpg',
    description: 'Beautifully framed and personalized Nikkah Namah A4 Size.',
  },
  {
    id: 12,
    name: 'Customized Nikkah Namah Frame',
    category: 'Personalized Nikkah Namas',
    price: 2400,
    image: 'pics\\namah.jpg',
    description: 'Fully customized Nikkah Namah frame with unique designs A3 Size.',
  },
  // Invitation Cards
  {
    id: 20,
    name: 'Ultra-Luxury Acrylic Box Wedding Invite (Rajab Butt)',
    category: 'Invitation Cards',
    price: 2400,
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Premium wedding invitation card in a luxurious acrylic box.',
  },
  {
    id: 21,
    name: 'Simple Acrylic Box Wedding Invite',
    category: 'Invitation Cards',
    price: 700,
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Elegant wedding invitation card in a simple acrylic box.',
  },
  {
    id: 13,
    name: 'Luxury Acrylic Box Wedding Invite With Dry Fruit Portion',
    category: 'Invitation Cards',
    price: 1200,
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'High-end wedding invitation with a dedicated dry fruit compartment.',
  },
  {
    id: 15,
    name: 'Simple Foldable Wedding Invite',
    category: 'Invitation Cards',
    price: 230,
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Classic foldable wedding invitation card.',
  },
  // Favor Boxes
  {
    id: 16,
    name: 'Acrylic Favor Box',
    category: 'Favor Boxes',
    price: 190,
    image: 'pics\\favorB.jpg',
    description: 'Small acrylic boxes for event favors.',
  },
  {
    id: 17,
    name: 'Customized Acrylic Favor Box with Tag',
    category: 'Favor Boxes',
    price: 230,
    image: 'pics\\tagBox.jpg',
    description: 'Custom acrylic favor boxes with a personalized tag.',
  },
  {
    id: 18,
    name: 'Tin Wedding Favor Box',
    category: 'Favor Boxes',
    price: 140,
    image: 'pics\\tinBox.webp',
    description: 'Stylish tin boxes for wedding favors.',
  },
  {
    id: 19,
    name: 'Cardboard Wedding Favor Box',
    category: 'Favor Boxes',
    price: 70,
    image: 'https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available',
    description: 'Eco-friendly cardboard boxes for wedding favors.',
  },
    
  // Customized Bride Dupata
  {
    id: 22,
    name: 'Customized Bride Dupata with Dua’s',
    category: 'Customized Bride Dupata',
    price: 6000,
    image: 'pics\\dua Dupatta.jpg',
    description: 'Bridal dupatta customized with sacred duas.',
  },
  {
    id: 23,
    name: 'Customized Bride Dupata with Groom Name',
    category: 'Customized Bride Dupata',
    price: 3500,
    image: 'pics\\dupatta.png',
    description: 'Bridal dupatta customized with the groom’s name.',
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
    price: 2000,
    image: 'pics\\image_1200x1200.jpg',
    description: 'Bouquet made with fresh flowers.',
  },
  {
    id: 33,
    name: 'Ribbon Petal Bouquet',
    category: 'Flower Bouquets',
    price: 1500,
    image: 'pics\\ribon.jpg',
    description: 'Bouquet of handcrafted ribbon petals(50 roses).',
  },
  {
    id: 34,
    name: 'Cash Bouquet',
    category: 'Flower Bouquets',
    price: 13000,
    image: 'pics\\Cash.png',
    description: 'Creative bouquet made with 10k cash notes.',
  },
  {
    id: 35,
    name: 'Snacks Bouquet',
    category: 'Flower Bouquets',
    price: 3000,
    image: 'pics\\snack.jpeg',
    description: 'Bouquet filled with a variety of snacks.',
  },
  {
    id: 37,
    name: 'Jewelry Bouquet',
    category: 'Flower Bouquets',
    price: 3500,
    image: 'pics\\jwelery.jpg',
    description: 'Bouquet adorned with beautiful jewelry pieces.',
  },
  // Gift Baskets
  {
    id: 38,
    name: 'Snacks Basket',
    category: 'Gift Baskets',
    price: 3400,
    image: 'pics\\snackBAs.jpg',
    description: 'Basket filled with an assortment of snacks.',
  },
  {
    id: 43,
    name: 'Chocolate Basket',
    category: 'Gift Baskets',
    price: 4500,
    image: 'pics\\choclate.jpeg',
    description: 'Basket filled with assorted chocolates.',
  },
  {
    "id": 44,
    "name": "Chocolate Cake",
    "category": "Sweets",
    "price": 880,
    "image": "pics\\choc cake.jpg",
    "description": "A classic chocolate cake."
  },
  {
    "id": 45,
    "name": "Oreo Cake",
    "category": "Sweets",
    "price": 850,
    "image": "pics\\oreoCake.png",
    "description": "A cake with the rich flavor of Oreo cookies."
  },
  {
    "id": 46,
    "name": "Pineapple Cake",
    "category": "Sweets",
    "price": 1200,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A light and fruity pineapple cake."
  },
  {
    "id": 47,
    "name": "Coffee Cake",
    "category": "Sweets",
    "price": 950,
    "image": "pics\\cofee cake.jpg",
    "description": "A cake with a distinctive coffee flavor."
  },
  {
    "id": 48,
    "name": "Almond Cake",
    "category": "Sweets",
    "price": 1000,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A moist cake with a rich almond taste."
  },
  {
    "id": 49,
    "name": "Fudge Cake",
    "category": "Sweets",
    "price": 1500,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A decadent and dense fudge cake."
  },
  {
    "id": 50,
    "name": "Brownie Cake",
    "category": "Sweets",
    "price": 900,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A rich and chewy brownie-based cake."
  },
  {
    "id": 51,
    "name": "Chocolate Cupcake",
    "category": "Sweets",
    "price": 120,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single chocolate cupcake."
  },
  {
    "id": 52,
    "name": "Pineapple Cupcake",
    "category": "Sweets",
    "price": 120,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single pineapple cupcake."
  },
  {
    "id": 53,
    "name": "Oreo Cupcake",
    "category": "Sweets",
    "price": 120,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single Oreo cupcake."
  },
  {
    "id": 54,
    "name": "Fudge Cupcake",
    "category": "Sweets",
    "price": 300,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single fudge cupcake."
  },
  {
    "id": 55,
    "name": "Chocolate Sundae",
    "category": "Sweets",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A sundae with rich chocolate sauce."
  },
  {
    "id": 56,
    "name": "Pineapple Sundae",
    "category": "Sweets",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A refreshing sundae with pineapple topping."
  },
  {
    "id": 57,
    "name": "Caramel Sundae",
    "category": "Sweets",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A classic sundae with sweet caramel."
  },
  {
    "id": 58,
    "name": "Butterscotch Sundae",
    "category": "Sweets",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A sundae with a creamy butterscotch flavor."
  },
  {
    "id": 59,
    "name": "Oreo Sundae",
    "category": "Sweets",
    "price": 220,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A sundae topped with crushed Oreo cookies."
  },
  {
    "id": 60,
    "name": "Plain Nan Khatai",
    "category": "Sweets",
    "price": 1000,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "Traditional plain nan khatai biscuits."
  },
  {
    "id": 61,
    "name": "Almond Nan Khatai",
    "category": "Sweets",
    "price": 1500,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "Nan khatai biscuits with almond pieces."
  },
  {
    "id": 62,
    "name": "Cake Rusk",
    "category": "Sweets",
    "price": 1000,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "Crispy and crunchy cake rusk."
  },
  {
    "id": 63,
    "name": "Brownie",
    "category": "Sweets",
    "price": 200,
    "image": "https://placehold.co/400x500/E3E7EB/5C5E60?text=No+Image+Available",
    "description": "A single rich and chewy brownie."
  },
  {
    "id": 64,
    "name": "Special Anniversery Cake",
    "category": "Sweets",
    "price": 3500,
    "image": "pics\\c1.jpg",
    "description": "3 pound speical cake."
  },
  {
    "id": 65,
    "name": " 14 August Special Cake",
    "category": "Sweets",
    "price": 4000,
    "image": "pics\\aug cake.jpg",
    "description": "2 pound speical cake."
  },
  {
    "id": 66,
    "name": "spider Man Cake",
    "category": "Sweets",
    "price": 3000,
    "image": "pics\\spider man cake.jpg",
    "description": "2 pound speical cake."
  },
];