import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL;

const ListLeave = () => {
  const { user } = useAuth();
  const id = user._id;
  const [leave, setLeave] = useState([]);

  const fetchLeave = async () => {
    try {
      const response = await axios.get(`${server_url}/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setLeave(response.data.leave);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <h3 className="text-2xl font-bold">Manage Leave</h3>
      </div>
      <div className="flex justify-between items-center h-24">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-0.5 h-10 bg-white w-4xl"
        />
        <Link
          to="/employee-dashboard/leave/apply-leave"
          className="flex px-4 py-1 bg-teal-600 border rounded h-10 items-center justify-center text-white"
        >
          Apply Leave
        </Link>
      </div>

      <div className="mt-5">
        {leave.length > 0 ? (
          <DataTable
            columns={columns}
            data={leave}
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

export default ListLeave;
