import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RxCross2 } from "react-icons/rx";
import api from "../services/api";

const UpdateCustomer = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    branchID: "",
    firstName: "",
    lastName: "",
    email: "",
    nationalID: "",
    address: "",
    phones: [""],
  });
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const addPhone = () => {
    setFormData((prev) => ({
      ...prev,
      phones: [...prev.phones, ""],
    }));
  };
  const removePhone = (index) => {
    const updatedPhones = formData.phones.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      phones: updatedPhones,
    }));
  };
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await api.get(`/customers/${id}`);
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
      const res = await api.put(`/customers/${id}`, formData);
      console.log(res.data.data);
      alert("loan updated");
      navigate("/dashboard/customerlist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 max-w-full">
      <h1 className="text-2xl font-bold mb-4">Add Customer</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="branchID"
          placeholder="Branch ID"
          value={formData.branchID}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="nationalID"
          placeholder="National ID"
          value={formData.nationalID}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <div>
          <label className="font-semibold">Phone Numbers</label>

          {formData.phones.map((phone, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                value={phone}
                className="border p-2 w-full"
                placeholder="Enter phone number"
              />

              {formData.phones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePhone(index)}
                  className="bg-red-500 text-white px-3"
                >
                  <RxCross2 />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addPhone}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Add Phone
          </button>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard/customerlist")}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCustomer;
