"use client"
import { useState } from "react";
import axios from "axios";
import { useUserContext } from "@/Context/UserContext";

const Header = () => {
   const [title, settitle] = useState<string>("");
   const [desc, setdesc] = useState<string>("");
   const user = useUserContext();
   
   console.log("Current user in Header:", user); // Debug log
   
   if (user === undefined) return <p>Loading...</p>;

   const onsubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      console.log("No user found");
      return;
    }
    
    console.log("Submitting with user id:", user.id);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("id", user.id);

    try {
      const { data } = await axios.post("/api/Services", formData); // Added leading slash
      if (data.success) {
        console.log("msg ",data.message);
        settitle('');
        setdesc('');
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
       {user ? (
      <form onSubmit={onsubmitHandler}>
        <input 
          type="text"
          name="title"
          value={title}
          onChange={(event) => settitle(event.target.value)}
          placeholder="Service Title"
          required
        />
        <input 
          type="text"
          name="desc"
          value={desc}
          onChange={(event) => setdesc(event.target.value)}
          placeholder="Description"
          required
        />
       <button type="submit">Submit</button> 
      </form>
      ) : (
        <p>Please sign in to add a service</p>
      )}
    </div>
  )
}

export default Header