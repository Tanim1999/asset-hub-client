import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useRequestsStatus from "../hooks/useRequestStatus";
import useReqOfUser from "../hooks/useReqOfUser";



const PendingReq = () => {
    const axiosPublic = useAxiosPublic()
    const [requestStatus,refetch]= useRequestsStatus()
    const [,reReq,] = useReqOfUser()
     
    const fiveReq= requestStatus.slice(0,5)

    const handleApprove = (id,productName,productType,quantity,assetId) => {
        console.log(id)
        const updatedInfo = {
            status: "approved",
            actionDate: new Date().toISOString(),
            quantity: quantity - 1
        }
        const assetInfo = {
            productNAme: productName,
            productType: productType,
            quantity: quantity-1,
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes approve"
        }).then(async(result) => {
            if (result.isConfirmed) {
            const asset=  await  axiosPublic.patch(`/assets/${assetId}`,assetInfo)

            const request= await    axiosPublic.patch(`/requests/${id}`, updatedInfo)
            if (asset.data.modifiedCount > 0 && request.data.modifiedCount>0) {
                refetch();
                reReq();
                Swal.fire({
                    title: "Approved",
                    text: "Request approved.",
                    icon: "success"
                });
            }
            }
        });
    }
    const handleReject = (id) => {
        console.log(id)
        const updatedInfo = {
            status: "rejected",
            actionDate: new Date().toISOString()
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.patch(`/requests/${id}`, updatedInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Rejected!",
                                text: "Request rejected.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-5"> Pending Requests</h2>
            <div className="overflow-x-auto">
                    <table className="table max-w-[70%]">
                        <thead className='bg-[#175f82] text-white text-center'>
                            <tr>
                                <th>#</th>
                                <th>Asset name</th>
                                <th>Asset Type</th>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Request Date</th>
                                <th>Additional note</th>
                                <th>Status</th>



                                <th>Approve</th>
                                <th>Reject</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {fiveReq.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.assetName}</td>
                                    <td>{item.assetType}</td>
                                    <td>{item.emailOfRequester}</td>
                                    <td>{item.nameOfRequester}</td>
                                    <td>{item?.requestDate}</td>
                                    <td>{item?.additionalNote}</td>



                                    <th>Pending</th>
                                    <th>

                                        <button
                                            className="btn"

                                            onClick={() => handleApprove(item._id,item.assetName,item.assetType,item.quantity,item.assetId)}

                                        >
                                            Approve
                                        </button>


                                    </th>
                                    <th>
                                        <button
                                            className="btn"
                                            onClick={() => handleReject(item._id)}
                                        >
                                            Reject
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
        </div>
    );
};

export default PendingReq;