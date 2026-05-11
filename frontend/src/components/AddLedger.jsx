import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

const AddLedger = () => {
  const [formData, setFormData] = useState({
    trxID: "",
    loanID: "",
    installmentID: "",
    paymentID: "",
    paymentAmount: "",
    paidAmount: "",
    remainingAmount: "",
    metaData: "",
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
      !formData.paymentID ||
      !formData.paymentAmount ||
      !formData.paidAmount
    ) {
      alert("Enter all fields");
    }
    try {
      const res = await api.post("/ledgers/add", formData);
      console.log("Form data is", res.data.data);
      alert("Ledger Added");
      navigate("/dashboard/ledgerlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add Ledger</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label htmlFor="" className="text-lg font-semibold">
          Trx ID:
        </label>
        <input
          type="text"
          name="trxID"
          placeholder="TRX ID"
          value={formData.trxID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label htmlFor="" className="text-lg font-semibold">
          Loan ID:
        </label>
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
          Payment ID:
        </label>
        <input
          type="text"
          name="paymentID"
          placeholder="Payment ID"
          value={formData.paymentID}
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
        {/* <label htmlFor="" className="text-lg font-semibold">
          Extra Details:
        </label>
        <textarea
          name="metaData"
          placeholder="Enter extra details "
          value={formData.metaData}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        /> */}
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

export default AddLedger;
