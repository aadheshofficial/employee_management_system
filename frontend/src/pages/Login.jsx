import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
const server_url = import.meta.env.VITE_SERVER_URL


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${server_url}/api/auth/login`,
            {email,password}
        );
        // console.log(response)
        if(response.data.success){
            // alert("success")
            login(response.data.user)
            localStorage.setItem("token",response.data.token)
            if(response.data.user.role === "admin"){
                navigate('/admin-dashboard')
            }
            else{
                navigate('/employee-dashboard')
            }
        }
        } catch (error) {
            // console.error(error)
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            }
            else{
                setError("Server Error")
            }
            
        }
    }
  return (
    <div 
    className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6'
    >
        <h1 className='font-sevillana text-3xl text-white'>Employee Management System</h1>
        <div className='border shadow p-6 w-80 bg-white'>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="email" className='bloack text-gray-700'>Email : </label>
                    <input 
                    className='w-full px-3 py-2 border'
                    type="email" name="email" id="email" placeholder='Enter your email' required
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className='bloack text-gray-700'>Password</label>
                    <input className='w-full px-3 py-2 border' type="password" name="password" id="password" placeholder='**********' required
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="rememberme" id="rememberme" />
                        <span className="text-gray-700 ml-2">Remember me</span>
                    </label>
                    <a href="#" className="text-teal-600">Forgot password?</a>
                </div>
                <button
                type='submit'
                className='w-full bg-teal-600 text-white py-2'
                >Login</button>
            </form>

        </div>
    </div>
  )
}

export default Login
