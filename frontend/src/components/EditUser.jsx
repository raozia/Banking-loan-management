import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { RxCross2 } from "react-icons/rx";
import api from "../services/api";

const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    branchID: "",
    roles: [""],
  });
  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (index, value) => {
    const updatedRoles = [...formData.roles];
    updatedRoles[index] = value;

    setFormData((prev) => ({
      ...prev,
      roles: updatedRoles,
    }));
  };

  const addRole = () => {
    setFormData((prev) => ({
      ...prev,
      roles: [...prev.roles, ""],
    }));
  };

  const removeRole = (index) => {
    const updatedRoles = formData.roles.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      roles: updatedRoles,
    }));
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        const user = res.data.data[0];
        console.log("user data", res.data.data[0]);
        setFormData({
          userName: user.userName,
          userEmail: user.userEmail,
          branchID: user.branch.branchID,
          roles: user.roles.map((r) => r.roleID),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/users/${id}`, formData);
      console.log(res.data.data);
      alert("User updated");
      navigate("/dashboard/userslist");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-2xl text-center font-bold">Add New User</h2>
      <form className="space-y-2" onSubmit={handleUpdate}>
        <label className="text-lg font-semibold">User Name:</label>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          value={formData.userName}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label className="text-lg font-semibold">User Email:</label>
        <input
          type="text"
          name="userEmail"
          placeholder="User Email"
          value={formData.userEmail}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <label className="text-lg font-semibold">Branch ID:</label>
        <input
          type="text"
          name="branchID"
          placeholder="Branch ID"
          value={formData.branchID}
          onChange={handleChange}
          className="border p-2 mt-2 w-full"
        />
        <div>
          <label className="font-semibold">Roles:</label>

          {formData.roles.map((role, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Role ID"
                value={role}
                onChange={(e) => handleRoleChange(index, e.target.value)}
                className="border p-2 w-full"
              />

              {formData.roles.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRole(index)}
                  className="bg-red-500 text-white px-3 rounded"
                >
                  <RxCross2 />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addRole}
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded cursor-pointer"
          >
            Add Role
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/dashboard/userslist")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUser;
