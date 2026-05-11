import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router";

const EditInstallment = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    installmentNo: "",
    dueDate: "",
    dueAmount: "",
    installment_status: "",
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
    const fetchInstallments = async () => {
      try {
        const res = await api.get(`/installments/${id}`);
        console.log("installment data", res.data.data[0]);
        setFormData(res.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInstallments();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/installments/${id}`, formData);
      console.log(res.data.data);
      alert("Installment updated");
      navigate("/dashboard/installmentlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Edit Installment</h2>
      <form onSubmit={handleUpdate} className="space-y-2">
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

        <label className="text-lg font-semibold">Installment Status</label>
        <select
          name="installment_status"
          value={formData.installment_status}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        >
          <option value="Due">Due</option>
          <option value="Partially_paid">Partially_paid</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
          <option value="Writte_off">Writte_off</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/installmentlist")}
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditInstallment;
