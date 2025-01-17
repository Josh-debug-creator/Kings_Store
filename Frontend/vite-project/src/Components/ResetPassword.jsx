import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useResetPasswordMutation } from '../slices/usersApiSlice';
// import FormContainer from '../components/FormContainer';
// import Meta from '../components/Meta';
import { useParams } from 'react-router-dom';
// import Message from '../components/Message';

const ResetPasswordPage = () => {
  const { id: userId, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  // const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const submitHandler = async e => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      const res = await resetPassword({ userId, token, password }).unwrap();
      setPassword('');
      setConfirmPassword('');
      setMessage(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    // <FormContainer>
    <div className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
     <div className="col-10 col-md-6 col-lg-4 p-4 bg-white rounded shadow">
        <h1 className="text-center mb-4">Reset Password</h1>
      
      {message && <Message>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter password'
              onChange={e => setPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={togglePasswordVisibility}
              id='togglePasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              placeholder='Confirm password'
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <InputGroup.Text
              onClick={toggleConfirmPasswordVisibility}
              id='toggleConfirmPasswordVisibility'
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button
          className='mb-3 w-100'
          variant='warning'
          type='submit'
      
        >
          Submit
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default ResetPasswordPage;
