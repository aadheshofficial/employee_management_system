import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const server_url = import.meta.env.VITE_SERVER_URL;


const EmployeeProfile = () => {

    const {id} = useParams()
    const [employee,setEmployee] = useState(null);
    

    useEffect(()=>{
        const fetchEmployee = async ()=>{
            // setLoading(true)
            try {
                const response = await axios.get(`${server_url}/api/employee/${id}`,{
                    headers :{
                        "Authorization" :`Bearer ${localStorage.getItem("token")}`
                    }
                })
                // console.log(response.data)
                if (response.data.success){
                    setEmployee(response.data.employee)

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
        }
        fetchEmployee();
    },[])
  return (
    <>{employee ?(
    <div className='h-screen flex items-center justify-center bg-gray-100'>
    <div className='max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

            <div>
                <img src={`${server_url}/${employee.userId.profileImage}`} alt="" 
                className='rounded-full border w-72'/>
            </div>
            <div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Name : </p>
                    <p className="font-medium">{employee.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Employee Id : </p>
                    <p className="font-medium">{employee.employeeId}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">DOB : </p>
                    <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Gender : </p>
                    <p className="font-medium">{employee.gender}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Department Name : </p>
                    <p className="font-medium">{employee.department.dept_name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Marital Status : </p>
                    <p className="font-medium">{employee.maritalstatus}</p>
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

export default EmployeeProfile
