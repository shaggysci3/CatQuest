
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'






const Login = () => {
  const [userInfo,setUserInfo]=useState({
    username:"",
    password:""
  })
  const[userData,setUserData]=useOutletContext()

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: userInfo.username,
      password: userInfo.password
    }
    try {
      const response = await fetch("http://127.0.0.1:5555/login", {
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
      sessionStorage.setItem('token', JSON.stringify(addedUser))
      setUserData(addedUser)
  
      // Clear the form after successful submission
      setUserInfo({
        username: "",
        password: "",
      });
  
      // You may want to update your user list or perform other actions here
    } catch (error) {
      console.error("Error adding user:", error);
    }
    

  }
  function handleChange(e){
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

  }

  return (
    <>
    <div style={{display:'flex', alignContent:'center',justifyContent:'center',alignItems:'center'}}>
    <Card style={{display:'flex'}}>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>User Name</Form.Label>
        <Form.Control onChange={handleChange} type="text"  value={userInfo.username} name= 'username' placeholder="Enter User Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={handleChange} type="password" placeholder="Password" value={userInfo.password} name= 'password'/>
      </Form.Group>
      <Button type='submit'>submit</Button>
    </Form>
    </Card>
    </div>
    </>
  )
}

export default Login
