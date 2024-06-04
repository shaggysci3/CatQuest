
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"
import {GiAbstract049} from "react-icons/gi" //find a seperate icon for logo
import {FaBars, FaTimes} from "react-icons/fa"
import {IconContext} from "react-icons"
import { Button, Nav } from 'react-bootstrap'
    
    
const Navbar = () => {
  const[click, setClick] = useState(false)
    
  const handleClick = () =>  setClick(!click)
  const closeMobileMenu = () => {setClick(false); window.scrollTo(0, 0)}
        
      
      
  return (
    <>
      <IconContext.Provider value={{color:""}}>
          
        <nav className="navbar">
          <div className="navbar-container container">
            <div className='selectedAvatar'>
              <NavLink to="/" className={`myNavi`} onClick={closeMobileMenu}>
                Home
              </NavLink>

              <NavLink to="/login" className={`myNavi`} onClick={closeMobileMenu}>
                  Login
              </NavLink>
              <NavLink to="/create" className={`myNavi`} onClick={closeMobileMenu}>
                Create Character
              </NavLink>
            </div>

            <div className='selectedAvatar'>
              <NavLink to="/quest" className={`myNavi`} onClick={closeMobileMenu}>
                Select Character
              </NavLink>

              <NavLink to="/profile" className={`myNavi`} onClick={closeMobileMenu}>
                profile
              </NavLink>
            </div>
          </div>
        </nav>
            
        </IconContext.Provider>
        </>
      )
    }
    
    export default Navbar
    