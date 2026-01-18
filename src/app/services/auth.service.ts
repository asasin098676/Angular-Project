import { inject, Injectable, signal, effect } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private login = signal<string | null>(null);
  private password = signal<string | null>(null);
  readonly error = signal<unknown | null>(null);
  private router = inject(Router);

  setData(login: string, password: string): void {
    this.login.set(login);
    this.password.set(password);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken(): void {
    localStorage.removeItem('token');
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
      if (idToken) {
        this.setToken(idToken);
      }
      this.error.set(null);
    } catch (e) {
      this.error.set(e);
    }
  }
  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();

      const cred = await signInWithPopup(this.auth, provider);
      const idToken = await cred.user.getIdToken();

      if (idToken) this.setToken(idToken);

      this.error.set(null);
    } catch (e) {
      this.error.set(e);
    }
  }
  async signInWithApple(): Promise<void> {
    //need check!!!!!!
    try {
      const provider = new OAuthProvider('apple.com');

      const cred = await signInWithPopup(this.auth, provider);
      const idToken = await cred.user.getIdToken();

      if (idToken) this.setToken(idToken);

      this.error.set(null);
    } catch (e) {
      this.error.set(e);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.removeToken();

    this.login.set(null);
    this.password.set(null);
    this.error.set(null);
    this.router.navigate(['/login']);
  }
}
