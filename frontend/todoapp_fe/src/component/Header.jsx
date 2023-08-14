import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTodo } from "../context/todoContext";
import { useMutation } from "react-query";
import { userLogout } from "../apiServices";

const Header = ({ setAuth }) => {
  const { isLogin, setLogin } = useTodo();
  const userLogoutMutation = useMutation({
    mutationFn: userLogout,
    onSuccess: (message) => {
      localStorage.removeItem("userToken");
      setLogin(false);
      setAuth(false);
    },
    onFailure: (error) => {
      toast("Server Error");
    },
  });

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Todo App
        </Typography>
        {!isLogin ? (
          <>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Button color="inherit" component={Link} to="/">
              Login
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => userLogoutMutation.mutate()}
            component={Link}
            to="/"
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
