import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import { useNewPasswordRequestMutation } from "../slices/usersApiSlice";
// import FormContainer from "../components/FormContainer";
// import Meta from "../components/Meta";
// import Message from "../components/Message";
import { toast } from "react-toastify";

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // const [requestNewPassword, { isLoading }] = useNewPasswordRequestMutation();
  // console.log(useNewPasswordRequestMutation());
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await requestNewPassword({ email }).unwrap();
      setMessage(res.message);
      setEmail("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

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
        <h1 className="text-center">Request New Password</h1>
        {/* {message && <Message>{message}</Message>} */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button
            className="mb-3 w-100"
            variant="warning"
            type="submit"
            // disabled={isLoading}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordRequestPage;
