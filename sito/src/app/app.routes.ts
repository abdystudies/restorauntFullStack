import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './pages/home/home';
import { OrderHistoryComponent } from './pages/order-history-component/order-history-component';

export const routes: Routes = [
    //sintassi di authGuard
    { path: 'home', component: Home,
    canActivate: [authGuard] },

    { path: 'order-history', component: OrderHistoryComponent, canActivate: [authGuard] },
    { path: 'order'}

    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];