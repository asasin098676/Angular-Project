import { Component, inject, signal } from '@angular/core';
import { UiInputComponent } from './input/ui-input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [UiInputComponent, MatIcon],
})
export class LoginPage {
  login = signal('');
  password = signal('');
  private authService = inject(AuthService);
  private router = inject(Router);

  async signInWithApple() {
    await this.authService.signInWithApple();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }
  async signInWithGoogle() {
    await this.authService.signInWithGoogle();
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  async submit() {
    if (!this.login().trim() || !this.password()) return;

    this.authService.setData(this.login(), this.password());

    await this.authService.sentLoginData();

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }
}
