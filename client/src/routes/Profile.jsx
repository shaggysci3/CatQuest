
import React, { useEffect } from 'react'
import UpdateUser from '../components/patchUser'
import { Button } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'
import Quest from './Quest'
import Worlds from '../components/worlds'
import SelectedAvatar from '../components/selectedAvatar'
import DeleteUser from '../components/deleteUser'


const Profile = () => {
  const[userData,setUserData,avatarData,setAvatarData]=useOutletContext()
  
  

  function handleClick(){

    sessionStorage.clear();
    setUserData(null)
    setAvatarData(null)
    // console.log(userData.name)
  }
  function showClick(){
    console.log(userData)
  }

  

  return (
    <>
    <div className='profilePage'>
      
      <h1>{userData ? `Welcome ${userData.name}`:"Please login to view Profile" }</h1>
      {userData && (
        <>
        <div className='leftToRight'>
        <div className='selectionContainer'>

          <UpdateUser />
          <DeleteUser />
          {/* <Worlds /> */}
          <Button onClick={handleClick}>logout</Button>
        </div>
        <div>
          <SelectedAvatar top={'5.6rem'}/>
        </div>
        </div>
        </>
      )}
      </div>
    </>
  )
}

export default Profile
