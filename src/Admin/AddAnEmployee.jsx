
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

import useUser from "../hooks/useUser";
import useNotInATeam from "../hooks/useNotInATeam";
import { FaUser } from "react-icons/fa";

import { GrUserAdmin } from "react-icons/gr";
import usePayments from "../hooks/usePayments";
import { useEffect, useState } from "react";
import useTeamMembers from "../hooks/useTeamMembers";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";




const AddAnEmployee = () => {
    const [notInATeam, refetch] = useNotInATeam()
    const [databaseUser] = useUser()
    const [payments] = usePayments()
    const [teamMembers, redone] = useTeamMembers()
    const navigate= useNavigate()


    console.log("Tomar payments")
    
    const {
        register,
        handleSubmit,
        
        reset
    } = useForm();


    const [memberLimit, setMemberLimit] = useState()
    useEffect(() => {
        const limit = payments.reduce((packages, item) => packages + item.package, 0)
        setMemberLimit(limit)
    }, [payments])
   console.log("tomar member limit",memberLimit)


    const axiosPublic = useAxiosPublic()


    const handleAddtoTeam = async (data) => {

        const userInfo = {
            name: data.name,
            birthDay: data.birthDay,
            role: data.role,
            companyName: databaseUser?.companyName,
            photoURL: data.photoURL,
            companyLogo:databaseUser.companyLogo



        }
        const member = await axiosPublic.patch(`/users/${data.email}`, userInfo)
        if (member.data.modifiedCount > 0) {
            console.log('User added to the team')
            refetch()
            redone()

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully added to the team',
                showConfirmButton: false,
                timer: 1500
            });

        }
    }


    const onSubmit = async (data) => {
      const  updatedInfo={
                    name: databaseUser.name,
                    birthDay: databaseUser.birthDay,
                    companyName:databaseUser.companyName,
                    role:databaseUser.role,
                    photoURL:databaseUser.photoURL,
                    package:data.package,
                    companyLogo:databaseUser.companyLogo
                    
        }
        const res= await axiosPublic.patch(`/users/${databaseUser.email}`, updatedInfo)
        if(res.data.modifiedCount>0){
            
            refetch()

            console.log("you are ready to buy package")
            navigate('/dashBoard/payment')
            reset()

        }


    }













    return (
        <div>
            <div>
                <p className="font-bold text-xl text-[#175f82] text-center">Member Limit : {memberLimit}</p>
                <p className="font-bold text-xl text-[#175f82] text-center">Team member count:{teamMembers.length}</p>

            </div>
            <div>
                <form className="border-2 p-5 rounder-lg" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-xl w-full p-5 font-bold bg-[#175f82] text-white text-center">Increase member limit</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold">Select a package</span>
                        </label>
                        <select required id="package" {...register("package", { required: true })} className=" select select-bordered w-full">
                            <option value="5">5 Members for $5</option>
                            <option value="8">10 Members for $8</option>
                            <option value="15">20 Members for $15</option>
                        </select>
                        <button type="submit" className="btn text-white bg-[#175f82]">Buy</button>
                    </div>



                </form>

            </div>
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
                                                <button className="btn-sm hover:bg-slate-400">
                                                    <GrUserAdmin></GrUserAdmin>
                                                </button>

                                            </>
                                            :
                                            <>
                                                <button className="btn-sm hover:bg-slate-400"><FaUser></FaUser></button>
                                            </>
                                    }


                                </td>
                                <th>
                                    <button
                                        disabled={teamMembers.length >= memberLimit}
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