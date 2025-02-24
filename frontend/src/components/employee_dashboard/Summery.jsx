import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../../context/authContext'

const Summery = () => {
    const{user} = useAuth();
  return (
    <div className='rounded flex mt-10 ml-5 px-5 mr-5 bg-white'>
        <div className='py-5 px-10 flex'>

      <div className={`text-3xl mr-5 flex justify-center rounded-full bg-teal-600 items-center text-white px-4`}>
            <FaUser/>
      </div>
      <div className='pl-4 py-1'>
        <p className='text-lg font-bold'>Welcome Back</p>
        <p className='text-xl font-semibold'>{user.name}</p>
      </div>
        </div>
    </div>
  )
}

export default Summery
