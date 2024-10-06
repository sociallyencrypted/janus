// src/components/Home.js
import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h3" gutterBottom>
        College Room Booking System
      </Typography>
      <Typography variant="h6" gutterBottom>
        Book rooms for your club events with ease!
      </Typography>
      <Typography variant="body1" paragraph>
        This app allows you to book rooms for your club events in just a few steps. Log in using your official college
        email, select a room, and submit a request. The admin will approve or reject your request, and you will be
        notified via email.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLoginRedirect}>
        Get Started - Login
      </Button>
    </Container>
  );
};

export default Home;

