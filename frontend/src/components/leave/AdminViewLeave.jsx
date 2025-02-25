import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const server_url = import.meta.env.VITE_SERVER_URL;


const AdminViewLeave = () => {

    const {id} = useParams()
    const [leave,setLeave] = useState();
    const navigate = useNavigate();
    

    useEffect(()=>{
        const fetchLeave = async ()=>{
            // setLoading(true)
            try {
                const response = await axios.get(`${server_url}/api/leave/detail/${id}`,{
                    headers :{
                        "Authorization" :`Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log(response.data)
                if (response.data.success){
                    setLeave(response.data.leave)

                }

            } catch (error) {
                console.log(error)
                // if(error.response && !error.response.data.success){
                    // alert(error.response.data.error)
                // }
            }
            finally{
                // setLoading(false)
            }
        }
        fetchLeave();
    },[])

    const changeStatus = async(id,status) => {
        try {
            const response = await axios.put(`${server_url}/api/leave/update/${id}`,{status},{
                headers :{
                    "Authorization" :`Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data)
            if (response.data.success){
                navigate('/admin-dashboard/leave')

            }

        } catch (error) {
            console.log(error)
            // if(error.response && !error.response.data.success){
                // alert(error.response.data.error)
            // }
        }
        finally{
            // setLoading(false)
        }
    }
  return (
    <>{leave ?(
    <div className='h-screen flex items-center justify-center bg-gray-100'>
    <div className='max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            <div>
                <img src={`${server_url}/${leave.employeeId.userId.profileImage}`} alt="" 
                className='rounded-full border w-72'/>
            </div>
            <div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Name : </p>
                    <p className="font-medium">{leave.employeeId.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Employee Id : </p>
                    <p className="font-medium">{leave.employeeId.employeeId}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Leave Type : </p>
                    <p className="font-medium">{leave.leaveType}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Department Name : </p>
                    <p className="font-medium">{leave.employeeId.department.dept_name}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">From : </p>
                    <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">To : </p>
                    <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Gender : </p>
                    <p className="font-medium">{leave.employeeId.gender}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">Marital Status : </p>
                    <p className="font-medium">{leave.employeeId.maritalstatus}</p>
                </div>
                <div className="flex space-x-3 mb-2">
                    <p className="text-lg font-bold">
                        {leave.status === "pending" ? "Action : ": "Status : "} </p>
                        {leave.status === "pending" ? (
                            <div className='space-x-2'>
                                <button className='bg-green-600 hover:bg-green-700 p-2 text-white rounded-md' onClick={() => changeStatus(leave._id,"approved")}>Approve</button>
                                <button className='bg-red-600 hover:bg-red-700 p-2 text-white rounded-md' onClick={() => changeStatus(leave._id,"rejected")}>Reject</button>
                            </div>
                        ) : (
                            <p className="font-medium">{leave.status}</p>
                        )}
                </div>
            </div>
            <div>

            </div>
        </div>
    </div>
    </div>

    ):
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
            </div>
        </div> 
    }</>
  )
}

export default AdminViewLeave
