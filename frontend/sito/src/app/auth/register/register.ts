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

  constructor(private auth: AuthService, private router: Router) {}

  async register() {
    this.errorMessage = '';
    try {
      await this.auth.register(this.email, this.password);
      this.router.navigate(['/login']);
    } catch (err: any) {
<<<<<<< HEAD
      clearTimeout(this.timeoutId);
      console.error('Register error:', err);
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage = 'Email già registrata';
      } else if (err.code === 'auth/invalid-email') {
        this.errorMessage = 'Email non valida';
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage = 'Password troppo debole';
      } else if (err.code === 'auth/configuration-not-found') {
        // User-friendly message when Email/Password auth is not enabled in Firebase
        this.errorMessage = 'Configurazione autenticazione non trovata. Abilita il metodo Email/Password nella console Firebase.';
      } else {
        this.errorMessage = `Errore: ${err.message || 'Errore nella registrazione. Riprova.'}`;
      }
      this.isLoading = false;
=======
      this.errorMessage = 'Errore nella registrazione';
>>>>>>> parent of 6abc72d (miglioramento grafica, aggiunta environment.example.ts)
    }
  }
}