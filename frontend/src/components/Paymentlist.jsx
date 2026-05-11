/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const Paymentlist = () => {
  const [payments, setpayments] = useState([]);
  const navigate = useNavigate();
  const fetchpayments = async () => {
    try {
      const res = await api.get(`/loanPayments/`);
      console.log(res.data.data);
      setpayments(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchpayments();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/loanPayments/${id}`);
      fetchpayments();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/editpayment/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Payments List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Loan ID</th>
            <th className="border p-2">Installment ID</th>
            <th className="border p-2">Payment Amount</th>
            <th className="border p-2">Paid Amount</th>
            <th className="border p-2">Payment Method</th>

            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {payments.map((payment, index) => (
            <tr key={index} className="">
              <td className="border p-1">{payment.loanID}</td>
              <td className="border p-1">{payment.installmentID}</td>
              <td className="border p-1">{payment.paymentAmount}</td>
              <td className="border p-1">{payment.paidAmount}</td>
              <td className="border p-1">{payment.paymentMethod}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(payment.paymentID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(payment.paymentID)}
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

export default Paymentlist;
