import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const EditLedger = () => {
  const [formData, setFormData] = useState({
    paymentAmount: "",
    paidAmount: "",
    remainingAmount: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await api.get(`/ledgers/${id}`);
        setFormData(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLedger();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.paymentAmount || !formData.paidAmount) {
      alert("Enter all fields");
    }
    try {
      const res = await api.put(`/ledgers/${id}`, formData);
      console.log("Form data is", res.data.data);
      alert("Ledger updated");
      navigate("/dashboard/ledgerlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Edit Ledger</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="" className="text-lg font-semibold">
          Payment Amount:
        </label>
        <input
          type="text"
          name="paymentAmount"
          placeholder="Payment Amount"
          value={formData.paymentAmount}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Paid Amount:
        </label>
        <input
          type="text"
          name="paidAmount"
          placeholder="Paid Amount"
          value={formData.paidAmount}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Remaining Amount:
        </label>
        <input
          type="text"
          name="paidAmount"
          placeholder="Paid Amount"
          value={formData.remainingAmount}
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

export default EditLedger;
