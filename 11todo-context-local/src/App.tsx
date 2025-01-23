import { useEffect, useState } from "react";
import { TodoProvider } from "./context";
import { Todo } from "./types/todoTypes";
import TodoForm from "./components/TodoFrom";
import { TodoItem } from "./components";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const addTodo = (todo: Todo) => {
    setTodoList((prev) => [{ ...todo }, ...prev]);
  };
  const updateTodo = (id: number, UpdatedTodo: Todo) => {
    setTodoList((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? UpdatedTodo : prevTodo))
    );
  };
  const removeTodo = (id: number) => {
    setTodoList((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodoList((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem("todo-list")||"[]");
    if (storedTodo && storedTodo.length > 0) {
      setTodoList(storedTodo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  }, [todoList]);
  return (
    <TodoProvider
      value={{ todoList, addTodo, updateTodo, removeTodo, toggleTodo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todoList.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
