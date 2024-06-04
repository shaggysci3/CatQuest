
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';




const AvatarCard = ({avatar}) => {
  const [userData,setUserData,avatarData,setAvatarData]=useOutletContext()
  const {avatar_head,avatar_body,avatar_legs,avatar_name,user_id} = avatar;
  
  
  function handleClick(){
    setAvatarData({
      avatar_head:avatar_head,
      avatar_body:avatar_body,
      avatar_legs:avatar_legs,
      avatar_name:avatar_name
    })
  }
  
  return (
    <>
    <div className='avatarBorder'>
      <div onClick={handleClick} className='avatarCard'>
        {/* <Button onClick={handleClick} >Use Avatar</Button> */}
        <div className='headDiv'>
          <img className='charHead' src={`../src/assets/${avatar_head}`}></img>
        </div>
        
        <img className='charTorso' src={`../src/assets/${avatar_body}`}></img>
        <img className='charLegs' src={`../src/assets/${avatar_legs}`}></img>
        <div className='namePlate'>
        <h1 className='charName'>{avatar_name}</h1>
        </div>
      </div>
    </div>
    </>
  )
}

export default AvatarCard