import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService, Order } from '../../services/order-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-history-component.html',
  styleUrl: './order-history-component.css',
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  errorMessage = '';

  statusLabels: { [key: string]: string } = {
    pending: '⏳ In Attesa',
    confirmed: '✓ Confermato',
    preparing: '👨‍🍳 In Preparazione',
    ready: '📦 Pronto',
    delivered: '✓ Consegnato',
  };

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getUserOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Errore nel caricamento degli ordini';
        console.error('Error loading orders:', error);
        this.isLoading = false;
      },
    });
  }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      pending: '#f39c12',
      confirmed: '#3498db',
      preparing: '#9b59b6',
      ready: '#27ae60',
      delivered: '#16a085',
    };
    return colors[status] || '#95a5a6';
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}