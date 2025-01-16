import React, { useState } from "react";
import axios from "axios";
// import { toast } from 'react-toastify'

const SignUp = ({ setToken }) => {
  const[name, setName] = useState("")
  const [email, setEmail] = useState("");
  const[phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log("Login attempt with:", email, password);

      // Send register request
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        { email: email.trim(), password: password.trim() }
      );

      // Extract token from response
      const token = response.data.token;
      // console.log(token);

      if (token !== "") {
        // Save token in headers for future requests
        const auth = (axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`);
        console.log(auth);
        // Save token to parent state and localStorage
        localStorage.setItem("token", token);
        setToken(token);
        // console.log(token);

        // Clear form inputs
        setEmail("");
        setPassword("");
        setName("");
        setPhoneNumber("");

        // console.log(
        //   "Token successfully stored in headers and localStorage:",
        //   token
        // );
      } else {
        setError("Login failed. No token returned.");
        console.error("No token in response:", response.data);
        //  toast.error("No token in response:", response.data);
      }
    } catch (err) {
      console.error("Login error:", err);
      // toast.error("Login error:", err);

      // Set error message from server or fallback to generic error
      if (err.response?.data?.message) {
        setError(err.response.data.message);
        // toast.error(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        // toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="col-10 col-md-6 col-lg-4 p-4 bg-white rounded shadow">
        <h1 className="text-center mt-2">User Signup</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <p className="mb-0 mt-3">Name</p>
            <input
              type="text"
              required
              placeholder="John"
              className="w-100 px-3 py-2 mb-2 text-bg-light"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <p className="mb-0 mt-3">Email Address</p>
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="w-100 px-3 py-2 mb-2 text-bg-light"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <p className="mb-0 mt-3">Phone Number</p>
            <input
              type="Number"
              required
              placeholder="08022334455"
              className="w-100 px-3 py-2 mb-2 text-bg-light"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div>
            <p className="mb-0">Password</p>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-100 px-3 py-2 mb-2 text-bg-light"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {/* Error Message Display */}
          {error && <p className="text-danger text-center mt-3">{error}</p>}

          <button
            type="submit"
            className="mt-3 mb-2 w-100 btn btn-warning py-2 text-white fs-32 fw-bold"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};



export default SignUp;
