export interface Product {
  id: string;
  name: string;
  category: 'men' | 'women';
  price: number;
  frontImage: string;
  backImage: string;
  description: string;
}

export const products: Product[] = [
  // Men
  {
    id: 'm1',
    name: 'Oversized Wool Coat',
    category: 'men',
    price: 1250,
    frontImage: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
    description: 'A structured oversized coat crafted from premium Italian wool.'
  },
  {
    id: 'm2',
    name: 'Silk Blend Trousers',
    category: 'men',
    price: 680,
    frontImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800',
    description: 'Relaxed fit trousers with a subtle sheen, perfect for evening wear.'
  },
  {
    id: 'm3',
    name: 'Cashmere Turtleneck',
    category: 'men',
    price: 890,
    frontImage: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800',
    description: 'Ultra-soft cashmere knit with a ribbed collar and cuffs.'
  },
  {
    id: 'm4',
    name: 'Leather Bomber Jacket',
    category: 'men',
    price: 2100,
    frontImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800',
    description: 'Supple lambskin leather jacket with minimal hardware.'
  },
  {
    id: 'm5',
    name: 'Tailored Linen Blazer',
    category: 'men',
    price: 1150,
    frontImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800',
    description: 'Lightweight linen blazer with a modern, unstructured fit.'
  },
  {
    id: 'm6',
    name: 'Minimalist Sneakers',
    category: 'men',
    price: 450,
    frontImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    description: 'Clean, low-top sneakers in premium calf leather.'
  },

  // Women
  {
    id: 'w1',
    name: 'Draped Silk Gown',
    category: 'women',
    price: 1850,
    frontImage: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
    description: 'Floor-length silk gown with an elegant draped back.'
  },
  {
    id: 'w2',
    name: 'Structured Midi Dress',
    category: 'women',
    price: 980,
    frontImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
    description: 'A sharp, tailored midi dress with architectural shoulders.'
  },
  {
    id: 'w3',
    name: 'Cashmere Wrap Coat',
    category: 'women',
    price: 1600,
    frontImage: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    description: 'Luxurious cashmere blend coat with a self-tie belt.'
  },
  {
    id: 'w4',
    name: 'Pleated Wide-Leg Pants',
    category: 'women',
    price: 720,
    frontImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800',
    description: 'Fluid, wide-leg trousers with sharp front pleats.'
  },
  {
    id: 'w5',
    name: 'Sheer Organza Blouse',
    category: 'women',
    price: 590,
    frontImage: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    description: 'Delicate organza blouse with voluminous sleeves.'
  },
  {
    id: 'w6',
    name: 'Leather Ankle Boots',
    category: 'women',
    price: 850,
    frontImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
    backImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    description: 'Sleek leather boots with a sculptural heel.'
  }
];
