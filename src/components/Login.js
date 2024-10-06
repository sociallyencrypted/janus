// src/components/Login.js
import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/club-dashboard");
      })
      .catch((error) => {
        console.error("Error during login: ", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Login to Book a Room
      </Typography>
      <Button variant="contained" onClick={handleLogin}>
        Sign in with Google
      </Button>
    </Container>
  );
};

export default Login;

