import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const serviceId = formData.get("serviceId") as string;
    const bookingDate = formData.get("bookingDate") as string;
    const timeSlot = formData.get("timeSlot") as string;
    const authorId = formData.get("authorId") as string;

    // Check if user is booking their own service
    const service = await prisma.services.findUnique({
      where: { id: serviceId },
      select: { authorId: true }
    });

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" });
    }

    if (service.authorId === authorId) {
      return NextResponse.json({ success: false, message: "You cannot book your own service" });
    }

    await prisma.bookings.create({
      data: {
        serviceId,
        bookingDate: new Date(bookingDate),
        timeSlot,
        authorId
      }
    });

    return NextResponse.json({ success: true, message: "Booking added" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to create booking" });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const serviceId = url.searchParams.get("serviceId");

    let bookings;

    if (serviceId) {
      // Return bookings for a specific service
      bookings = await prisma.bookings.findMany({
        where: { serviceId },
        include: { service: true, author: true },
      });
    } else {
      // Return all bookings
      bookings = await prisma.bookings.findMany({
        include: { service: true, author: true },
      });
    }

    return NextResponse.json(bookings); // returns array directly
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const bookingDate = formData.get("bookingDate") as string;
    const timeSlot = formData.get("timeSlot") as string;

    await prisma.bookings.update({
      where: { id },
      data: {
        bookingDate: new Date(bookingDate),
        timeSlot
      }
    });

    return NextResponse.json({ success: true, message: "Booking updated" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to update booking" });
  }
}

export async function DELETE(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    await prisma.bookings.delete({
      where: { id }
    });

    return NextResponse.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to delete booking" });
  }
}
