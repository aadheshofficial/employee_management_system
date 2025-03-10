import { useNavigate } from "react-router-dom"


export const columns = [
    {
        name : "S No",
        selector :(row)=>row.sno,
        width: "70px"
    },
    {
        name : "Emp Id",
        selector :(row)=>row.employeeId,
        width: "120px"
    },
    {
        name : "Name",
        selector :(row)=>row.name,
        width: "120px"
    },
    {
        name : "Leave Type",
        selector :(row)=>row.leaveType,
        width: "140px"
    },
    {
        name : "Department",
        selector :(row)=>row.dept_name,
        width: "170px"
    },
    {
        name : "Days",
        selector :(row)=>row.days,
        width: "80px"
    },
    {
        name : "Status",
        selector :(row)=>row.status,
        width: "120px"
    },
    {
        name : "Action",
        selector :(row)=>row.action,
        center:true
    },
]

export const LeaveButton = ({id}) => {
    const navigate = useNavigate();
    const handleView = () =>{
        navigate(`/admin-dashboard/leave/detail/${id}`);
    }
    return (
        <button className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600" onClick={handleView}>
            View
        </button>
    )
}
