import React from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate=useNavigate()
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

          <form>
            <div className="mb-4">
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
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
                variant="outlined"
                fullWidth
                placeholder="Enter your password"
              />
            </div>

            {/* Login Button */}
            <Button
              variant="contained"
              color="primary"
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
