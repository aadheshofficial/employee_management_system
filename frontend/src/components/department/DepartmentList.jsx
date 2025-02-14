import React from 'react'
import { Link } from 'react-router-dom'

const DepartmentList = () => {
    return (
        <div className='p-6 bg-gray-200 h-screen'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Department</h3>
            </div>
            <div className='flex justify-between items-center h-24' >
                <input type="text" name="" id="" placeholder='search by department' className='px-4 py-0.5 h-10 bg-white w-4xl'/>
                <Link to="/admin-dashboard/add-new-department" className='flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center'>Add New Department</Link>
            </div>
        </div>
    )
}

export default DepartmentList
