import { Routes } from '@angular/router';
import { LoginPage } from './components/loginPage/login';
import { MainPage } from './components/mainPage/mainPage';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    component: MainPage,
    canActivate: [authGuard],
  },
];
