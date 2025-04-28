import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    title: '4K Ultra HD Smart TV',
    description: 'Experience stunning visuals with this 55-inch 4K Ultra HD Smart TV. Features include HDR, built-in streaming apps, and voice control compatibility.',
    price: 699.99,
    images: [
      'https://images.pexels.com/photos/6782570/pexels-photo-6782570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6782342/pexels-photo-6782342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'electronics',
    brand: 'TechVision',
    stock: 15,
    rating: 4.7,
    discount: 10,
    createdAt: '2023-10-15T10:30:00Z',
    colors: ['Black', 'Silver']
  },
  {
    id: 'prod_2',
    title: 'Wireless Noise Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design for immersive audio experience.',
    price: 249.99,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'electronics',
    brand: 'SoundWave',
    stock: 25,
    rating: 4.8,
    discount: 0,
    createdAt: '2023-11-05T14:45:00Z',
    colors: ['Black', 'White', 'Blue']
  },
  {
    id: 'prod_3',
    title: 'Men\'s Casual Denim Jacket',
    description: 'Classic denim jacket for men with comfortable fit, multiple pockets, and durable construction. Perfect for casual everyday wear.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1366960/pexels-photo-1366960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'clothing',
    brand: 'UrbanStyle',
    stock: 40,
    rating: 4.5,
    discount: 15,
    createdAt: '2023-09-20T09:15:00Z',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Black', 'Gray']
  },
  {
    id: 'prod_4',
    title: 'Women\'s Running Shoes',
    description: 'Lightweight and breathable running shoes with responsive cushioning and durable outsole for optimal performance and comfort.',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1670766/pexels-photo-1670766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'clothing',
    brand: 'Athletix',
    stock: 30,
    rating: 4.6,
    discount: 0,
    createdAt: '2023-10-25T11:20:00Z',
    sizes: ['5', '6', '7', '8', '9', '10'],
    colors: ['Black/White', 'Pink/Gray', 'Blue/Yellow']
  },
  {
    id: 'prod_5',
    title: 'Stainless Steel Cookware Set',
    description: '10-piece cookware set including pots, pans, and lids. Made with premium stainless steel for durability and even heat distribution.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/175761/pexels-photo-175761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/531139/pexels-photo-531139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'home',
    brand: 'ChefElite',
    stock: 20,
    rating: 4.7,
    discount: 20,
    createdAt: '2023-08-15T08:30:00Z'
  },
  {
    id: 'prod_6',
    title: 'Bestselling The Silent Patient',
    description: 'WITH OVER THREE MILLION COPIES SOLD, read the Sunday Times and No.1 New York Times bestselling, record-breaking thriller that everyone is talking about - soon to be a major film.',
    price: 24.99,
    images: [
      'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ2Ydd-swoYf8RVLcCctgX38PX2ZmO2Em1eSFCccUH8-Nli6P2Qe3J-U_E5wT356l01MhONPNWhN5k3qKGchCFGgt4dbSDXrSlcNbpKr4Q'
    ],
    category: 'books',
    brand: 'Orion',
    stock: 50,
    rating: 4.9,
    discount: 0,
    createdAt: '2023-11-10T15:45:00Z'
  },
  {
    id: 'prod_7',
    title: 'Interactive Board Game',
    description: 'Family-friendly board game for 2-6 players. Features interactive elements, strategic gameplay, and hours of entertainment for all ages.',
    price: 34.99,
    images: [
      'https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4691566/pexels-photo-4691566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'toys',
    brand: 'GameMaster',
    stock: 35,
    rating: 4.5,
    discount: 0,
    createdAt: '2023-09-05T13:20:00Z'
  },
  {
    id: 'prod_8',
    title: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, sleep tracking, GPS, and water resistance.',
    price: 179.99,
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'electronics',
    brand: 'FitTech',
    stock: 25,
    rating: 4.6,
    discount: 15,
    createdAt: '2023-10-01T10:15:00Z',
    colors: ['Black', 'Blue', 'Pink']
  },
  {
    id: 'prod_9',
    title: 'Organic Cotton Bedding Set',
    description: 'Luxurious 100% organic cotton bedding set including duvet cover, fitted sheet, and pillowcases. Soft, breathable, and eco-friendly.',
    price: 149.99,
    images: [
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'home',
    brand: 'EcoHome',
    stock: 20,
    rating: 4.8,
    discount: 0,
    createdAt: '2023-09-15T11:30:00Z',
    sizes: ['Twin', 'Full', 'Queen', 'King'],
    colors: ['White', 'Gray', 'Blue', 'Sage']
  },
  {
    id: 'prod_10',
    title: 'Professional Blender',
    description: 'High-performance blender with multiple speed settings, pulse function, and durable blades for smoothies, soups, and more.',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/3735208/pexels-photo-3735208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4006433/pexels-photo-4006433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'home',
    brand: 'KitchenPro',
    stock: 15,
    rating: 4.7,
    discount: 10,
    createdAt: '2023-08-20T09:45:00Z',
    colors: ['Black', 'Silver', 'Red']
  },
  {
    id: 'prod_11',
    title: 'Children\'s Educational Tablet',
    description: 'Kid-friendly tablet with educational apps, games, and parental controls. Durable design and long battery life for learning on the go.',
    price: 149.99,
    images: [
      'https://images.pexels.com/photos/1262412/pexels-photo-1262412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5790755/pexels-photo-5790755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'electronics',
    brand: 'LearnTech',
    stock: 25,
    rating: 4.5,
    discount: 0,
    createdAt: '2023-10-10T14:20:00Z',
    colors: ['Blue', 'Pink', 'Green']
  },
  {
    id: 'prod_12',
    title: 'Wooden Building Blocks Set',
    description: 'Set of 100 colorful wooden building blocks in various shapes and sizes. Perfect for developing creativity and motor skills in children.',
    price: 39.99,
    images: [
      'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5173316/pexels-photo-5173316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'toys',
    brand: 'KidWonder',
    stock: 30,
    rating: 4.9,
    discount: 0,
    createdAt: '2023-09-25T12:10:00Z'
  },
  {
    id: 'prod_13',
    title: 'Professional Camera with Lens Kit',
    description: 'Digital SLR camera with 24.1MP sensor, 4K video recording, and included 18-55mm lens. Perfect for photography enthusiasts and professionals.',
    price: 899.99,
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'electronics',
    brand: 'OptiPro',
    stock: 10,
    rating: 4.8,
    discount: 5,
    createdAt: '2023-08-05T11:15:00Z',
    colors: ['Black']
  },
  {
    id: 'prod_14',
    title: 'Women\'s Leather Handbag',
    description: 'Elegant leather handbag with spacious interior, multiple compartments, and adjustable shoulder strap. Stylish and functional for everyday use.',
    price: 159.99,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/5462562/pexels-photo-5462562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'clothing',
    brand: 'LuxeStyle',
    stock: 20,
    rating: 4.7,
    discount: 0,
    createdAt: '2023-10-20T13:40:00Z',
    colors: ['Black', 'Brown', 'Tan', 'Red']
  },
  {
    id: 'prod_15',
    title: 'Men\'s Classic Chronograph Watch',
    description: 'Sophisticated stainless steel watch with chronograph function, date display, and water resistance. Timeless design for any occasion.',
    price: 199.99,
    images: [
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'clothing',
    brand: 'TimeMaster',
    stock: 15,
    rating: 4.6,
    discount: 10,
    createdAt: '2023-09-10T10:30:00Z',
    colors: ['Silver', 'Gold', 'Black']
  },
  {
    id: 'prod_16',
    title: 'Ergonomic Office Chair',
    description: 'Adjustable office chair with lumbar support, breathable mesh back, and comfortable cushion. Designed for long hours of comfortable work.',
    price: 249.99,
    images: [
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6489601/pexels-photo-6489601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'home',
    brand: 'ComfortWork',
    stock: 10,
    rating: 4.5,
    discount: 15,
    createdAt: '2023-08-25T15:20:00Z',
    colors: ['Black', 'Gray', 'Blue']
  },
  {
    id: 'prod_17',
    title: 'Organic Basmati Rice (5kg)',
    description: 'Premium quality aged basmati rice. Long-grain, aromatic, and perfect for biryanis and pulao.',
    price: 599,
    images: [
      'https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7421213/pexels-photo-7421213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'grocery',
    brand: 'OrganicIndia',
    stock: 100,
    rating: 4.8,
    discount: 10,
    createdAt: '2024-03-10T10:30:00Z'
  },
  {
    id: 'prod_18',
    title: 'Mixed Dal Pack',
    description: 'Assorted pack of 5 different dals: Toor, Moong, Masoor, Urad, and Chana. Each pack 500g.',
    price: 449,
    images: [
      'https://images.pexels.com/photos/4198836/pexels-photo-4198836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6157059/pexels-photo-6157059.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'grocery',
    brand: 'PurePulse',
    stock: 75,
    rating: 4.6,
    discount: 0,
    createdAt: '2024-03-09T15:45:00Z'
  },
  {
    id: 'prod_19',
    title: 'Natural Face Care Kit',
    description: 'Complete skincare kit with cleanser, toner, moisturizer, and face pack. Made with natural ingredients.',
    price: 1299,
    images: [
      'https://images.pexels.com/photos/3735619/pexels-photo-3735619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3737586/pexels-photo-3737586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'beauty',
    brand: 'Ayurveda Essentials',
    stock: 30,
    rating: 4.7,
    discount: 15,
    createdAt: '2024-03-08T09:20:00Z'
  },
  {
    id: 'prod_20',
    title: 'Herbal Hair Oil',
    description: 'Traditional herbal hair oil with coconut, amla, and bhringraj. Promotes hair growth and prevents hair fall.',
    price: 399,
    images: [
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    category: 'beauty',
    brand: 'Ayurveda Essentials',
    stock: 50,
    rating: 4.9,
    discount: 0,
    createdAt: '2024-03-07T14:15:00Z'
  }
];