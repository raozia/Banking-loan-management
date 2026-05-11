/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";
import { useNavigate } from "react-router";
const LoansList = () => {
  const [loans, setloans] = useState([]);
  const navigate = useNavigate();
  const fetchLoans = async () => {
    try {
      const res = await api.get("/loans/");
      console.log(res.data.data);
      setloans(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLoans();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/loans/${id}`);
      fetchLoans();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/editloan/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Loans List</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Application ID</th>
            <th className="border p-2">Loan Amount</th>
            <th className="border p-2">Tenure Limit</th>
            <th className="border p-2">Approved Date</th>
            <th className="border p-2">Disbursed Date</th>
            <th className="border p-2">Loan Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {loans.map((loan, index) => (
            <tr key={index} className="">
              <td className="border p-1">{loan.applicationID}</td>
              <td className="border p-1">{loan.loanAmount}</td>
              <td className="border p-1">{loan.TenureLimit}</td>
              <td className="border p-1">{loan.approvedDate}</td>
              <td className="border p-1">{loan.disbursedDate}</td>
              <td className="border p-1">{loan.loanStatus}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(loan.loanID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(loan.loanID)}
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

export default LoansList;
