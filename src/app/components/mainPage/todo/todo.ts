import { Component, input } from '@angular/core';
import { Todo } from '../../../store/todo.state';

@Component({
  standalone: true,
  selector: 'todo',
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
  imports: [],
})
export class TodoComponent {
  todo = input.required<Todo>();
}
