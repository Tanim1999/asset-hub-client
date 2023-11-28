import { useForm } from "react-hook-form";
import useAssets from "../hooks/useAssets";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";



const RequestForAnAsset = () => {
    const [assets] = useAssets()
    const { user } = useAuth()
    console.log("yo mama", assets)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        

    } = useForm()



    const onSubmit = async (data) => {
        
        try{
            console.log("bla bla", data)




            // now send the asset item data to the server with the image url
            const assetItem = {
                AssetName: data.productName,
                AssetType: data.productType,
                EmailOfRequester: user.email,
                NameOfRequester: user.displayName,
                RequestDate: user.metadata.lastSignInTime,
                AdditionalNote: data.reason
    
    
    
            }
            console.log("assetItem", assetItem)
            // 
            const request = await useAxiosPublic.post('/requests', assetItem);
            console.log("sha lala la", request.data)
            if (request.data.insertedId) {
                // show success popup
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} Request successful.`,
                    showConfirmButton: false,
                    timer: 1500
                });
    
            }
        }
        
        
         catch (error) {
            console.error("Error submitting form:", error);
          }

    };





    return (
        <div>
            <h2>Request for an asset</h2>
            <div className="overflow-x-auto">
                <table className="table   w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Asset name</th>
                            <th>Asset Type</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assets.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>

                                <td>
                                    {item.productNAme}
                                </td>
                                <td>
                                    {item.productType}
                                </td>
                                {
                                    item.quantity > 0 ?
                                        <>
                                            <td>

                                                Available

                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>Out of stock</td>
                                        </>

                                }

                                <td>
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button  className="btn" onClick={() => document.getElementById(item._id).showModal()}>Request</button>
                                    <dialog id= {item._id} className="modal">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg">Why you need this {item.name}?</h3>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-control">
                                                    <input name="productName" {...register("productName")} readOnly defaultValue={item.productNAme} />
                                                </div>
                                                <div className="form-control">
                                                    <input name="productType" {...register("productType")} readOnly defaultValue={item.productType} />
                                                </div>
                                                <div className="form-control">
                                                    <textarea name="reason" {...register("reason", { required: true })}
                                                        className="textarea textarea-info" placeholder="Your reason...">
                                                        {errors.reason && <span>This field is required</span>}
                                                    </textarea>

                                                </div>
                                                <div className=" form-control">
                                                    <button key={item._id} type="submit" className="btn text-white bg-[#175f82]">Request</button>
                                                </div>





                                            </form>

                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}

                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>

                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestForAnAsset;