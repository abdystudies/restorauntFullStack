import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  private timeoutId: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.errorMessage = '';
    
    // Validazione
    if (!this.email || !this.password) {
      this.errorMessage = 'Compila tutti i campi';
      return;
    }

    this.isLoading = true;

    // Timeout di 10 secondi
    this.timeoutId = setTimeout(() => {
      this.isLoading = false;
      this.errorMessage = 'Timeout: la richiesta ha impiegato troppo tempo. Verifica la configurazione Firebase.';
    }, 10000);

    try {
      await this.auth.login(this.email, this.password);
      clearTimeout(this.timeoutId);
      this.router.navigate(['/home']);
    } catch (err: any) {
      clearTimeout(this.timeoutId);
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        this.errorMessage = 'Email non trovata';
      } else if (err.code === 'auth/wrong-password') {
        this.errorMessage = 'Password errata';
      } else if (err.code === 'auth/invalid-email') {
        this.errorMessage = 'Email non valida';
      } else {
        this.errorMessage = `Errore: ${err.message || 'Errore nel login. Riprova.'}`;
      }
      this.isLoading = false;
    }
  }
}