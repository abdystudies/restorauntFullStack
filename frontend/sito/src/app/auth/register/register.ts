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
      this.errorMessage = 'Errore nella registrazione';
    }
  }
}