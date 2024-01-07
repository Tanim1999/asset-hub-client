import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useRequestsStatus from "../hooks/useRequestStatus";
import useReqOfUser from "../hooks/useReqOfUser";
import moment from "moment";



const PendingReq = () => {
    const axiosPublic = useAxiosPublic()
    const [requestStatus, refetch] = useRequestsStatus()
    const [, reReq,] = useReqOfUser()

    const fiveReq = requestStatus.slice(0, 5)

    const handleApprove = (id, productName, productType, quantity, assetId) => {
        console.log(id)
        const updatedInfo = {
            status: "approved",
            actionDate: new Date().toISOString(),
            quantity: quantity - 1
        }
        const assetInfo = {
            productNAme: productName,
            productType: productType,

        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes approve"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const asset = await axiosPublic.patch(`/assets/${assetId}?operation=decrement`, assetInfo)

                const request = await axiosPublic.patch(`/requests/${id}`, updatedInfo)
                if (asset.data.modifiedCount > 0 && request.data.modifiedCount > 0) {
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
        <div className="my-5">
            <h2 className="text-3xl font-bold text-center text-[#175f82] mb-5"> Pending Requests</h2>
            {
                fiveReq.length == 0 ?
                    <>
                        <div role="alert" className="alert alert-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <p className="text-2xl font-bold text-center">There is no pending request</p>

                        </div>
                    </> :
                    <>
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
                                            <td>{moment(item?.requestDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                            <td>{item?.additionalNote}</td>



                                            <th>Pending</th>
                                            <th>

                                                <button
                                                    className="btn"

                                                    onClick={() => handleApprove(item._id, item.assetName, item.assetType, item.quantity, item.assetId)}

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
                    </>
            }

        </div>
    );
};

export default PendingReq;