"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";
import Footer from "@/features/Footer";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const BookingTest = () => {
  const user = useUserContext();
  
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const authorId = user?.id || "";
  const params = useParams();
// params.id might be string | string[] | undefined
   const serviceid: string = Array.isArray(params.id) ? params.id[0] : params.id ?? "";


  // Create booking
  const createBooking = async () => {
    if (!serviceid || !authorId) {
      toast("Missing service ID or user ID!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("serviceId", serviceid);
      formData.append("authorId", authorId);
      formData.append("bookingDate", bookingDate);
      formData.append("timeSlot", timeSlot);

      const { data } = await axios.post("/api/Bookings", formData);

      if (data.success) {
        toast("Booking created!");
        setBookingDate("");
        setTimeSlot("");
      } else {
        toast(data.message);
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
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BookingTest;
