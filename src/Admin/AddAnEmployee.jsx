
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

import useUser from "../hooks/useUser";
import useNotInATeam from "../hooks/useNotInATeam";
import { FaUser } from "react-icons/fa";




const AddAnEmployee = () => {
    const [notInATeam, refetch] = useNotInATeam()
    const [databaseUser] = useUser()
    console.log(notInATeam)

    const axiosPublic = useAxiosPublic()


    const handleAddtoTeam = async (data) => {

        const userInfo = {
            name: data.name,
            birthDay: data.birthDay,
            role: data.role,
            companyName: databaseUser?.companyName,
            photoURL: data.photoURL



        }
        const member = await axiosPublic.patch(`/users/${data.email}`, userInfo)
        if (member.data.modifiedCount > 0) {
            console.log('user updated in the database')
            refetch()


            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully added to the team',
                showConfirmButton: false,
                timer: 1500
            });

        }
    }

    const handleMakeAdmin = async (data) => {

        const userInfo = {
            name: data.name,
            birthDay: data.birthDay,
            role: "admin",
            companyName: data.companyName,
            photoURL: data.photoURL



        }
        const member = await axiosPublic.patch(`/users/${data.email}`, userInfo)
        if (member.data.modifiedCount > 0) {
            console.log('user updated in the database')
            refetch()


            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'success',
            //     title: `${data.name} role set to admin`,
            //     showConfirmButton: false,
            //     timer: 1500
            // });

        }
    }








    const handleMakeEmployee = async (data) => {

        const userInfo = {
            name: data.name,
            birthDay: data.birthDay,
            role: "employee",
            companyName: data.companyName,
            photoURL: data.photoURL



        }
        const member = await axiosPublic.patch(`/users/${data.email}`, userInfo)
        if (member.data.modifiedCount > 0) {

            refetch()


            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'success',
            //     title: `${data.name} role is now employee`,
            //     showConfirmButton: false,
            //     timer: 1500
            // });

        }
    }





    return (
        <div>
            <h2 className='text-3xl text-[#175f82] font-bold text-center my-5'>Add an employee</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-[#175f82] text-white'>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Make team member</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notInATeam.map((employee, index) => (
                            <tr key={employee._id}>
                                <th>{index + 1}</th>
                                <td> <div className="mask mask-squircle w-12 h-12">
                                    {employee.photoURL? 
                                    <><img src={employee.photoURL} alt="Avatar Tailwind CSS Component" /></>
                                    : 
                                    <><FaUser className="w-full h-full"></FaUser></>}
                                    
                                </div></td>
                                <td>{employee.name}</td>
                                <td>
                                    {
                                        employee.role === "admin" ?
                                            <>
                                                <button onClick={() => handleMakeEmployee(employee)} className="btn-sm hover:bg-slate-400">
                                                    admin
                                                </button>

                                            </>
                                            :
                                            <>
                                                <button onClick={() => handleMakeAdmin(employee)} className="btn-sm hover:bg-slate-400">employee</button>
                                            </>
                                    }


                                </td>
                                <th>
                                    <button
                                        className="btn"
                                        onClick={() => handleAddtoTeam(employee)}

                                    >
                                        ADD
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>



        </div>
    );
};

export default AddAnEmployee;