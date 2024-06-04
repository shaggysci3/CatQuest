import React from 'react';
import { Button } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';


const SelectedAvatar = ({top}) => {
  const[userData,setUserData,avatarData]=useOutletContext()
    function handleClick(){
        console.log(avatarData)
    }

    
  return (
    <>{userData && avatarData?(<>

    <div  className='avatarCard'>
        
          <img className='charHead' style={{top:`${top}`}} src={avatarData ? `../src/assets/${avatarData.avatar_head}`:``}></img>
        
        
        <img className='charTorso' src={avatarData ? `../src/assets/${avatarData.avatar_body}`:``}></img>
        <img className='charLegs' src={avatarData ? `../src/assets/${avatarData.avatar_legs}`:``}></img>
        {/* <div className='namePlate'>
        <h1 className='charName'>{avatarData.avatar_name== ''? "Select Avatar":avatarData.avatar_name}</h1>
        </div> */}
      </div>
    </>):<h1 className='charSelect'>Select an Avatar</h1>}
    </>
  );
};

export default SelectedAvatar;