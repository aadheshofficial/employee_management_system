import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillAlt, FaTachometerAlt, FaUser} from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div className='bg-teal-600 h-16 flex items-center justify-center'>
        <h3 className='text-2xl text-center'>Employee MS</h3>
      </div>
      <div>
        <NavLink to="/admin-dashboard"
            className={({ isActive }) => 
                `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`
              }
              end
              
        > 
            <FaTachometerAlt/>
            <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin-dashboard/employees" className={({ isActive }) => 
                `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`
              }
              end>
            <FaUser/>
            <span>Employees</span>
        </NavLink>
        <NavLink to="/admin-dashboard/departments" className={({ isActive }) => 
                `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`
              }
              end> 
            <FaBuilding/>
            <span>Department</span>
        </NavLink>
        <NavLink to="/admin-dashboard/leave" className={({ isActive }) => 
                `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`
              }
              end>
            <FaCalendarAlt/>
            <span>Leave</span>
        </NavLink>
        <NavLink to="/admin-dashboard/salary" className={({ isActive }) => 
                `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`
              }
              end>
            <FaMoneyBillAlt/>
            <span>Salary</span>
        </NavLink>
        <NavLink to="/admin-dashboard/settings" className={({ isActive }) => 
                `flex items-center space-x-4 py-2.5 px-4 rounded ${isActive ? "bg-teal-500" : ""}`
              }
              end>
            <FaCogs/>
            <span>Setting</span>
        </NavLink>
      </div>
    </div>
  )
}

export default AdminSidebar
