import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

const AddPayment = () => {
  const [formData, setFormData] = useState({
    loanID: "",
    installmentID: "",
    paymentAmount: "",
    paidAmount: "",
    paymentMethod: "",
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
      !formData.loanID ||
      !formData.installmentID ||
      !formData.paymentAmount ||
      !formData.paidAmount
    ) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await api.post("/loanPayments/create", formData);
      console.log("Form data is..", res.data.data);
      alert("Payment Created");
      navigate("/dashboard/paymentlist");
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
        <label className="text-lg font-semibold">Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="cash">cash</option>
          <option value="check">check</option>
          <option value="bank_transfer">bank_transfer</option>
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

export default AddPayment;
