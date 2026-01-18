# 🍕 GETTING STARTED - Sistema di Ordinazione Ristorante

## 📋 Checklist Iniziale

### ✓ Setup Completato
- [x] Servizi implementati (Products, Cart, Orders)
- [x] Componenti creati (Order, Checkout, OrderHistory)
- [x] Routing configurato
- [x] Navbar integrata
- [x] Firebase Realtime Database configurato
- [x] Autenticazione in place
- [x] Stili responsive implementati

## 🚀 Come Avviare

### 1. **Installa Dipendenze**
```bash
cd frontend/sito
npm install
```

### 2. **Avvia Development Server**
```bash
npm start
# oppure
ng serve
```

### 3. **Apri nel Browser**
```
http://localhost:4200/
```

## 🔐 Flusso di Accesso

1. **Pagina Iniziale**: `/login` (redirect automatico)
2. **Registrazione**: Clicca "Non hai un account?"
3. **Login**: Inserisci email e password
4. **Dashboard**: Accedi a `/home`
5. **Ordini**: Clicca "Vai al Menu" per `/order`

## 🛍️ Flusso di Ordinazione

```
Home (/home)
    ↓
Ordini (/order) - Sfoglia catalogo, aggiungi al carrello
    ↓
Checkout (/checkout) - Inserisci dati e pagamento
    ↓
Conferma - Ricevi numero ordine
    ↓
Cronologia (/order-history) - Traccia ordini
```

## 📊 Dati di Test

### Account Test
```
Email: test@example.com
Password: Test@123456
```

### Prodotti Disponibili
- Margherita: €8.99
- Quattro Formaggi: €11.99
- Caesar Salad: €7.99
- Coca Cola: €2.50

## 🎯 Funzionalità Chiave

### Pagina Home
- Pulsante "Vai al Menu" per ordinare
- Pulsante "Cronologia Ordini" per visualizzare ordini passati
- Logout dalla dashboard

### Pagina Ordini
- Filtra per categoria (pizze, insalate, bevande)
- Aggiungi/rimuovi dal carrello
- Modifica quantità
- Vedi totale in tempo reale
- Costi di consegna calcolati automaticamente (gratis >€15)

### Pagina Checkout
- Form con validazione
- 3 metodi di pagamento (carta, PayPal, contanti)
- Riepilogo ordine in sidebar
- Conferma e salvataggio su Firebase

### Cronologia Ordini
- Lista di tutti gli ordini
- Stato del tracking
- Dettagli completi di ogni ordine
- Pulsante "Ordina di Nuovo"

## 🔧 Configurazione

### Modificare Menu
File: `src/app/config/app.config.ts`

```typescript
export const SAMPLE_PRODUCTS = [
  {
    id: '1',
    name: 'Margherita',
    price: 8.99,
    category: 'pizzas',
    // ...
  }
];
```

### Modificare Costi di Consegna
File: `src/app/config/app.config.ts`

```typescript
shipping: {
  cost: 2.99,           // Costo consegna
  freeThreshold: 15,    // Gratis se > €15
}
```

### Modificare Colori
File: CSS componenti o `styles.css`

```css
--primary-color: #e74c3c;    /* Rosso */
--secondary-color: #3498db;  /* Blu */
```

## 📱 Test su Dispositivi

### Desktop (Chrome/Firefox)
```
- Risoluzione: 1920x1080
- Usa F12 per DevTools
```

### Tablet (iOS/Android)
```
- Usa emulatore Chrome DevTools
- Risoluzione: 768px
```

### Mobile
```
- Usa emulatore Chrome DevTools
- Risoluzione: 375px
```

## 🔍 Debugging

### Verificare Carrello
```typescript
// In console browser:
console.log(localStorage.getItem('restaurant_cart'));
```

### Verificare Ordini su Firebase
1. Vai a Firebase Console
2. Progetto: `prova-14e15`
3. Realtime Database → `orders`

### Verificare Errori
```bash
# Terminal
ng serve --poll 2000  # Con polling per refresh automático
```

## 🐛 Problemi Comuni

### Problema: Carrello non persiste
**Soluzione**: Controlla localStorage del browser
```javascript
localStorage.clear();  // Ripulisci se necessario
```

### Problema: Form checkout non invia
**Soluzione**: Verifica che tutti i campi siano compilati
- Nome (minimo 3 caratteri)
- Email (formato corretto)
- Telefono (minimo 10 cifre)
- CAP (5 cifre)

### Problema: Ordini non salvati su Firebase
**Soluzione**:
1. Verifica che l'utente sia loggato
2. Controlla credenziali Firebase in `environment.ts`
3. Verifica regole di sicurezza Firebase

## 📚 File Importanti

```
src/app/
├── services/
│   ├── product.service.ts    ← Prodotti
│   ├── cart.service.ts       ← Carrello
│   ├── order.service.ts      ← Ordini
│   └── auth-service.ts       ← Autenticazione
├── order/                    ← Pagina ordinazioni
├── checkout/                 ← Pagina checkout
├── order-history/            ← Cronologia ordini
├── components/navbar/        ← Barra navigazione
├── config/app.config.ts      ← Configurazione app
└── app.routes.ts            ← Routing
```

## 🚀 Deployment Suggerito

### Build per Produzione
```bash
ng build --configuration production
```

### Hosting Suggerito
- **Frontend**: Vercel, Netlify o Firebase Hosting
- **Backend**: Cloud Run, Heroku o similar
- **Database**: Firebase Realtime Database (già configurato)

## 📞 Contatti & Support

- **Email**: info@restaurantapp.com
- **Documentazione**: Vedi `ORDINI_DOCUMENTATION.md`
- **Testing**: Vedi `TESTING_GUIDE.md`

## ✅ Checklist Finale

Attività prima di go-live:

- [ ] Test su tutti i browser
- [ ] Test su mobile devices
- [ ] Verifica Firebase security rules
- [ ] Aggiungi veri prodotti nel menu
- [ ] Configura immagini prodotti
- [ ] Integra pagamenti reali
- [ ] Setup email notifications
- [ ] Configura HTTPS
- [ ] Ottimizza performance
- [ ] Backup database Firebase

---

**Ultima Aggiornamento**: Gennaio 2026
**Versione**: 1.0.0
**Status**: ✓ Pronto per Testing

Hai domande? Consulta la documentazione completa in `ORDINI_DOCUMENTATION.md`
