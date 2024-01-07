import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../../ContextApi/AuthProvider";


const JoinAdmin = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();


    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log("uploaded image", res.data.data.display_url
        )

        const authResult = await createUser(data.email, data.password);
        const loggedUser = authResult.user;
        console.log("Logged user information", loggedUser);

        
        await updateUserProfile(data.name);

        //  Creating user entry in the database
        const userInfo = {
            name: data.name,
            companyName: data.companyName,
            companyLogo: res.data.data.display_url, 
            email: data.email,
            birthDay: data.bday,
            role: "admin",
            package: data.package
        };

        const dbResponse = await axiosPublic.post('/users', userInfo);

        if (dbResponse.data.insertedId) {
            console.log('User added to the database');
            reset();
            navigate('/dashboard/payment');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'User created successfully.',
                showConfirmButton: false,
                timer: 1500

            });
            navigate('/dashboard/payment');
        } else {
            throw new Error('Failed to add user to the database');
        }
    }  




return (
    <div className=" min-h-screen mx-auto">
        <Helmet><title>join admin</title></Helmet>
        <div>
            <div className="hero min-h-screen bg-contain" style={{ backgroundImage: 'url(https://i.ibb.co/3dX8LzF/9bc4cac0-d695-4c1c-94e7-93d54c4f40a5.jpg)' }}>
                <div className="hero-content flex-col lg:flex-row">

                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                            <div className="card-body">
                                <h1 className="text-3xl text-center text-white font-bold">Join as admin</h1>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Full Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" required />
                                    {errors.name && <span>This field is required</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Company Name</span>
                                    </label>
                                    <input type="text" {...register("companyName", { required: true })} name='companyName' placeholder="Company name" className="input input-bordered" required />
                                    {errors.name && <span>This field is required</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Company logo</span>
                                    </label>
                                    <input type="file" {...register('image', { required: true })} placeholder="Company Logo" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                                    {errors.name && <span>This field is required</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" required />
                                    {errors.email && <span className=" text-red-600">email is required</span>}

                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Password</span>
                                    </label>
                                    <input type="password" {...register("password", {
                                        required: true,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                        minLength: 6,
                                        maxLength: 20
                                    })} name='password' placeholder="password" className="input input-bordered" required />

                                    {errors.password?.type == 'minLength' && <span className="text-red-500 border-4 max-w-fit p-2 border-red-600 bg-white alert-error font-bold">Minimum password length is 6</span>}
                                    {errors.password?.type == 'maxLength' && <span className=" text-red-500 border-4 max-w-fit p-2 border-red-600 bg-white alert-error font-bold">Maximum password length is 20</span>}
                                    {errors.password?.type == 'pattern' && <span className="text-red-500 border-4 max-w-fit p-2 border-red-600 bg-white alert-error font-bold">Minimum 1 Uppercase,1 lower case, 1 special character,1 number needed</span>}

                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Date of Birth</span>
                                    </label>
                                    <input type="date" {...register("bday", { required: true })} name='bday' placeholder="Birth date" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-white font-bold">Select a package</span>
                                    </label>
                                    <select required id="package" {...register("package", { required: true })} className=" select select-bordered w-full">
                                        <option value="5">5 Members for $5</option>
                                        <option value="8">10 Members for $8</option>
                                        <option value="15">20 Members for $15</option>
                                    </select>
                                </div>
                                <div className="form-control mt-6">
                                    <button value=" login" type=' submit' className="btn text-white bg-[#175f82]">Join</button>
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

export default JoinAdmin;