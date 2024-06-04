

import '../routes/Home.css';
import React, { useState, useEffect } from "react";


const NewUser = () => {
  // states
  
  const [formData,setFormData] = useState({
    name:"",
    username:"",
    password:"",
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
    const newUser = {
      name: formData.name,
      username: formData.username,
      password: formData.password
    }
    try {
      const response = await fetch("http://127.0.0.1:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        // Handle the case where the server returns an error status
        console.error(`Failed to add user. Status: ${response.status}`);
        return;
      }
  
      // If the request is successful, you can handle the response if needed
      const addedUser = await response.json();
      console.log("User added:", addedUser);
  
      // Clear the form after successful submission
      setFormData({
        name: "",
        username: "",
        password: "",
      });
  
      // You may want to update your user list or perform other actions here
    } catch (error) {
      console.error("Error adding user:", error);
    }
    

  }

  return (
    <>
    
    <form onSubmit={handleSubmit}>
      <h1> Sign up</h1>
      <div>
        <label>Displayname:</label>
        <input
        type='text'
        id='name'
        value={formData.name}
        onChange={handleChange}/>
      </div>
      <div>
        <label>Username:</label>
        <input
        type='text'
        id='username'
        value={formData.username}
        onChange={handleChange}/>
      </div>
      <div>
        <label>Password:</label>
        <input
        type='text'
        id='password'
        value={formData.password}
        onChange={handleChange}/>
      </div>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default NewUser
