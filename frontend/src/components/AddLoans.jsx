import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

const AddLoans = () => {
  const [formData, setFormData] = useState({
    applicationID: "",
    loanAmount: "",
    tenureLimit: "",
    approvedDate: "",
    disbursedDate: "",
    loan_status: "Approved",
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
      !formData.applicationID ||
      !formData.loanAmount ||
      !formData.tenureLimit ||
      !formData.approvedDate ||
      !formData.disbursedDate
    ) {
      alert("Enter all fields");
      return;
    }
    try {
      const res = await api.post("/loans/addloan", formData);
      console.log(res.data.data);
      alert("Loan Added");
      navigate("/dashboard/loanlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add Loan</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="text-lg font-semibold">Application ID:</label>
        <input
          type="text"
          name="applicationID"
          placeholder="Application ID"
          value={formData.applicationID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label className="text-lg font-semibold">Loan Amount:</label>
        <input
          type="text"
          name="loanAmount"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label className="text-lg font-semibold">Tenure Limit:</label>
        <input
          type="text"
          name="tenureLimit"
          placeholder="Tenure Limit"
          value={formData.tenureLimit}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Approved Date:
        </label>
        <input
          type="date"
          name="approvedDate"
          placeholder="Approved Date"
          value={formData.approvedDate}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Disbursed Date:
        </label>
        <input
          type="date"
          name="disbursedDate"
          placeholder="Disbursed Date"
          value={formData.disbursedDate}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />

        <label className="text-lg font-semibold">Loan Status</label>
        <select
          name="loan_status"
          value={formData.loan_status}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Approved">Approved</option>
          <option value="Disbursed">Disbursed</option>
          <option value="Closed">Closed</option>
          <option value="Write_off">Write_off</option>
        </select>

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

export default AddLoans;
