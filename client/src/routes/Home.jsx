   
import { useOutletContext } from 'react-router-dom';
import DeleteUser from '../components/deleteUser';
import NewUser from '../components/newUser';
import PatchUser from '../components/patchUser';
import './Home.css';
import React, { useState, useEffect } from "react";
  
    

    const Home = () => {
      // states
      const[userData,setUserData]=useOutletContext()
      
      
      useEffect(() => {
        console.log(`${userData?userData:"userNoData"}`)
      }, []); 

      
      return (
        <>
        <NewUser/>
        <DeleteUser/>
        <PatchUser/>
        </>
        
      )
    }
    
    export default Home
    