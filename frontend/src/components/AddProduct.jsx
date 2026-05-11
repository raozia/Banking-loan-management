import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    interestRate: "",
    maxAmount: "",
    tenureLimit: "",
  });
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.productName ||
      !formData.interestRate ||
      !formData.maxAmount ||
      !formData.tenureLimit
    ) {
      alert("Enter all fields");
      return;
    }
    try {
      const res = await api.post("/loanProducts/add", formData);
      console.log(res.data.data);
      alert("Product Added");
      navigate("/dashboard/productlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
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
      </form>
    </div>
  );
};

export default AddProduct;
