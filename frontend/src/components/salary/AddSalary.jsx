import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchDepartment, fetchEmployees } from '../../utils/EmployeeHelper.jsx'
const server_url = import.meta.env.VITE_SERVER_URL

const AddSalary = () => {
    const [employee,setEmployee] = useState({
        employeeId: "",
        department : "",
        basicSalary : 0,
        allowances : 0,
        deductions: 0,
        payDate:""
    })
    const [departments,setDepartments] = useState([])
    const [employees,setEmployees] = useState([])
    const navigate = useNavigate();
    useEffect(()=> {
        const getDepts = async () => {
            const depts = await fetchDepartment()
            setDepartments(depts) 
        }
        getDepts();
        // const fetchEmployee = async ()=>{
        //     // setLoading(true)
        //     try {
        //         const response = await axios.get(`${server_url}/api/employee/${id}`,{
        //             headers :{
        //                 "Authorization" :`Bearer ${localStorage.getItem("token")}`
        //             }
        //         })
        //         if (response.data.success){
        //             const emp = response.data.employee;
        //             setEmployee((prev) => ({...prev,
        //                 name:emp.userId.name,
        //                 maritalstatus:emp.maritalstatus,
        //                 designation:emp.designation,
        //                 salary:emp.salary,
        //                 department:emp.department.dept_name
        //             }))

        //         }

        //     } catch (error) {
        //         console.log(error)
        //         if(error.response && !error.response.data.success){
        //             // alert(error.response.data.error)
        //         }
        //     }
        //     finally{
        //         // setLoading(false)
        //         // console.log(employee)
        //     }
        // }
        // fetchEmployee();
    },[])
    const handleChange = (e) => {
        const {name,value} = e.target
        setEmployee((prevData)=> ({...prevData, [name]:value}))
        
    }
    const handleDepartment = async(e) => {
        try {
            const deptId = e.target.value;
            setEmployee((prev) => ({ ...prev, department: deptId })); // Update selected department
            const emps = await fetchEmployees(deptId);
            setEmployees(emps);
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${server_url}/api/salary/add/`,employee,{

                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            if(response.data.success){
                // alert("updated employee successfully")
                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <>{departments && employee ?(
            
        <div className='max-w-4xl mx-auto mt-16 bg-white p-8 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Department</label>
                        <select name="departmentId" value={employee.department} onChange={handleDepartment} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Department" required>
                            <option value="">Select Department</option>
                            {departments.map(dept => (
                                <option key={dept._id} value={dept._id}>{dept.dept_name.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Employee</label>
                        <select name="employeeId" onChange={handleChange} value={employee.employeeId} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder="Department" required>
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Basic Salary</label>
                        <input type="number" name="basicSalary" id="" placeholder='Basic Salary' className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required onChange={handleChange}/>
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Allowance</label>
                        <input type="number" name="allowances" onChange={handleChange}  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"  placeholder='Allowance' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Deduction</label>
                        <input type="number" name="deductions" onChange={handleChange}  className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Deduction' required />
                    </div>
                    <div>
                        <label  className="block text-sm font-medium-text-gray-700">Pay Date</label>
                        <input type="date" name="payDate" onChange={handleChange}  className="mt-1 p-2 block w-full border border-gray-300 rounded-md" placeholder='Pay Date' required />
                    </div>
                    
                </div>
                <button type="submit" className='flex w-full mt-6 px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white hover:bg-teal-700' >Add Salary</button>
            </form>

        </div>
        ):
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
            </div>
        </div> 
        }</>

    )
}

export default AddSalary
