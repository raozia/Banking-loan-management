import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

const AddBranch = () => {
  const [formData, setFormData] = useState({
    bankID: "",
    branchCode: "",
    branchName: "",
    city: "",
    address: "",
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
    if (!formData.bankID || !formData.branchCode || !formData.branchName) {
      alert("Please fill required fields");
      return;
    }
    try {
      const res = await api.post("/branches/add", formData);
      console.log(res.data.data);
      alert("Branch added");
      navigate("/dashboard/branchlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Add Branch</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="bankID"
          placeholder="Bank ID"
          value={formData.bankID}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="branchCode"
          placeholder="Branch Code"
          value={formData.branchCode}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="branchName"
          placeholder="Branch Name"
          value={formData.branchName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Branch
        </button>
      </form>
    </div>
  );
};

export default AddBranch;
