"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import Footer from "@/features/Footer";
import { useParams } from "next/navigation";

const BookingTest = () => {
  const { serviceId } = useParams(); // from URL like /bookservices/[serviceId]
  const user = useUserContext();
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [bookingId, setBookingId] = useState("");

  const authorId = user?.id || "";

useEffect(() => {
  if (serviceId) fetchBookings();
}, [serviceId]); 
  // Fetch bookings for this service
  const fetchBookings = async () => {
    try {
      const { data } = await axios.get("/api/Bookings", {
        params: { serviceId }
      });
      setBookings(data); // API returns array of bookings
    } catch (err) {
      console.error(err);
    }
  };

  // Create booking
  const createBooking = async () => {
    if (!serviceId || !authorId) {
      alert("Missing service ID or user ID!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("serviceId", serviceId);
      formData.append("authorId", authorId);
      formData.append("bookingDate", bookingDate);
      formData.append("timeSlot", timeSlot);

      const { data } = await axios.post("/api/Bookings", formData);

      if (data.success) {
        alert("Booking created!");
        setBookingDate("");
        setTimeSlot("");
        fetchBookings();
      } else {
        alert(data.message);
      }
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

      if (data.success) {
        alert("Booking updated!");
        fetchBookings();
      } else {
        alert("Failed to update booking.");
      }
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

      if (data.success) {
        alert("Booking deleted!");
        fetchBookings();
      } else {
        alert("Failed to delete booking.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-100 border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold uppercase tracking-wide">Book Service</h1>
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-4 py-2 border-2 border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            Home
          </button>
        </div>
      </div>

      {/* Booking Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <div className="bg-white border-2 border-black rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-4 text-center">Book This Service</h2>
            <p className="text-gray-600 text-center mb-6">
              Service ID: <span className="font-semibold">{serviceId}</span> | User ID: <span className="font-semibold">{authorId}</span>
            </p>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); createBooking(); }}>
              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">Booking Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wide">Time Slot</label>
                <input
                  type="time"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black transition text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl"
              >
                Create Booking
              </button>
            </form>
          </div>

          {/* Existing Bookings */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Existing Bookings</h3>
            <div className="space-y-4">
              {bookings.map((b) => (
                <div key={b.id} className="bg-white border-2 border-black rounded-xl p-4 shadow flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold">Booking ID: {b.id}</p>
                    <p className="text-sm">Service: {b.service.title}</p>
                    <p className="text-sm">Author: {b.author.email}</p>
                    <p className="text-sm">Date: {new Date(b.bookingDate).toLocaleDateString()}</p>
                    <p className="text-sm">Time: {b.timeSlot}</p>
                  </div>
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingTest;
