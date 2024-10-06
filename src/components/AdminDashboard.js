// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      setRequests(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchRequests();
  }, []);

  const handleApprove = async (id) => {
    const requestRef = doc(db, "bookings", id);
    await updateDoc(requestRef, { status: "Approved" });
  };

  const handleReject = async (id) => {
    const requestRef = doc(db, "bookings", id);
    await updateDoc(requestRef, { status: "Rejected" });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Room</TableCell>
          <TableCell>Event Title</TableCell>
          <TableCell>Date</TableCell>
          <TableCell>Time</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
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
            <TableCell>
              <Button variant="contained" onClick={() => handleApprove(request.id)}>
                Approve
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleReject(request.id)}>
                Reject
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminDashboard;

