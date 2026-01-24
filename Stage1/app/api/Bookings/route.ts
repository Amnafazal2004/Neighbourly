import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("Api route hit");
  try {
    const formData = await request.formData();
    const serviceId = formData.get("serviceId") as string;
    const bookingDate = formData.get("bookingDate") as string;
    const timeSlot = formData.get("timeSlot") as string;
    const authorId = formData.get("authorId") as string;

    // Check if user is trying to book their own service
    const service = await prisma.services.findUnique({
      where: { id: serviceId },
      select: { authorId: true }
    });

    if (!service) {
      return NextResponse.json({ 
        success: false, 
        message: "Service not found" 
      });
    }

    if (service.authorId === authorId) {
      return NextResponse.json({ 
        success: false, 
        message: "You cannot book your own service" 
      });
    }

    await prisma.bookings.create({
      data: {
        serviceId: serviceId,
        bookingDate: new Date(bookingDate),
        timeSlot: timeSlot,
        authorId: authorId
      }
    });

    return NextResponse.json({ success: true, message: "booking added" });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function GET(request: Request) {
  try {
    const bookings = await prisma.bookings.findMany({
      include: {
        service: true,
        author: true
      }
    });
    return NextResponse.json({ success: true, bookings });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const bookingDate = formData.get("bookingDate") as string;
    const timeSlot = formData.get("timeSlot") as string;

    await prisma.bookings.update({
      where: { id: id },
      data: {
        bookingDate: new Date(bookingDate),
        timeSlot: timeSlot
      }
    });

    return NextResponse.json({ success: true, message: "booking updated" });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function DELETE(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    await prisma.bookings.delete({
      where: { id: id }
    });

    return NextResponse.json({ success: true, message: "booking deleted" });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}


// POST: Creates a booking with validation to prevent users from booking their own services
// GET: Retrieves all bookings with related service and author data
// PUT: Updates booking date and time slot
// DELETE: Removes a booking by ID