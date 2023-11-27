
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const AddAnAsset = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset

    } = useForm()


    const axiosPublic= useAxiosPublic()

    const onSubmit = async (data) => {
        console.log(data)
        
        
            // now send the menu item data to the server with the image url
            const assetItem = {
                productNAme: data.productName,
                productType: data.productType,
                quantity: parseInt(data.productQuantity),
            
                
            }
            // 
            const asset = await axiosPublic.post('/assets', assetItem);
            console.log(asset.data)
            if (asset.data.insertedId) {
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
            <Helmet><title>add asset</title></Helmet>
            <div>
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/tcd4KVH/login.jpg)' }}>
                    <div className="hero-content flex-col lg:flex-row">

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                                <div className="card-body">
                                    <h1 className="text-3xl text-center text-white font-bold">Add an asset</h1>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product name</span>
                                        </label>
                                        <input type="text" {...register("productName", { required: true })} placeholder="Product Name" className="input input-bordered" required />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product type</span>
                                        </label>
                                        <select id="package" {...register("productQuantity", { required: true })} className=" select select-bordered w-full">
                                        <option value="1">Returnable</option>
                                        <option value="2">Non-returnable</option>
                                    
                                        </select>
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product quantity</span>
                                        </label>
                                        <input type="number" {...register('productQuantity', { required: true })} placeholder="Product quantity" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                   


                                    <div className="form-control mt-6">
                                        <button value=" login" type=' submit' className="btn text-white bg-[#175f82]">Add</button>
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

export default AddAnAsset;