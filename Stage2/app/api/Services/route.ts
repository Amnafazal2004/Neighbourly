import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("Api route hit");
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    const category = formData.get("category") as string;
    const neighbour = formData.get("neighbour") as string;
    const pricestr = formData.get("price") as string;
    const price = Number(pricestr);
    console.log("got data");
    await prisma.services.create({
      data: {
        title: title,
        description: desc,
        category: category,
        neighbour: neighbour,
        price: price,

        authorId: id,
      },
    });
    console.log("added in db");
    return NextResponse.json({ success: true, message: "service added" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error });
  }
}

export async function GET(request: Request) {
  try {
    const services = await prisma.services.findMany();
    return NextResponse.json({ success: true, services });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
