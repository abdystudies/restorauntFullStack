import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, Cart } from '../services/cart.service';
import { AuthService } from '../services/auth-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [], totalPrice: 0 };
  isMenuOpen = false;
  isUserMenuOpen = false;
  userEmail: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        this.cart = cart;
      });

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.userEmail = user?.email || null;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCartItemCount(): number {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeMenus(): void {
    this.isMenuOpen = false;
    this.isUserMenuOpen = false;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.closeMenus();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
      this.closeMenus();
    });
  }
}
