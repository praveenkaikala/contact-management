import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AxiosPrivate from '../utils/AxiosPrivate';

const LoginPage = () => {
  const navigate=useNavigate()
    const [formData, setFormData] = useState({
     
      email: "",
     password:""
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit =async (e) => {
      e.preventDefault();
  try {
    const response=await AxiosPrivate.post("/user/login",formData)
    localStorage.setItem("userData",JSON.stringify(response.data))
    navigate('/contacts')
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
    };
  return (
    <div className="h-screen flex">
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740')",
        }}
      >

      </div>

      
      <div className="flex-1 flex items-center justify-center bg-inherit">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-4">Login</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                fullWidth
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <Button
              variant="contained"
              color="primary"
              type='submit'
              fullWidth
              size="large"
              className="mt-4"
            >
              Login
            </Button>

            {/* Sign Up Link */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <p  className="text-blue-500 hover:underline cursor-pointer inline" onClick={()=>{
                navigate('/register')
              }}>
                Sign Up
              </p>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
