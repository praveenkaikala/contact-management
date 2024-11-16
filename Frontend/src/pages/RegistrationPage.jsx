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
              <TextField
                id="name"
                variant="outlined"
                fullWidth
               
               label="Name"
              />
            </div>

          
            <div className="mb-4">
              
              <TextField
                id="email"
                type="email"
                variant="outlined"
                label="Email"
                fullWidth
            
               
              />
            </div>

         
            <div className="mb-4">
              
              <TextField
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
               
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
