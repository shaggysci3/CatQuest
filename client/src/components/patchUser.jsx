import React, { useState } from 'react';
import { useOutletContext, useRouteLoaderData } from 'react-router-dom';

const UpdateUser = () => {
  // states
  const[userData,setUserData]=useOutletContext()
  const [userSearch, setUserSearch] = useState({
    name: "",
    username:"",
    password:"",
    displayname:"",
  });


  function handleChange(e) {
    console.log(userSearch)
    setUserSearch({
      ...userSearch,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted")
    updateUser(userData.id)
    
  }
  

  // update user function (PATCH request)
  async function updateUser(userId) {
    try {
      const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
        method: 'PATCH', // Change method to PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: userSearch.displayname,
            password: userSearch.password,
            username: userSearch.username
        }),
      });

      if (response.ok) {
        alert(`User with ID ${userId} updated successfully`)
        console.log(`User with ID ${userId} updated successfully`);
      } else {
        alert(`Failed to update user with ID ${userId}`)
        console.error(`Failed to update user with ID ${userId}`);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  return (
    <>
      <h1>Update user</h1>
      <form onSubmit={handleSubmit}>
        <div>
        <label>new username</label>
        <input
          type='text'
          id='username'
          value={userSearch.username}
          onChange={handleChange}
        />
        <label>new password</label>
        <input
          type='text'
          id='password'
          value={userSearch.password}
          onChange={handleChange}
        />
        <label>new display name</label>
        <input
          type='text'
          id='displayname'
          value={userSearch.displayname}
          onChange={handleChange}
        />
        </div>
        
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default UpdateUser;
