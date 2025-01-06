import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { About, Contact, Github, Home, Instagram, User } from "./components";
import Layout from "./Layout";
import { githubInfoLoader } from "./components/Github/Github";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="user/:userid" element={<User />} />
      <Route 
      loader={githubInfoLoader}
      path="github" element={<Github />} />
      <Route path="instagram" element={<Instagram />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
