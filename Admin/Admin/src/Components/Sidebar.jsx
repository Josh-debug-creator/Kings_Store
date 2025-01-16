import React from "react";
import Navbar from "./Navbar";
import { Link, NavLink } from "react-router-dom";
import './sidebar.css'

const SideBar = () => {
  return (
    <div className="row w-25 p-2 mx-auto">
      <div className="col-4 col-md-10">
        <NavLink
          to="/createcategories"
          className="d-flex border align-items-center text-center border-gray mb-3 shadow text-bg-warning p-3"
        >
          <img
            src="../../public/Images/istockphoto-182436004-612x612.jpg"
            className="w-25"
          />

          <p className="d-none d-md-block m-auto">Create Category</p>
        </NavLink>

        <NavLink
          to="/createproducts"
          className="d-flex border align-items-center text-center border-gray mb-3 shadow text-bg-warning p-3"
        >
          <img
            src="../../public/Images/istockphoto-182436004-612x612.jpg"
            className="w-25"
          />

          <p className="d-none d-md-block m-auto">Create Products</p>
        </NavLink>

        <NavLink
          to="/list"
          className="d-flex border align-items-center text-center border-gray mb-3 shadow text-bg-warning p-3"
        >
          <img
            src="../../public/Images/istockphoto-182436004-612x612.jpg"
            className="w-25"
          />

          <p className="d-none d-md-block m-auto">List</p>
        </NavLink>

        <NavLink
          to="/orders"
          className="d-flex border align-items-center text-center border-gray mb-3 shadow text-bg-warning p-3"
        >
          <img
            src="../../public/Images/istockphoto-182436004-612x612.jpg"
            className="w-25"
          />

          <p className="d-none d-md-block m-auto text-decoration-none text-black">
            Orders
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
