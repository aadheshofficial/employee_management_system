import React, { useEffect, useState } from 'react'
import { fetchDepartment } from '../../utils/EmployeeHelper.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const server_url = import.meta.env.VITE_SERVER_URL

const Add = () => {
    const [departments,setDepartments] = useState([])
    const [formData,setFromData] = useState({});
    const navigate = useNavigate();
    useEffect(()=> {
        const getDepts = async () => {
            const depts = await fetchDepartment()
            setDepartments(depts) 
        }
        getDepts();
    },[])
    const handleChange = (e) => {
        const {name,value,files} = e.target
        if(name === "image"){
            setFromData((prevData) => ({
                ...prevData,[name]:files[0]
            }))
        }
        else {
            setFromData((prevData)=> ({
                ...prevData, [name]:value
            }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key])
        })

        try {
            const response = await axios.post(`${server_url}/api/employee/add`,formDataObj,{

                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            if(response.data.success){
                // alert("added employee successfully")
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" onChange={handleChange}  className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Enter Name' required />
                    </div>
                    <div>
                        <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Enter Email' required/>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Employee Id</label>
                        <input type="text" name="employeeId" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Employee Id' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">DOB</label>
                        <input type="date" name="dob" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='DOB' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Gender</label>
                        <select name="gender" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required>
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Others</option>
                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Marital Status</label>
                        <select name="maritalstatus" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Marital status" required>
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Designation</label>
                        <input type="text" name="designation" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Designation' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Department</label>
                        <select name="department" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Department" required>
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                            ))}

                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Salary</label>
                        <input type="number" name="salary" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Salary' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Password</label>
                        <input type="password" name="password" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='*******' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Role</label>
                        <select name="role" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Select Role" required>
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Upload Image</label>
                        <input type="file" name="image" onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='click to add image' required />
                    </div>
                </div>
                <button type="submit" className='flex w-full mt-6 px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white hover:bg-teal-700' >Add Employee</button>
            </form>

        </div>
    )
}

export default Add
