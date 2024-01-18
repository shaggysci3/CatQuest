
import React, { useEffect, useState } from 'react'
import AvatarCard from '../components/avatarCard';
import WorldCard from './worldCard';
import NewWorld from './newWorld';
import { Button, Modal } from 'react-bootstrap';




const Worlds = () => {
  const [worlds,setWorlds]=useState([])
  
  useEffect(() => {  
    const fetchWorlds = async () => {
      const response = await fetch("http://127.0.0.1:5555/worlds");
      const UsrArr = await response.json();
      setWorlds(UsrArr);
    };
    fetchWorlds().catch(console.error);
  }, []);
  console.log(worlds)
  const world = worlds.map(world=>{
    return <WorldCard key={world.id} world={world}/>
  })


  // boostrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div>
        <Button variant='primary' onClick={handleShow} >
            Add New World
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create World</Modal.Title>
            </Modal.Header>
            <NewWorld worlds={worlds} setWorlds={setWorlds}/>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    </div>
    <div className='cardDisplay'>
        {world}
    </div>
    </>
  )
}

export default Worlds