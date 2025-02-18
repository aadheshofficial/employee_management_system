import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx'
const server_url = import.meta.env.VITE_SERVER_URL;

const DepartmentList = () => {
    const [departments,setDepartments] = useState([])
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        const fetchDepartment = async ()=>{
            setLoading(true)
            try {
                const response = await axios.get(`${server_url}/api/department`,{
                    headers :{
                        "Authorization" :`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success){
                    let sno = 1;
                    const data = await response.data.departments.map((dept)=>(
                        {
                            _id : dept._id,
                            sno : sno++,
                            dept_name : dept.dept_name,
                            action : (<DepartmentButtons/>)

                        }
                    ))
                    setDepartments(data)
                }

            } catch (error) {
                if(error.response && error.response.data.success){
                    alert(error.response.data.error)
                }
            }
            finally{
                setLoading(false)
            }
        }
        fetchDepartment();
    },[])

    return (
        <>{loading ? <div>loading ...</div> : 
            <div className='p-6 bg-gray-200 h-screen'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Manage Department</h3>
                </div>
                <div className='flex justify-between items-center h-24' >
                    <input type="text" name="" id="" placeholder='search by department' className='px-4 py-0.5 h-10 bg-white w-4xl'/>
                    <Link to="/admin-dashboard/add-new-department" className='flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center'>Add New Department</Link>
                </div>
                <div>
                    <DataTable
                    columns={columns} data={departments}
                    />
                </div>
            </div>
        }</>
    )
}

export default DepartmentList
