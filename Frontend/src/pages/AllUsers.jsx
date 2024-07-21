import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const getAllUser = async () => {
    const response = await axios(
      "http://localhost:8080/api/v1/users/getalluser",
      { withCredentials: true }
    );
    setUsers(response.data.allUser);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="p-6">
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-800 text-white uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Sr.</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Role</th>
            <th className="py-3 px-6 text-left">Created Date</th>
            <th className="py-3 px-6 text-left">Profile Pic</th>
            <th className="py-3 px-6 text-left">Edit Role</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-semibold">
          {users.map((user, index) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{user?.name}</td>
              <td className="py-3 px-6 text-left">{user?.email}</td>
              <td className="py-3 px-6 text-left">{user?.role}</td>
              <td className="py-3 px-6 text-left">
                {new Date(user?.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-center">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  "No Profile Picture"
                )}
              </td>
              <td className="py-3 px-4 text-left">
                <button
                  className="ml-8 text-blue-500 hover:text-blue-700"
                  onClick={() => setSelectedUser(user)}
                >
                  <MdModeEditOutline size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <ChangeUserRole
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          getAllUser={getAllUser}
        />
      )}
    </div>
  );
};

export default AllUsers;
