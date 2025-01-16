// import Home from "./Components/Home";
import "./App.css";
import {useState, useEffect} from 'react'
import { Route, Routes } from "react-router-dom";
import CreateCategories from "./Pages/CreateCategories";
import CreateProduct from "./Pages/CreateProducts";
import AdminLogin from "./Pages/AdminLogin";
import Home from "./Pages/AdminHome";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import List from './Pages/List'


export const currency = '$'
function App() {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')  
// const [token, setToken] = useState('')
console.log(token)
  // use local storage
  useEffect(()=>{
localStorage.setItem('token', token)
  }, [token])


  return (
    <>
      <div className="bg-gray-50">
        {token === "" ? (
          <AdminLogin setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="d-flex w-100 px-3">
              <Sidebar />

              <div className="w-75 mx-auto">


                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/createcategories"
                    element={<CreateCategories />}
                    token={token}
                  />
                  <Route
                    path="/createproducts"
                    element={<CreateProduct token={token} />}
                  />
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/list" element={<List />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
