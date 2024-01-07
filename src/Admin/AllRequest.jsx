
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
// import useUser from "../hooks/useUser";

// import Swal from "sweetalert2";


// import useRequestsStatus from "../hooks/useRequestStatus";
import Swal from "sweetalert2";
import useReqOfUser from "../hooks/useReqOfUser";
import useRequests from "../hooks/useRequests";
import moment from "moment";
const AllRequest = () => {
    const axiosPublic = useAxiosPublic()
    // const [databaseUser] = useUser()
    // const [requestStatus, refetch] = useRequestsStatus()
    const [, reReq,] = useReqOfUser()



    // const [request, setRequest] = useState([])

    const [search, setSearch] = useState('')



    const [requests, , reRequests] = useRequests(search)


    // useEffect(() => {
    //     axiosPublic.get(`/requests?companyName=${databaseUser.companyName}&status=pending&search=${search}`)
    //         .then(res => setRequest(res.data))

    // }, [search, databaseUser, axiosPublic, requestStatus])
    console.log("data of requests", requests)



    const handleSearch = (e) => {
        e.preventDefault()
        const searchText = e.target.search.value
        console.log(searchText)
        setSearch(searchText)
        reRequests()
    }

    const handleApprove = (id, productName, productType, quantity, assetId) => {

        console.log("jekhane click korecho", id, productName, quantity)



        console.log("quantity", quantity)

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
                    reRequests();
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
                            reRequests();
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
        <div className="mx-5">
            <div>

                <h2 className=" text-3xl text-cyan-700 font-bold text-center my-5">
                    All requests
                </h2>
            </div>
            {requests.length == 0 ?
                <>
                    <div role="alert" className="alert alert-info">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className=" text-2xl font-bold text-center">There is no request</p>

                    </div>
                    
                </> :
                <>
                    <form onSubmit={handleSearch}>
                        <div className="flex my-5">
                            <input type="text" name="search" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                            <button className="btn font-bold bg-cyan-700 text-white" type="submit"><FaSearch></FaSearch></button>
                        </div>
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
                                    {requests.map((item, index) => (
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
                    </form>
                </>}


        </div>
    );
};

export default AllRequest;