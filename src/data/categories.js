// SKFF (INDIA) PVT. LTD. - Official Category Data
// All 11 Product Category Groups across Flavours (7) and Fragrances (4)

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
import fragFine from '../assets/frag-fine.jpg';

export const CATEGORIES = [
  // --- 7 FLAVOUR CATEGORIES ---
  {
    id: 'confectionery',
    slug: 'confectionery',
    name: 'Confectionery',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Premium flavour solutions for chocolates, candies, chewing gums, jellies, and toffees.',
    description: 'We develop premium flavour solutions for chocolates, candies, chewing gums, jellies, and confectionery products. Our expertise enables brands to deliver rich taste profiles, high temperature stability, and memorable consumer experiences.',
    image: catConfectionery,
    bannerImage: catConfectionery,
    applications: ['Hard Boiled Candies', 'Chocolates & Fillings', 'Chewing Gums & Bubble Gums', 'Jellies & Gummies', 'Toffees & Caramels'],
    features: ['High thermal stability for boiling and moulding', 'Authentic fruit and confectionery notes', 'Balanced sweetness perception', 'Consistent release kinetics'],
    productCount: 10
  },
  {
    id: 'dairy',
    slug: 'dairy',
    name: 'Dairy',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Authentic flavours tailored for milk, yoghurts, ice creams, cheeses, and dairy desserts.',
    description: 'Our dairy flavour portfolio is designed for milk, yoghurt, ice cream, cheese, desserts, and other dairy-based products. We create authentic and well-balanced flavour profiles that enhance mouthfeel, richness, and consumer satisfaction.',
    image: catDairy,
    bannerImage: catDairy,
    applications: ['Flavoured Milk & Milkshakes', 'Ice Creams & Frozen Desserts', 'Yoghurts & Curds', 'Cheeses & Spreads', 'Condensed & Malted Milk'],
    features: ['Enhances creamy mouthfeel and creaminess perception', 'Resistant to pasteurization and UHT processing', 'Natural-identical profiles', 'Acid-stable formulations for cultured dairy'],
    productCount: 10
  },
  {
    id: 'bakery',
    slug: 'bakery',
    name: 'Bakery',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Heat-stable flavour systems crafted for cakes, biscuits, cookies, breads, and pastries.',
    description: 'We provide innovative flavour solutions for cakes, breads, pastries, cookies, biscuits, and baked goods. Each formulation is carefully developed to withstand oven baking temperatures while delivering exceptional taste and long-lasting aroma.',
    image: catBakery,
    bannerImage: catBakery,
    applications: ['Cakes & Muffins', 'Biscuits & Cookies', 'Breads & Buns', 'Pastries & Fillings', 'Wafers & Crusts'],
    features: ['Exceptional bake-stable retention up to 220°C', 'Rich aromatic headspace', 'Synergistic with butter and shortening', 'Even crumb dispersion'],
    productCount: 10
  },
  {
    id: 'culinary-savory',
    slug: 'culinary-savory',
    name: 'Culinary & Savory',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Authentic taste profiles for sauces, seasonings, soups, marinades, and ready-to-eat snacks.',
    description: 'Our culinary and savory flavours are tailored for sauces, soups, seasonings, snacks, ready-to-cook, and ready-to-eat products. We combine technical expertise with culinary insights to create authentic and globally inspired taste experiences.',
    image: catCulinary,
    bannerImage: catCulinary,
    applications: ['Snack Seasonings & Extruded Foods', 'Sauces, Ketchups & Dips', 'Instant Noodles & Soups', 'Marinades & Spice Blends', 'Processed Meats & Plant-based Alternatives'],
    features: ['Rich umami and kokumi depth', 'High heat and oil stability', 'Authentic roasted and cooked aroma', 'Sodium reduction compatible'],
    productCount: 10
  },
  {
    id: 'beverages',
    slug: 'beverages',
    name: 'Beverages',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Refreshing flavours for carbonated drinks, fruit juices, functional beverages, and ready-to-drink teas.',
    description: 'We offer customized flavour solutions for carbonated soft drinks, fruit drinks, functional beverages, energy drinks, and health beverages. Our formulations are designed to deliver refreshing taste, crystal clarity, and lasting consumer appeal.',
    image: catBeverages,
    bannerImage: catBeverages,
    applications: ['Carbonated Soft Drinks (CSD)', 'Fruit Juices & Nectars', 'Functional & Energy Drinks', 'Flavoured Water & Cold Brews', 'Syrups & Cordials'],
    features: ['100% water solubility and crystal clear dispersion', 'Flash pasteurization and tunnel stable', 'Authentic fresh fruit top notes', 'Sugar-reduction masking capabilities'],
    productCount: 10
  },
  {
    id: 'pharmaceuticals',
    slug: 'pharmaceuticals',
    name: 'Pharmaceuticals',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Sensory and taste masking solutions for syrups, suspensions, chewable tablets, and oral care.',
    description: 'Our pharmaceutical flavour solutions improve the sensory experience of syrups, oral suspensions, chewable tablets, nutraceuticals, and healthcare formulations. We develop flavours that enhance palatability and mask active bitter ingredients.',
    image: catPharma,
    bannerImage: catPharma,
    applications: ['Cough & Cold Syrups', 'Chewable & Effervescent Tablets', 'Oral Suspensions & Drops', 'Nutraceutical Gummies', 'Throat Lozenges & Sprays'],
    features: ['Specialized API bitterness masking', 'Non-reactive with standard excipients', 'Pleasant lingering mouthfeel', 'Compliant with pharmaceutical excipient standards'],
    productCount: 10
  },
  {
    id: 'instant-health-drinks',
    slug: 'instant-health-drinks',
    name: 'Instant & Health Drinks',
    type: 'flavour',
    eyebrow: 'Taste Solutions',
    shortDesc: 'Balanced flavour systems for protein powders, malt beverages, meal replacements, and wellness drinks.',
    description: 'We create specialized flavour solutions for instant beverages, malt-based drinks, protein supplements, wellness formulations, and nutritional products. Our focus is on delivering balanced taste profiles that complement functional ingredients.',
    image: catHealth,
    bannerImage: catHealth,
    applications: ['Whey & Plant Protein Powders', 'Malted Food Drinks', 'Electrolyte & Hydration Mixes', 'Meal Replacement Shakes', 'Immunity & Herbal Tonics'],
    features: ['Excellent masking of grassy plant proteins and vitamins', 'Instant cold-water dispersion', 'Smooth rich mouthfeel enhancers', 'Long shelf-life stability in dry powder blends'],
    productCount: 10
  },

  // --- 4 FRAGRANCE CATEGORIES ---
  {
    id: 'home-care',
    slug: 'home-care',
    name: 'Home Care',
    type: 'fragrance',
    eyebrow: 'Scent Solutions',
    shortDesc: 'Long-lasting fragrances for household cleaners, dishwashing liquids, air care, and surface hygiene.',
    description: 'Our Home Care fragrances are thoughtfully developed to enhance household cleaning products with long-lasting freshness and superior olfactory performance. Designed for surface cleaners, dishwashing liquids, detergents, and air care products.',
    image: fragHomecare,
    bannerImage: fragHomecare,
    applications: ['Floor & Surface Cleaners', 'Dishwashing Liquids & Pastes', 'Room Fresheners & Reed Diffusers', 'Disinfectant Sprays', 'Glass Cleaners'],
    features: ['Outstanding blooming effect upon dilution', 'Bleach and aggressive surfactant stability', 'Malodour counteracting (MOC) technology', 'Enduring clean atmosphere retention'],
    productCount: 10
  },
  {
    id: 'personal-care',
    slug: 'personal-care',
    name: 'Personal Care',
    type: 'fragrance',
    eyebrow: 'Scent Solutions',
    shortDesc: 'Sophisticated fragrance creations for soaps, body washes, shampoos, skincare creams, and lotions.',
    description: 'We create sophisticated fragrance solutions for personal care products including soaps, shampoos, body washes, lotions, creams, and deodorants. Combining creativity with technical expertise, our scents deliver exceptional sensory touchpoints.',
    image: fragPersonal,
    bannerImage: fragPersonal,
    applications: ['Beauty Soaps & Hand Washes', 'Body Washes & Shower Gels', 'Shampoos & Hair Conditioners', 'Skin Creams & Body Lotions', 'Deodorants & Antiperspirants'],
    features: ['Skin-safe IFRA compliant compounding', 'Lather bloom and long rinse-off skin substantivity', 'Emulsion stability across diverse pH levels', 'Hypoallergenic and delicate profiles available'],
    productCount: 10
  },
  {
    id: 'fabric-care',
    slug: 'fabric-care',
    name: 'Fabric Care',
    type: 'fragrance',
    eyebrow: 'Scent Solutions',
    shortDesc: 'Enduring freshness fragrances formulated for laundry detergents, fabric softeners, and conditioning bars.',
    description: 'Our Fabric Care fragrances are specially formulated to provide enduring freshness and comfort across detergents, fabric conditioners, and laundry care products. Each fragrance maintains its character throughout the washing and drying cycle.',
    image: fragFabric,
    bannerImage: fragFabric,
    applications: ['Liquid & Powder Laundry Detergents', 'Fabric Softeners & Conditioners', 'Detergent Bars & Cakes', 'Ironing Sprays & Fabric Refreshers', 'Stain Removers'],
    features: ['High substantive deposition on wet and dry laundry fibres', 'Subtle micro-encapsulation compatibility', 'Surfactant and optical brightener compatibility', 'Crisp fresh linen and floral trail'],
    productCount: 10
  },
  {
    id: 'fine-fragrances',
    slug: 'fine-fragrances',
    name: 'Fine Fragrances',
    type: 'fragrance',
    eyebrow: 'Scent Solutions',
    shortDesc: 'Artisanal perfume compounds crafted with the olfactory legacy of Grasse for luxury eau de parfums and attars.',
    description: 'Our Fine Fragrance creations blend innovation, artistry, and premium ingredients to develop distinctive perfumes, body mists, attars, and luxury fragrance applications. Inspired by global trends and centuries-old European and Indian traditions.',
    image: fragFine,
    bannerImage: fragFine,
    applications: ['Eau de Parfum & Eau de Toilette', 'Luxury Body Mists & Deodorant Sprays', 'Oriental Attars & Concentrated Oils', 'Boutique Candle Scents', 'Niche Artisanal Perfumery'],
    features: ['Complex three-tier olfactory pyramid (Top, Heart, Base)', 'Maceration and alcohol solubility stability', 'High sillage and memorable lingering projection', 'Sourced with sustainable natural and synthetic aroma molecules'],
    productCount: 12
  }
];

export const FLAVOUR_CATEGORIES = CATEGORIES.filter(c => c.type === 'flavour').map(c => ({ ...c, division: 'Flavours' }));
export const FRAGRANCE_CATEGORIES = CATEGORIES.filter(c => c.type === 'fragrance').map(c => ({ ...c, division: 'Fragrances' }));
export const categories = CATEGORIES.map(c => ({
  ...c,
  division: c.type === 'flavour' ? 'Flavours' : 'Fragrances'
}));
export default CATEGORIES;
