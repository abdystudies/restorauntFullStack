import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;
  private timeoutId: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    this.errorMessage = '';
    
    // Validazione
    if (!this.email || !this.password) {
      this.errorMessage = 'Compila tutti i campi';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La password deve avere almeno 6 caratteri';
      return;
    }

    this.isLoading = true;

    // Timeout di 10 secondi
    this.timeoutId = setTimeout(() => {
      this.isLoading = false;
      this.errorMessage = 'Timeout: la richiesta ha impiegato troppo tempo. Verifica la configurazione Firebase.';
    }, 10000);

    try {
      await this.auth.register(this.email, this.password);
      clearTimeout(this.timeoutId);
      this.router.navigate(['/login']);
    } catch (err: any) {
      clearTimeout(this.timeoutId);
      console.error('Register error:', err);
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Email già registrata';
      } else if (err.code === 'auth/invalid-email') {
        this.errorMessage = 'Email non valida';
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage = 'Password troppo debole';
      } else {
        this.errorMessage = `Errore: ${err.message || 'Errore nella registrazione. Riprova.'}`;
      }
      this.isLoading = false;
    }
  }
}