import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAppInitializer, inject } from '@angular/core';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { App } from './app/app';
import { routes } from './app/app.routes';

import { ThemeConfigService } from './app/services/theme-config.service';
import { environment } from './environment/environment';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),

    provideAppInitializer(() => {
      const theme = inject(ThemeConfigService);
      return theme.init();
    }),
  ],
}).catch(console.error);
