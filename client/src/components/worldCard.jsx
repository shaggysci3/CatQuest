
import React, { useEffect, useState } from 'react'




const WorldCard = ({world}) => {

  

  const {name,local_avatars,subject} = world;
  
  const isUrl = local_avatars.startsWith("http://") || local_avatars.startsWith("https://");
  console.log(isUrl ?'avatar there':`avatarhere`)
  
  return (
    <>

    
      <div className='avatarCard'>
        
        <img className='worldImg' src={isUrl ?`${local_avatars}`:`https://th.bing.com/th/id/OIG.DAYEok11oBFFqT3jL59P?pid=ImgGn`}></img>
        <div className='namePlate'>
        <h1 className='charName'>{name}</h1>
        </div>
      </div>
    </>
  )
}

export default WorldCard