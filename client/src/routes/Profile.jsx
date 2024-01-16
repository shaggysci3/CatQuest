
import React, { useEffect } from 'react'
import UpdateUser from '../components/patchUser'
import { Button } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'


const Profile = () => {
  const[userData,setUserData]=useOutletContext()
  
  

  function handleClick(){
    // setUserData({
    //   id:"",
    //   name:"",
    //   username:"",
    //   _password_hash:""

    // })
    sessionStorage.clear();
    setUserData(null)
    console.log(userData.name)
  }

  // if(userData.id){
  //   user = `${userData}`
  // }else{
  //   console.log("please login to use this feature")
  // }

  return (
    <>
      <h1>Logged in User is: {userData ? userData.name:"userdataNotHere" }</h1>
      <UpdateUser/>
      <Button onClick={handleClick}>logout</Button>
    </>
  )
}

export default Profile
