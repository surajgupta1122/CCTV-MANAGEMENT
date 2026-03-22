import { useEffect, useState } from "react";
import axios from "../utils/axios";
import refreshIcon from "../assets/icons/refresh.png";
import editIcon from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🎮 achievement-style message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1000);
  };

  // edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

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

  // ---------------- EDIT ----------------
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

      setUsers(users.map((u) => (u._id === selectedUser._id ? res.data : u)));

      setIsEditOpen(false);
      showMessage("✔ User updated");
    } catch {
      showMessage("✖ Failed to update user", "error");
    }
  };

  // ---------------- DELETE ----------------
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
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-7 px-1 py-2">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={fetchUsers}
          className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1 flex items-center gap-1 text-sm hover:bg-[#012471] hover:text-white transition"
        >
          <img className="w-5 h-5 mt-1" src={refreshIcon} />
          Refresh
        </button>
      </div>

      {/* 🎮 message */}
      {message && (
        <div className="flex justify-end mb-3">
          <div
            className={`px-6 py-2 rounded-lg font-semibold shadow-lg
              ${
                messageType === "success"
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
          >
            {message}
          </div>
        </div>
      )}

      {/* ✅ CLEAN TERNARY RENDERING */}
      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-red-500 ">No users found</p>
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
                  <td className="px-3 py-2 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 hover:shadow-md transform transition duration-150 active:scale-95"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                      <img src={editIcon} alt="edit" className="w-5 h-5" />
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 hover:shadow-md transform transition duration-150 active:scale-95"
                      onClick={() => openDeleteModal(user._id)}
                    >
                      Delete
                      <img src={deleteIcon} alt="delete" className="w-5 h-5" />
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />

              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#012471] text-white px-4 py-2 rounded-lg hover:opacity-90 hover:shadow-md transform transition duration-150 active:scale-95"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[380px]">
            <h2 className="text-xl font-bold mb-3 text-red-600">Delete User</h2>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:shadow-md transform transition duration-150 active:scale-95"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
