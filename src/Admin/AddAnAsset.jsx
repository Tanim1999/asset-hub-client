
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useUser from "../hooks/useUser";


const AddAnAsset = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset

    } = useForm()

    const [databaseUser] = useUser()


    const axiosPublic = useAxiosPublic()

    const onSubmit = async (data) => {
        console.log(data)



        const assetItem = {
            productNAme: data.productName,
            productType: data.productType,
            quantity: parseInt(data.productQuantity),
            companyName: databaseUser.companyName,
            addedDate: new Date().toISOString(),




        }

        const asset = await axiosPublic.post('/assets', assetItem);
        console.log(asset.data)
        if (asset.data.insertedId) {

            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.productName} is added successfully.`,
                showConfirmButton: false,
                timer: 1500
            });

        }

    };

    return (
        <div className=" min-h-screen mx-auto">
            <Helmet><title>add asset</title></Helmet>
            <div>
                <div className="hero max-w-fit rounded-xl" style={{ backgroundImage: 'url(https://i.ibb.co/3dX8LzF/9bc4cac0-d695-4c1c-94e7-93d54c4f40a5.jpg)' }}>
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
                                        <select required id="package" {...register("productType", { required: true })} className=" select select-bordered w-full">
                                            <option value="Returnable">Returnable</option>
                                            <option value="Non-returnable">Non-returnable</option>

                                        </select>
                                        {errors.name && <span>This field is required</span>}

                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-white font-bold">Product quantity</span>
                                        </label>
                                        <input required type="number" {...register('productQuantity', { required: true })} placeholder="Product quantity" className="file-input file-input-bordered file-input-info w-full max-w-xs" />
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