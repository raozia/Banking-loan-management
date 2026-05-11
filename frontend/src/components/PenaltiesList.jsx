/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const PenaltiesList = () => {
  const [penalties, setpenalties] = useState([]);
  const navigate = useNavigate();
  const fetchpenalties = async () => {
    try {
      const res = await api.get(`/penalties/all`);
      setpenalties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchpenalties();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/penalties/${id}`);
      fetchpenalties();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/editpenalty/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Penalty List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Installment ID</th>
            <th className="border p-2">Penalty Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {penalties.map((penalty, index) => (
            <tr key={index} className="">
              <td className="border p-1">{penalty.installmentID}</td>
              <td className="border p-1">{penalty.penaltyDate}</td>
              <td className="border p-1">{penalty.amount}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(penalty.penaltyID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(penalty.penaltyID)}
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

export default PenaltiesList;
