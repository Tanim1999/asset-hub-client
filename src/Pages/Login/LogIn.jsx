import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../ContextApi/AuthProvider";
import { signInWithPopup } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";
import { FcGoogle } from "react-icons/fc";
// import useAdmin from "../../hooks/useAdmin";







const LogIn = () => {
    const axiosPublic = useAxiosPublic()
    const [ , refetch] = useUser()
    // const[isAdmin,isAdminLoading]=useAdmin()
    console.log("Type of refetch:", typeof refetch, refetch)
    


    const navigate = useNavigate()
    const { signIn, auth, provider} = useContext(AuthContext)


    const handleGoogleSignin = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const user = result.user
                console.log(user)
                const userInfo = {
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL,
                    companyName:"none",
                    role:"employee"
                }
                axiosPublic.post('/users', userInfo)
                 navigate('/dashboard/home')
                refetch()
                Swal.fire({
                    title: 'Success!',
                    text: 'Logged in successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                    
                })
               
                
                

                    

            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: "error",
                    confirmButtonText: 'Okay'
                })
            })

    }





    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value
        signIn(email, password)

            .then(result => {
                refetch()
                navigate('/dashboard/home')
                
                console.log(result.user)
                Swal.fire({
                    title: 'Success!',
                    text: 'Logged in successfully',
                    icon: 'success',
                    confirmButtonText: 'Okay'
                })

               
                e.target.reset()
               
                
                

            })
            .catch(error => {
                console.error(error)
                Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: "error",
                    confirmButtonText: 'Okay'
                })
            })
            
    };


    return (

        <div className=" min-h-screen">
            <Helmet><title>Login</title></Helmet>
            <div>
                <div className="hero min-h-screen bg-contain" style={{ backgroundImage: 'url(https://i.ibb.co/3dX8LzF/9bc4cac0-d695-4c1c-94e7-93d54c4f40a5.jpg)' }}>
                    <div className="hero-content flex-col lg:flex-row">

                        <form onSubmit={handleLoginSubmit} >
                            <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                                <div className="card-body">
                                    <h1 className="text-3xl text-center text-white font-bold">Login</h1>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Email</span>
                                        </label>
                                        <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Password</span>
                                        </label>
                                        <input type="password" name='password' placeholder="password" className="input input-bordered" required />

                                    </div>
                                    <div className="form-control mt-6">

                                        <button value=" login" type=' submit' className="btn text-white bg-[#175f82]">Login</button>
                                    </div>
                                    <br />


                                </div>
                                <p className="text-center my-5 text-white text-xl font-bold">Sign in with <button onClick={handleGoogleSignin} className="btn bg-[#175f82] text-white text-3xl font-bold"><FcGoogle></FcGoogle></button></p>
                            </div>

                        </form>


                    </div>
                </div>
            </div>

        </div>
    );
};

export default LogIn;