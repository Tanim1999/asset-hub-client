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
import UpdateAsset from "./Admin/UpdateAsset";
import AdminRoute from "./Routes/AdminRoute";
import Payment from "./payment/Payment";
import AdminProfile from "./Admin/adminProfile";




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
          path: 'payment',
          element: <AdminRoute><Payment></Payment></AdminRoute>
        },
        {
          path: 'addAnAsset',
          element: <AdminRoute><AddAnAsset></AddAnAsset></AdminRoute>
        },
        {
          path: 'updateAsset/:id',
          element: <AdminRoute><UpdateAsset></UpdateAsset></AdminRoute>,
          loader: ({params}) => fetch(`https://dream-asset-hub-server.vercel.app/assets/${params.id}`)
        },

        {
          path: 'myEmployee',
          element: <AdminRoute><MyEmployeeList></MyEmployeeList></AdminRoute>
        },
        {
          path: 'addAnEmployee',
          element: <AdminRoute><AddAnEmployee></AddAnEmployee></AdminRoute>
        },
        
        {
          path: 'allRequest',
          element: <AdminRoute><AllRequest></AllRequest></AdminRoute>
        },
        {
          path: 'assetList',
          element: <AdminRoute><AssetList></AssetList></AdminRoute>
        },
        {
          path: 'customReq',
          element: <AdminRoute><CustomRequestList></CustomRequestList></AdminRoute>
        },
        {
          path: 'adminProfile',
          element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
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