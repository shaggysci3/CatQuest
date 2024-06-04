import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOutletContext, useRouteLoaderData } from 'react-router-dom';

const UpdateUser = () => {
  // states
  const [showForm, setShowForm] = useState(false);
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

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  

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
    <div className='updateContainer'>
    {!showForm && (
      // <h1>Update Current User</h1>
      <Button onClick={toggleForm}>
        {showForm ? 'Done' : 'Update Login'}
      </Button>
      )}

      
      {showForm && (
        <form  onSubmit={handleSubmit}>
        <div className='form'>
        <label>new username</label>
        <input
          className='newName'
          placeholder='Username...'
          type='text'
          id='username'
          value={userSearch.username}
          onChange={handleChange}
          />
        <label>new password</label>
        <input
          className='newName'
          type='text'
          id='password'
          value={userSearch.password}
          onChange={handleChange}
          />
        <label>new display name</label>
        <input
          className='newName'
          type='text'
          id='displayname'
          value={userSearch.displayname}
          onChange={handleChange}
          />
        </div>
        
        <Button onClick={toggleForm} type="submit">Done</Button>
      </form>
       )}
       </div>
    </>
  );
};

export default UpdateUser;
