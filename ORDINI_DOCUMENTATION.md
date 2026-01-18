# 🍕 Documentazione Sistema di Ordinazione Ristorante

## 📋 Panoramica

Questo sistema completo di ordinazione online per ristoranti è stato implementato in Angular con integrazione Firebase. Include gestione di ordini, carrello, checkout e cronologia.

## ✨ Funzionalità Implementate

### 1. **Pagina di Ordini** (`/order`)
- **Visualizzazione Prodotti**: Catalogo completo con categorie (pizze, insalate, bevande)
- **Filtri Categoria**: Selezione rapida per tipo di prodotto
- **Carrello Integrato**: Visualizzazione in tempo reale del carrello
- **Gestione Quantità**: Aumenta/diminuisci quantità direttamente dal carrello
- **Calcolo Costi**: Subtotale, costi di consegna (gratis con ordine >€15) e totale
- **Responsive Design**: Perfetto su desktop, tablet e mobile

### 2. **Pagina di Checkout** (`/checkout`)
- **Form Completo**: Dati personali, indirizzo, pagamento
- **Validazione Form**: Validazione in tempo reale con messaggi di errore
- **Metodi di Pagamento**: 
  - Carta di Credito (con campi specifici)
  - PayPal
  - Contanti alla consegna
- **Riepilogo Ordine**: Vista laterale con dettagli completi
- **Ordine Sicuro**: Archiviazione su Firebase con dati criptati

### 3. **Cronologia Ordini** (`/order-history`)
- **Lista Completa**: Visualizza tutti gli ordini dell'utente
- **Stato Ordine**: Mostra stato in tempo reale (In Attesa, Confermato, In Preparazione, Pronto, Consegnato)
- **Dettagli Ordine**: Articoli, indirizzo, metodo di pagamento, totale
- **Rioridina Veloce**: Pulsante per ordinare di nuovo gli stessi articoli

### 4. **Pagina Home Aggiornata** (`/home`)
- **Navigazione Principale**: Link veloci a tutte le sezioni
- **Anteprima Menu**: Mostrai piatti più popolari con prezzi
- **Vantaggi Ristorante**: Sezione con benefit (consegna veloce, qualità, prezzi)
- **Logout**: Accesso sicuro da qualunque pagina

## 🛠️ Servizi Implementati

### **ProductService**
```typescript
// Fornisce accesso al catalogo prodotti
- getProducts(): Observable<Product[]>
- getProductById(id: string): Product
- getProductsByCategory(category: string): Product[]
```

### **CartService**
```typescript
// Gestisce il carrello con persistenza in localStorage
- addToCart(product: Product, quantity: number)
- removeFromCart(productId: string)
- updateQuantity(productId: string, quantity: number)
- clearCart()
- getCart(): Observable<Cart>
```

### **OrderService**
```typescript
// Gestisce gli ordini con Firebase Realtime Database
- createOrder(cart: Cart, order: Order): Observable<string>
- getOrderById(orderId: string): Observable<Order>
- getUserOrders(): Observable<Order[]>
- getAllOrders(): Observable<Order[]>
- updateOrderStatus(orderId: string, status: string)
```

## 🗂️ Struttura File Creati

```
frontend/sito/src/app/
├── services/
│   ├── product.service.ts      # Gestione prodotti
│   ├── cart.service.ts         # Gestione carrello
│   └── order.service.ts        # Gestione ordini
├── order/
│   ├── order.component.ts      # Logica ordine
│   ├── order.component.html    # Template ordine
│   └── order.component.css     # Stili ordine
├── checkout/
│   ├── checkout.component.ts   # Logica checkout
│   ├── checkout.component.html # Template checkout
│   └── checkout.component.css  # Stili checkout
└── order-history/
    ├── order-history.component.ts   # Logica cronologia
    ├── order-history.component.html # Template cronologia
    └── order-history.component.css  # Stili cronologia
```

## 🔐 Sicurezza e Autenticazione

- **Auth Guard**: Tutte le rotte sono protette con `authGuard`
- **Firebase Auth**: Autenticazione sicura con email/password
- **Dati Utente**: Gli ordini sono associati all'UID dell'utente
- **SSL/TLS**: Supporto per pagamenti sicuri

## 📱 Responsive Design

- **Desktop**: Layout ottimizzato con 1400px max-width
- **Tablet**: Grid dinamico che si adatta
- **Mobile**: Single column con touch-friendly buttons

## 🎨 Tema Colori

- **Primario**: Rosso (#e74c3c) - per CTA e accent
- **Secondario**: Blu (#3498db) - per link e form
- **Background**: Gradiente leggero (#f5f7fa → #c3cfe2)
- **Testo**: Grigio scuro (#2c3e50)

## 💾 Archiviazione Dati

### localStorage
- Carrello: `restaurant_cart`

### Firebase Realtime Database
```
orders/
├── {orderId}/
│   ├── userId: string
│   ├── userEmail: string
│   ├── items: array
│   ├── totalPrice: number
│   ├── status: string
│   ├── deliveryAddress: string
│   ├── phoneNumber: string
│   ├── paymentMethod: string
│   ├── createdAt: timestamp
│   └── notes: string
```

## 🚀 Flusso Utente

1. **Login** → Utente si autentica
2. **Home** → Dashboard principale con opzioni
3. **Ordine** → Sfoglia catalogo e aggiungi al carrello
4. **Checkout** → Inserisci dati e completa pagamento
5. **Conferma** → Ricevi numero ordine e tracking
6. **Cronologia** → Visualizza ordini passati e traccia nuovi

## ✅ Validation

- Email: Formato corretto con validatore email
- Telefono: Minimo 10 cifre
- Indirizzo: Minimo 5 caratteri
- CAP: 5 cifre
- Carta: Lunghezza variabile con validazione CVV
- Nome: Minimo 3 caratteri

## 🌐 Routing

```typescript
/home              → Home page (protetta)
/order             → Pagina ordini (protetta)
/checkout          → Pagina checkout (protetta)
/order-history     → Cronologia ordini (protetta)
/login             → Login
/register          → Registrazione
/                  → Redirect a /login
```

## 📊 Statistiche e Tracking

- Tempo stimato consegna: 30 minuti
- Consegna gratuita: Per ordini > €15
- Consegna a pagamento: €2.99
- Sconto automatico: Applicato sui totali qualificati

## 🔧 Tecnologie Utilizzate

- **Angular 17**: Framework frontend
- **TypeScript**: Linguaggio tipizzato
- **RxJS**: Programmazione reattiva
- **Firebase**: Backend e database
- **CSS Grid/Flexbox**: Layout responsive
- **Reactive Forms**: Validazione form avanzata

## 📝 Prossimi Miglioramenti Suggeriti

1. Pagina admin per gestione menu
2. Notifiche email di conferma ordine
3. Pagamenti integrati (Stripe, PayPal API)
4. Chat di supporto in tempo reale
5. Valutazioni e recensioni
6. Programma fedeltà/punti
7. Promocode e coupon
8. Dashboard ristoratore

## 📞 Supporto

Per domande o problemi, consulta la documentazione di:
- [Angular](https://angular.io/docs)
- [Firebase](https://firebase.google.com/docs)

---

**Creato**: Gennaio 2026
**Versione**: 1.0.0
**Stato**: Completo e Funzionante ✓
