import { Component, inject, signal } from '@angular/core';
import { UiInputComponent } from './input/ui-input';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [UiInputComponent],
})
export class LoginPage {
  login = signal('');
  password = signal('');
  private authService = inject(AuthService);
  private router = inject(Router);

  async submit() {
    console.log(this.login(), this.password());

    if (!this.login().trim() || !this.password()) return;

    this.authService.setData(this.login(), this.password());

    await this.authService.sentLoginData();

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }
}
