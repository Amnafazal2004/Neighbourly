"use client"
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";

const Header = () => {
   const [title, settitle] = useState<string>(String);
   const [desc, setdesc] = useState<string>(String);
   const [id, setid] = useState("")
   const user = useUserContext()

   const onsubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("sending");
    const formData = new FormData();
    title && formData.append("title", title);
    desc && formData.append("desc", desc);

    try {
      const { data } = await axios.post("api/Services", formData);
      if (data.success) {
        console.log(data.message);
        settitle('')
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <div>
       {user? 
      <form onSubmit={onsubmitHandler} onClick={()=>setid(user.id)}>
        <input type="text"
        name="title"
              value={title || ""}
              onChange={(event) => settitle(event.target.value )}
              placeholder="xyz" />
        <input type="text"
        name="desc"
              value={desc || ""}
              onChange={(event) => setdesc(event.target.value )}
              placeholder="desc" />
       <button type="submit">Submit</button> 
      </form>
      : null}
        
    </div>
  )
}

export default Header