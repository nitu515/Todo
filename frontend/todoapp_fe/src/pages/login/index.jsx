import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Avatar,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import { userLogin } from "../../apiServices";
import { useTodo } from "../../context/todoContext";
const Login = ({ setAuth }) => {
  const naviagte = useNavigate();
  const { setLogin } = useTodo();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const userLoginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      setFormData({
        email: "",
        password: "",
      });
      localStorage.setItem("userToken", data?.jwt);
      setLogin(localStorage.getItem("userToken") && true);
      setAuth(localStorage.getItem("userToken") && true);
      naviagte("/todolist");
    },
    onFailure: (error) => {
      toast("Server Error");
    },
  });

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };
      userLoginMutation.mutate(loginData);
    }
  };

  return (
    <Box mt={2} mb={2}>
      <Avatar sx={{ mx: "auto", bgcolor: "primary.main" }}>
        <PersonIcon />
      </Avatar>
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          fullWidth
          size="large"
          sx={{ mt: 3 }}
        >
          Login
        </Button>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Login;
