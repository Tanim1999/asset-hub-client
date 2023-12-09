import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAssets from '../hooks/useAssets';
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';

const RequestForAnAsset = () => {
    const [assets] = useAssets();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic()
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [databaseUser]= useUser()



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const openModal = (asset) => {
        setSelectedAsset(asset);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAsset(null);
        setIsModalOpen(false);
        reset();
    };
    console.log(assets)

    const onSubmit = async (data) => {
        try {
            
            

            const assetItem = {
                assetName: data.productName,
                assetType: data.productType,
                emailOfRequester: user.email,
                nameOfRequester: user.displayName,
                requestDate: new Date().toISOString(), 
                additionalNote: data.reason,
                companyName: databaseUser.companyName,
                status: "pending",
                quantity:data.quantity,
                assetId: selectedAsset._id
            };

            
            const request = await axiosPublic.post('/requests', assetItem);

            if (request.data.insertedId) {
                console.log("ki req korle?",request)
                Swal.fire({
                    icon: 'success',
                    title: `${data.productName} request successful`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                closeModal();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            
        }
    };

    return (
        <div>
            {databaseUser.companyName==="none" ? <><p className="font-bold mx-auto p-5 w-[80%] text-3xl rounded-lg border-2 border-[#175f82]">You are not in any team. Please ask your admin to make you a team member</p>
             
             </>
             :
             <>
             <h2 className='text-3xl text-[#175f82] font-bold text-center my-5'>Request for an asset</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-[#175f82] text-white'>
                        <tr>
                            <th>#</th>
                            <th>Asset name</th>
                            <th>Asset Type</th>
                            <th>Availability</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.productNAme}</td>
                                <td>{item.productType}</td>
                                <td>{item.quantity > 0 ? 'Available' : 'Out of stock'}</td>
                                <th>
                                    <button
                                        className="btn"
                                        onClick={() => item.quantity > 0 && openModal(item)}
                                        disabled={item.quantity <= 0}
                                    >
                                        Request
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

    
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Request Asset Modal"
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
                onAfterClose={() => {
                    setSelectedAsset(null);
                    reset();
                }}
            >
                <h3 className="font-bold text-lg">Why do you need this asset?</h3>
                 <div className='card flex-shrink-0  border-[2px] shadow-none '>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#175f82] font-bold">Product name</span>
                        </label>
                        <input
                            name="productName"
                            {...register('productName')}
                            readOnly
                            defaultValue={selectedAsset?.productNAme}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#175f82] font-bold">Product Type</span>
                        </label>
                        <input
                            name="productType"
                            {...register('productType')}
                            readOnly
                            defaultValue={selectedAsset?.productType}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-[#175f82] font-bold">Available</span>
                        </label>
                        <input
                            type='number'
                            name="quantity"
                            {...register('quantity')}
                            readOnly
                            defaultValue={selectedAsset?.quantity}
                        />
                    </div>
                    <div className="form-control my-5">
                    <label className="label">
                            <span className="label-text text-[#175f82] font-bold">Reason</span>
                        </label>
                        <textarea
                            name="reason"
                            {...register('reason', { required: true })}
                            className="textarea textarea-info"
                            placeholder="Your reason..."
                            required
                        >
                            {errors.reason && <span>This field is required</span>}
                        </textarea>
                    </div>
                    <div className='flex w-full items-center justify-center '>
                        <div className=" flex-1 ">
                            <button type="submit" className="btn w-1/2 text-white bg-[#175f82]">
                                Request
                            </button>
                        </div>
                        <div className=" flex-1">
                            <button className="btn w-1/2 text-white bg-[#175f82]" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </form>
                 </div>

            </Modal>
             </>
             }
            
        </div>
    );
};

export default RequestForAnAsset;
