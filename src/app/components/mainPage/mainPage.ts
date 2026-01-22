import { Component, inject, OnInit } from '@angular/core';
import { PageHeader } from './pageHeader/pageHeader';
import { TodoStore } from '../../store/todos.store';
import { AddTodoModal } from './createTodo/createTodoModal';
import { TodoComponent } from './todo/todo';

@Component({
  standalone: true,
  selector: 'main-page',
  templateUrl: './mainPage.html',
  styleUrl: './mainPage.scss',
  imports: [PageHeader, AddTodoModal, TodoComponent],
})
export class MainPage implements OnInit {
  readonly todoStore = inject(TodoStore);

  readonly isAddTodoModalOpen = this.todoStore.isAddingTodoModalOpen;

  ngOnInit() {
    this.todoStore.loadTodos();
  }
}
