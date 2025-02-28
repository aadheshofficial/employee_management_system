// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const server_url = import.meta.env.VITE_SERVER_URL;

export const fetchDepartment = async ()=>{
    let departments 

    try {
        const response = await axios.get(`${server_url}/api/department`,{
            headers :{
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            }
        })
        if (response.data.success){
            departments = response.data.departments
        }

    } catch (error) {
        if(error.response && error.response.data.success){
            alert(error.response.data.error)
        }
    }
    return departments;
    
}

export const fetchEmployees = async (id) =>{
    let employee;
    try {
        const response = await axios.get(`${server_url}/api/employee/department/${id}`,{
            headers :{
                "Authorization" :`Bearer ${localStorage.getItem("token")}`
            }
        })
        // console.log(response.data.employee)
        if (response.data.success){
            employee = response.data.employee
        }

    } catch (error) {
        if(error.response && error.response.data.success){
            alert(error.response.data.error)
        }
    }
    return employee;
    
}

// // const handleDelete = async () => {
// //     if (window.confirm("Are you sure you want to delete this employee?")) {
// //         try {
// //             const response = await axios.delete(`${server_url}/api/employee/delete/${_id}`, {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                 },
// //             });

// //             if (response.data.success) {
// //                 alert("Employee deleted successfully");
// //                 onDelete(_id); // Update the state in parent component
// //             }
// //         } catch (error) {
// //             alert("Error deleting employee");
// //             console.error(error);
// //         }
// //     }
// // };

// export const columns = [
//     {
//         name : "S.No",
//         selector:(row)=>row.sno,
//         style: { textAlign: "center" },
//         width:"30px"
//     },
//     {
//         name : "Profile",
//         style: { textAlign: "center" },
//         selector:(row)=><img src={`${server_url}/${row.profileImage}`} width={40} alt="Profile" className="w-10 h-10 rounded-full" />,
//         width:"100px"
        
//     },
//     {
//         name : "Name",
//         selector:(row)=>row.name,
//         sortable : true,
//         width:"100px"

//     },
//     {
//         name : "Department",
//         selector:(row)=>row.dept_name,
//         sortable : true,
//         width:"100px"

//     },
    

//     {
//         name : "Action",
//         cell: (row) => <EmployeeButtons _id={row._id} />, 
//         ignoreRowClick: true,
//         style: { textAlign: "center" }
//         // allowOverflow: true,
//         // button: true
//     },
    
    
// ]

// export const EmployeeButtons = ({ _id, onDelete }) => {
//     const navigate = useNavigate();

//     const handleDelete = async () => {
//         if (window.confirm("Are you sure you want to delete this employee?")) {
//             try {
//                 const response = await axios.delete(`${server_url}/api/employee/delete/${_id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                     },
//                 });

//                 if (response.data.success) {
//                     alert("Employee deleted successfully");
//                     onDelete(_id); // Remove from state
//                 }
//             } catch (error) {
//                 alert("Error deleting employee");
//                 console.error(error);
//             }
//         }
//     };

//     return (
//         <div className="flex space-x-5">
//             <button className="px-3 py-1 bg-teal-600 text-white rounded"
//                 onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}>
//                 View
//             </button>
//             <button className="px-3 py-1 bg-blue-600 text-white rounded"
//                 onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}>
//                 Edit
//             </button>
//             <button className="px-3 py-1 bg-orange-600 text-white rounded"
//                 onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}>
//                 Salary
//             </button>
//             <button className="px-3 py-1 bg-yellow-600 text-white rounded"
//                 onClick={() => navigate(`/admin-dashboard/employees/leave/${_id}`)}>
//                 Leave
//             </button>
//             <button className="px-3 py-1 bg-red-700 text-white rounded"
//                 onClick={handleDelete}>
//                 Delete
//             </button>
//         </div>
//     );
// };


// // export const EmployeeButtons = ({_id}) => {
// //     const navigate = useNavigate()

// //     return (
// //         <div className="flex space-x-5">
// //             <button className="px-3 py-1 bg-teal-600 text-white rounded"
// //             onClick={() => navigate(`/admin-dashboard/employees/${_id}`) }
// //             >View</button>
// //             <button className="px-3 py-1 bg-blue-600 text-white rounded"
// //             onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
// //             >Edit</button>
// //             <button className="px-3 py-1 bg-orange-600 text-white rounded"
// //             onClick={()=> navigate(`/admin-dashboard/employees/salary/${_id}`)}
// //             >Salary</button>
// //             <button className="px-3 py-1 bg-yellow-600 text-white rounded"
// //             onClick={()=> navigate(`/admin-dashboard/employees/leave/${_id}`)}
// //             >Leave</button>
// //             <button className="px-3 py-1 bg-red-700 text-white rounded"
// //             onClick={handleDelete}
// //             >Delete</button>
// //         </div>
// //     )
// // }

import axios from "axios";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_SERVER_URL;

export const EmployeeButtons = ({ _id, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            try {
                const response = await axios.delete(`${server_url}/api/employee/delete/${_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    alert("Employee deleted successfully");
                    onDelete(_id);
                }
            } catch (error) {
                alert("Error deleting employee");
                console.error(error);
            }
        }
    };

    return (
        <div className="flex space-x-5">
            <button className="px-3 py-1 bg-teal-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/${_id}`)}>
                View
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${_id}`)}>
                Edit
            </button>
            <button className="px-3 py-1 bg-orange-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/salary/${_id}`)}>
                Salary
            </button>
            <button className="px-3 py-1 bg-yellow-600 text-white rounded"
                onClick={() => navigate(`/admin-dashboard/employees/leave/${_id}`)}>
                Leave
            </button>
            <button className="px-3 py-1 bg-red-700 text-white rounded" onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};


export const columns = (onDelete) => [
    {
        name: "S.No",
        selector: (row) => row.sno,
        minWidth: "70px",
        maxWidth: "80px",
        center: true,
    },
    {
        name: "Profile",
        selector: (row) => (
            <div className="flex justify-center">
                <img src={`${server_url}/${row.profileImage}`} width={40} alt="Profile" className="w-10 h-10 rounded-full" />
            </div>
        ),
        minWidth: "70px",
        center: true,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        minWidth: "10px",
        center: true,
    },
    {
        name: "Department",
        selector: (row) => row.dept_name,
        sortable: true,
        minWidth: "200px",
        center: true,
    },
    {
        name: "Action",
        cell: (row) => <EmployeeButtons _id={row._id} onDelete={onDelete} />,
        ignoreRowClick: true,
        minWidth: "450px",
        center: true,
    },
];