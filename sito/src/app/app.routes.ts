import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './pages/home/home';
import { OrderComponent } from './pages/order/order';
import { CheckoutComponent } from './pages/checkout/checkout';
import { OrderHistoryComponent } from './pages/order-history-component/order-history-component';

export const routes: Routes = [
    { path: 'home', component: Home, canActivate: [authGuard] },
    { path: 'order', component: OrderComponent, canActivate: [authGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
    { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },

    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];