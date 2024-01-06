// import { useEffect, useState } from "react";

// import useAxiosPublic from "../hooks/useAxiosPublic";

import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useReqOfUser from "../hooks/useReqOfUser";
import useUser from "../hooks/useUser";
import { useState } from "react";
import useAsset from "../hooks/useAsset";




const EmployeeMyAssets = () => {
    const [databaseUser] = useUser();
    const [reqOfUser,reReq,isPending] = useReqOfUser()
    const axiosPublic = useAxiosPublic()

    const [assId,setAssId]=useState(null)
    const[asset,,reAsset] = useAsset(assId)
    
    console.log("asset id",assId)
    


    if(isPending){
        return <progress className="progress w-56"></progress>
    }

    // const axiosPublic = useAxiosPublic()





    // const [asset, setAsset] = useState([])

    // const[active,setactive]=useState('')


    // useEffect(() => {
    //     axiosPublic.get(`/requestes?companyName=${databaseUser.companyName}&emailOfRequester=${databaseUser.email}`)
    //         .then(res => setAsset(res.data))

    // }, [databaseUser, axiosPublic, reqOfUser, asset])
    // console.log("data of assets", asset)



    // const handleSearch = (e)=>{
    //     e.preventDefault()
    //         const searchText = e.target.search.value
    //         console.log(searchText)
    //         setSearch(searchText)
    //     }

    const handleCancel = id => {
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

                axiosPublic.delete(`/requests/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            reReq();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your request is cancelled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    const handleReturn=(item)=>{
      console.log(item)
      setAssId(item.assetId)
      reAsset()
    
      console.log("asset mia", asset)
      const assetInfo = {
        productNAme: item.assetName,
        productType: item.assetType,
       
    }
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes Return"
    }).then(async(result) => {
        if (result.isConfirmed) {
        const asset=  await  axiosPublic.patch(`/assets/${item.assetId}?operation=increment`,assetInfo)

        const request= await    axiosPublic.delete(`/requests/${item._id}`)
        if (asset.data.modifiedCount > 0 && request.data.deletedCount>0) {
            reReq();
            Swal.fire({
                title: "Returned",
                text: "Returned successfully.",
                icon: "success"
            });
        }
        }
        else{
            setAssId(null)
            reAsset()
            
        }

    });

    }





    return (
        <div>
            {databaseUser.companyName === "none" ? <><p className="font-bold mx-auto p-5 w-[80%] text-3xl rounded-lg border-2 border-[#175f82]">You are not in any team. Please ask your admin to make you a team member</p>

            </>
                :
                <>

                    <div>


                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead className='bg-[#175f82] text-white text-center'>
                                    <tr>
                                        <th>#</th>
                                        <th>Asset name</th>
                                        <th>Asset Type</th>
                                        <th>Request date</th>
                                        <th>Approval date</th>
                                        <th>Request status</th>

                                        <th>Action</th>
                                        
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {reqOfUser.map((item, index) => (
                                        <tr key={item._id}>
                                            <th>{index + 1}</th>
                                            <td>{item?.assetName}</td>
                                            <td>{item?.assetType}</td>
                                            <td>{item.requestDate}</td>
                                            <td>{item?.actionDate}</td>
                                            <td>{item?.status}</td>


                                            <th>

                                                {item.status === 'approved' && item.assetType === 'Returnable' ? 
                                                    
                                                 <><button 
                                                 onClick={()=>handleReturn(item)} 
                                                 className="btn">Return</button>
                                                 </>:item.status=="pending"?
                                                <button 
                                                onClick={()=>handleCancel(item._id)}
                                                className="btn">cancel</button>:item.status==="approved"? 
                                                    <button className="btn">print</button>:
                                                ""
                                            }

                                                




                                            </th>
                                            

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>

                </>
            }
        </div>
    );
};

export default EmployeeMyAssets;