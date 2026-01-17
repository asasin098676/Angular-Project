import { inject, Injectable, signal, effect } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth;

  constructor() {
    this.auth = inject(Auth);

    effect(() => {
      console.log('[AuthService] login:', this.login());
      console.log('[AuthService] password:', !!this.password());
    });
  }

  private login = signal<string | null>(null);
  private password = signal<string | null>(null);
  readonly error = signal<unknown | null>(null);

  private readonly path = 'users/test-user';

  setData(login: string, password: string): void {
    this.login.set(login);
    this.password.set(password);
  }

  async sentLoginData(): Promise<void> {
    if (!this.login() || !this.password()) {
      console.error('[AuthService] no data');
      return;
    }

    const email = this.login()!;
    const password = this.password()!;

    try {
      const cred = await signInWithEmailAndPassword(this.auth, email, password);
      const idToken = await cred.user.getIdToken();
      console.log(idToken);
      // тут ти або , або збережи в signal
      this.error.set(null);
    } catch (e) {
      this.error.set(e);
    }
  }
}
