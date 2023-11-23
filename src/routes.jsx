import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./Pages/home/home";
import JoinAdmin from "./Pages/Home/Join/joinAdmin";
import JoinEmployee from "./Pages/Home/Join/joinEmployee";
import LogIn from "./Pages/Login/LogIn";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children:[
        {
            path: "/",
        element: <Home></Home>
        },
        {
            path: "/joinAdmin",
        element: <JoinAdmin></JoinAdmin>
        },
        {
            path: "/joinEmployee",
        element: <JoinEmployee></JoinEmployee>
        },
        {
            path: "/logIn",
        element: <LogIn></LogIn>
        },
      ]
    },
  ]);