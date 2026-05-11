import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

const AddRole = () => {
  const [formData, setFormData] = useState({
    roleName: "",
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
    if (!formData.roleName) {
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
    <div>
      <h1>Add Role</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
      </form>
    </div>
  );
};

export default AddRole;
