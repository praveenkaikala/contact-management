import { TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosPrivate from '../utils/AxiosPrivate';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);
    setAlertMessage(''); 

    try {
      const response = await AxiosPrivate.post('/user/register', formData);
      setAlertMessage('Registration successful!');
      setAlertType('success');
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
      console.error('Registration error:', error);
      setAlertMessage(
        error.response?.data?.message || 'An error occurred during registration.'
      );
      setAlertType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex">
    
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7965.jpg?w=740')",
        }}
      ></div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center bg-inherit">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
          <Typography variant="h4" className="text-gray-700 text-center mb-4">
            Register
          </Typography>

        
          {alertMessage && (
            <Alert severity={alertType} className="mb-4">
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
           
            <div className="mb-4">
              <TextField
                variant="outlined"
                fullWidth
                name="name"
                onChange={handleChange}
                label="Name"
                error={Boolean(errors.name)}
                helperText={errors.name}
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
                error={Boolean(errors.email)}
                helperText={errors.email}
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
                error={Boolean(errors.password)}
                helperText={errors.password}
              />
            </div>

           
            <div className="relative">
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                className="mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress variant='inherit' />
                ) : (
                  'Register'
                )}
              </Button>
            </div>

           
            <Typography
              variant="body2"
              className="text-center text-gray-600 mt-4"
            >
              Already have an account?{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate('/')}
              >
                LogIn
              </span>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
