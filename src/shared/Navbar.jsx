import { NavLink } from "react-router-dom";
import logo from '../assets/logo/logo.jpeg'
import ThemeToggle from "./Themetoggle";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const Navbar = () => {
    
    const { user,logOut } = useContext(AuthContext)
   const handleLogout =() =>{
        logOut()
        .then(()=>{})
        .catch(error => console.log(error))
    }
    const axiosPublic = useAxiosPublic();
    const {data: currentUser = [] } = useQuery({
        queryKey: ['currentUser',user?.email,], 
        queryFn: async() =>{
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
            
        }
        
    })
    console.log("server database:",currentUser)
    


    const navOptions = 
    <>
       <li><NavLink to="/">home</NavLink></li>
       <li><NavLink to="/joinEmployee">Join as Employee</NavLink></li>
       <li><NavLink to="/joinAdmin">Join as Admin</NavLink></li>
       {
         user?  <> 
                   <button onClick={handleLogout} className="btn text-white bg-[#175f82]">Logout</button>
               </>

         : 
         <>
         <li><NavLink to="/logIn">Login</NavLink>
         </li></>
         
       }
       

    </>
    return (
        <div className="navbar max-w-screen-xl mx-auto bg-[#175f82] ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navOptions}
                    </ul>
                </div>
                
                <div className="avatar">
                    <div className="w-10 rounded-full">
                        <img src={logo} /> 
                    </div>
                </div>
                <span className="text-lg font-bold ml-3 text-white">Dream Asset Hub</span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" menu-horizontal gap-6 text-white uppercase font-bold
                 px-1">
                    {navOptions}
                   {user&& <p>{user.email}</p>}  
                </ul>
            </div>
            <div className="navbar-end">
                <ThemeToggle></ThemeToggle>
            </div>
        </div>
    );
};

export default Navbar;