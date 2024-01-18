
import React, { useEffect, useState } from 'react'




const AvatarCard = ({avatar}) => {
  const {avatar_head,avatar_body,avatar_legs,avatar_name} = avatar;
  console.log(avatar)
  
  return (
    <>
      <div className='avatarCard'>
        
        <div className='headDiv'>
          <img className='charHead' src={`../src/assets/${avatar_head}`}></img>
        </div>
        
        <img className='charTorso' src={`../src/assets/${avatar_body}`}></img>
        <img className='charLegs' src={`../src/assets/${avatar_legs}`}></img>
        <div className='namePlate'>
        <h1 className='charName'>{avatar_name}</h1>
        </div>
      </div>
    </>
  )
}

export default AvatarCard