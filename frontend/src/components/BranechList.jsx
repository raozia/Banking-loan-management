/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";
import { useNavigate } from "react-router";

const BranechList = () => {
  const [branches, setBranches] = useState([]);
  const navigate = useNavigate();
  const fetchBranches = async () => {
    try {
      const res = await api.get("/branches/");
      console.log(res.data.data);
      setBranches(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      console.log("branchID is ", id);
      await api.delete(`/branches/${id}`);
      fetchBranches();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/updatebranch/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Branches List</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">BranchID</th>
            <th className="border p-2">BankID</th>
            <th className="border p-2">BranchCode</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {branches.map((branch, index) => (
            <tr key={index} className="">
              <td className="border p-1">{branch.branchID}</td>
              <td className="border p-1">{branch.bankID}</td>
              <td className="border p-1">{branch.branchCode}</td>
              <td className="border p-1">{branch.city}</td>
              <td className="border p-1">{branch.address}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(branch.branchID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(branch.branchID)}
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

export default BranechList;
