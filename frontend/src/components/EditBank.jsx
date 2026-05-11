import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";

const EditBank = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bankName, setbankName] = useState();
  useEffect(() => {
    const fetchBank = async () => {
      try {
        const res = await api.get(`/banks/${id}`);
        setbankName(res.data.data.bankName);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBank();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/banks/${id}`, { bankName });
      alert("Bank updated successfully");
      navigate("/dashboard/banklist");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-5">
      <button
        onClick={() => navigate("/dashboard/banklist")}
        className="bg-blue-400 py-1 px-3 rounded text-white cursor-pointer hover:bg-blue-500"
      >
        Back
      </button>
      <form onSubmit={handleUpdate}>
        <h1 className="text-2xl text-center font-bold">Update Bank</h1>
        <div className="w-full">
          <div className="">
            <h1 className="">Bank Name:</h1>
            <input
              type="text"
              placeholder="Enter Bank Name"
              value={bankName}
              className="w-full my-2 p-2 outline-0 bg-gray-100 rounded-md"
              onChange={(e) => setbankName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-blue-400 py-1 px-3 rounded text-white cursor-pointer hover:bg-blue-500"
          >
            Update Bank
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBank;
