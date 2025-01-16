import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Navbar = ({setToken}) => {
  return (
    <div className="d-flex align-items-center justify-content-between mt-3 mx-3">
      <Link to="/" className="fs-64 fw-bold">
        Kings
      </Link>
      <button
        onClick={() => setToken("")}
        className=" text-white px-3 py-2 rounded-full btn btn-info btn-outline-info"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar

// logout functionality
// axios.defaults.headers.common["Authorization"] = null;
// localStorage.removeItem("token");




