import { Component, signal } from '@angular/core';
import { UiInputComponent } from './input/ui-input';

@Component({
  standalone: true,
  selector: 'login-page',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [UiInputComponent],
})
export class LoginPage {
  email = signal('');
  password = signal('');

  submit() {
    console.log('Submit:', this.email(), this.password());
  }
}
