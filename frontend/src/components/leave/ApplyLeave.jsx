import React, { useState } from 'react'
import { useAuth } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const server_url = import.meta.env.VITE_SERVER_URL;

const ApplyLeave = () => {
    const{user} = useAuth();
    const navigate = useNavigate();
    const [leave,setLeave] = useState({
        userId : user._id,

    });
    const handleChange = (e) => {
        const {name,value} = e.target;
        setLeave((prev)=>({...prev,[name]:value}))
    };
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${server_url}/api/leave/apply`,leave,{
                headers :{
                    "Authorization" :`Bearer ${localStorage.getItem("token")}`
                }
            })
            // console.log(response.data)
            if (response.data.success){
                // setEmployee(response.data.employee)
                navigate('/employee-dashboard/leave')

            }

        } catch (error) {
            console.log(error)
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
        finally{
            // setLoading(false)
        }
    };
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadown-md'>
        <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4 mt-5">
                <lable className="block text-sm font-medium text-gray-700">Leave Type</lable>
                <select name="leaveType" id="" onChange={handleChange} required className='mt-1 p-2 block w-full border border-gray-300 rounded-md'>
                    <option value="">Select Leave</option>
                    <option value="SickLeave">Sick Leave</option>
                    <option value="CasualLeave">Casual Leave</option>
                    <option value="AnnualLeave">Annual Leave</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                <div>
                    <lable className="block text-sm font-medium text-gray-700">From Date</lable>
                    <input type="date" name="startDate" id="" onChange={handleChange} required className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
                </div>
                <div>
                    <lable className="block text-sm font-medium text-gray-700">To Date</lable>
                    <input type="date" name="endDate" id="" onChange={handleChange} required className='mt-1 p-2 block w-full border border-gray-300 rounded-md'/>
                </div>
            </div>
            <div className="flex flex-col space-y-4 mt-5">
                <lable className="block text-sm font-medium text-gray-700">Leave Type</lable>
                <textarea name="description" id="" onChange={handleChange} className='border border-gray-500 w-full h-60 px-3 py-2' required placeholder=' Description for leave'></textarea>
            </div>
            <button type="submit" className='w-full bg-teal-600 text-white mt-5 py-3 rounded-md'>Apply Leave</button>
        </form>
    </div>
  )
}

export default ApplyLeave
