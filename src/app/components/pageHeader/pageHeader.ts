import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { UiStore } from '../../store/ui.store';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'page-header',
  templateUrl: './pageHeader.html',
  styleUrl: './pageHeader.scss',
  imports: [MatIconModule, CommonModule],
})
export class PageHeader {
  readonly ui = inject(UiStore);
  private authService = inject(AuthService);

  menuTrigger() {
    this.ui.toggleMenu();
  }

  async logOut(): Promise<void> {
    console.log('1');

    await this.authService.logout();
  }
}
