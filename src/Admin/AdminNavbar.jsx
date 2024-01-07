import { NavLink, Outlet } from "react-router-dom";
import ThemeToggle from "../shared/Themetoggle";
import useUser from "../hooks/useUser";
import { AuthContext } from "../ContextApi/AuthProvider";
import { useContext } from "react";
import { FaUser } from "react-icons/fa";



const AdminNavbar = () => {


    const [databaseUser] = useUser()
    console.log("server data user role", databaseUser, databaseUser?.role,databaseUser.companyName)
    const { logOut } = useContext(AuthContext)
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navOptions =
        databaseUser?.role === "admin" ?
        
            <>
                <li><NavLink to="/dashboard/home">home</NavLink></li>
                <li><NavLink to="/dashboard/myEmployee">My Employee List</NavLink></li>
                <li><NavLink to="/dashboard/addAnEmployee">Add an employee</NavLink></li>
                <li><NavLink to="/dashboard/assetList">Asset list</NavLink></li>
                <li><NavLink to="/dashboard/addAnAsset">Add an asset</NavLink></li>
                <li><NavLink to="/dashboard/allRequest">All Requests</NavLink></li>
                <li><NavLink to="/dashboard/customReq">Custom Request list</NavLink></li>
                <li><NavLink to="/dashboard/adminProfile">My profile</NavLink></li>
                <li>
                    <div className="flex">
                        <span>Theme:</span>
                        <ThemeToggle>
                        </ThemeToggle>
                    </div>

                </li>
                <li>
                    <button onClick={handleLogout} className="btn text-white bg-[#175f82]">Logout</button>

                </li>


            </>
            : <>
                <li><NavLink to="/dashboard/home">home</NavLink></li>
                <li><NavLink to="/dashboard/employeeMyTeam">My Team</NavLink></li>
                <li><NavLink to="/dashboard/myAssets">My Assets</NavLink></li>
                <li><NavLink to="/dashboard/reqForAsset">Request for an Asset</NavLink></li>
                <li><NavLink to="/dashboard/makeCustomReq">MakeCustom request</NavLink></li>
                <li><NavLink to="/dashboard/employeeProfile">Profile</NavLink></li>
                <li><ThemeToggle></ThemeToggle></li>
                <button onClick={handleLogout} className="btn text-white bg-[#175f82]">Logout</button>
                <li></li>



            </>

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">

                <label htmlFor="my-drawer-2" className="btn btn-primary bg-[#175f82] drawer-button lg:hidden">Open drawer</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#175f82] font-bold uppercase  text-white">
                {databaseUser.companyName=="none" || 
                        <>
                         <div className="flex my-5 item-center justify-center gap-5">
                         <div className="mask mask-squircle w-12 h-12 ">
                           <img src={databaseUser?.companyLogo} />
                            
                         
                            
                        
                            
                            </div>
                        <div className="font-bol flex items-center">{databaseUser?.companyName}</div>
                         </div>
                        </>}
                    <div className="flex items-center gap-3 my-5" >
                        
                        <div className="mask mask-squircle w-12 h-12">
                            {databaseUser?.photoURL?<><img src={databaseUser.photoURL} /></>
                            :
                            <>
                            <div className="mask mask-squircle w-12 h-12 text-2xl text-center">
                                <FaUser className="w-full h-full"></FaUser>
                            </div>
                            </>}
                        </div>
                        <div className="font-bold">{databaseUser?.name}</div>
                    </div>
                    {navOptions}

                </ul>

            </div>
        </div>
    );
};

export default AdminNavbar;