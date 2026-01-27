import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {  Role } from "@/generated/prisma/client";


export async function POST(request: Request) {
  console.log("Api route hit");
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const role = formData.get("role") as string;
    // Map string to Prisma enum
    let enumRole: Role;
    if (role === "provider") enumRole = Role.provider;
    else if (role === "seeker") enumRole = Role.seeker;
    else return NextResponse.json({ success: false, message: "Invalid role" });

    await prisma.profile.update({
      where: { id },
      data: { role: enumRole },
    });

    console.log("added in db");
    return NextResponse.json({ success: true, message: "role added" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}