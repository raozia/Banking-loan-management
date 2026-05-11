/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const LoanApplicationList = () => {
  const [loans, setloans] = useState([]);
  const navigate = useNavigate();
  const fetchLoanApplication = async () => {
    try {
      const res = await api.get(`/applications/`);
      console.log(res.data.data);
      setloans(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLoanApplication();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/applications/${id}`);
      fetchLoanApplication();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/editloanapplication/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Loan Application List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Application ID</th>
            <th className="border p-2">Loan Product ID</th>
            <th className="border p-2">Requested Amount</th>
            <th className="border p-2">Requested Tenure</th>
            <th className="border p-2">Application Date</th>
            <th className="border p-2">Approved Date</th>
            <th className="border p-2">Application Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {loans.map((loan, index) => (
            <tr key={index} className="">
              <td className="border p-1">{loan.applicationID}</td>
              <td className="border p-1">{loan.loanProductID}</td>
              <td className="border p-1">{loan.requestedAmount}</td>
              <td className="border p-1">{loan.requestedTenure}</td>
              <td className="border p-1">{loan.applicationDate}</td>
              <td className="border p-1">{loan.approvedDate}</td>
              <td className="border p-1">{loan.application_status}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(loan.applicationID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(loan.applicationID)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanApplicationList;
