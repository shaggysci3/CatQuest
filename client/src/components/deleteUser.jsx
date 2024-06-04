import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';

const DeleteUser = () => {
  // states
  const[userData,setUserData,avatarData,setAvatarData]=useOutletContext()
  const [showForm, setShowForm] = useState(false);
  
  const [userSearch, setUserSearch] = useState({
    name: "",
  });

  // get id for Deleting the user
  function getUserId(UsrArr) {
    // filter through users to check if the user exists
    const foundUser = UsrArr.find(user => user.name === userSearch.name);

    if (foundUser) {
      //if User exists, make a delete request
      deleteUser(foundUser.id);
      sessionStorage.clear();
    setUserData(null)
    setAvatarData(null)
    } else {
      //if User does not exist send back ERR
      alert("please enter your username to confirm")
      console.log("User not found");
    }
  }

  // form handler functions
  function handleChange(e) {
    setUserSearch({
      ...userSearch,
      [e.target.id]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // fetch request to fetch all users
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:5555/users");
      const UsrArr = await response.json();
      getUserId(UsrArr);
    };
    fetchUsers().catch(console.error);
  }

  // delete user function
  async function deleteUser(userId) {
    try {
      const response = await fetch(`http://127.0.0.1:5555/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log(`User with ID ${userId} deleted successfully`);
      } else {
        console.error(`Failed to delete user with ID ${userId}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
    <div className='deleteContainer'>

      {showForm && (
        <>
      <h1>Delete account</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input
          placeholder='type username to confirm..'
          type='text'
          id='name'
          value={userSearch.name}
          onChange={handleChange}
          />
        <button type="submit">Delete</button>
      </form>
      </>
      )}
      
    <Button onClick={toggleForm}>
        {showForm ? 'Done' : 'Delete Account'}
      </Button>
      </div>
    </>
  );
};

export default DeleteUser;
