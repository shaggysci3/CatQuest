

import { Button } from 'react-bootstrap';
import '../routes/Home.css';
import React, { useState, useEffect } from "react";


const NewWorld = ({worlds, setWorlds}) => {
  // states
  
  const [formData,setFormData] = useState({
    name:"",
    subject:"",
    local_avatars:"",
  });
  
  // post request to poost new user and form funtions
  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newWorld = {
      name: formData.name,
      subject: formData.subject,
      local_avatars: formData.local_avatars
    }
    try {
      const response = await fetch("http://127.0.0.1:5555/worlds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWorld),
      });
  
      if (!response.ok) {
        // Handle the case where the server returns an error status
        console.error(`Failed to add world. Status: ${response.status}`);
        return;
      }
  
      // If the request is successful, you can handle the response if needed
      const addedWorld = await response.json();
      console.log("World added:", addedWorld);
      setWorlds([...worlds,addedWorld])
  
      // Clear the form after successful submission
      setFormData({
        name: "",
        subject: "",
        local_avatars: "",
      });
  
      // You may want to update your user list or perform other actions here
    } catch (error) {
      console.error("Error adding user:", error);
    }
    

  }

  return (
    <>
    
    <form onSubmit={handleSubmit}>
        <div className='formLayout'>

      <div>
        <label>World Name:</label>
        <input
        type='text'
        id='name'
        value={formData.name}
        onChange={handleChange}/>
      </div>
      <div>
        <label>Subject:</label>
        <input
        type='text'
        id='subject'
        value={formData.subject}
        onChange={handleChange}/>
      </div>
      <div>
        <label>Local_avatars:</label>
        <input
        type='text'
        id='local_avatars'
        value={formData.local_avatars}
        onChange={handleChange}/>
      </div>
      <div>
      <img className='worldImgPreview' src = {formData.local_avatars?`${formData.local_avatars}`:'https://th.bing.com/th/id/OIG.DAYEok11oBFFqT3jL59P?pid=ImgGn'}></img>
      </div>
      <Button type="submit">Submit</Button>
        </div>
    </form>
    </>
  )
}

export default NewWorld