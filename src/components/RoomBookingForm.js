// src/components/RoomBookingForm.js
import React, { useState } from "react";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const RoomBookingForm = () => {
  const [room, setRoom] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  const handleSubmit = async () => {
    const bookingData = {
      room,
      eventTitle,
      eventDescription,
      startDateTime: Timestamp.fromDate(new Date(startDateTime)),
      endDateTime: Timestamp.fromDate(new Date(endDateTime)),
    };
    console.log(startDateTime);
    console.log(endDateTime);
    try {
      await addDoc(collection(db, "bookings"), bookingData);
      alert("Booking request sent!");
    } catch (error) {
      console.error("Error adding booking: ", error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <FormControl fullWidth>
        <InputLabel>Select Room</InputLabel>
        <Select value={room} onChange={(e) => setRoom(e.target.value)}>
          <MenuItem value="Room 101">Room 101</MenuItem>
          <MenuItem value="Room 102">Room 102</MenuItem>
        </Select>
      </FormControl>

      <TextField 
        fullWidth
        label="Event Title" 
        value={eventTitle} 
        onChange={(e) => setEventTitle(e.target.value)} 
      />

      <TextField 
        fullWidth
        label="Event Description" 
        value={eventDescription} 
        onChange={(e) => setEventDescription(e.target.value)} 
        multiline 
        rows={4} 
      />

      <DateTimePicker
        label="Start Date & Time"
        value={startDateTime}
        onChange={setStartDateTime}
        renderInput={(params) => <TextField {...params} />}
      />

      <DateTimePicker
        label="End Date & Time"
        value={endDateTime}
        onChange={setEndDateTime}
        renderInput={(params) => <TextField {...params} />}
      />

      <Button variant="contained" onClick={handleSubmit}>
        Submit Booking Request
      </Button>
    </div>
    </LocalizationProvider>
  );
};

export default RoomBookingForm;

