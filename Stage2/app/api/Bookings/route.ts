import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log("POST request received");

    const formData = await request.formData();
    console.log("Form data received:", formData);

    const serviceId = formData.get("serviceId")?.toString();
    const bookingDate = formData.get("bookingDate")?.toString();
    const timeSlot = formData.get("timeSlot")?.toString();
    const authorId = formData.get("authorId")?.toString();

    console.log("Parsed values:", { serviceId, bookingDate, timeSlot, authorId });

    if (!serviceId || !bookingDate || !timeSlot || !authorId) {
      console.log("Missing one or more required fields");
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const date = new Date(bookingDate);
    if (isNaN(date.getTime())) {
      console.log("Invalid booking date:", bookingDate);
      return NextResponse.json({ success: false, message: "Invalid booking date" }, { status: 400 });
    }
    console.log("Booking date is valid:", date);

    const service = await prisma.services.findUnique({
      where: { id: serviceId },
      select: { authorId: true }
    });
    console.log("Service fetched:", service);

    if (!service) {
      console.log("Service not found with ID:", serviceId);
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    if (service.authorId === authorId) {
      console.log("User tried to book their own service");
      return NextResponse.json({ success: false, message: "You cannot book your own service" });
    }

    const booking = await prisma.bookings.create({
      data: {
        serviceId,
        bookingDate: date,
        timeSlot,
        authorId
      }
    });
    console.log("Booking created successfully:", booking);

    return NextResponse.json({ success: true, message: "Booking added" });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json({ success: false, message: "Failed to create booking" }, { status: 500 });
  }
}
