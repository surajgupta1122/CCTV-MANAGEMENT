import { useEffect, useState } from "react";
import axios from "../utils/axios";
import refreshIcon from "../assets/icons/refresh.png";

// 🔥 In-memory flag – survives SPA navigation, resets on browser refresh
let hasLoadedOnce = false;

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1500);
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  // Fetch users
  const fetchUsers = async (fromRefresh = false) => {
    try {
      setLoading(true);
      const res = await axios.get("/users");
      setUsers(res.data);
      showMessage(fromRefresh ? "✔ Users refreshed" : "✔ Users loaded");
    } catch {
      showMessage("✖ Unable to load users", "error");
    } finally {
      setLoading(false);
      if (!hasLoadedOnce) {
        hasLoadedOnce = true;
      }
    }
  };

  useEffect(() => {
    // If this is the first visit or browser refresh, show spinner
    if (!hasLoadedOnce) {
      fetchUsers(false);
    } else {
      // Already loaded – fetch silently (still shows spinner)
      fetchUsers(false);
    }
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

      setUsers(users.map((u) => (u._id === selectedUser._id ? res.data : u)));
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
    <div className="bg-gray-50 min-h-screen p-3 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 sm:mb-6 md:mb-7">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          User Management
        </h1>

        <button
          onClick={() => fetchUsers(true)}
          disabled={loading}
          className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm hover:bg-[#012471] hover:text-white transition w-full sm:w-auto justify-center disabled:opacity-50"
        >
          <img className="w-5 h-5" src={refreshIcon} alt="refresh" />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* 🔥 Smooth Notification */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          message ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`flex justify-end transition-all duration-500 ease-in-out ${
            message
              ? "max-h-40 opacity-100 scale-100"
              : "max-h-0 opacity-0 scale-95"
          }`}
        >
          <div
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg text-sm sm:text-base
              ${messageType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
              transition-all duration-500 ease-in-out
              ${message ? "opacity-100" : "opacity-0"}`}
          >
            {message}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-x-auto mt-2 sm:mt-3 md:mt-4">
        <table className="w-full text-left">
          <thead className="bg-[#012471] text-white">
            <tr>
              <th className="p-2 sm:p-3 text-sm sm:text-base">#</th>
              <th className="p-2 sm:p-3 text-sm sm:text-base">Name</th>
              <th className="p-2 sm:p-3 text-sm sm:text-base">Email</th>
              <th className="p-2 sm:p-3 text-sm sm:text-base">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // 🔄 Spinner loading – same for both first load and refresh
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  <div className="flex justify-center items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#012471]"></div>
                    Loading users...
                  </div>
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-2 sm:px-3 py-2 text-sm">{index + 1}</td>
                  <td className="px-2 sm:px-3 py-2 text-sm sm:text-base">{user.name}</td>
                  <td className="px-2 sm:px-3 py-2 text-sm sm:text-base">{user.email}</td>

                  {/* ACTION BUTTONS */}
                  <td className="px-2 sm:px-3 py-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-green-600 hover:shadow-md transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openDeleteModal(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs sm:text-sm hover:bg-red-600 hover:shadow-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-full sm:w-[400px]">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Edit User</h2>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="border rounded-lg p-2 w-full text-sm sm:text-base focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                required
              />

              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="border rounded-lg p-2 w-full text-sm sm:text-base focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg text-sm sm:text-base hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#012471] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-[#0a2a8a] transition"
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
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-[90%] sm:w-[380px]">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-red-600">
              Delete User
            </h2>

            <p className="text-sm sm:text-base mb-6">
              Are you sure you want to delete this user?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg text-sm sm:text-base hover:bg-gray-50 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteUser}
                className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base hover:bg-red-600 transition"
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