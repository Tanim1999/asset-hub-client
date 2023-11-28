import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";


const MakeCustomRequest = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    
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



        // send the asset item data to the server with the image url
        const requestItem = {
            AssetName: data.AssetName,
            Price: data.price,
            AssetType: data.AssetType,
            AssetImage: res.data.data.display_url,
            WhyYouNeedThis: data.reason,
            AdditionalInformation: data.info,
            requestType: "custom",
            EmailOfRequester: user.email




        }
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
        <div className=" min-h-screen mx-auto">
            <Helmet><title>Make customReq</title></Helmet>
            <div>
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/tcd4KVH/login.jpg)' }}>
                    <div className="hero-content flex-col lg:flex-row">

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                                <div className="card-body">
                                    <h1 className="text-3xl text-center text-white font-bold">Add an asset</h1>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Asset Name</span>
                                        </label>
                                        <input type="text" {...register("AssetName", { required: true })} placeholder="Product Name" className="input input-bordered" required />
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
                                        <select id="package" {...register("assetType", { required: true })} className=" select select-bordered w-full">
                                            <option value="1">Returnable</option>
                                            <option value="2">Non-returnable</option>

                                        </select>
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Asset image</span>
                                        </label>
                                        <input type="file" {...register('image', { required: true })} placeholder="Asset image" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    
                                    <div className="form-control">
                                    <label className="label">
                                            <span className="label-text text-white font-bold">Why you need this</span>
                                        </label>
                                        <textarea name="reason" {...register("reason", { required: true })}
                                            className="textarea textarea-info" placeholder="Your reason...">
                                            {errors.reason && <span>This field is required</span>}
                                        </textarea>

                                    </div>
                                    <div className="form-control">
                                    <label className="label">
                                            <span className="label-text text-white font-bold">Additional information </span>
                                        </label>
                                        <textarea name="reason" {...register("info", { required: true })}
                                            className="textarea textarea-info" placeholder="Your reason...">
                                            {errors.reason && <span>This field is required</span>}
                                        </textarea>

                                    </div>





                                    <div className="form-control mt-6">
                                        <button  type=' submit' className="btn text-white bg-[#175f82]">Request</button>
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

export default MakeCustomRequest;