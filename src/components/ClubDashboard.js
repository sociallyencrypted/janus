// src/components/ClubDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button } from "@mui/material";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import RoomBookingForm from "./RoomBookingForm";
import rooms from "../rooms.json";

const ClubDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
  }, [refreshTrigger]);

  useEffect(() => {
    refreshData();
  }, []);

  const handleOpenBookingForm = () => {
    setShowBookingForm(true);
  };

  const refreshData = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Room Booking Requests
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpenBookingForm} style={{ marginBottom: '20px' }}>
        Book a Room
      </Button>
      {showBookingForm && <RoomBookingForm onBookingSubmit={refreshData}/>}
      {requests.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Event Title</TableCell>
              <TableCell>Event Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{rooms.find(room => room.id === request.room)?.name || request.room}</TableCell>
                <TableCell>{request.eventTitle}</TableCell>
                <TableCell>
                  <div style={{ 
                    maxHeight: '100px', 
                    wordWrap: 'break-word',
                    width: '200px',
                    whiteSpace: 'normal'
                  }}>
                    {request.eventDescription}
                  </div>
                </TableCell>
                <TableCell>{new Date(request.startDateTime.seconds * 1000).toLocaleString()}</TableCell>
                <TableCell>{new Date(request.endDateTime.seconds * 1000).toLocaleString()}</TableCell>
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