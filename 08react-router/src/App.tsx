import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Home } from "./components";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Route/>}>
        <Route path="" element={<Home/>}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
