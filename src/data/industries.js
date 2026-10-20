// SKFF (INDIA) PVT. LTD. - Industries Served
// Based on verified official company business operations

import catConfectionery from '../assets/cat-confectionery.jpg';
import catDairy from '../assets/cat-dairy.jpg';
import catBakery from '../assets/cat-bakery.jpg';
import catCulinary from '../assets/cat-culinary.jpg';
import catBeverages from '../assets/cat-beverages.jpg';
import catPharma from '../assets/cat-pharma.jpg';
import catHealth from '../assets/cat-health.jpg';
import fragHomecare from '../assets/frag-homecare.jpg';
import fragPersonal from '../assets/frag-personal.jpg';
import fragFabric from '../assets/frag-fabric.jpg';

export const INDUSTRIES = [
  {
    id: 'food-beverage',
    name: 'Food & Beverage',
    subtitle: 'Taste innovation for modern palates',
    description: 'Custom flavour solutions for carbonated beverages, ready-to-drink juices, teas, snacks, savory seasonings, and culinary preparations designed to enhance consumer appeal and formulation stability.',
    image: catBeverages,
    solutions: ['Ready-to-drink Beverages', 'Carbonated Soft Drinks', 'Savory Snacks & Seasonings', 'Sauces & Marinades'],
    categoryIds: ['beverages', 'culinary-savory']
  },
  {
    id: 'bakery-confectionery',
    name: 'Bakery & Confectionery',
    subtitle: 'High-temperature stability & indulgence',
    description: 'Heat-resistant flavour profiles engineered for high-temperature oven baking, candy boiling, and chocolate tempering, maintaining authentic aroma from production line to consumer.',
    image: catBakery,
    solutions: ['Cakes & Pastries', 'Cookies & Biscuits', 'Hard Candies & Gums', 'Chocolates & Fillings'],
    categoryIds: ['bakery', 'confectionery']
  },
  {
    id: 'dairy-ice-cream',
    name: 'Dairy',
    subtitle: 'Authentic richness and creaminess enhancement',
    description: 'Specialized dairy notes formulated to enhance mouthfeel, richness, and flavour balance in milk drinks, yoghurts, ice creams, processed cheeses, and traditional sweets.',
    image: catDairy,
    solutions: ['Flavoured Milks & Shakes', 'Ice Creams & Frozen Desserts', 'Cultured Yoghurts', 'Cheeses & Spreads'],
    categoryIds: ['dairy']
  },
  {
    id: 'pharmaceuticals',
    name: 'Pharmaceuticals',
    subtitle: 'Advanced sensory masking & patient compliance',
    description: 'Pharmaceutical-grade flavour formulations and taste-masking technologies developed to suppress active ingredient bitterness in syrups, chewables, and oral drops without altering drug efficacy.',
    image: catPharma,
    solutions: ['Cough & Cold Syrups', 'Chewable Tablets', 'Oral Suspensions', 'Bitterness Masking'],
    categoryIds: ['pharmaceuticals']
  },
  {
    id: 'nutraceuticals',
    name: 'Nutraceuticals',
    subtitle: 'Palatable nutrition for health & wellness',
    description: 'Flavour systems designed specifically for dietary supplements, protein powders, electrolyte mixes, collagen formulations, and functional wellness beverages.',
    image: catHealth,
    solutions: ['Whey & Plant Protein Powders', 'Effervescent Vitamins', 'Collagen Drinks', 'Wellness Powders'],
    categoryIds: ['instant-health-drinks']
  },
  {
    id: 'personal-care',
    name: 'Personal Care',
    subtitle: 'Captivating scents for everyday pampering',
    description: 'IFRA-compliant fragrance compounds for soaps, body washes, shampoos, hair oils, creams, and lotions that deliver high bloom in water and lasting substantivity on skin and hair.',
    image: fragPersonal,
    solutions: ['Beauty Soaps & Body Washes', 'Shampoos & Conditioners', 'Skin Creams & Lotions', 'Hair Oils & Serums'],
    categoryIds: ['personal-care']
  },
  {
    id: 'home-care',
    name: 'Home Care',
    subtitle: 'Atmospheric freshness and hygienic reassurance',
    description: 'Fragrances formulated for surface cleaners, dishwashing liquids, air fresheners, and disinfectants, featuring bloom technology and malodour counteracting science.',
    image: fragHomecare,
    solutions: ['Floor & Surface Cleaners', 'Dishwashing Liquids', 'Air Care Fresheners', 'Reed Diffusers'],
    categoryIds: ['home-care']
  },
  {
    id: 'fabric-care',
    name: 'Fabric Care',
    subtitle: 'Enduring laundry freshness & fiber substantive aroma',
    description: 'High-substantivity fragrance systems developed for powder and liquid detergents, fabric conditioners, and bars, providing long-lasting fragrance that survives washing and drying.',
    image: fragFabric,
    solutions: ['Liquid & Powder Detergents', 'Fabric Softeners', 'Laundry Bars', 'Ironing Sprays'],
    categoryIds: ['fabric-care']
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics',
    subtitle: 'Refined fragrances for colour & beauty products',
    description: 'Delicate, skin-safe, hypoallergenic fragrance notes created for facial cosmetics, makeup foundations, lip products, and sun care formulations.',
    image: fragPersonal,
    solutions: ['Facial Foundations', 'Lipsticks & Balms', 'Sunscreen Lotions', 'Compact Powders'],
    categoryIds: ['personal-care', 'fine-fragrances']
  },
  {
    id: 'consumer-goods',
    name: 'Consumer Goods',
    subtitle: 'Signature brand identities through scent',
    description: 'Sensory signatures crafted for diverse consumer lifestyle products, stationery, room scenting, paper hygiene, and speciality branded merchandise.',
    image: catConfectionery,
    solutions: ['Paper & Wet Wipes', 'Aromatic Lifestyle Goods', 'Bespoke Brand Scents', 'Speciality Products'],
    categoryIds: ['home-care', 'fine-fragrances']
  }
];
