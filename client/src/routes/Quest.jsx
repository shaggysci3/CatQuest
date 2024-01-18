
import React, { useEffect, useState } from 'react'
import AvatarCard from '../components/avatarCard';




const Quest = () => {
  const [avatars,setAvatars]=useState([])
  useEffect(() => {
    
    const fetchUsers = async () => {
      const response = await fetch("http://127.0.0.1:5555/avatars");
      const UsrArr = await response.json();
      setAvatars(UsrArr);
    };
    fetchUsers().catch(console.error);
  }, []);
  console.log(avatars[1])
  const avatar = avatars.map(avatar=>{
    return <AvatarCard key={avatar.id} avatar={avatar}/>
  })
  return (
    <>
    <div className='cardDisplay'>
      {avatar}
    </div>
    </>
  )
}

export default Quest
