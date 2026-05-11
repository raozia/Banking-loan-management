import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const AddPenalties = () => {
  const [formData, setFormData] = useState({
    installmentID: "",
    penaltyDate: "",
    amount: "",
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
    if (!formData.installmentID || !formData.penaltyDate || !formData.amount) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await api.post("/penalties/add", formData);
      console.log("Form data is..", res.data.data);
      alert("Penalty Created");
      navigate("/dashboard/penaltieslist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add Penalty</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="" className="text-lg font-semibold">
          Installment ID:
        </label>
        <input
          type="text"
          name="installmentID"
          placeholder="Installment ID"
          value={formData.installmentID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Penalty Date:
        </label>
        <input
          type="date"
          name="penaltyDate"
          placeholder="Penalty Date"
          value={formData.penaltyDate}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Amount:
        </label>
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
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

export default AddPenalties;
