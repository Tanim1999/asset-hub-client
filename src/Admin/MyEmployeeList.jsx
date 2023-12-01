import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useTeamMembers from "../hooks/useTeamMembers";
import { FaUser } from "react-icons/fa";


const MyEmployeeList = () => {

    const [teamMembers, redone] = useTeamMembers()

    console.log("meet my team",teamMembers)

    const axiosPublic = useAxiosPublic()


    const handleRemove = async (data) => {

        const userInfo = {
            name: data.name,
            birthDay: data.birthDay,
            role: "employee",
            companyName: "none",
            photoURL: data.photoURL

        }



        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove from the team"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const member = await axiosPublic.patch(`/users/${data.email}`, userInfo)
                if (member.data.modifiedCount > 0) {
                    console.log('user updated in the database')
                    redone()


                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully removed from the team',
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            }
        });





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
            redone()


            // Swal.fire({
            //     position: 'top-end',
            //     icon: 'success',
            //     title: `${data.name} role set to admin`,
            //     showConfirmButton: false,
            //     timer: 1500
            // });

        }
    }








    return (
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
                            <th>Remove from the team</th>
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
                                    {
                                        employee.role === "admin" ?
                                            <>
                                                <p>
                                                    admin
                                                </p>

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
                                        onClick={() => handleRemove(employee)}
                                        disabled={employee.role === "admin"}

                                    >
                                        Remove
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

export default MyEmployeeList;