// Configurazione dei prodotti del ristorante
// Modifica questo file per aggiornare il catalogo

export const RESTAURANT_CONFIG = {
  name: 'RestaurantApp',
  description: 'Ordina i tuoi piatti preferiti direttamente da casa',
  phone: '+39 XXX XXX XXXX',
  email: 'info@restaurantapp.com',
  address: 'Via Roma 123, 00100 Roma',
  
  // Tempi di consegna
  deliveryTimes: {
    estimatedMinutes: 30,
    maxMinutes: 45,
  },

  // Costi di consegna
  shipping: {
    cost: 2.99,
    freeThreshold: 15,
  },

  // Categorie di prodotti
  categories: [
    { id: 'pizzas', name: 'Pizze', icon: '🍕' },
    { id: 'salads', name: 'Insalate', icon: '🥗' },
    { id: 'drinks', name: 'Bevande', icon: '🥤' },
  ],

  // Metodi di pagamento
  paymentMethods: [
    { id: 'card', name: 'Carta di Credito', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '🅿️' },
    { id: 'cash', name: 'Contanti', icon: '💵' },
  ],

  // Orari di apertura
  businessHours: {
    monday: { open: '11:00', close: '23:00' },
    tuesday: { open: '11:00', close: '23:00' },
    wednesday: { open: '11:00', close: '23:00' },
    thursday: { open: '11:00', close: '23:00' },
    friday: { open: '11:00', close: '00:00' },
    saturday: { open: '12:00', close: '00:00' },
    sunday: { open: '12:00', close: '23:00' },
  },

  // Sconto automatico (se applicabile)
  discounts: [
    { minAmount: 30, discount: 10 }, // 10% per ordini > €30
    { minAmount: 50, discount: 15 }, // 15% per ordini > €50
  ],
};

// Prodotti di esempio - Modifica secondo il tuo menu
export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Pizza classica con pomodoro, mozzarella e basilico fresco',
    price: 8.99,
    image: 'assets/pizzas/margherita.jpg',
    category: 'pizzas',
    rating: 4.8,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Quattro Formaggi',
    description: 'Pizza con mozzarella, gorgonzola, parmigiano reggiano e ricotta',
    price: 11.99,
    image: 'assets/pizzas/quattro-formaggi.jpg',
    category: 'pizzas',
    rating: 4.9,
    reviews: 95,
  },
  {
    id: '3',
    name: 'Pepperoni',
    description: 'Pizza con pomodoro, mozzarella e pepperoni croccante',
    price: 10.99,
    image: 'assets/pizzas/pepperoni.jpg',
    category: 'pizzas',
    rating: 4.7,
    reviews: 150,
  },
  {
    id: '4',
    name: 'Verdure Grigliate',
    description: 'Pizza con zucchine, melanzane, peperoni e pomodori grigliati',
    price: 9.99,
    image: 'assets/pizzas/verdure.jpg',
    category: 'pizzas',
    rating: 4.6,
    reviews: 80,
  },
  {
    id: '5',
    name: 'Caesar Salad',
    description: 'Insalata fresca con pollo, parmigiano, croutons e salsa Caesar',
    price: 7.99,
    image: 'assets/salads/caesar.jpg',
    category: 'salads',
    rating: 4.5,
    reviews: 60,
  },
  {
    id: '6',
    name: 'Caprese',
    description: 'Insalata con pomodori freschi, mozzarella, basilico e olio EVO',
    price: 6.99,
    image: 'assets/salads/caprese.jpg',
    category: 'salads',
    rating: 4.7,
    reviews: 45,
  },
  {
    id: '7',
    name: 'Coca Cola',
    description: 'Bevanda fresca 33cl',
    price: 2.50,
    image: 'assets/drinks/coca.jpg',
    category: 'drinks',
    rating: 4.3,
    reviews: 200,
  },
  {
    id: '8',
    name: 'Arancia Fanta',
    description: 'Bevanda al gusto di arancia 33cl',
    price: 2.50,
    image: 'assets/drinks/fanta.jpg',
    category: 'drinks',
    rating: 4.2,
    reviews: 100,
  },
];
