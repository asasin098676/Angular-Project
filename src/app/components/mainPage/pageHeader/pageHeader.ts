import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../services/auth.service';
import { UiStore } from '../../../store/ui.store';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu';

@Component({
  standalone: true,
  selector: 'page-header',
  templateUrl: './pageHeader.html',
  styleUrl: './pageHeader.scss',
  imports: [MatIconModule, CommonModule, MenuComponent],
})
export class PageHeader {
  readonly ui = inject(UiStore);
  private authService = inject(AuthService);

  menuTrigger(event: MouseEvent) {
    event.stopPropagation();
    this.ui.openMenu();
  }

  async logOut(): Promise<void> {
    await this.authService.logout();
  }
}
