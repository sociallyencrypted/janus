// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContextProvider } from "./ThemeContext";
import Home from "./components/Home";
import ClubDashboard from "./components/ClubDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeContextProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/club-dashboard" element={<ClubDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;

