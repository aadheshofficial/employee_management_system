import axios from "axios";
import { useNavigate } from "react-router-dom";
const server_url = import.meta.env.VITE_SERVER_URL;

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

export const columns = [
    {
        name : "S.No",
        selector:(row)=>row.sno,
        style: { textAlign: "center" },
        width:"70px"
    },
    {
        name : "Profile",
        style: { textAlign: "center" },
        selector:(row)=><img src={`${server_url}/${row.profileImage}`} width={40} alt="Profile" className="w-10 h-10 rounded-full" />,
        width:"100px"
        
    },
    {
        name : "Name",
        selector:(row)=>row.name,
        sortable : true,
        width:"150px"

    },
    {
        name : "Department",
        selector:(row)=>row.dept_name,
        sortable : true,
        width:"150px"

    },
    
    {
        name : "DOB",
        selector:(row)=>row.dob,
        sortable : true
    },

    {
        name : "Action",
        cell: (row) => <EmployeeButtons _id={row._id} />, 
        ignoreRowClick: true,
        style: { textAlign: "center" }
        // allowOverflow: true,
        // button: true
    },
    
    
]


export const EmployeeButtons = ({_id}) => {
    const navigate = useNavigate()

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded"
            onClick={() => navigate(`/admin-dashboard/employees/${_id}`) }
            >View</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={()=> navigate(`/admin-dashboard/employees/edit/${_id}`)}
            >Edit</button>
            <button className="px-3 py-1 bg-yellow-600 text-white rounded"
            onClick={()=> navigate(`/admin-dashboard/employees/salary/${_id}`)}
            >Salary</button>
            <button className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={()=> navigate(`/admin-dashboard/employees/leave/${_id}`)}
            >Leave</button>
        </div>
    )
}