/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import api from "../services/api";

const UsersList = () => {
  const [users, setusers] = useState([]);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users/all`);
      console.log(res.data.data);
      setusers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/edituser/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Users List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">User Name</th>
            <th className="border p-2">User Email</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">Roles</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {users.map((user, index) => (
            <tr key={index} className="">
              <td className="border p-1">{user.userName}</td>
              <td className="border p-1">{user.userEmail}</td>
              <td className="border p-1">
                <span>BranchID:</span> <br />
                {user.branch?.branchID}
                <br />
                <span>Code:{user.branch?.branchCode}</span>
                <br />
                <span>BranchName:{user.branch?.branchName}</span>
              </td>
              <td className="border p-1">
                {user.roles.map((role) => (
                  <span key={role.roleID} className="px-2">
                    {role.roleID}
                  </span>
                ))}
              </td>

              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(user.userID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(user.userID)}
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

export default UsersList;
