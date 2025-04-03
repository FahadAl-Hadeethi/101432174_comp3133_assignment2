import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/graphql/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.error = null;

    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        const msg = err?.message?.toLowerCase() || '';
        if (msg.includes('already exists')) {
          this.error = 'An account with this email already exists.';
        } else {
          this.error = 'Signup failed. Please try again.';
        }
      }
    });
  }
}
