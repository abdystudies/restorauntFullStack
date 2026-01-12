import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  email: string | null = null;

  constructor(private auth: AuthService) {
    this.auth.currentUser$.subscribe(user => {
      this.email = user ? user.email : null;
    });
  }
}