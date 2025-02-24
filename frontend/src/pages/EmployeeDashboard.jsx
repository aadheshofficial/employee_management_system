import React from 'react'
import {Outlet} from 'react-router-dom'
import EmployeeSidebar from '../components/dashboard/EmployeeSidebar.jsx';
import NavBar from "../components/dashboard/NavBar.jsx"


const AdminDashboard = () => {
  return (
    <div>
      <EmployeeSidebar/>
      <div className="flex-1 ml-64 bg-grey-100 h-screen">
        <NavBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
