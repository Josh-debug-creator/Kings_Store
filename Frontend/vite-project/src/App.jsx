import Home from "./Components/Home";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TeamPages from "./Pages/Team";
import ProductPages from "./Pages/Product";
import ServicesPages from "./Pages/Services";
import LoginPage from "./Pages/Login";
import Order from './Components/Order'
import SignUpPage from "./Pages/SignUp";
import PaystackPayment from "./Components/Payment";

function App() {
  return (
    <div id="root">
      <div className="main-content d-flex justify-content-between flex-column">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamPages />} />
          <Route path="/product" element={<ProductPages />} />
          <Route path="/services" element={<ServicesPages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<PaystackPayment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
