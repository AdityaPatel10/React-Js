import "./App.css";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <h1 className="bg-green-900">Hello World</h1>
      <AddTodo/>
      <Todo/>
    </>
  );
}

export default App;
