
import React, { useState } from 'react'
import CharDisplay from '../components/charDisplay'
import newUser from '../components/newUser'
import { useEffect } from 'react'
import { Alert, AlertHeading, Button } from 'react-bootstrap'
import { useOutletContext } from 'react-router-dom'



const Create = () => {
  const[userData,setUserData]=useOutletContext()
// state to pass tot he display with the file name
  const [head,setHead] = useState("headFrontCat.png")
  const [body,setBody] = useState("torsoHuman.png")
  const [leg,setLeg] = useState("legsChkn.png")

// index controller
  const [headIndex,setHeadIndex]=useState(0)
  const [bodyIndex,setBodyIndex]=useState(0)
  const [legIndex,setLegIndex]=useState(0)

// body part arrays that store the file names
  const [bodyParts,setBodyParts]=useState({
    head:["headFrontCat.png","pandaHeadFull.png","rockHeadfull.png","axoHeadfull.png"],
    body:["torsoHuman.png","mothTorso.png","birdTorso.png","penguinTorso.png"],
    leg:["legsChkn.png","squidLegs.png","frugLeg.png","snekLegs.png"]
  })
//avatar body parts to post to the server
  const [avatarName, setAvatarName] = useState("");
  const [newAvatar,setNewAvatar]=useState({
    avatar_head:"",
    avatar_body:"",
    avatar_legs:"",
    avatar_name:"",
  })
//set newAvatar

  const updateHead = (newHead) => {
    setNewAvatar((prevAvatar) => ({
      ...prevAvatar,
      avatar_head: newHead
    }));
  };

  const updateLegs = (newLegs) => {
    setNewAvatar((prevAvatar) => ({
      ...prevAvatar,
      avatar_legs: newLegs
    }));
  };

  const updateBody = (newBody) => {
    setNewAvatar((prevAvatar) => ({
      ...prevAvatar,
      avatar_body: newBody
    }));
  };


// use effects to update the head body arms when index is updated
  useEffect(() => {
    setHead(bodyParts.head[headIndex])
    updateHead(bodyParts.head[headIndex]);
  }, [headIndex]);

  useEffect(() => {
    setBody(bodyParts.body[bodyIndex])
    updateBody(bodyParts.body[bodyIndex]);
  }, [bodyIndex]);
  useEffect(() => {
    setLeg(bodyParts.leg[legIndex])
    updateLegs(bodyParts.leg[legIndex]);
  }, [legIndex]);
// console.log(avatarName)
  useEffect(() => {
    setNewAvatar((prevAvatar) => ({
      ...prevAvatar,
      avatar_name: avatarName
    }));
  }, [avatarName]);



// click controllers for head arrows
  function leftHeadClick(){
    if (headIndex > 0){
      setHeadIndex(headIndex-1)
    }else {
      setHeadIndex(3)
    } 
  }

  function rightHeadClick(){
    if (headIndex < 3){
      setHeadIndex(headIndex+1)
    }else{
      setHeadIndex(0)
    }
  }
// click controllers for body arrows
  function leftBodyClick(){
    if (bodyIndex > 0){
      setBodyIndex(bodyIndex-1)
    }else {
      setBodyIndex(3)
    } 
  }

  function rightBodyClick(){
    if (bodyIndex < 3){
      setBodyIndex(bodyIndex+1)
    }else{
      setBodyIndex(0)
    }
  }

// click controllers for leg arrows
  function leftLegClick(){
    if (legIndex > 0){
      setLegIndex(legIndex-1)
    }else {
      setLegIndex(3)
    } 
  }

  function rightLegClick(){
    if (legIndex < 3){
      setLegIndex(legIndex+1)
    }else{
      setLegIndex(0)
    }
  }
// submit a new character
  async function handleSubmit(){
    if (userData){
      

      try {
        // setNewAvatar((prevAvatar) => ({
        //   ...prevAvatar,
        //   avatar_name: avatarName
        // }));
        // console.log(newAvatar)

        const response = await fetch(`http://127.0.0.1:5555/avatars/${userData.id}/1`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newAvatar),
        });
        
        if (!response.ok) {
          // Handle the case where the server returns an error status
          alert(`Failed to add user. Status: ${response.status}`)
          console.error(`Failed to add user. Status: ${response.status}`);
          return;
        }
        
        // If the request is successful, you can handle the response if needed
        const addedAvatar = await response.json();
        alert(`${userData.name} has successfully created ${avatarName}`)
        console.log("User added:", addedAvatar);
        
        // You may want to update your user list or perform other actions here
      } catch (error) {
        alert("Error Creating Character")
        console.error("Error adding user:", error);
      }

  } else{
    alert("please login to save your Create a Character")
  }
}

  return (
    <>
    <div className='container'>

    <div className='submitBox'>
    <input className='avatarNameInput' 
      placeholder='Avatar Name...'
      value={avatarName}
      onChange={(e)=>{setAvatarName(e.target.value)}}
      />
      <Button onClick={handleSubmit}>Create Character</Button>
      </div>
      <div className='submitBox'>

    <div className='createbox'>
      
    <div className='buttonCol'>
      <Button onClick={leftHeadClick} >Head left</Button>
      <Button onClick={leftBodyClick}>Body</Button>
      <Button onClick={leftLegClick}>Legs</Button>
    </div>
    <div className='characterPage'>
      <CharDisplay head={head} body = {body} leg = {leg}/>
      
    </div>
    <div className='buttonCol'>
      <Button onClick={rightHeadClick}>Head right</Button>
      <Button onClick={rightBodyClick}>Body</Button>
      <Button onClick={rightLegClick}>Legs</Button>
    </div>
    </div>
      </div>
    
      </div>
    </>
  )
}

export default Create
