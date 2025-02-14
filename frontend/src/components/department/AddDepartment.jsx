import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const server_url = import.meta.env.SERVER_URL

const AddDepartment = () => {
    const navigate = useNavigate()
    const [department,setDepartment] = useState({
        dept_name : '',
        description :''
    })
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDepartment({...department,[name] :value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(`${server_url}/api/department/add`,department,{

                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if(error.response && error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md  w-4xl'>
        <div className='text-2xl font-bold mb-6'>
            <h3>Add Department</h3>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="dept_name" className='text-sm font-medium text-grey-700'>Department name</label>
                    <input type="text" name="dept_name" id="" placeholder='Department Name'
                    onChange={handleChange}
                     className='mt-1 w-full p-2 border font-medium placeholder-gray-400 border-gray-300 rounded-md'/>
                </div>
                <div>
                    <lable htmlFor="description" className="block text-sm font-medium text-gray-700">Description</lable>
                    <textarea name="description" id="" placeholder='Description' 
                    className='mt-1 p-2 block w-full border h-72 font-medium border-gray-300 placeholder-gray-400 rounded-md'
                    onChange={handleChange}
                    ></textarea>
                </div>
                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Add Department</button>
            </form>
        </div>
    </div>
  )
}

export default AddDepartment
