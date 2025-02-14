import React from 'react'
import SummeryCard from './SummeryCard'
import { FaBuilding, FaCheckCircle, FaCogs, FaFileAlt, FaHourglassHalf, FaMoneyBillAlt, FaMoneyBillWave, FaTimesCircle, FaUser } from 'react-icons/fa'

const AdminSummary = () => {
  return (
    <div className='p-6 bg-gray-100 h-screen'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummeryCard icon={<FaUser/>} text={"Total Employees"} number ={15} color={"bg-teal-600"}/>
        <SummeryCard icon={<FaBuilding/>} text={"Total Departments"} number ={5} color={"bg-yellow-700"}/>
        <SummeryCard icon={<FaMoneyBillWave/>} text={"Total Salary"} number ={5000} color={"bg-red-700"}/>
      </div>
      <div className='mt-12'>
        <h4 className='text-center text-2xl font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
            <SummeryCard icon={<FaFileAlt/>} text={"Leave Applied"} number ={5} color={"bg-teal-600"}/>
            <SummeryCard icon={<FaCheckCircle/>} text={"Leave Approved"} number ={5} color={"bg-green-600"}/>
            <SummeryCard icon={<FaHourglassHalf/>} text={"Leave Pending"} number ={4} color={"bg-yellow-600"}/>
            <SummeryCard icon={<FaTimesCircle/>} text={"Leave Rejected"} number ={1} color={"bg-red-700"}/>
            
            

        </div>
      </div>
    </div>
  )
}

export default AdminSummary
