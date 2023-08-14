import React from "react";
import { Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box bgcolor="#f5f5f5" py={2} textAlign="center">
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} My Todo App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
