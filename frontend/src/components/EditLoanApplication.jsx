import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const EditLoanApplication = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    requestedAmount: "",
    requestedTenure: "",
    applicationDate: "",
    approvedDate: "",
    application_status: "In-review",
  });
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await api.get(`/applications/${id}`);
        setFormData(res.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLoans();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/applications/${id}`, formData);
      console.log(res.data.data);
      alert("Application updated");
      navigate("/dashboard/loanapplicationlist");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("form data is..", formData);
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Edit Loan Application</h2>
      <form onSubmit={handleUpdate} className="space-y-2">
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
          placeholder="Approved Date"
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
          name="application_status"
          value={formData.application_status}
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
        <button
          type="button"
          onClick={() => navigate("/dashboard/loanapplicationlist")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditLoanApplication;
