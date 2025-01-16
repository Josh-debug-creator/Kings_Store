import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 text-center">
            <h4>About Us</h4>
            <p className="text-center">
             Kings Store is a leading online store that provides all forms of sales, repair, swap and advisory services for gadgets to suit your budget and technology needs. It provides quality and cost-friendly products across Nigeria an all over the world. With a dedicated and motivated team, we are devoted to helping you solve your gadget problems with ease.
            </p>
          </div>
          <div className="col-lg-4 col-md-6 text-center">
            <h4>Quick Links</h4>
            <ul className="list-unstyled">
              <li>
                <NavLink to="/" className="text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="text-white">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/product" className="text-white">
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink href="/services" className="text-white">
                  Services
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 text-center">
            <h4>Contact Us</h4>
            <ul className="list-unstyled">
              <li>123 Main Street</li>
              <li>Enugu, Enugu State, 12345</li>
              <li>Email: kingsstore@gmail.com</li>
              <li>Phone: +234-456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
