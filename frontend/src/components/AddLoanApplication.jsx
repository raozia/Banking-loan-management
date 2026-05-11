import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const AddLoanApplication = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    branchID: "",
    loanProductID: "",
    requestedAmount: "",
    requestedTenure: "",
    applicationDate: "",
    approvedDate: "",
    applicationstatus: "In-review",
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
      !formData.customerID ||
      !formData.branchID ||
      !formData.loanProductID ||
      !formData.requestedAmount ||
      !formData.requestedTenure ||
      !formData.applicationDate ||
      !formData.approvedDate
    ) {
      alert("Enter all fields");
      return;
    }
    try {
      const res = await api.post("/applications/create", formData);
      console.log(res.data.data);
      alert("Application Created");
      navigate("/dashboard/loanapplicationlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">
        Create Loan Application
      </h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="text-lg font-semibold">Customer ID:</label>
        <input
          type="text"
          name="customerID"
          placeholder="Customer ID"
          value={formData.customerID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label className="text-lg font-semibold">Branch ID:</label>
        <input
          type="text"
          name="branchID"
          placeholder="Branch ID"
          value={formData.branchID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label className="text-lg font-semibold">Loan Product ID:</label>
        <input
          type="text"
          name="loanProductID"
          placeholder="Loan Product ID"
          value={formData.loanProductID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Requested Amount:
        </label>
        <input
          type="text"
          name="requestedAmount"
          placeholder="Requested Amount"
          value={formData.requestedAmount}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Requested Tenure:
        </label>
        <input
          type="text"
          name="requestedTenure"
          placeholder="Requested Tenure"
          value={formData.requestedTenure}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Application Date:
        </label>
        <input
          type="date"
          name="applicationDate"
          placeholder="Approved Date"
          value={formData.applicationDate}
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

        <label className="text-lg font-semibold">Application Status</label>
        <select
          name="applicationstatus"
          value={formData.applicationstatus}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="In-review">In-review</option>
          <option value="Rejected">Rejected</option>
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

export default AddLoanApplication;
