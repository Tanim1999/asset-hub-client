import { FaUser } from "react-icons/fa";

import useTeamMembers from "../hooks/useTeamMembers";
import useUser from "../hooks/useUser";
import UpComingEvents from "../components/upComingEvents";



const EmployeeMyTeam = () => {
    const [teamMembers,,,isPending,] = useTeamMembers()
    const [databaseUser] = useUser()
    console.log("meet my team",teamMembers)
    if(isPending){
        return <progress className="progress w-56"></progress>
    } 

    return (
        

        <div>
            {databaseUser.companyName === "none" ? <><p className="font-bold mx-auto p-5 w-[80%] text-3xl rounded-lg border-2 border-[#175f82]">You are not in any team. Please ask your admin to make you a team member</p>

            </>
                :
                <>
                    
                    <UpComingEvents></UpComingEvents>
                    <div className="my-5">
                        <div>
                            <h2 className='text-3xl text-[#175f82] font-bold text-center my-5'>My Team</h2>
                            <div className="overflow-x-auto">
                                <table className="table w-full">
                                    <thead className='bg-[#175f82] text-white'>
                                        <tr>
                                            <th>#</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Type</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {teamMembers.map((employee, index) => (
                                            <tr key={employee._id}>
                                                <th>{index + 1}</th>
                                                <td> <div className="mask mask-squircle w-12 h-12">
                                                    {employee.photoURL ?
                                                        <><img src={employee.photoURL} alt="Avatar Tailwind CSS Component" /></>
                                                        :
                                                        <><FaUser className="w-full h-full"></FaUser></>}

                                                </div></td>
                                                <td>{employee.name}</td>
                                                <td>
                                                    {employee.role}


                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>



                        </div>

                    </div>

                </>
            }


        </div>
    );
};

export default EmployeeMyTeam;