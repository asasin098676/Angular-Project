export type Todo = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
};

export type TodoState = {
  isAddingTodoModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  todos: Todo[];
  filter: { query: string; order: 'asc' | 'desc' };
};

export const initialState: TodoState = {
  isAddingTodoModalOpen: false,
  isLoading: false,
  error: null,
  todos: [],
  filter: { query: '', order: 'asc' },
};
