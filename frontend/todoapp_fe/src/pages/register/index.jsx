import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { userRegister } from "../../apiServices";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowRetypePassword = () => {
    setShowRetypePassword((prevShowRetypePassword) => !prevShowRetypePassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const userRegisterMutation = useMutation({
    mutationFn: userRegister,
    onSuccess: (message) => {
      toast("User Registered Successfully");
      setFormData({
        name: "",
        email: "",
        password: "",
        retypePassword: "",
      });
    },
    onFailure: (error) => {
      toast("Server Error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for required fields
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "User name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    if (!formData.retypePassword.trim()) {
      errors.retypePassword = "Retype Password is required";
    }
    setFormErrors(errors);

    // Check if passwords match
    if (formData.password !== formData.retypePassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");
    if (Object.keys(errors).length === 0) {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      userRegisterMutation.mutate(payload);
    }
  };

  return (
    <Box width={600} mt={2} mb={2}>
      <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
        <PersonIcon />
      </Avatar>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="User Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!formErrors.password}
          helperText={formErrors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="retypePassword"
          label="Retype Password"
          type={showRetypePassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.retypePassword}
          onChange={handleChange}
          error={!!formErrors.retypePassword || !!passwordError}
          helperText={formErrors.retypePassword || passwordError}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle retype password visibility"
                  onClick={handleShowRetypePassword}
                  edge="end"
                >
                  {showRetypePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
        >
          Register
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Register;
