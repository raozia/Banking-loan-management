import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    interestRate: "",
    maxAmount: "",
    tenureLimit: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get(`/loanProducts/${id}`);
        console.log("response is", res.data.data);
        setFormData(res.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [id]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/loanProducts/${id}`, formData);
      console.log(res.data.data);
      alert("Product Updated");
      navigate("/dashboard/productlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add Product</h2>
      <form onSubmit={handleUpdate} className="space-y-2">
        <label className="text-lg font-semibold">Product Name:</label>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Description:
        </label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Interest Rate:
        </label>
        <input
          type="text"
          name="interestRate"
          placeholder="Interest Rate"
          value={formData.interestRate}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Max Amount:
        </label>
        <input
          type="text"
          name="maxAmount"
          placeholder="Max Amount"
          value={formData.maxAmount}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Tenure Limit:
        </label>
        <input
          type="text"
          name="tenureLimit"
          placeholder="Tenure Limit"
          value={formData.tenureLimit}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/productlist")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
