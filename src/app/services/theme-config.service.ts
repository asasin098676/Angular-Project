import { Injectable, inject, signal } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

@Injectable({ providedIn: 'root' })
export class ThemeConfigService {
  private firestore = inject(Firestore);

  readonly colors = signal<ThemeColors | null>(null);
  readonly loaded = signal(false);
  readonly error = signal<unknown | null>(null);

  private readonly path = 'app_config/theme';

  async init(): Promise<void> {
    if (this.loaded()) return;

    try {
      const ref = doc(this.firestore, this.path);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        throw new Error('Theme config not found');
      }

      const data = snap.data() as ThemeColors;

      console.log(data);

      this.colors.set(data);
      this.applyCssVariables(data);
      this.loaded.set(true);
    } catch (err) {
      this.error.set(err);
      console.error('[ThemeConfigService] init failed', err);
      this.loaded.set(true);
    }
  }

  private applyCssVariables(colors: ThemeColors) {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }
}
