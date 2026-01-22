import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TodoStore } from '../../../store/todos.store';
import { UiStore } from '../../../store/ui.store';

@Component({
  standalone: true,
  selector: 'add-todo-modal',
  templateUrl: './createTodoModal.html',
  styleUrl: './createTodoModal.scss',
  imports: [MatIconModule, CommonModule],
})
export class AddTodoModal {
  nameTodo = signal<string>('');
  descriptionTodo = signal<string>('');
  readonly ui = inject(UiStore);
  readonly uiAddTodo = inject(TodoStore);

  cancelCreateTodo() {
    this.uiAddTodo.toggleTodoCreate();
  }

  async createTodo() {
    await this.uiAddTodo.addTodo(this.nameTodo(), this.descriptionTodo());
    this.nameTodo.set('');
    this.descriptionTodo.set('');
  }
}
