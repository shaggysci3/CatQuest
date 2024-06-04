   
import { useOutletContext } from 'react-router-dom';
import DeleteUser from '../components/deleteUser';
import NewUser from '../components/newUser';
import PatchUser from '../components/patchUser';
import './Home.css';
import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
  
    

    const Home = () => {
      // states
      const[userData,setUserData]=useOutletContext()
      
      
      useEffect(() => {
        console.log(`${userData?userData:"userNoData"}`)
      }, []); 

      // boostrap
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
      
      return (
        <>
        <div style={{backgroundImage:"url(../src/assets/homepage.png)", height:"54rem",}}>
          
          <div style={{borderTop:"solid",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <h1>Chimera</h1>
          <h3>the characterr creation and chatting site</h3>
          </div>

        
        <Button style={{position:"absolute", top:"15rem",left:"55rem"}}   variant='primary' onClick={handleShow} >
            Sign up
        </Button>
        <Modal style={{maxWidth:"80px"}} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Create World</Modal.Title>
            </Modal.Header>
            <NewUser/>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

        <div style={{position:"absolute", top:"54.3rem",outline: "4px solid #67626a",width:"120rem"}}>
        <Button href="/login" style={{top:"1rem",scale:"100%",position:"absolute",left:"55.5rem",backgroundColor:"#2c4a83",boxShadow:"0 10px 15px -5px #00adff, 0 4px 6px -4px #00adff"}}>
          login
        </Button>
        </div>
      
        
        
        {/* <DeleteUser/> */}
        
        </div>
        </>
        
      )
    }
    
    export default Home
    