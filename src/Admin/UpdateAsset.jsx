import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
// import useReqID from "../hooks/useReqId";



const UpdateAsset = () => {
  const  {productNAme,quantity,_id}=useLoaderData()
//   const [request,reReqId]= useReqID()
  const axiosPublic= useAxiosPublic()
  const navigate= useNavigate()



    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    
    const onSubmit = async (data) => {
        console.log(data)
        
        // const updatedInfo = {
        //     status: "approved",
        //     actionDate: new Date().toISOString(),
        //     quantity: quantity - 1
        // }
            
            const assetItem = {
                productNAme: data.productName,
                productType: data.productType,
                quantity: parseInt(data.productQuantity),
                
                


            
                
            }
             
            const asset = await axiosPublic.patch(`/assets/${_id}`, assetItem);
            console.log("updated asset:",asset.data)
            if (asset.data.modifiedCount>0) {
                
                
                reset()
                navigate("/dashboard/assetList")
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.productName} is updated successfully.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            
        }
    
    };


    return (
        <div className=" min-h-screen mx-auto">
        <Helmet><title>Update asset</title></Helmet>
        <div>
                <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://i.ibb.co/tcd4KVH/login.jpg)' }}>
                    <div className="hero-content flex-col lg:flex-row">

                        <form onSubmit={handleSubmit(onSubmit)} >
                            <div className="card flex-shrink-0 w-96 border-[2px] bg-black bg-opacity-40 shadow-none border-slate-500    ">
                                <div className="card-body">
                                    <h1 className="text-3xl text-center text-white font-bold">Update asset</h1>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product name</span>
                                        </label>
                                        <input type="text" {...register("productName", { required: true })} placeholder="Product Name" className="input input-bordered" required defaultValue={productNAme} />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product type</span>
                                        </label>
                                        <select  required id="package" {...register("productType", { required: true })} className=" select select-bordered w-full">
                                        <option value="Returnable">Returnable</option>
                                        <option value="Non-returnable">Non-returnable</option>
                                    
                                        </select>
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product quantity</span>
                                        </label>
                                        <input defaultValue={quantity} required type="number" {...register('productQuantity', { required: true })} placeholder="Product quantity" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                   


                                    <div className="form-control mt-6">
                                        <button  type=' submit' className="btn text-white bg-[#175f82]">Update</button>
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

export default UpdateAsset;