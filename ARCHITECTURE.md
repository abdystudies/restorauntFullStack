# 🏗️ Architettura Sistema Ordinazione Ristorante

## 📊 Diagramma del Flusso

```
┌─────────────────────────────────────────────────────────┐
│                    APP COMPONENT                        │
│         (app.ts - Navbar + Router Outlet)              │
└─────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼─────┐     ┌────▼─────┐     ┌────▼──────┐
   │  NAVBAR   │     │ ROUTES   │     │  AUTH     │
   │ Component │     │          │     │  SERVICE  │
   │           │     │  /home   │     │           │
   │ - Links   │     │  /order  │     │ - Login   │
   │ - Cart    │     │  /check  │     │ - Logout  │
   │ - User    │     │  /history│     │ - Guard   │
   └──────────┘     └──────────┘     └───────────┘
        │                 │
        └─────────────────┴─────────────────────────────┐
                                                      │
        ┌─────────────────────────────────────────────▼──────┐
        │              ROUTING MODULE                        │
        │                                                    │
        │  ├─ /home → HomeComponent                         │
        │  ├─ /order → OrderComponent                       │
        │  ├─ /checkout → CheckoutComponent                │
        │  └─ /order-history → OrderHistoryComponent       │
        │                                                    │
        └────────────────────────────────────────────────────┘
```

## 🗂️ Struttura File Completa

```
frontend/sito/src/app/
│
├── 🔐 AUTENTICAZIONE
│   ├── auth/
│   │   ├── auth-guard.ts
│   │   ├── login/
│   │   │   ├── login.ts
│   │   │   ├── login.html
│   │   │   └── login.css
│   │   └── register/
│   │       ├── register.ts
│   │       ├── register.html
│   │       └── register.css
│   └── services/
│       └── auth-service.ts
│
├── 🛍️ ORDINAZIONE (NUOVO)
│   ├── order/
│   │   ├── order.component.ts
│   │   ├── order.component.html
│   │   └── order.component.css
│   ├── checkout/
│   │   ├── checkout.component.ts
│   │   ├── checkout.component.html
│   │   └── checkout.component.css
│   └── order-history/
│       ├── order-history.component.ts
│       ├── order-history.component.html
│       └── order-history.component.css
│
├── 📦 SERVIZI (NUOVO)
│   └── services/
│       ├── product.service.ts       (Prodotti)
│       ├── cart.service.ts          (Carrello)
│       ├── order.service.ts         (Ordini)
│       └── auth-service.ts          (Esistente)
│
├── 🧭 NAVIGAZIONE (NUOVO)
│   └── components/navbar/
│       ├── navbar.component.ts
│       ├── navbar.component.html
│       └── navbar.component.css
│
├── 🏠 PAGINE
│   ├── pages/home/
│   │   ├── home.ts                  (Aggiornato)
│   │   ├── home.html                (Aggiornato)
│   │   └── home.css                 (Aggiornato)
│   └── ...
│
├── ⚙️ CONFIGURAZIONE (NUOVO)
│   └── config/
│       └── app.config.ts            (Impostazioni globali)
│
├── 🛣️ ROUTING
│   └── app.routes.ts                (Aggiornato)
│
└── 🎯 COMPONENTE ROOT
    ├── app.ts                       (Aggiornato)
    ├── app.html                     (Aggiornato)
    └── app.css
```

## 🔄 Architettura Dati

### LocalStorage (Client)
```
localStorage['restaurant_cart'] = {
  items: [
    {
      product: { id, name, price, ... },
      quantity: 2
    }
  ],
  totalPrice: 25.50
}
```

### Firebase Realtime Database
```
/orders
  /{orderId}/
    userId: "uid123"
    userEmail: "user@email.com"
    items: [
      { productId, productName, quantity, price }
    ]
    totalPrice: 25.50
    status: "pending" | "confirmed" | "preparing" | "ready" | "delivered"
    deliveryAddress: "Via Roma 123"
    phoneNumber: "+39XXXXXXXXX"
    paymentMethod: "card" | "paypal" | "cash"
    createdAt: 1705610400000
    notes: "Optional delivery notes"
```

## 🎯 Service Layer

### ProductService
```typescript
Observable<Product[]> getProducts()
Product getProductById(id)
Product[] getProductsByCategory(category)
```

### CartService
```typescript
addToCart(product, quantity)
removeFromCart(productId)
updateQuantity(productId, quantity)
clearCart()
Observable<Cart> getCart()
```

### OrderService
```typescript
Observable<string> createOrder(cart, order)
Observable<Order> getOrderById(id)
Observable<Order[]> getUserOrders()
Observable<void> updateOrderStatus(id, status)
```

## 🎨 Component Hierarchy

```
App Component
└── Navbar Component
    ├── Links Navigation
    ├── Cart Badge
    └── User Menu
        ├── Profile
        ├── Orders
        └── Logout

Routes:
├── Home Component
│   ├── Header
│   ├── Action Cards
│   ├── Features Grid
│   └── Menu Preview
│
├── Order Component
│   ├── Category Filter
│   ├── Products Grid
│   │   └── Product Cards
│   └── Cart Summary
│       ├── Cart Items
│       └── Totals
│
├── Checkout Component
│   ├── Header
│   ├── Form Section
│   │   ├── Personal Data
│   │   ├── Delivery Address
│   │   ├── Payment Method
│   │   │   ├── Card (conditional)
│   │   │   ├── PayPal (conditional)
│   │   │   └── Cash (conditional)
│   │   ├── Notes
│   │   └── Submit Button
│   ├── Order Summary
│   │   ├── Items List
│   │   ├── Costs
│   │   └── Total
│   └── Confirmation Page
│
└── Order History Component
    ├── Header
    ├── Orders List
    │   └── Order Cards
    │       ├── Status Badge
    │       ├── Items
    │       ├── Delivery Info
    │       └── Payment Method
    └── Empty State
```

## 🔄 Flusso di Stato (State Management)

### Carrello
```
User Add Product
    ↓
CartService.addToCart()
    ↓
BehaviorSubject aggiornato
    ↓
localStorage aggiornato
    ↓
Components ricevono update tramite Observable
    ↓
UI aggiornata
```

### Ordini
```
User Submit Form
    ↓
CheckoutComponent chiama OrderService.createOrder()
    ↓
OrderService salva su Firebase
    ↓
CartService.clearCart()
    ↓
Redirect a /order-history
    ↓
OrderHistoryComponent carica ordini da Firebase
    ↓
User vede lista ordini aggiornata
```

## 🔐 Security Flow

```
User → Request
    ↓
AuthGuard Check
    ├─ Token Valid?
    │  └─ No → Redirect /login
    └─ Yes → Proceed
         ↓
Component Load
    ↓
Form Validation
    ├─ Client-side validation
    ├─ Angular Validators
    └─ Custom validators
         ↓
Submit
    ↓
Firebase Auth Verify
    ├─ UID check
    ├─ Email verify
    └─ Database Rules check
         ↓
Save to Database
```

## 🎨 Styling Architecture

### Base Colors
```css
--primary: #e74c3c      (Rosso - Azioni)
--secondary: #3498db    (Blu - Form)
--success: #27ae60      (Verde - Successo)
--warning: #f39c12      (Arancio - Warning)
--danger: #e74c3c       (Rosso - Errore)
--light: #ecf0f1        (Grigio chiaro - Background)
--dark: #2c3e50         (Grigio scuro - Testo)
```

### Responsive Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) { /* Grid layout */ }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { /* Modified grid */ }

/* Mobile */
@media (max-width: 767px) { /* Single column */ }

/* Small Mobile */
@media (max-width: 480px) { /* Stacked layout */ }
```

## 📊 Performance Metrics Target

- ✓ Page Load: < 3s
- ✓ First Contentful Paint: < 1.5s
- ✓ Largest Contentful Paint: < 2.5s
- ✓ Cumulative Layout Shift: < 0.1
- ✓ Time to Interactive: < 3.5s

## 🚀 Build Process

```
ng build
    ↓
Compilation TypeScript → JavaScript
    ↓
Bundling modules
    ↓
Code splitting
    ↓
Minification
    ↓
Output: dist/sito/
    ↓
Deploy to Hosting
    (Vercel, Netlify, Firebase Hosting, etc.)
```

## 📱 Responsiveness Strategy

1. **Mobile-First**: Design iniziale per mobile
2. **Progressive Enhancement**: Migliora per schermi più grandi
3. **Flexible Layouts**: CSS Grid + Flexbox
4. **Touch-Friendly**: Buttons minimo 48px x 48px
5. **Adaptive Images**: Responsive image sizing
6. **Viewport Meta**: Configurato per mobile

---

**Creato**: Gennaio 2026
**Versione**: 1.0.0
**Stato**: ✓ Documentazione Completa
