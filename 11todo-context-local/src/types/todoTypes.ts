export interface Todo {
  id: number;
  tittle: string;
  completed: boolean;
}

export interface TodoContextType {
  todoList: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, todo: Todo) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}
