
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useUser from "../hooks/useUser";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


import useAssets from "../hooks/useAssets";
import moment from "moment";


const AssetList = () => {
    const axiosPublic=useAxiosPublic()
    const [databaseUser]= useUser()
    const [assets, ,refetch]= useAssets()
    
    
   
    const[asset,setAsset]=useState([])

    const[search,setSearch]=useState('')


    useEffect( ()=>{
        axiosPublic.get(`/assets?companyName=${databaseUser.companyName}&search=${search}`)
            .then(res=> setAsset(res.data))
            
    },[search,databaseUser,axiosPublic,assets])
    console.log("data of assets",asset)
    


    const handleSearch = (e)=>{
        e.preventDefault()
            const searchText = e.target.search.value
            console.log(searchText)
            setSearch(searchText)
        }

        const handleDelete = id => {
            console.log(id)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
    
                    axiosPublic.delete(`/assets/${id}`)
                        .then(res => {
                            if (res.data.deletedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            });
        }

     

     


    return (
        <div className="my-5">
            <div>
                <h2 className=" text-cyan-700 text-3xl text-center font-bold my-5"> Asset list</h2>
            </div>
            <form onSubmit={handleSearch}>
                <div className="flex mb-5">
                    <input type="text" name="search" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <button  className="btn font-bold bg-cyan-700 text-white" type="submit"><FaSearch></FaSearch></button>
                </div>
                <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead className='bg-[#175f82] text-white text-center'>
                        <tr>
                            <th>#</th>
                            <th>Asset name</th>
                            <th>Asset Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>update</th>

                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {asset.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.productNAme}</td>
                                <td>{item.productType}</td>
                                <td>{item.quantity}</td>
                                <td>{moment(item?.addedDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                
                            
                                <th>
                                    <Link to={`/dashboard/updateAsset/${item._id}`}>
                                    <button
                                        className="btn"
                                    
                                     
                                        
                                    >
                                        Update
                                    </button>
                                    
                                    </Link>
                                </th>
                                <th>
                                    <button
                                        className="btn"
                                        onClick={()=>handleDelete(item._id)}
                                     
                                        
                                    >
                                        Delete
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

export default AssetList;