import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { columns, LeaveButton } from '../../utils/AdminLeaveListHelper';
import DataTable from 'react-data-table-component';
const server_url = import.meta.env.VITE_SERVER_URL;


const AdminLeaveList = () => {
    const [loading,setLoading] =useState(false);
    const [error,setError] = useState();
    const [leave,setLeave] = useState([]);
    const [filteredLeave,setFilteredLeave] = useState([]);
    let sno=1;
    const fetchLeave = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${server_url}/api/leave/`,{
              headers :{
                  "Authorization" :`Bearer ${localStorage.getItem("token")}`
              }
          })
        //   console.log(response.data)
          if (response.data.success){
            const data = await response.data.leave.map((l)=>({
                _id:l._id,
                sno:sno++,
                employeeId : l.employeeId.employeeId,
                name : l.employeeId.userId.name,
                leaveType :l.leaveType,
                dept_name: l.employeeId.department.dept_name,
                status:l.status,
                days:
                    // new Date(l.endDate).getDate() - new Date(l.startDate).getDate(),
                    Math.max(0, Math.ceil((new Date(l.endDate) - new Date(l.startDate)) / (1000 * 60 * 60 * 24))),
                action: (<LeaveButton id={l._id}/>)
            }))
            setLeave(data)
            setFilteredLeave(data)
            setLoading(false)
            setError("")
  
          }
          else{
            setLoading(false)
            setError(response.data.error)
          }
  
  
          } catch (error) {
            console.log(error);
            setLoading(false)
            setError(error?.response?.data.error);
          }
          finally {
            setLoading(false)
          }
    }
    const handleFilter = (e) =>{
      const records = leave.filter((l) => 
        l.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    )
    setFilteredLeave(records);
    }

    const filterByButton = (status) => {
      const records = leave.filter((l) => 
        l.status.toLowerCase().includes(status.toLowerCase())
    )
    setFilteredLeave(records);
    }

    useEffect(()=>{
        fetchLeave()
    },[])

  return (
    <div className="p-6 bg-gray-200 h-screen">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leave</h3>
      </div>
      <div className="flex justify-between items-center h-24">
        <input
          type="text"
          placeholder="Search"
          onChange={handleFilter}
          className="px-4 py-0.5 h-10 bg-white "
        />
        <div className='space-x-3'>
        <button className='bg-green-600 hover:bg-green-700 text-white h-10 px-5 rounded-md' onClick={()=>filterByButton("approved")}>Approved</button>
        <button className='bg-yellow-600 hover:bg-yellow-700 text-white h-10 px-5 rounded-md' onClick={()=>filterByButton("pending")}>Pending</button>
        <button className='bg-red-600 hover:bg-red-700 text-white h-10 px-5 rounded-md' onClick={()=>filterByButton("rejected")}>Rejected</button>
        </div>
      </div>
      <>{loading ? 
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
            </div>
        </div>  :
        <div>
            <DataTable
            columns={columns}
            data = {filteredLeave}
            pagination
            >

            </DataTable>
        </div>
      }
      </>
    
    </div>
  )
}

export default AdminLeaveList
