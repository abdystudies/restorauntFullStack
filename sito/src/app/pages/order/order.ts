import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CartService, Cart } from '../../services/cart-service';
import { ProductService, Product } from '../../services/product-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class OrderComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  cart: Cart = { items: [], totalPrice: 0 };
  selectedCategory = 'pizzas';
  categories = ['pizzas', 'salads', 'drinks'];
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
      });

    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductsByCategory(): Product[] {
    return this.products.filter((p) => p.category === this.selectedCategory);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product, 1);
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  proceedToCheckout(): void {
    if (this.cart.items.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }

  getItemCount(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}