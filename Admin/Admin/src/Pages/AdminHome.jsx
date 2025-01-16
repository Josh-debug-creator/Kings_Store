// import React, { useState } from 'react'
// import AdminLogin from './AdminLogin'
// // import AdminNavBar from './AdminNavBar'
// import SideBar from '../Components/Navbar'
// import AdminLogin from './AdminLogin'

// const AdminHome = () => {
//     const [token, setToken] = useState("")
//     // console.log(token)
//   return (
//     <div>
//       {token === "" ? <AdminLogin setToken={setToken} /> : <SideBar />}
//       </div>
//   );
// }

// export default AdminHome

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminLogin from "./AdminLogin";
// import SideBar from "../Components/Navbar";

// const AdminHome = () => {
//   const [token, setToken] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const tokenTimestamp = localStorage.getItem("tokenTimestamp");

//     if (storedToken && tokenTimestamp) {
//       const tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
//       const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds

//       if (tokenAge > oneDay) {
//         // Token is older than one day; clear it
//         localStorage.removeItem("token");
//         localStorage.removeItem("tokenTimestamp");
//         navigate("/admin-login"); // Redirect to login
//       } else {
//         setToken(storedToken); // Token is valid
//       }
//     } else {
//       navigate("/admin-login"); // Redirect to login if no token
//     }
//   }, [navigate]);

//   const handleSetToken = (newToken) => {
//     if (newToken) {
//       setToken(newToken);
//       localStorage.setItem("token", newToken);
//       localStorage.setItem("tokenTimestamp", Date.now().toString());
//     } else {
//       setToken("");
//       localStorage.removeItem("token");
//       localStorage.removeItem("tokenTimestamp");
//     }
//   };

//   return (
//     <div>{token ? <SideBar /> : <AdminLogin setToken={handleSetToken} />}</div>
//   );
// };

// export default AdminHome;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/Navbar";

const AdminHome = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = () => {
      const storedToken = localStorage.getItem("adminToken");
      const tokenTimestamp = localStorage.getItem("tokenTimestamp");

      if (storedToken && tokenTimestamp) {
        const tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
        const oneDay = 24 * 60 * 60 * 1000;

        if (tokenAge > oneDay) {
          // Token expired; clear it
          localStorage.removeItem("adminToken");
          localStorage.removeItem("tokenTimestamp");
          setToken("");
          navigate("/admin-login");
        } else {
          // Token valid
          setToken(storedToken);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;
        }
      } else {
        navigate("/admin-login");
      }
    };

    validateToken();
  }, [navigate]);

  const handleSetToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("adminToken", newToken);
      localStorage.setItem("tokenTimestamp", Date.now().toString());
      setToken(newToken);
    } else {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("tokenTimestamp");
      setToken("");
    }
  };

  // return token ? <SideBar /> : null; // Render SideBar only when token exists

  return token ? <SideBar /> : null;
};

export default AdminHome;
