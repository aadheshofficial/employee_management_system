import axios from "axios"
import { useNavigate } from "react-router-dom"
const server_url = import.meta.env.VITE_SERVER_URL;

export const columns = (onDepartmentDelete) => [
    {
        name : "S.No",
        selector:(row)=>row.sno
    },
    {
        name : "Department Name",
        selector:(row)=>row.dept_name,
        sortable : true
    },
    {
        name : "Action",
        cell: (row) => <DepartmentButtons _id={row._id} onDepartmentDelete={onDepartmentDelete} />, 
        ignoreRowClick: true,
        // allowOverflow: true,
        // button: true
    },
    
    
]

export const DepartmentButtons = ({_id,onDepartmentDelete}) => {
    const navigate = useNavigate()
    const handleDelete = async (id)=> {
        const confirm = window.confirm("Are your sure you want to delete ?")
        if(confirm){
            try {
                const response = await axios.delete(`${server_url}/api/department/${id}`,{
                    headers :{
                        "Authorization" :`Bearer ${localStorage.getItem("token")}`
                    }
                })
                console.log("Server Response:", response.data);
                if (response.data.success){
                    onDepartmentDelete(_id)
                }
    
            } catch (error) {
                console.log(error)
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
        }

    }
    return (
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-teal-600 text-white rounded"
            onClick={() => navigate(`/admin-dashboard/department/${_id}`) }
            >Edit</button>
            <button className="px-3 py-1 bg-red-600 text-white rounded"
            onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}