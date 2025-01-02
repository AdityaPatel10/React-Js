import "./App.css";
import Card from "./components/Card";
import { userData } from "../constants/userData";

function App() {
  return (
    <>
      <h1 className="bg-pink-600 font-serif p-3 rounded-xl mb-4">
        Hello Soumya
      </h1>
      {userData.map((user, index) => (
        <Card key={index} userOBJ={user} />
      ))}
    </>
  );
}

export default App;
