import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDepartment } from '../../utils/EmployeeHelper'
const server_url = import.meta.env.VITE_SERVER_URL

const Edit = () => {
    const [employee,setEmployee] = useState({
        name: '',
        maritalstatus : '',
        designation : '',
        salary: 0,
        department:''
    })
    const [departments,setDepartments] = useState(null)
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(()=> {
        const getDepts = async () => {
            const depts = await fetchDepartment()
            setDepartments(depts) 
        }
        getDepts();
        const fetchEmployee = async ()=>{
            // setLoading(true)
            try {
                const response = await axios.get(`${server_url}/api/employee/${id}`,{
                    headers :{
                        "Authorization" :`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success){
                    const emp = response.data.employee;
                    setEmployee((prev) => ({...prev,
                        name:emp.userId.name,
                        maritalstatus:emp.maritalstatus,
                        designation:emp.designation,
                        salary:emp.salary,
                        department:emp.department.dept_name
                    }))

                }

            } catch (error) {
                console.log(error)
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
            finally{
                // setLoading(false)
                // console.log(employee)
            }
        }
        fetchEmployee();
    },[])
    const handleChange = (e) => {
        const {name,value} = e.target
        setEmployee((prevData)=> ({...prevData, [name]:value}))
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.put(`${server_url}/api/employee/${id}`,employee,{

                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            if(response.data.success){
                alert("updated employee successfully")
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <>{departments && employee ?(
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" onChange={handleChange} value={employee.name} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Enter Name' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Marital Status</label>
                        <select name="maritalstatus" onChange={handleChange} value={employee.maritalstatus} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Marital status" required>
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Designation</label>
                        <input type="text" name="designation" onChange={handleChange} value={employee.designation} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Designation' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Salary</label>
                        <input type="number" name="salary" onChange={handleChange} value={employee.salary} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Salary' required />
                    </div>
                    <div className='col-span-2'>
                        <label  className="block text-sm font-medium-text-gray-700">Department</label>
                        <select name="department" onChange={handleChange} value={employee.dept_name} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Department" required>
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className='flex w-full mt-6 px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white hover:bg-teal-700' >Update</button>
            </form>

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

export default Edit
