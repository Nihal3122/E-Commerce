import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

const ChangeUserRole = ({ user, onClose ,getAllUser}) => {
  const [role, setRole] = useState(user?.role);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/update-user",
        {
          userId: user?._id,
          role,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log("Role updated successfully");
        toast.success("Role updated successfully")
        getAllUser()
      } else {
        console.error("Failed to update role:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Change User Role</h2>
        <p className="mb-2">
          <span className="font-medium">Name:</span> {user?.name}
        </p>
        <p className="mb-4">
          <span className="font-medium">Email:</span> {user?.email}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="ADMIN">Admin</option>
              <option value="GENERAL">General</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Change Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserRole;
