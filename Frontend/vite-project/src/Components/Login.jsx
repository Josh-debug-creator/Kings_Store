import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, NavLink} from "react-router-dom";
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const [showPassword, setShowPassword] = useState(false);
  // const [remember, setRemember] = useState(false);
  // const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    // const toggleConfirmPasswordVisibility = () => {
    //   setConfirmShowPassword(!showConfirmPassword);
    // };

 const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const response = await axios.post("http://localhost:3000/api/user/login", {
        email: email.trim(),
        password: password.trim(),
      });

      // Extract token from response
      const token = response.data.token;

      if (token) {
        // Save token in headers for future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Save token to parent state and localStorage
        localStorage.setItem("token", token);
        setToken(token);

        // Clear form inputs
        setEmail("");
        setPassword("");

        // Redirect to products page
        window.location.href = "/product";
      } else {
        setError("Login failed. No token returned.");
        console.error("No token in response:", response.data);
      }
       toast.success('Login successful');
    } catch (error) {
      console.error("Login error:", error);
       toast.error(error?.data?.message || error.error);

      // Redirect to signup page if email does not exist
      if (error.response?.status === 404) {
        // window.location.href = "/register";
         // Redirect to login page
    navigate("/register");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="col-10 col-md-6 col-lg-4 p-4 bg-white rounded shadow">
        <h1 className="text-center mb-4">User Login</h1>
        <form onSubmit={onSubmitHandler}>
          {/* email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="your@email.com"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* password */}
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-100 px-3 py-2 mb-2 text-bg-light form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div
              onClick={togglePasswordVisibility}
              id="togglePasswordVisibility"
              style={{ cursor: "pointer" }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>

          {/* Error Message Display */}
          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-warning w-100 py-2">
            Login
          </button>

          <div className="text-end">
            <NavLink to={"/reset-password"} className=" col mx-2">
              Forgot password?
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;



// implement toast to display messages