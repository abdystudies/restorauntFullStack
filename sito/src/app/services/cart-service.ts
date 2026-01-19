import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product-service';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'restaurant_cart';
  private cartSubject = new BehaviorSubject<Cart>(this.loadCart());

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  private loadCart(): Cart {
    const saved = localStorage.getItem(this.cartKey);
    return saved ? JSON.parse(saved) : { items: [], totalPrice: 0 };
  }

  private saveCart(cart: Cart): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: Product, quantity: number = 1): void {
    const cart = this.cartSubject.value;
    const existingItem = cart.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product, quantity });
    }

    this.calculateTotal(cart);
    this.saveCart(cart);
  }

  removeFromCart(productId: string): void {
    const cart = this.cartSubject.value;
    cart.items = cart.items.filter((item) => item.product.id !== productId);
    this.calculateTotal(cart);
    this.saveCart(cart);
  }

  updateQuantity(productId: string, quantity: number): void {
    const cart = this.cartSubject.value;
    const item = cart.items.find((item) => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.calculateTotal(cart);
        this.saveCart(cart);
      }
    }
  }

  getCart(): Observable<Cart> {
    return this.cart$;
  }

  getCurrentCart(): Cart {
    return this.cartSubject.value;
  }

  clearCart(): void {
    const emptyCart: Cart = { items: [], totalPrice: 0 };
    this.saveCart(emptyCart);
  }

  private calculateTotal(cart: Cart): void {
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }
}