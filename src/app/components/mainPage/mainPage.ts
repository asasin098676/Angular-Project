import { Component, inject, signal } from '@angular/core';
import { PageHeader } from '../pageHeader/pageHeader';

@Component({
  standalone: true,
  selector: 'main-page',
  templateUrl: './mainPage.html',
  styleUrl: './mainPage.scss',
  imports: [PageHeader],
})
export class MainPage {}
