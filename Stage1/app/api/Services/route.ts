import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  console.log("Api route hit");
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string
    const title = formData.get("title") as string;
    const desc = formData.get("desc") as string;
    await prisma.services.create({
            data:{
                title: title,
                description: desc,
                authorId: id
            }
        })
         return NextResponse.json({ success: true, message: "service added" })
  } catch (error) {
    // console.error("API failed:", error);
    return NextResponse.json({ success: false, message: error });
  }
}

export async function GET(request: Request) {
  try{
    const services = await prisma.services.findMany();
    return NextResponse.json({success:true, services})
  }
  catch(error){
    return NextResponse.json({success:false})
  }
  
}