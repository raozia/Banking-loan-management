import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const EditPenalty = () => {
  const [formData, setFormData] = useState({
    penaltyDate: "",
    amount: "",
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
    const fetchPenalties = async () => {
      try {
        const res = await api.get(`/penalties/${id}`);
        setFormData(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPenalties();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.penaltyDate || !formData.amount) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await api.put(`/penalties/${id}`, formData);
      console.log("Form data is..", res.data.data);
      alert("Penalty Updated");
      navigate("/dashboard/penaltieslist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Edit Penalty</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
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
          Update
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/penaltieslist")}
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPenalty;
