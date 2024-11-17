import { FormLabel, Input, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AxiosPrivate from '../utils/AxiosPrivate';

const RegistrationPage = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
     name:"",
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
    const response=await AxiosPrivate.post("/user/register",formData)
    localStorage.setItem("userData",JSON.stringify(response.data))
    navigate('/ ')
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
    };
  return (
    <div className="h-screen flex">
      <div className="flex-1 flex items-center justify-center bg-inherit">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-700 text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <TextField
              
                variant="outlined"
                fullWidth
               name="name"
               onChange={handleChange}
               label="Name"
              />
            </div>

          
            <div className="mb-4">
              
              <TextField
              
                type="email"
                name="email"
                variant="outlined"
                label="Email"
                fullWidth
                onChange={handleChange}
            
               
              />
            </div>

         
            <div className="mb-4">
              
              <TextField
               name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                onChange={handleChange}
               
              />
            </div>

            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type='submit'
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
