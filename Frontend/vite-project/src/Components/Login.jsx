import React, { useState } from "react";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

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
    } catch (err) {
      console.error("Login error:", err);

      // Redirect to signup page if email does not exist
      if (err.response?.status === 404) {
        window.location.href = "/register";
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
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
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Error Message Display */}
          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn btn-warning w-100 py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;



// implement toast to display messages