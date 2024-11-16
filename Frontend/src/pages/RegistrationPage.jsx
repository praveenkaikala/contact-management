import { FormLabel, Input, TextField, Button } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const navigate=useNavigate()
  return (
    <div className="h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-inherit">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-700 text-center mb-4">Register</h2>
          <form>
            <div className="mb-4">
              <FormLabel htmlFor="name" className="text-gray-600 font-medium">
                Full Name
              </FormLabel>
              <TextField
                id="name"
                variant="outlined"
                fullWidth
                placeholder="Enter your name"
                margin="dense"
              />
            </div>

          
            <div className="mb-4">
              <FormLabel htmlFor="email" className="text-gray-600 font-medium">
                Email
              </FormLabel>
              <TextField
                id="email"
                type="email"
                variant="outlined"
                fullWidth
                placeholder="Enter your email"
                margin="dense"
              />
            </div>

         
            <div className="mb-4">
              <FormLabel htmlFor="password" className="text-gray-600 font-medium">
                Password
              </FormLabel>
              <TextField
                id="password"
                type="password"
                variant="outlined"
                fullWidth
                placeholder="Create a password"
                margin="dense"
              />
            </div>

            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="mt-4"
            >
              Register
            </Button>

          
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <p  className="text-blue-500 hover:underline inline hover:cursor-pointer" onClick={()=>{
                navigate('/')
              }}>
                LogIn
              </p>
            </p>
          </form>
        </div>
      </div>

      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740')",
        }}
      ></div>
    </div>
  );
};

export default RegistrationPage;
