import { Component, inject, ElementRef, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TodoStore } from '../../../../store/todos.store';
import { UiStore } from '../../../../store/ui.store';

@Component({
  standalone: true,
  selector: 'menu',
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  imports: [MatIconModule, CommonModule],
})
export class MenuComponent {
  private readonly elRef = inject(ElementRef<HTMLElement>);
  readonly ui = inject(UiStore);
  readonly uiAddTodo = inject(TodoStore);

  addTodoTrigger() {
    this.ui.toggleMenu();
    this.uiAddTodo.toggleTodoCreate();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;

    if (!this.elRef.nativeElement.contains(target)) {
      this.ui.closeMenu();
    }
  }
}
