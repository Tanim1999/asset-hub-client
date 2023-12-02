
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUser from "../hooks/useUser";

// import Swal from "sweetalert2";


import Swal from "sweetalert2";
import useCustomReq from "../hooks/useCustomReq";


const CustomRequestList = () => {
    const axiosPublic = useAxiosPublic()
    const [databaseUser] = useUser()
    const [customReq,refetch] = useCustomReq()



    const [request, setRequest] = useState([])

    const [search, setSearch] = useState('')


    useEffect(() => {
        axiosPublic.get(`/requests?companyName=${databaseUser.companyName}&status=pending&search=${search}`)
            .then(res => setRequest(res.data))

    }, [search, databaseUser, axiosPublic, customReq])
    console.log("data of requests", request)



    const handleSearch = (e) => {
        e.preventDefault()
        const searchText = e.target.search.value
        console.log(searchText)
        setSearch(searchText)
    }

    const handleApprove = id => {
        console.log(id)
        const updatedInfo={
            status:"approved",
            actionDate: new Date().toISOString()
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes approve"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.patch(`/requests/${id}`,updatedInfo)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Approved",
                                text: "Request approved.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleReject = id => {
        console.log(id)
        const updatedInfo={
            status:"rejected",
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

                axiosPublic.patch(`/requests/${id}`,updatedInfo)
                    .then(res => {
                        if (res.data.modifiedCount> 0) {
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
            <form onSubmit={handleSearch}>
                <div className="flex">
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
                            {request.map((item, index) => (
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

                                         onClick={()=>handleApprove(item._id)}

                                        >
                                            Approve
                                        </button>


                                    </th>
                                    <th>
                                        <button
                                            className="btn"
                                          onClick= {()=>handleReject(item._id)}
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

        </div>
    );
};

export default CustomRequestList;