import { Injectable } from '@angular/core';
import { Database, ref, push, set, get, query, orderByChild, equalTo } from '@angular/fire/database';
import { Observable, from, map } from 'rxjs';
import { Cart } from './cart-service';
import { AuthService } from './auth-service';

export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  items: any[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
  deliveryAddress: string;
  phoneNumber: string;
  paymentMethod: string;
  createdAt: number;
  estimatedDelivery?: number;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private db: Database, private authService: AuthService) {}

  createOrder(cart: Cart, order: Order): Observable<string> {
    return from(
      new Promise<string>((resolve, reject) => {
        const currentUser = this.authService.getCurrentUser();
        
        if (!currentUser) {
          reject('User not authenticated');
          return;
        }

        const orderData: Order = {
          ...order,
          userId: currentUser.uid,
          userEmail: currentUser.email || '',
          items: cart.items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            subtotal: item.product.price * item.quantity,
          })),
          totalPrice: cart.totalPrice,
          status: 'pending',
          createdAt: Date.now(),
          estimatedDelivery: Date.now() + 30 * 60 * 1000, // 30 minuti
        };

        const ordersRef = ref(this.db, 'orders');
        const newOrderRef = push(ordersRef);
        
        set(newOrderRef, orderData)
          .then(() => {
            resolve(newOrderRef.key || '');
          })
          .catch((error) => {
            reject(error);
          });
      })
    );
  }

  getOrderById(orderId: string): Observable<Order | null> {
    return from(
      new Promise<Order | null>((resolve, reject) => {
        const orderRef = ref(this.db, `orders/${orderId}`);
        get(orderRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              resolve({
                id: orderId,
                ...snapshot.val(),
              });
            } else {
              resolve(null);
            }
          })
          .catch((error) => {
            reject(error);
          });
      })
    );
  }

  getUserOrders(): Observable<Order[]> {
    return from(
      new Promise<Order[]>((resolve, reject) => {
        const currentUser = this.authService.getCurrentUser();
        
        if (!currentUser) {
          reject('User not authenticated');
          return;
        }

        const ordersRef = ref(this.db, 'orders');
        const userOrdersQuery = query(
          ordersRef,
          orderByChild('userId'),
          equalTo(currentUser.uid)
        );

        get(userOrdersQuery)
          .then((snapshot) => {
            const orders: Order[] = [];
            snapshot.forEach((childSnapshot) => {
              orders.push({
                id: childSnapshot.key || '',
                ...childSnapshot.val(),
              });
            });
            // Ordina per data decrescente
            orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            resolve(orders);
          })
          .catch((error) => {
            reject(error);
          });
      })
    );
  }

  updateOrderStatus(
    orderId: string,
    status: Order['status']
  ): Observable<void> {
    return from(
      set(ref(this.db, `orders/${orderId}/status`), status)
    );
  }

  getAllOrders(): Observable<Order[]> {
    return from(
      new Promise<Order[]>((resolve, reject) => {
        const ordersRef = ref(this.db, 'orders');
        get(ordersRef)
          .then((snapshot) => {
            const orders: Order[] = [];
            snapshot.forEach((childSnapshot) => {
              orders.push({
                id: childSnapshot.key || '',
                ...childSnapshot.val(),
              });
            });
            resolve(orders);
          })
          .catch((error) => {
            reject(error);
          });
      })
    );
  }
}