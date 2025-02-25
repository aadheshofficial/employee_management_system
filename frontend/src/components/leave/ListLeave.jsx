import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../context/authContext'
import axios from 'axios'
const server_url = import.meta.env.VITE_SERVER_URL;

const ListLeave = () => {
    const {user} = useAuth();
    const id = user._id;
    let sno =1;
    const [leave,setLeave] = useState([]);
    const fetchLeave = async () => {
        try {
            const response = await axios.get(`${server_url}/api/leave/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            // console.log(response.data);
            if(response.data.success){
                setLeave(response.data.leave);
                // setFilteredSalary(response.data.salary);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        fetchLeave();
    },[])

  return (
    // <>{loading ? 
    //     <div>
    //             <div className="flex items-center justify-center h-screen">
    //                 <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
    //             </div>
    //     </div> : 
            <div className='p-6 bg-gray-200 h-screen'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Manage Leave</h3>
                </div>
                <div className='flex justify-between items-center h-24' >
                    <input type="text" name="" id="search-input" placeholder='search'  className='px-4 py-0.5 h-10 bg-white w-4xl'/>
                    <Link to="/employee-dashboard/leave/apply-leave" className='flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white'>Apply Leave</Link>
                </div>
                <div className='mt-5'>
                    {leave.length >0  ?( 
                <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase  bg-gray-300 border border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Sno</th>
                                <th className="px-6 py-3">Leave Type</th>
                                <th className="px-6 py-3">From</th>
                                <th className="px-6 py-3">To</th>
                                <th className="px-6 py-3">Description</th>
                                <th className="px-6 py-3">Applied Date</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leave.map((l)=> (
                                <tr
                                key={l._id}
                                className='bg-white border-b dark:bg-gray-50 dark:border-gray-700'>
                                    <td className="px-6 text-gray-800 py-3">{sno++}</td>
                                    <td className="px-6 text-gray-800 py-3">{l.leaveType}</td>
                                    <td className="px-6 text-gray-800 py-3">{new Date(l.startDate).toLocaleDateString()}</td>
                                    <td className="px-6 text-gray-800 py-3">{new Date(l.endDate).toLocaleDateString()}</td>
                                    <td className="px-6 text-gray-800 py-3">{l.description}</td>
                                    <td className="px-6 text-gray-800 py-3">{new Date(l.appliedAt).toLocaleDateString()}</td>
                                    <td className="px-6 text-gray-800 py-3">
                                        {l.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    ):
                    <div className="text-center mt-28">
                        <h2 className="text-2xl font-bold">No Data</h2>
                    </div>
                }   
                </div>
            </div>
        // }</>
  )
}

export default ListLeave
