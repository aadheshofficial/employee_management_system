export const columns = [
    {
        name : "S.No",
        selector:(row)=>row.sno
    },
    {
        name : "Department Name",
        selector:(row)=>row.dept_name
    },
    {
        name : "Action",
        cell: (row) => <DepartmentButtons />, 
        ignoreRowClick: true,
        allowOverflow: true,
        button: true
    },
    
    
]

export const DepartmentButtons = () => {
    return (
        <div>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}