
import React, { useState } from 'react'
import CharDisplay from '../components/charDisplay'
import newUser from '../components/newUser'



const Create = () => {
  const [head,setHead] = useState()
  const [body,setBody] = useState()
  const [legs,setLegs] = useState()

  const [bodyParts,setBodyParts]=useState({
    head:["headFrontCat.png","pandaHeadFull.png","rockHeadfull.png"],
    body:["torsoHuman.png"],
    legs:["legsChkn.png"]
  })
  function handleClick(){
    setHead(bodyParts.head[1])
    console.log(head)
  }
  

  return (
    <>
    <h1>Create Here</h1>
    <button onClick={handleClick}>testing arrays</button>
    <div className='createbox'>
    <div className='buttonCol'>
      <button>Head left</button>
      <button>Body</button>
      <button>Legs</button>
    </div>
    <div className='characterPage'>
      <CharDisplay head={head} body = {body} legs = {legs}/>
      
    </div>
    <div className='buttonCol'>
      <button>Head right</button>
      <button>Body</button>
      <button>Legs</button>
    </div>
    </div>
    </>
  )
}

export default Create
