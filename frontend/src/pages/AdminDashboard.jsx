import React from 'react'
import {Outlet} from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import AdminSidebar from '../components/dashboard/AdminSidebar.jsx';
import NavBar from "../components/dashboard/NavBar.jsx"
import AdminSummary from "../components/dashboard/AdminSummary.jsx"


const AdminDashboard = () => {
  return (
    <div className='bg-gray-200'>
      <AdminSidebar/>
      <div className="flex-1 ml-64 bg-grey-100 h-screen">
        <NavBar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
