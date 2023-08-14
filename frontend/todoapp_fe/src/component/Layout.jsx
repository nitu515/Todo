import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Box } from "@mui/material";

function Layout({ children, setAuth }) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header setAuth={setAuth} />
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <main>{children}</main>
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
