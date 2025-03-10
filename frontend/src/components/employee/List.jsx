// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import DataTable from 'react-data-table-component'
// import axios from 'axios';
// import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
// const server_url = import.meta.env.VITE_SERVER_URL;


// const List = () => {
//     const [employees,setEmployees] = useState([])
//     const [loading,setLoading] = useState(false)
//     const [filteredEmployees,setFilteredEmployees] = useState([])
//     const navigate = useNavigate()
    
//     useEffect(() => {
//         const fetchEmployees = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get(`${server_url}/api/employee`, {
//                     headers: {
//                         "Authorization": `Bearer ${localStorage.getItem("token")}`
//                     }
//                 });
    
//                 // console.log("API Response:", response.data);
//                 if (response.data.success && Array.isArray(response.data.employee)) {
//                     let sno = 1;
//                     const data = response.data.employee.map((emp) => ({
//                         _id: emp?._id || "N/A",
//                         sno: sno++,
//                         dept_name: emp?.department?.dept_name || "N/A",
//                         name: emp?.userId?.name || "N/A",
//                         dob: emp?.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
//                         profileImage: emp?.userId?.profileImage || "",
//                     }));
    
//                     setEmployees(data);
//                     setFilteredEmployees(data)
//                 } else {
//                     console.error("Employees data is not an array:", response.data.employees);
//                     setEmployees([]);
//                     setFilteredEmployees([])
//                 }

//             } catch (error) {
//                 console.log(error);
//                 if (error.response && !error.response.data.success) {
//                     alert(error.response.data.error);
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchEmployees();
//     }, []);
    
//     const handleFilter = (e) => {
//         const records = employees.filter((emp) => 
//             emp.name.toLowerCase().includes(e.target.value.toLowerCase())
//         )
//         setFilteredEmployees(records);
//     }
    
    

//   return (
//     <>{loading ? 
//         <div>
//                 <div className="flex items-center justify-center h-screen">
//                     <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
//                 </div>
//         </div> : 
//             <div className='p-6 bg-gray-200 h-screen'>
//                 <div className='text-center'>
//                     <h3 className='text-2xl font-bold'>Manage Employee</h3>
//                 </div>
//                 <div className='flex justify-between items-center h-24' >
//                     <input type="text" name="" id="search-input" placeholder='search name' onChange={handleFilter} className='px-4 py-0.5 h-10 bg-white w-4xl'/>
//                     <Link to="/admin-dashboard/employees/add-employee" className='flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white'>Add New Employee</Link>
//                 </div>
//                 <div className='mt-5'>
//                 <DataTable
//                     columns={columns} 
//                     data={filteredEmployees}
//                     onRowClicked={(row) => navigate(`/admin-dashboard/employees/${row._id}`)}
//                     pagination
//                     highlightOnHover
//                     sortable
//                     customStyles={{
//                         headCells: {
//                             style: {
//                                 fontWeight: "bold", 
//                                 fontSize: "16px",  
//                                 backgroundColor: "#f3f4f6", 
//                                 color: "#000", 
//                             },
//                         },
//                     }}
//                 />

//                 </div>
//             </div>
//         }</>
//   )
// }

// export default List;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';

const server_url = import.meta.env.VITE_SERVER_URL;

const List = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${server_url}/api/employee`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success && Array.isArray(response.data.employee)) {
                    let sno = 1;
                    const data = response.data.employee.map((emp) => ({
                        _id: emp?._id || "N/A",
                        sno: sno++,
                        dept_name: emp?.department?.dept_name || "N/A",
                        name: emp?.userId?.name || "N/A",
                        dob: emp?.dob ? new Date(emp.dob).toLocaleDateString() : "N/A",
                        profileImage: emp?.userId?.profileImage || "",
                    }));

                    setEmployees(data);
                    setFilteredEmployees(data);
                } else {
                    console.error("Employees data is not an array:", response.data.employees);
                    setEmployees([]);
                    setFilteredEmployees([]);
                }
            } catch (error) {
                console.error(error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) =>
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredEmployees(records);
    };

    const handleDelete = (id) => {
        setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
        setFilteredEmployees((prevEmployees) => prevEmployees.filter((emp) => emp._id !== id));
    };

    return (
        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="p-6 bg-gray-200 h-screen">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Employee</h3>
                    </div>
                    <div className="flex justify-between items-center h-24">
                        <input
                            type="text"
                            id="search-input"
                            placeholder="Search name"
                            onChange={handleFilter}
                            className="px-4 py-0.5 h-10 bg-white w-4xl"
                        />
                        <Link
                            to="/admin-dashboard/employees/add-employee"
                            className="flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white"
                        >
                            Add New Employee
                        </Link>
                    </div>
                    <div className="mt-5">
                        <DataTable
                            columns={columns(handleDelete)}
                            data={filteredEmployees}
                            onRowClicked={(row) => navigate(`/admin-dashboard/employees/${row._id}`)}
                            pagination
                            highlightOnHover
                            sortable
                            customStyles={{
                                table: { style: { width: "100%" } },
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
            )}
        </>
    );
};

export default List;
