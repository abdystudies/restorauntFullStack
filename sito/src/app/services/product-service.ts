import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Margherita',
      description: 'Pizza classica con pomodoro, mozzarella e basilico',
      price: 8.99,
      image: 'assets/pizza-margherita.jpg',
      category: 'pizzas',
    },
    {
      id: '2',
      name: 'Quattro Formaggi',
      description: 'Pizza con mozzarella, gorgonzola, parmigiano e ricotta',
      price: 11.99,
      image: 'assets/quattro-formaggi.jpg',
      category: 'pizzas',
    },
    {
      id: '3',
      name: 'Pepperoni',
      description: 'Pizza con pomodoro, mozzarella e pepperoni',
      price: 10.99,
      image: 'assets/pepperoni.jpg',
      category: 'pizzas',
    },
    {
      id: '4',
      name: 'Caeser Salad',
      description: 'Insalata fresca con pollo, parmigiano e croutons',
      price: 7.99,
      image: 'assets/caesar-salad.jpg',
      category: 'salads',
    },
    {
      id: '5',
      name: 'Coca Cola',
      description: 'Bevanda fresca 33cl',
      price: 2.50,
      image: 'assets/coca-cola.jpg',
      category: 'drinks',
    },
  ];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((p) => p.category === category);
  }
}