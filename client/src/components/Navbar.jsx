
    import React, {useState} from 'react'
    import { Link } from 'react-router-dom'
    import { NavLink } from 'react-router-dom'
    import "./Navbar.css"
    import {GiAbstract049} from "react-icons/gi" //find a seperate icon for logo
    import {FaBars, FaTimes} from "react-icons/fa"
    import {IconContext} from "react-icons"
    
    
    const Navbar = () => {
      const[click, setClick] = useState(false)
    
      const handleClick = () =>  setClick(!click)
      const closeMobileMenu = () => {setClick(false); window.scrollTo(0, 0)}
        
      
      
      return (
        <>
          <IconContext.Provider value={{color:""}}>
          
            <nav className="navbar">
                <div className="navbar-container container">
                    <Link to="/" className='navbar-logo' onClick={closeMobileMenu} style={{'marginBottom': '2%'}}>
                        Project
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                     
                    </div>
                    <ul className={click? "nav-menu active": "nav-menu"}>
                      <li className='nav-item'>
                        <NavLink to="/" className={({ isActive }) => "nav-links" + (isActive? " activated": '')} onClick={closeMobileMenu}>
                          Home
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/login" className={({ isActive }) => "nav-links" + (isActive? " activated": '')} onClick={closeMobileMenu}>
                          Login
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/create" className={({ isActive }) => "nav-links" + (isActive? " activated": '')} onClick={closeMobileMenu}>
                          Create Character
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/quest" className={({ isActive }) => "nav-links" + (isActive? " activated": '')} onClick={closeMobileMenu}>
                          Current World
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink to="/profile" className={({ isActive }) => "nav-links" + (isActive? " activated": '')} onClick={closeMobileMenu}>
                          profile
                        </NavLink>
                      </li>
                      
                    </ul>
                </div>
            </nav>
            
          </IconContext.Provider>
        </>
      )
    }
    
    export default Navbar
    