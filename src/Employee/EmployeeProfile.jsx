import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../ContextApi/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useUser from "../hooks/useUser";





const EmployeeProfile = () => {
    const { updateUserProfile, user } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const [databaseUser, refetch] = useUser()
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();





    const onSubmit =async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log("uploaded image", res.data.data.display_url
        )
        

        updateUserProfile(data.name,res.data.data.display_url)
            .then(() => {
    
                const userInfo = {
                    name: data.name,

                    birthDay: data.bday,
                    role: databaseUser.role,
                    companyName: databaseUser.companyName,
                    photoURL:res.data.data.display_url



                }
                axiosPublic.patch(`/users/${user.email}`, userInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            console.log('user updated in the database')
                            refetch()
                            reset();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Your profile is updated',
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: error.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })


            })

    }





    return (
        <div className=" min-h-screen mx-auto">
            <Helmet><title>join employee</title></Helmet>
            <div>
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/tcd4KVH/login.jpg)' }}>
                    <div className="hero-content flex-col lg:flex-row">

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                                <div className="card-body">
                                    <h1 className="text-3xl text-center text-white font-bold">Edit Profile</h1>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Full Name</span>
                                        </label>
                                        <input type="text" {...register("name", { required: true })} defaultValue={databaseUser?.name} name='name' placeholder="email" className="input input-bordered" required />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Email</span>
                                        </label>
                                        <input type="email" {...register("email", { required: true })} defaultValue={user.email} readOnly name='email' placeholder="email" className="input input-bordered" required />
                                        {errors.email && <span className=" text-red-600">email is required</span>}

                                    </div>


                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Date of Birth</span>
                                        </label>
                                        <input type="date" {...register("bday", { required: true })} defaultValue={databaseUser.birthDay} name='bday' placeholder="Birth date" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Profile picture</span>
                                        </label>
                                        <input type="file" defaultValue={databaseUser.photoURL} {...register('image', { required: true })} placeholder="Asset image" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control mt-6">
                                        <button value=" login" type=' submit' className="btn text-white bg-[#175f82]">Update</button>
                                    </div>
                                    <br />


                                </div>

                            </div>

                        </form>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default EmployeeProfile;