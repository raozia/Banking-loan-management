import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const EditLoan = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    loanAmount: "",
    TenureLimit: "",
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

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await api.get(`/loans/${id}`);
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
      const res = await api.put(`/loans/${id}`, formData);
      console.log(res.data.data);
      alert("loan updated");
      navigate("/dashboard/loanlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Edit Loan</h2>
      <form onSubmit={handleUpdate} className="space-y-2">
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
          name="TenureLimit"
          placeholder="Tenure Limit"
          value={formData.TenureLimit}
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
        <button
          type="button"
          onClick={() => navigate("/dashboard/loanlist")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditLoan;
