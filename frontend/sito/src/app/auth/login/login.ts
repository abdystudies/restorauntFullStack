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
    } catch (err) {
      this.errorMessage = 'Credenziali non valide.';
    }
  }
}