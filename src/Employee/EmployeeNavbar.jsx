import { NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";
import ThemeToggle from "../shared/Themetoggle";


const EmployeeNavbar = () => {
    const currentUser = useUser()
    console.log("server data",currentUser[0].name)

    const navOptions =
        <>
            <li><NavLink to="/employee/employeeHome">home</NavLink></li>
            <li><NavLink to="/employee/employeeMyTeam">My Team</NavLink></li>
            <li><NavLink to="/employee/myAssets">My Assets</NavLink></li>
            <li><NavLink to="/employee/reqForAsset">Request for an Asset</NavLink></li>
            <li><NavLink to="/employee/makeCustomReq">MakeCustom request</NavLink></li>
            <li><NavLink to="/employee/employeeProfile">Profile</NavLink></li>
             <li><ThemeToggle></ThemeToggle></li>


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
                {currentUser?.companyLogo && <>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={currentUser[0]?.companyLogo} />
                        </div>
                    </div>
                </>}

                <span className="text-lg font-bold ml-3 text-white">Dream Asset Hub</span>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className=" menu-horizontal gap-6 text-white uppercase font-bold
                 px-1">
                    {navOptions}

                </ul>
            </div>
            
        </div>
    );
};

export default EmployeeNavbar;