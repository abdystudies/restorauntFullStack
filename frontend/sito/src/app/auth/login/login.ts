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

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.errorMessage = '';

    try {
      await this.auth.login(this.email, this.password);
      this.router.navigate(['/home']);
<<<<<<< HEAD
    } catch (err: any) {
      clearTimeout(this.timeoutId);
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found') {
        this.errorMessage = 'Email non trovata';
      } else if (err.code === 'auth/wrong-password') {
        this.errorMessage = 'Password errata';
      } else if (err.code === 'auth/invalid-email') {
        this.errorMessage = 'Email non valida';
      } else if (err.code === 'auth/configuration-not-found') {
        // User-friendly message when Email/Password auth is not enabled in Firebase
        this.errorMessage = 'Configurazione autenticazione non trovata. Abilita il metodo Email/Password nella console Firebase.';
      } else {
        this.errorMessage = `Errore: ${err.message || 'Errore nel login. Riprova.'}`;
      }
      this.isLoading = false;
=======
    } catch (err) {
      this.errorMessage = 'Credenziali non valide.';
>>>>>>> parent of 6abc72d (miglioramento grafica, aggiunta environment.example.ts)
    }
  }
}