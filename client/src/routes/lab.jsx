import { useState } from "react";
import Create from "./Create"
import { Button, Modal, ModalBody } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const Lab = () => {
    // states
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (
      <>
      <div className="sciLab">
      
      <Button style={{scale:"140%",position:"absolute", top:"44.3rem",left:"55.5rem",backgroundColor:"#2c4a83",boxShadow:"0 10px 15px -3px #00adff, 0 4px 6px -4px #00adff"}} variant="primary" onClick={handleShow}>
        Create New Avatar
      </Button>
      <Button href="/quest" style={{scale:"84%",position:"absolute", top:"27.3rem",left:"18.5rem",backgroundColor:"#2c4a83",boxShadow:"0 10px 15px -5px #00adff, 0 4px 6px -4px #00adff"}}>
          Your Characters
        </Button>
        <Button href="/" style={{scale:"84%",position:"absolute", top:"27.3rem",left:"93.5rem",backgroundColor:"#2c4a83",boxShadow:"0 10px 15px -5px #00adff, 0 4px 6px -4px #00adff"}}>
          Home Page
        </Button>
      <Modal dialogClassName="sciModel" show={show} onHide={handleClose}>
        <Create/>  
      </Modal>
      </div>
      </>
      
    )
  }
  
  export default Lab