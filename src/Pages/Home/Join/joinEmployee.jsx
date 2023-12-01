import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from 'react-hook-form';
import { AuthContext } from "../../../ContextApi/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const JoinEmployee = () => {
    const {createUser,updateUserProfile} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
      } = useForm();


      const onSubmit= data =>{
        console.log(data)
        createUser(data.email,data.password)
        .then(result=>{
            const loggedUser= result.user;
            console.log(loggedUser)
            updateUserProfile(data.name)
            .then(() => {
                // create user entry in the database
                const userInfo = {
                    name: data.name,
                    email: data.email,
                    birthDay: data.bday,
                    role : "employee",
                    companyName:"none"

                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log('user added to the database')
                            reset();
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'User created successfully.',
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/logIn');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'error',
                            title: error.message ,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })


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
                                    <h1 className="text-3xl text-center text-white font-bold">Join as employee</h1>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Full Name</span>
                                        </label>
                                        <input type="text" {...register("name",{ required: true })}  name='name' placeholder="email" className="input input-bordered" required />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Email</span>
                                        </label>
                                        <input type="email" {...register("email",{ required: true })}  name='email' placeholder="email" className="input input-bordered" required />
                                        {errors.email && <span className=" text-red-600">email is required</span>}

                                    </div>
                                    
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Password</span>
                                        </label>
                                        <input type="password" {...register("password",{ required: true, 
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            minLength:6,
                                            maxLength:20 } )} name='password' placeholder="password" className="input input-bordered" required />

                                        {errors.password?.type=='minLength' && <span className="text-red-500 border-4 max-w-fit p-2 border-red-600 bg-white alert-error font-bold">Minimum password length is 6</span>}
                                        {errors.password?.type=='maxLength' && <span className=" text-red-500 border-4 max-w-fit p-2 border-red-600 bg-white alert-error font-bold">Maximum password length is 20</span>}
                                        {errors.password?.type=='pattern' && <span className="text-red-500 border-4 max-w-fit p-2 border-red-600 bg-white alert-error font-bold">Minimum 1 Uppercase,1 lower case, 1 special character,1 number needed</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Date of Birth</span>
                                        </label>
                                        <input type="date" {...register("bday",{ required: true })}  name='bday' placeholder="Birth date" className="input input-bordered" required />
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

export default JoinEmployee;