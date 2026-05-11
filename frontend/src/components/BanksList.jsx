/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router";

const BanksList = () => {
  const [banks, setBanks] = useState([]);
  const navigate = useNavigate();
  const fetchBanks = async () => {
    try {
      const res = await api.get("/banks/all");
      setBanks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/banks/${id}`);
      fetchBanks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/updatebank/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center  text-2xl font-bold">Banks List</h1>
      <table className="w-full border   border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Bank Name</th>
            <th className="border p-2">LicenseNo</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {banks.map((bank, index) => (
            <tr key={index} className="">
              <td className="border p-1">{bank.bankName}</td>
              <td className="border p-1">{bank.licenseNo}</td>
              <td className="border">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(bank.bankID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(bank.bankID)}
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

export default BanksList;
