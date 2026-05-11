/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const LedgerList = () => {
  const [ledgers, setledgers] = useState([]);
  const navigate = useNavigate();
  const fetchledger = async () => {
    try {
      const res = await api.get(`/ledgers/`);
      setledgers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchledger();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/ledgers/${id}`);
      fetchledger();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/editledger/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Penalty List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">TRX ID</th>
            <th className="border p-2">Installment ID</th>
            <th className="border p-2">Loan ID</th>
            <th className="border p-2">Payment ID</th>
            <th className="border p-2">Payment Amount</th>
            <th className="border p-2">Paid Amount</th>
            <th className="border p-2">Remaining Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {ledgers.map((ledger, index) => (
            <tr key={index} className="">
              <td className="border p-1">{ledger.trxID}</td>
              <td className="border p-1">{ledger.installmentID}</td>
              <td className="border p-1">{ledger.loanID}</td>
              <td className="border p-1">{ledger.paymentID}</td>
              <td className="border p-1">{ledger.paymentAmount}</td>
              <td className="border p-1">{ledger.paidAmount}</td>
              <td className="border p-1">{ledger.remainingAmount}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(ledger.ledgerID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(ledger.ledgerID)}
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

export default LedgerList;
