import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const server_url = import.meta.env.VITE_SERVER_URL;


const EditDepartment = () => {
    const {id} = useParams()
    const [loading,setLoading] = useState(false)
    const [department,setDepartment] = useState([]);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setDepartment({...department,[name] :value})
    }
    useEffect(()=>{
        const fetchDepartment = async ()=>{
            setLoading(true)
            try {
                const response = await axios.get(`${server_url}/api/department/${id}`,{
                    headers :{
                        "Authorization" :`Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.data.success){
                    setDepartment(response.data.department)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.put(`${server_url}/api/department/${id}`,department,{

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
    <>{loading ? 
        <div>
                <div className="flex items-center justify-center h-screen">
                    <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
                </div>
        </div> : 
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md  w-4xl'>
        <div className='text-2xl font-bold mb-6'>
            <h3>Edit Department</h3>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="dept_name" className='text-sm font-medium text-grey-700'>Department name</label>
                    <input type="text" name="dept_name" id="" placeholder='Department Name' value={department.dept_name}
                    onChange={handleChange}
                     className='mt-1 w-full p-2 border font-medium placeholder-gray-400 border-gray-300 rounded-md'/>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="" placeholder='Description'  value={department.description}
                    className='mt-1 p-2 block w-full border h-72 font-medium border-gray-300 placeholder-gray-400 rounded-md'
                    onChange={handleChange}
                    ></textarea>
                </div>
                <button type='submit' className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'>Edit Department</button>
            </form>
        </div>
    </div>
    }</>
  )
}

export default EditDepartment
