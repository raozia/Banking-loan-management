import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

const AddInstallment = () => {
  const [formData, setFormData] = useState({
    loanID: "",
    installmentNo: "",
    dueDate: "",
    dueAmount: "",
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
    if (!formData.loanID || !formData.installmentNo || !formData.dueDate) {
      alert("Enter all fields");
      return;
    }
    try {
      const res = await api.post("/installments/add", formData);
      console.log(res.data.data);
      alert("Installment Added");
      navigate("/dashboard/installmentlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add Installment</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="text-lg font-semibold">Loan ID:</label>
        <input
          type="text"
          name="loanID"
          placeholder="Loan ID"
          value={formData.loanID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />

        <label htmlFor="" className="text-lg font-semibold">
          Installment No:
        </label>
        <input
          type="text"
          name="installmentNo"
          placeholder="Installment No"
          value={formData.installmentNo}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Due Date:
        </label>
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          value={formData.dueDate}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Due Amount:
        </label>
        <input
          type="text"
          name="dueAmount"
          placeholder="Due Amount"
          value={formData.dueAmount}
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

export default AddInstallment;
