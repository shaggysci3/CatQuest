import React, { useState } from 'react';

const DeleteUser = () => {
  // states
  const [userSearch, setUserSearch] = useState({
    name: "",
  });

  // get id from user function
  function getUserId(UsrArr) {
    // filter through users to check if the user exists
    const foundUser = UsrArr.find(user => user.name === userSearch.name);

    if (foundUser) {
      // User exists, make a delete request
      deleteUser(foundUser.id);
    } else {
      // User does not exist
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

  return (
    <>
      <h1>Delete user</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='name'
          value={userSearch.name}
          onChange={handleChange}
        />
        <button type="submit">Delete</button>
      </form>
    </>
  );
};

export default DeleteUser;
