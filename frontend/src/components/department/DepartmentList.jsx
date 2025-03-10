import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper.jsx'
import axios from "axios";
const server_url = import.meta.env.VITE_SERVER_URL;

const DepartmentList = () => {
    const [departments,setDepartments] = useState([])
    const [loading,setLoading] = useState(false)
    const [filteredDepartments,setFilteredDepartments] = useState([])
    const onDepartmentDelete = (id) => {
        const data = departments.filter(dept => dept._id !== id)
        setDepartments(data)
        setFilteredDepartments(data);
        document.getElementById("search-input").value = "";
    }
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
                            action : (<DepartmentButtons _id={dept._id} onDepartmentDelete={onDepartmentDelete} />)

                        }
                    ))
                    setDepartments(data)
                    setFilteredDepartments(data);
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
    const filterDepartments = (e) => {
        const records = departments.filter((dept) => 
            dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFilteredDepartments(records);
    }

    return (
        <>{loading ? 
        <div>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
                </div>
        </div> : 
            <div className='p-6 bg-gray-200 h-screen'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Manage Department</h3>
                </div>
                <div className='flex justify-between items-center h-24' >
                    <input type="text" name="" id="search-input" placeholder='search by department' onChange={filterDepartments} className='px-4 py-0.5 h-10 bg-white w-4xl'/>
                    <Link to="/admin-dashboard/add-new-department" className='flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white'>Add New Department</Link>
                </div>
                <div className='mt-5'>
                <DataTable
                    columns={columns(onDepartmentDelete)} 
                    data={filteredDepartments}
                    pagination
                    highlightOnHover
                    sortable
                    customStyles={{
                        headCells: {
                            style: {
                                fontWeight: "bold", 
                                fontSize: "16px",  
                                backgroundColor: "#f3f4f6", 
                                color: "#000", 
                            },
                        },
                    }}
                />

                </div>
            </div>
        }</>
    )
}

export default DepartmentList
