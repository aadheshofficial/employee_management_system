import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
const server_url = import.meta.env.VITE_SERVER_URL;


const ViewSalary = () => {
    const {id} = useParams();
    const [salary,setSalary] = useState(null);
    const [filteredSalary,setFilteredSalary] = useState(null);
    let sno = 1;

    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`${server_url}/api/salary/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log(response.data);
            if(response.data.success){
                setSalary(response.data.salary);
                setFilteredSalary(response.data.salary);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchSalaries();
    },[]);

    const filterSalary = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredRecords = salary.filter((leave) =>
            leave.employeeId && leave.employeeId.employeeId && leave.employeeId.employeeId.toLowerCase().includes(searchValue)
        );
        setFilteredSalary(filteredRecords);
    };
    

  return (
    <>
        {filteredSalary === null ? (
            <div>
                <div className="flex items-center justify-center h-max">
                    <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
                </div>
            </div> 
        ):(
            <div className="overflow-x-auto p5 px-10 bg-gray-100 h-screen py-5 mt-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Salary History</h2>
                </div>
                <div className="flex justify-betwwen items-center my-3">
                    <input type="text" name="" id="" className='px-4 py-0.5 bg-white w-4xl ' placeholder='Search by Employee Id' onChange={filterSalary}/>
                </div>

                {filteredSalary.length > 0 ? (
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase  bg-gray-300 border border-gray-200">
                            <tr>
                                <th className="px-6 py-3">Sno</th>
                                <th className="px-6 py-3">Emp Id</th>
                                <th className="px-6 py-3">Salary</th>
                                <th className="px-6 py-3">Allowance</th>
                                <th className="px-6 py-3">Deduction</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Pay Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSalary.map((salary)=> (
                                <tr
                                key={salary.id}
                                className='bg-white border-b dark:bg-gray-50 dark:border-gray-700'>
                                    <td className="px-6 text-gray-800 py-3">{sno++}</td>
                                    <td className="px-6 text-gray-800 py-3">{salary.employeeId.employeeId}</td>
                                    <td className="px-6 text-gray-800 py-3">{salary.basicSalary}</td>
                                    <td className="px-6 text-gray-800 py-3">{salary.allowances}</td>
                                    <td className="px-6 text-gray-800 py-3">{salary.deductions}</td>
                                    <td className="px-6 text-gray-800 py-3">{salary.netSalary}</td>
                                    <td className="px-6 text-gray-800 py-3">
                                        {new Date(salary.payDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : 
                <div className="text-center mt-28">
                    <h2 className="text-2xl font-bold">No Data</h2>
                </div>
                }
            </div>

    )}</>
  )
}



export default ViewSalary
