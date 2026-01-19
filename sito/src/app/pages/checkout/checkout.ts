import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService, Cart } from '../../services/cart-service';
import { OrderService, Order } from '../../services/order-service';
import { AuthService } from '../../services/auth-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [], totalPrice: 0 };
  checkoutForm!: FormGroup;
  isProcessing = false;
  orderPlaced = false;
  orderConfirmation: { id: string; totalPrice: number } = { id: '', totalPrice: 0 };
  errorMessage = '';
  paymentMethods = ['card', 'paypal', 'cash'];
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cart) => {
        this.cart = cart;
        if (cart.items.length === 0) {
          this.router.navigate(['/order']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.checkoutForm = this.fb.group({
      // Dati di consegna
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
      deliveryAddress: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],

      // Dati di pagamento
      paymentMethod: ['card', Validators.required],
      cardNumber: ['', Validators.required],
      cardExpiry: ['', Validators.required],
      cardCvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
      cardName: ['', Validators.required],

      // Note aggiuntive
      notes: [''],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  getDeliveryFee(): number {
    return this.cart.totalPrice > 15 ? 0 : 2.99;
  }

  getTotalPrice(): number {
    return this.cart.totalPrice + this.getDeliveryFee();
  }

  isFormValid(): boolean {
    return this.checkoutForm.valid && !this.isProcessing;
  }

  async placeOrder(): Promise<void> {
    if (!this.checkoutForm.valid) {
      this.errorMessage = 'Per favore compila tutti i campi richiesti correttamente';
      return;
    }

    this.isProcessing = true;
    this.errorMessage = '';

    try {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('Utente non autenticato');
      }

      const orderData: Order = {
        userId: currentUser.uid,
        userEmail: currentUser.email || '',
        items: [],
        totalPrice: this.getTotalPrice(),
        status: 'pending',
        deliveryAddress: `${this.checkoutForm.value.deliveryAddress}, ${this.checkoutForm.value.city} ${this.checkoutForm.value.postalCode}`,
        phoneNumber: this.checkoutForm.value.phoneNumber,
        paymentMethod: this.checkoutForm.value.paymentMethod,
        notes: this.checkoutForm.value.notes,
        createdAt: Date.now(),
      };

      const orderId = await this.orderService.createOrder(this.cart, orderData).toPromise();

      if (orderId) {
        this.orderConfirmation = {
          id: orderId,
          totalPrice: this.getTotalPrice(),
        };
        this.orderPlaced = true;
        this.cartService.clearCart();

        // Reindirizza dopo 5 secondi
        setTimeout(() => {
          this.router.navigate(['/order-history']);
        }, 5000);
      }
    } catch (error: any) {
      this.errorMessage = `Errore: ${error.message || 'Non è stato possibile elaborare l\'ordine'}`;
      console.error('Order placement error:', error);
    } finally {
      this.isProcessing = false;
    }
  }

  goBackToOrder(): void {
    this.router.navigate(['/order']);
  }

  getFieldError(fieldName: string): string {
    const field = this.checkoutForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return 'Questo campo è obbligatorio';
    if (field.errors['minlength']) return `Minimo ${field.errors['minlength'].requiredLength} caratteri`;
    if (field.errors['email']) return 'Email non valida';
    if (field.errors['pattern']) return 'Formato non valido';

    return 'Campo non valido';
  }
}