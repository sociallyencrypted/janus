// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { db } from "../firebase";
import { collection, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Use onSnapshot for real-time updates
    const unsubscribe = onSnapshot(collection(db, "bookings"), (snapshot) => {
      setRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const requestRef = doc(db, "bookings", id);
    await updateDoc(requestRef, { status: newStatus });
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
              <Button
                variant="contained"
                onClick={() => handleStatusChange(request.id, "Approved")}
                disabled={request.status === "Approved"}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleStatusChange(request.id, "Rejected")}
                disabled={request.status === "Rejected"}
              >
                Reject
              </Button>
              <Button
                variant="contained"
                color="default"
                onClick={() => handleStatusChange(request.id, "Pending")}
                disabled={request.status === "Pending" || !request.status}
              >
                Pending
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminDashboard;

