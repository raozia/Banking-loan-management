/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";

const ProductsList = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const fetchLoanProducts = async () => {
    try {
      const res = await api.get(`/loanProducts/`);
      console.log(res.data.data);
      setproducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchLoanProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Confirm Delete");
    if (!confirmDelete) return;
    try {
      await api.delete(`/loanProducts/${id}`);
      fetchLoanProducts();
    } catch (err) {
      console.error(err);
    }
  };
  const handleEdit = async (id) => {
    navigate(`/dashboard/editproduct/${id}`);
  };
  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold">Loan Products List</h1>
      <table className="w-full border border-gray-300 mt-5">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Loan Product ID</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Interest Rate</th>
            <th className="border p-2">Max Amount</th>
            <th className="border p-2">Tenure Limit</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody className="[&>*:nth-child(odd)_td]:bg-gray-100 [&>*:nth-child(even)_td]:bg-white">
          {products.map((product, index) => (
            <tr key={index} className="">
              <td className="border p-1">{product.loanProductID}</td>
              <td className="border p-1">{product.productName}</td>
              <td className="border p-1">{product.description}</td>
              <td className="border p-1">{product.interestRate}</td>
              <td className="border p-1">{product.maxAmount}</td>
              <td className="border p-1">{product.tenureLimit}</td>
              <td className="border ">
                <div className="flex justify-center">
                  <button
                    className="cursor-pointer text-yellow-500"
                    onClick={() => handleEdit(product.loanProductID)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="ml-3 cursor-pointer text-red-500"
                    onClick={() => handleDelete(product.loanProductID)}
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

export default ProductsList;
