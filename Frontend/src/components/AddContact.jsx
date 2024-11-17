import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { getToken } from "../utils/getToken";
import AxiosPrivate from "../utils/AxiosPrivate";

const AddContact = ({setAddDrawer,update,setUpdate}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Valid 10-digit phone number is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccessMessage("");
      setErrorMessage("");
    } else {
      try {
        setLoading(true);
        setErrors({});
        setSuccessMessage("");
        setErrorMessage("");

        const { token, userId } = await getToken();
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await AxiosPrivate.post(
          "/contacts",
          { ...formData, userId },
          { headers }
        );
        setUpdate(!update)
        setSuccessMessage("Contact added successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          jobTitle: "",
        }); // Reset form
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to add contact. Try again."
        );
      } finally {
        setLoading(false);
        setTimeout(()=>setAddDrawer(false),2000)
      }
    }
  };

  return (
    <div className="p-5">
      <Typography variant="h5" gutterBottom className="mb-3">
        Add New Contact
      </Typography>

      {/* Success Alert */}
      {successMessage && (
        <Alert severity="success" className="mb-4">
          {successMessage}
        </Alert>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <Alert severity="error" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      <div className="flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div>
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "text" },
              { label: "Company", name: "company", type: "text" },
              { label: "Job Title", name: "jobTitle", type: "text" },
            ].map(({ label, name, type }) => (
              <Box key={name} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  error={!!errors[name]}
                  helperText={errors[name]}
                  variant="outlined"
                />
              </Box>
            ))}
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            className="mb-8"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Add Contact"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
