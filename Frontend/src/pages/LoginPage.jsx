import React, { useState } from 'react';
import { TextField, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AxiosPrivate from '../utils/AxiosPrivate';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
    setAlertMessage(''); // Clear any previous alert

    try {
      const response = await AxiosPrivate.post('/user/login', formData);
      localStorage.setItem('userData', JSON.stringify(response.data));
      setAlertMessage('Login successful! Redirecting...');
      setAlertType('success');
      setTimeout(() => navigate('/contacts'), 2000);
    } catch (error) {
      console.error('Login error:', error);
      setAlertMessage(
        error.response?.data?.message || 'An error occurred during login.'
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
            "url('https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=740')",
        }}
      ></div>

      {/* Right Form Section */}
      <div className="flex-1 flex items-center justify-center bg-inherit">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
          <Typography variant="h4" className="text-gray-700 text-center mb-4">
            Login
          </Typography>

          {/* Alert Message */}
          {alertMessage && (
            <Alert severity={alertType} className="mb-4">
              {alertMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email Field */}
            <div className="mb-4">
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                fullWidth
                placeholder="Enter your password"
              />
            </div>

            <div className="relative">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                size="large"
                className="mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} style={{ color: 'white' }} />
                ) : (
                  'Login'
                )}
              </Button>
            </div>

            <Typography
              variant="body2"
              className="text-center text-gray-600 mt-4"
            >
              Don’t have an account?{' '}
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </span>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
