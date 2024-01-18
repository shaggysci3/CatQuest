import { useState } from "react";
import Create from "./Create"
import { Button, Modal, ModalBody } from "react-bootstrap";

const Lab = () => {
    // states
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    return (
      <>
      <div className="sciLab">
        
      <Button style={{position:"absolute", top:"42rem",left:"55.5rem",backgroundColor:"#2c4a83",boxShadow:"0 10px 15px -3px #00adff, 0 4px 6px -4px #00adff"}} variant="primary" onClick={handleShow}>
        Create New Avatar
      </Button>

      <Modal dialogClassName="sciModel" show={show} onHide={handleClose}>
        
        <Create/>

        
      </Modal>
      </div>
      </>
      
    )
  }
  
  export default Lab