import { useState } from "react";



const Close = ({handleShow, isHammyClicked,setHammyClicked}) => {
    
    function HandleClick(){
        setHammyClicked(!isHammyClicked);
        handleShow()
      }
      
    

    
    return (
      <>
        <div className={`hammy ${isHammyClicked ? 'active' : 'hammy'}`} onClick={HandleClick}>
            <span className='sammy'></span>
            <span className='sammy'></span>
            <span className='sammy'></span>
          </div>
          <div className="ham" >
          
          </div>
        
        
      </>
    )
  }
  
  export default Close
  