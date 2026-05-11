/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const InstallmentList = () => {
  const [installments, setinstallments] = useState([]);
  const navigate = useNavigate();
  const fetchInstallments = async () => {
    try {
      const res = await api.get(`/installments/`);
      console.log(res.data.data);
      setinstallments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchInstallments();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/installments/${id}`);
      fetchInstallments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/editinstallment/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Installment List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Loan ID</th>
            <th className="border p-2">Installment No</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Due Amount</th>
            <th className="border p-2">Installment Status</th>

            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {installments.map((installment, index) => (
            <tr key={index} className="">
              <td className="border p-1">{installment.loanID}</td>
              <td className="border p-1">{installment.installmentNo}</td>
              <td className="border p-1">{installment.dueDate}</td>
              <td className="border p-1">{installment.dueAmount}</td>
              <td className="border p-1">{installment.installment_status}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(installment.installmentID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(installment.installmentID)}
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

export default InstallmentList;
