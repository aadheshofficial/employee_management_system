import React, { useState } from 'react'
import { useAuth } from '../../../context/authContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const server_url = import.meta.env.VITE_SERVER_URL;

const EmployeeSettings = () => {
    const{user} = useAuth();
    const navigate = useNavigate();
    const [setting,setSetting] = useState({
      userId: user._id,
      oldPassword : "",
      newPassword :"",
      confirmPassword : "",
    });
    const [error,setError] = useState();

    const handleChange= (e) => {
      const {name,value} = e.target;
      setSetting({...setting,[name]:value});
    }
    const handleSubmit = async(e) => {
      e.preventDefault();
      if(setting.newPassword !== setting.confirmPassword){
        setError("Password not Matching!!!")
      }
      else{
        try {
          const response = await axios.put(`${server_url}/api/setting/change-password`,setting,{
            headers :{
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            }
        })
        console.log(response.data)
        if (response.data.success){
            // setEmployee(response.data.employee)
            navigate('/employee-dashboard/')
            setError("")

        }
        else{
          setError(response.data.error)
        }


        } catch (error) {
          // console.log(error);
          setError(error.response.data.error);
        }
      }
    }
  return (
    <div className='max-w-3xl mx-auto mt-20 py-20 px-20 bg-white p-8 rounded-md shadow-md w-3xl'>
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-sm font-medium text-gray-700">Old Password</label>
          <input type="password" name="oldPassword"  required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">New Password</label>
          <input type="password" name="newPassword"  required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <input type="password" name="confirmPassword"  required onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
        </div>

        <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md shadow-md">
          Change Password
        </button>
      </form>

    </div>
  )
}

export default EmployeeSettings
