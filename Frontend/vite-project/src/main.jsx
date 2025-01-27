import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./Components/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="Kings_Store/user">
      <CartProvider>
        <App />
      </CartProvider>

      <ToastContainer position="top-right" autoClose={1500} closeOnClick />
    </BrowserRouter>
  </StrictMode>
);





