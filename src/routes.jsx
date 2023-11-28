import {
    createBrowserRouter,
    
  } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./Pages/home/home";
import JoinAdmin from "./Pages/Home/Join/joinAdmin";
import JoinEmployee from "./Pages/Home/Join/joinEmployee";
import LogIn from "./Pages/Login/LogIn";
import PrivateRoute from "./Routes/PrivateRoute";
import AdminMain from "./Admin/AdminMain";
import DashboardHome from "./Admin/DashboardHome";
import AddAnAsset from "./Admin/AddAnAsset";
import AddAnEmployee from "./Admin/AddAnEmployee";

import AllRequest from "./Admin/AllRequest";
import AssetList from "./Admin/AssetList";


import EmployeeMyAssets from "./Employee/EmployeeMyAssets";
import EmployeeMyTeam from "./Employee/EmployeeMyTeam";
import EmployeeProfile from "./Employee/EmployeeProfile";
import MakeCustomRequest from "./Employee/MakeCustomRequest";
import RequestForAnAsset from "./Employee/RequestForAnAsset";
import MyEmployeeList from "./Admin/MyEmployeeList";
import CustomRequestList from "./Admin/CustomRequestList";


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
    {
      path: 'dashboard',
      element: <PrivateRoute><AdminMain></AdminMain></PrivateRoute>,
      children: [
        // Admin user routes
        {
          path: 'home',
          element: <DashboardHome></DashboardHome>
        },
        {
          path: 'addAnAsset',
          element: <AddAnAsset></AddAnAsset>
        },
        {
          path: 'myEmployee',
          element: <MyEmployeeList></MyEmployeeList>
        },
        {
          path: 'addAnEmployee',
          element: <AddAnEmployee></AddAnEmployee>
        },
        
        {
          path: 'allRequest',
          element: <AllRequest></AllRequest>
        },
        {
          path: 'assetList',
          element: <AssetList></AssetList>
        },
        {
          path: 'customReq',
          element: <CustomRequestList></CustomRequestList>
        },
        // employee routes
        
        
        {
          path: 'myAssets',
          element: <EmployeeMyAssets></EmployeeMyAssets>
        },
        {
          path: 'employeeMyTeam',
          element: <EmployeeMyTeam></EmployeeMyTeam>
        },
        {
          path: 'employeeProfile',
          element: <EmployeeProfile></EmployeeProfile>
        },
        {
          path: 'makeCustomReq',
          element: <MakeCustomRequest></MakeCustomRequest>
        },
        {
          path: 'reqForAsset',
          element: <RequestForAnAsset></RequestForAnAsset>
        },
      ]

    },
    
  ]);