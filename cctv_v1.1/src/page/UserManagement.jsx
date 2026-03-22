import { useEffect, useState } from "react";
import axios from "../utils/axios";
import refreshIcon from "../assets/icons/refresh.png";
import editIcon from "../assets/icons/edit.png";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1000);
  };

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/users");
      setUsers(res.data);
      showMessage("✔ Users loaded");
    } catch {
      showMessage("✖ Unable to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // EDIT
  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setIsEditOpen(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/users/${selectedUser._id}`, {
        name: editName,
        email: editEmail,
      });

      setUsers(users.map((u) =>
        u._id === selectedUser._id ? res.data : u
      ));

      setIsEditOpen(false);
      showMessage("✔ User updated");
    } catch {
      showMessage("✖ Failed to update user", "error");
    }
  };

  // DELETE
  const openDeleteModal = (id) => {
    setDeleteUserId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/users/${deleteUserId}`);
      setUsers(users.filter((u) => u._id !== deleteUserId));
      setIsDeleteOpen(false);
      showMessage("✔ User deleted");
    } catch {
      showMessage("✖ Failed to delete user", "error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2">
      {/* Header */}
      <div className="flex justify-between mb-7">
        <h1 className="text-2xl font-bold text-gray-800">
          User Management
        </h1>

        <button
          onClick={fetchUsers}
          className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1 flex items-center gap-2 text-sm hover:bg-[#012471] hover:text-white transition"
        >
          <img src={refreshIcon} className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className="flex justify-end mb-3">
          <div className={`px-6 py-2 rounded-lg font-semibold shadow-lg ${
            messageType === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}>
            {message}
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-red-500">No users found</p>
      ) : (
        <div className="bg-white rounded-xl shadow-xl overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#012471] text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{user.name}</td>
                  <td className="px-3 py-2">{user.email}</td>

                  {/* ACTION */}
                  <td className="px-3 py-2 flex gap-2">
                    {/* Edit */}
                    <button
                      onClick={() => openEditModal(user)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                    >
                      <img src={editIcon} className="w-4 h-4" />
                      Edit
                    </button>

                    {/* Delete (NO ICON) */}
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <form onSubmit={handleUpdateUser}>
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border p-2 w-full mb-2"
              />

              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="border p-2 w-full mb-2"
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;