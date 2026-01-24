"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const BookingTest = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [serviceId, setServiceId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookingId, setBookingId] = useState("");

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/Bookings");
      if (data.success) setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Create booking
  const createBooking = async () => {
    try {
      const formData = new FormData();
      formData.append("serviceId", serviceId);
      formData.append("authorId", authorId);
      formData.append("bookingDate", bookingDate);
      formData.append("timeSlot", timeSlot);

      const { data } = await axios.post("/api/Bookings", formData);
      alert(data.message);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // Update booking
  const updateBooking = async () => {
    try {
      const formData = new FormData();
      formData.append("id", bookingId);
      formData.append("bookingDate", bookingDate);
      formData.append("timeSlot", timeSlot);

      const { data } = await axios.put("/api/Bookings", formData);
      alert(data.message);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete booking
  const deleteBooking = async (id: string) => {
    try {
      const formData = new FormData();
      formData.append("id", id);

      const { data } = await axios.delete("/api/Bookings", { data: formData });
      alert(data.message);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Booking Test UI</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Service ID"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        />
        <input
          placeholder="Author ID"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        />
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        />
        <input
          type="time"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <button onClick={createBooking}>Create Booking</button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <input
          placeholder="Booking ID to update"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
        />
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        />
        <input
          type="time"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <button onClick={updateBooking}>Update Booking</button>
      </div>

      <h3>Existing Bookings</h3>
      {bookings.map((b) => (
        <div key={b.id} style={{ borderBottom: "1px solid gray", marginBottom: 5 }}>
          <p>Booking ID: {b.id}</p>
          <p>Service: {b.service.title}</p>
          <p>Author: {b.author.email}</p>
          <p>Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
          <p>Time: {b.timeSlot}</p>
          <button onClick={() => deleteBooking(b.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default BookingTest;
