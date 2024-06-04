
import React, { useEffect, useState } from 'react'
import AvatarCard from '../components/avatarCard';
import { useOutletContext } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SelectedAvatar from '../components/selectedAvatar';




const Quest = () => {
  const [avatars,setAvatars]=useState([])
  const [userData,setUserData,avatarData]=useOutletContext()
  useEffect(() => {
    
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:5555/avatars");
      const UsrArr = await response.json();
      setAvatars(UsrArr);
    };
    fetchUsers().catch(console.error);
  }, []);
  
  let filteredAvatars = [];
  if (userData) {
    filteredAvatars = avatars.filter((avatar) => {
      return avatar.user_id === userData.id;
    });
  }

  // console.log(avatarData.avatar_head)
  
  const avatar = filteredAvatars.map(avatar=>{
    return <AvatarCard key={avatar.id} avatar={avatar}/>
  })
  function handleClick() {
    sessionStorage.setItem('avatarToken', JSON.stringify(avatarData));
    console.log(avatarData, userData);
  }
  return (
    <>
    <div className='selectionContainer'>

    <div className='selectedAvatar'>
    <SelectedAvatar top={'5rem'}/>
    <Button style={{position:"absolute",top:"9rem"}} onClick={handleClick}>Use This Avatar</Button>
    <h1>
       Your Characters
      </h1>
    </div>
    <div className='cardDisplay'>
      {avatar}
    </div>
    </div>
    </>
  )
}

export default Quest
