import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'


const List = () => {
  return (
    // <>{loading ? 
        // <div>
        //         <div className="flex items-center justify-center h-screen">
        //             <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
        //         </div>
        // </div> : 
            <div className='p-6 bg-gray-200 h-screen'>
                <div className='text-center'>
                    <h3 className='text-2xl font-bold'>Manage Employee</h3>
                </div>
                <div className='flex justify-between items-center h-24' >
                    <input type="text" name="" id="search-input" placeholder='search name'  className='px-4 py-0.5 h-10 bg-white w-4xl'/>
                    <Link to="/admin-dashboard/employees/add-employee" className='flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white'>Add New Employee</Link>
                </div>
                <div className='mt-5'>
                <DataTable
                    // columns={columns(onDepartmentDelete)} 
                    // data={filteredDepartments}
                    pagination
                    highlightOnHover
                    sortable
                    customStyles={{
                        headCells: {
                            style: {
                                fontWeight: "bold", 
                                fontSize: "16px",  
                                backgroundColor: "#f3f4f6", 
                                color: "#000", 
                            },
                        },
                    }}
                />

                </div>
            </div>
        // }</>
  )
}

export default List
