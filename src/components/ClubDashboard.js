// src/components/ClubDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from "@mui/material";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import RoomBookingForm from "./RoomBookingForm";

const ClubDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      if (auth.currentUser) {
        const clubEmail = auth.currentUser.email;
        const q = query(collection(db, "bookings"), where("userEmail", "==", clubEmail));
        const querySnapshot = await getDocs(q);
        setRequests(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    };
    fetchRequests();
  }, []);

  const handleOpenBookingForm = () => {
    setShowBookingForm(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Room Booking Requests
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenBookingForm} style={{ marginBottom: '20px' }}>
        Book a Room
      </Button>
      {showBookingForm && <RoomBookingForm />}
      {requests.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Event Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.room}</TableCell>
                <TableCell>{request.eventTitle}</TableCell>
                <TableCell>{request.selectedDate}</TableCell>
                <TableCell>{request.selectedTime}</TableCell>
                <TableCell>{request.status || "Pending"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No requests found.</Typography>
      )}
    </Container>
  );
};

export default ClubDashboard;
