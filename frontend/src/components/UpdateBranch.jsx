import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const UpdateBranch = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    bankID: "",
    branchCode: "",
    branchName: "",
    city: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await api.get(`/branches/${id}`);
        setFormData(res.data.data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBranch();
  }, [id]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/branches/${id}`, formData);
      console.log(res.data.data);
      alert("branch updated");
      navigate("/dashboard/branchlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Update branch</h1>
      <form action="" className="space-y-4" onSubmit={handleUpdate}>
        <input
          type="text"
          name="branchCode"
          value={formData.branchCode}
          placeholder="Branch Code"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="branchName"
          placeholder="Branch Name"
          value={formData.branchName}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={formData.city}
          className="border p-2 w-full"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          value={formData.address}
          className="border p-2 w-full"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/branchlist")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBranch;
