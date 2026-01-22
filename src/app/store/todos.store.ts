import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { TodosApi } from '../services/todosApi.service';
import { initialState } from './todo.state';
import { Subscription } from 'rxjs';

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const api = inject(TodosApi);
    let sub: Subscription | null = null;

    return {
      loadTodos() {
        patchState(store, { isLoading: true, error: null });

        if (sub) {
          sub.unsubscribe();
        }

        sub = api.getTodos$().subscribe({
          next: (todos) => {
            patchState(store, {
              todos,
              isLoading: false,
            });
          },
          error: (e: any) => {
            patchState(store, {
              isLoading: false,
              error: e?.message ?? String(e),
            });
          },
        });
      },

      unloadTodos() {
        sub?.unsubscribe();
        sub = null;
      },

      async addTodo(nameTodo: string, descriptionTodo: string) {
        patchState(store, { isLoading: true, error: null });

        try {
          await api.addTodo({ name: nameTodo, description: descriptionTodo });

          patchState(store, {
            isLoading: false,
            isAddingTodoModalOpen: false,
          });
        } catch (e: any) {
          patchState(store, {
            isLoading: false,
            error: e?.message ?? String(e),
          });
        }
      },

      toggleTodoCreate() {
        patchState(store, {
          isAddingTodoModalOpen: !store.isAddingTodoModalOpen(),
        });
      },
    };
  }),
);
