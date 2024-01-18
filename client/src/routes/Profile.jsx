
import React, { useEffect } from 'react'
import UpdateUser from '../components/patchUser'
import { Button } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import Quest from './Quest'
import Worlds from '../components/worlds'


const Profile = () => {
  const[userData,setUserData]=useOutletContext()
  
  

  function handleClick(){

    sessionStorage.clear();
    setUserData(null)
    console.log(userData.name)
  }

  

  return (
    <>
      <h1>Logged in User is: {userData ? userData.name:"userdataNotHere" }</h1>
      <UpdateUser/>
      <Button onClick={handleClick}>logout</Button>

      <div>
        <Worlds/>
      </div>
    </>
  )
}

export default Profile
