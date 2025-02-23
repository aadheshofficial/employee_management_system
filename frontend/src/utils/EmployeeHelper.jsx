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

export const columns = [
    {
        name : "S.No",
        selector:(row)=>row.sno
    },
    {
        name : "Name",
        selector:(row)=>row.name,
        sortable : true
    },
    {
        name : "Profile",
        selector:(row)=><img src={row.profileImage} alt="Profile" className="w-10 h-10 rounded-full" />,
    },
    {
        name : "Department",
        selector:(row)=>row.dept_name,
        sortable : true
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
        // allowOverflow: true,
        // button: true
    },
    
    
]


export const EmployeeButtons = ({_id}) => {
    const navigate = useNavigate()

    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded"
            onClick={() => navigate(`/admin-dashboard/department/${_id}`) }
            >View</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded"
            >Edit</button>
            <button className="px-3 py-1 bg-yellow-600 text-white rounded"
            >Salary</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded"
            >Leave</button>
        </div>
    )
}