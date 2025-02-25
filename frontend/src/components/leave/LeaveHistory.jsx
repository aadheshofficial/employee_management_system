import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL;

const LeaveHistory = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState([]);
  const [filteredLeave,setFilteredLeave] = useState([]);

  const fetchLeave = async () => {
    try {
      const response = await axios.get(`${server_url}/api/leave/history/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeave(response.data.leave);
        setFilteredLeave(response.data.leave)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterByDate = (e) => {
    const record = leave.filter((l)=>
        new Date(l.appliedAt).toLocaleDateString().includes(e.target.value)    
    )
    setFilteredLeave(record)
  }

  useEffect(() => {
    fetchLeave();
  }, []);

  // Columns Configuration with Sorting
  const columns = [
    {
      name: "Sno",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
      sortable: true,
    },
    {
      name: "From",
      selector: (row) => new Date(row.startDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => new Date(row.endDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Applied Date",
      selector: (row) => new Date(row.appliedAt).toLocaleDateString(),
      sortable: true,
      sortFunction: (a, b) =>
        new Date(a.appliedAt) - new Date(b.appliedAt), 
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
  ];

  return (
    <div className="p-6 bg-gray-200 h-screen">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Leave history</h3>
      </div>
      <div className="flex justify-between items-center h-24">
        <input
          type="text"
          placeholder="Search By Applied Date"
          onChange={filterByDate}
          className="px-4 py-0.5 h-10 bg-white w-4xl"
        />
        
      </div>

      <div className="mt-5">
        {leave.length > 0 ? (
          <DataTable
            columns={columns}
            data={filteredLeave}
            pagination
            highlightOnHover
            defaultSortFieldId={6} 
            defaultSortAsc={false} 
          />
        ) : (
          <div className="text-center mt-28">
            <h2 className="text-2xl font-bold">No Data</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveHistory;
