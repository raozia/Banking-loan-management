/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const fetchcustomer = async () => {
    try {
      const res = await api.get("/customers/all");
      console.log(res.data.data);
      setCustomers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchcustomer();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete?");
    if (!confirmDelete) return;
    try {
      console.log("customerID is ", id);
      await api.delete(`/customers/${id}`);
      fetchcustomer();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/dashboard/updatecustomer/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Customers List</h1>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Branch</th>
            <th className="border p-2">NationalID</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {customers.map((customer, index) => (
            <tr key={index} className="">
              <td className="border p-1">{customer.firstName}</td>
              <td className="border p-1">{customer.lastName}</td>
              <td className="border p-1">{customer.email}</td>
              <td className="border p-1">{customer.branchID}</td>
              <td className="border p-1">{customer.nationalID}</td>
              <td className="border p-1">{customer.address}</td>
              <td className="border">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(customer.customers)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(customer.customers)}
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

export default CustomerList;
