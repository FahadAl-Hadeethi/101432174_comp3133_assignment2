import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/graphql/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = null;

    this.authService.login(this.email, this.password).subscribe({
      next: (result: any) => {
        const token = result.data?.login?.token;

        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        } else {
          this.error = 'Invalid email or password.';
        }
      },
      error: (err: any) => {
        const msg = err?.message?.toLowerCase() || '';

        if (msg.includes('user not found') || msg.includes('invalid')) {
          this.error = 'Invalid email or password.';
        } else {
          this.error = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }
}
