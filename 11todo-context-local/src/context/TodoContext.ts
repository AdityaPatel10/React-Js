import { createContext, useContext } from "react";
import { TodoContextType } from "../types/todoTypes";
export const TodoContext = createContext<TodoContextType>({
  todoList: [
    {
      id: 1,
      tittle: "Todo msg",
      completed: false,
    },
  ],
  addTodo: (newTodo) => {},
  updateTodo: (id, newTodo) => {},
  removeTodo: (id) => {},
  toggleTodo: (id) => {},
});
export const useTodo = (): TodoContextType => {
  return useContext(TodoContext);
};
export const TodoProvider = TodoContext.Provider;
