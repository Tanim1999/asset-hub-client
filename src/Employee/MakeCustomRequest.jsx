import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";


const MakeCustomRequest = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const [databaseUser] = useUser()


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset

    } = useForm()


    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        console.log("uploaded image", res.data.data.display_url
        )



        // sending the asset item data to the server with the image url
        const requestItem = {
            assetName: data.AssetName,
            price: data.price,
            assetType: data.assetType,
            assetImage: res.data.data.display_url,
            additionalNote: data.reason,
            requestType: "custom",
            emailOfRequester: user.email,
            nameOfRequester:databaseUser.name,
            companyName: databaseUser.companyName,
            status:"pending",
            requestDate: new Date().toISOString()





        }
        console.log("ja pathabo,requestItem")
        // 
        const request = await axiosPublic.post('/requests', requestItem);
        console.log(request.data)
        if (request.data.insertedId) {
            // show success popup
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is added to the menu.`,
                showConfirmButton: false,
                timer: 1500
            });

        }

    };

    return (
        <div className="  mx-auto">
            {databaseUser.companyName === "none" ? <><p className="font-bold mx-auto p-5 w-[80%] text-3xl rounded-lg border-2 border-[#175f82]">You are not in any team. Please ask your admin to make you a team member</p>

            </>
                :
                <>
                    <Helmet><title>Make customReq</title></Helmet>
                    <div>
                        <div className="hero max-w-fit rounded-xl my-5" style={{ backgroundImage: 'url(https://i.ibb.co/7J3WL8j/208a834b-4fb7-4051-be24-341e1a1ef9a0.jpg)' }}>
                            <div className="hero-content flex-col lg:flex-row">

                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                                        <div className="card-body">
                                            <h1 className="text-3xl text-center text-white font-bold">Make custom request</h1>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-white font-bold">Asset Name</span>
                                                </label>
                                                <input type="text" {...register("AssetName", { required: true })} placeholder="Asset name" className="input input-bordered" required />
                                                {errors.name && <span>This field is required</span>}

                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-white font-bold">Price</span>
                                                </label>
                                                <input type="number" {...register("price", { required: true })} placeholder="Price" className="input input-bordered" required />
                                                {errors.name && <span>This field is required</span>}


                                                {errors.name && <span>This field is required</span>}

                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-white font-bold">Asset type</span>
                                                </label>
                                                <select required id="package" {...register("assetType", { required: true })} className=" select select-bordered w-full">
                                                    <option value="Returnable">Returnable</option>
                                                    <option value="Non-returnable">Non-returnable</option>

                                                </select>
                                                {errors.name && <span>This field is required</span>}

                                            </div>
                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-white font-bold">Asset image</span>
                                                </label>
                                                <input required type="file" {...register('image', { required: true })} placeholder="Asset image" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                                                {errors.name && <span>This field is required</span>}

                                            </div>

                                            <div className="form-control">
                                                <label className="label">
                                                    <span className="label-text text-white font-bold">Why you need this</span>
                                                </label>
                                                <textarea required name="reason" {...register("reason", { required: true })}
                                                    className="textarea textarea-info" placeholder="Your reason...">
                                                    {errors.reason && <span>This field is required</span>}
                                                </textarea>

                                            </div>






                                            <div className="form-control mt-6">
                                                <button type=' submit' className="btn text-white bg-[#43ACFF]">Request</button>
                                            </div>
                                            <br />


                                        </div>

                                    </div>

                                </form>


                            </div>
                        </div>
                    </div>
                </>
            }



        </div>
    );
};

export default MakeCustomRequest;