import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { NextResponse } from "next/server"
import { prisma } from '../../../lib/prisma'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,

})

export async function POST(request: Request) {
    console.log("Api route hit")
    try{
        const formData = await request.formData()
        const id= formData.get("id") as string
        const fullname= formData.get("fullname") as string | null
        const bio= formData.get("bio") as string | null
        const seatno= formData.get("seatno") as string | null
        const depart= formData.get("depart") as string | null
        const batch= formData.get("batch")as string | null
        const pfp= formData.get("pfp") as File | null

        let image: string | undefined
       
        if(pfp){
        const arrayBuffer = await pfp.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

    
        const result: UploadApiResponse = await new Promise((resolve, reject) => {

          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (error, result) => {
              if (error) {
                reject(error)
              }
              else {
                resolve(result!)
              }
            }
          )
          stream.end(buffer)

        })

         image = result.secure_url
        console.log("image added", image)
        console.log("id secured", id)

        }
      
        await prisma.profile.update({
            where:{
                id: id
            },
            data:{
                fullName: fullname,
                bio: bio,
                seatNo: seatno,
                department: depart,
                batch: batch,
                profilePic: image
            }
        })
         return NextResponse.json({ success: true, message: "profile updated" })

    }
    catch(error){
        return NextResponse.json({success:false})
    }
}