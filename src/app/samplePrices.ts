import type { Commodity } from './types'

export const samplePrices: Commodity[] = [
  { id: 'red-onion', name: 'Red onion', nameTl: 'Sibuyas pula', category: 'Vegetables', price: 142, low: 120, high: 160 },
  { id: 'tomato', name: 'Tomato', nameTl: 'Kamatis', category: 'Vegetables', price: 96, low: 80, high: 120 },
  { id: 'garlic', name: 'Garlic', nameTl: 'Bawang', category: 'Spices', price: 188, low: 160, high: 210 },
  { id: 'rice', name: 'Well-milled rice', nameTl: 'Bigas', category: 'Rice', price: 50, low: 48, high: 54 },
  { id: 'galunggong', name: 'Galunggong', category: 'Fish', price: 240, low: 210, high: 280 },
  { id: 'pork', name: 'Pork kasim', nameTl: 'Baboy', category: 'Meat', price: 360, low: 330, high: 390 },
]
