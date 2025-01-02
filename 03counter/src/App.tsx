import { useState } from "react"; //Hook
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  //Here counter = 0 and setCounter is the fucntion from which we can change and display the value of the counter.
  let count: number = 0;
  const Inc = () => {
    if (counter < 20) {
      setCounter((counter) => counter + 1);
      setCounter((counter) => counter + 1); //this is the the right way for interview
      setCounter((counter) => counter + 1);
      setCounter((counter) => counter + 1);
      // setCounter(counter + 1);
      // setCounter(counter + 1);  //bunch of packets sent to server
      // setCounter(counter + 1);
    }

    console.log(counter);
  };

  const Dec = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
    console.log(counter);
  };
  return (
    <>
      <h3>Counter: {count}</h3>
      <button onClick={Inc}>Increase {counter}</button>
      <br />
      <button onClick={Dec}>Decrease {counter}</button>
      <p>Footer {counter}</p>
    </>
  );
}

export default App;
