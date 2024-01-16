
      import * as React from "react";
      import { useState } from 'react';
      import { createRoot } from "react-dom/client";
      import {
        createBrowserRouter,
        RouterProvider
      } from "react-router-dom";
      import Home from "./routes/Home";
      import Navbar from "./components/Navbar";
      import { Outlet } from "react-router-dom";
      import ErrorPage from "./routes/ErrorPage";
      import "./App.css"
      import Login from "./routes/login";
      import Offcanvas from 'react-bootstrap/Offcanvas';
      import 'bootstrap/dist/css/bootstrap.min.css';
import Close from "./components/Close";
import Create from "./routes/Create";
import Profile from "./routes/Profile";
import Quest from "./routes/Quest";
import { useEffect } from "react";
      
      const AppLayout = () =>{
        const [show, setShow] = useState(false);
        const [isHammyClicked, setHammyClicked] = useState(false);


        const [userData,setUserData]= useState()


        const handleClose = () => { setHammyClicked(!isHammyClicked);setShow(false)};
        const handleShow = () => setShow(true);
        
        useEffect(() => {
          const storedUserStr= sessionStorage.getItem('token')
          if (storedUserStr){
          const storedUser = JSON.parse(storedUserStr) 
          setUserData(storedUser)
          console.log(storedUser)
          
        }}, []); 
//  use outlet context


        return(
          <>
          <Close handleShow = {handleShow} isHammyClicked = {isHammyClicked} setHammyClicked={setHammyClicked}/>
        <Offcanvas show={show} onHide={handleClose}>
        
          <Offcanvas.Header className="canvas">
          <Close handleShow = {handleClose}  isHammyClicked = {isHammyClicked} setHammyClicked={setHammyClicked}/>

          </Offcanvas.Header>
          <Offcanvas.Body>
          <Navbar />
          </Offcanvas.Body>
        </Offcanvas>
          
          <Outlet context={[userData, setUserData]}/>
          </>
        )
      }

      const router = createBrowserRouter([
        {
          
          
          element: <AppLayout/>,
        errorElement: <ErrorPage/>,
          children:[
            {
              path: "/",
              element: <Home/>
            },
            {
              path: "/login",
              element: <Login/>
            }
            ,
            {
              path: "/create",
              element: <Create/>
            },
            {
              path: "/quest",
              element: <Quest/>
            },
            {
              path: "/profile",
              element: <Profile/>
            }
          ]
        }
        
        
      
      ]);
      
      createRoot(document.getElementById("root")).render(
        <RouterProvider router={router} />
      );
    