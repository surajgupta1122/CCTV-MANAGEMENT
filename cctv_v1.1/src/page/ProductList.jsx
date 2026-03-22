import { useEffect, useState } from "react";
import axios from "../utils/axios";
import refreshIcon from "../assets/icons/refresh.png";
import filterIcon from "../assets/icons/filter.png";
import packingListIcon from "../assets/icons/packing-list.png";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // 🎮 achievement-style message
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // 🔹 edit modal
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  // delete modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // Get current user from localStorage
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
      console.log("Current user:", user);
    } catch (err) {
      console.error("Error parsing user:", err);
    }
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1000);
  };

  // Check if user can edit/delete a product
  const canModify = (product) => {
    if (!currentUser) return false;
    
    // Admin can modify all products
    if (currentUser.role === "admin") return true;
    
    // Regular users can only modify their own products
    if (!product || !product.createdBy) return false;
    
    // Get owner ID (handle different formats)
    let ownerId = null;
    if (typeof product.createdBy === 'string') {
      ownerId = product.createdBy;
    } else if (product.createdBy._id) {
      ownerId = product.createdBy._id;
    } else if (product.createdBy.toString) {
      ownerId = product.createdBy.toString();
    }
    
    return ownerId === currentUser.id;
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
      showMessage("✔ Products loaded");
    } catch (error) {
      showMessage("✖ Failed to load products", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search & filter
  useEffect(() => {
    let data = [...products];

    if (search) {
      data = data.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All Categories") {
      data = data.filter((p) => p.category === category);
    }

    setFilteredProducts(data);
  }, [search, category, products]);

  // ---------------- EDIT ----------------
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm(product);
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/products/${selectedProduct._id}`, editForm);

      setProducts(
        products.map((p) => (p._id === selectedProduct._id ? res.data : p))
      );

      setIsEditOpen(false);
      showMessage("✔ Product updated");
    } catch (error) {
      showMessage(error.response?.data?.message || "✖ Failed to update product", "error");
    }
  };

  // ---------------- DELETE ----------------
  const openDeleteModal = (id) => {
    setDeleteProductId(id);
    setIsDeleteOpen(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/products/${deleteProductId}`);

      setProducts(products.filter((p) => p._id !== deleteProductId));
      setIsDeleteOpen(false);
      showMessage("✔ Product deleted");
    } catch (error) {
      showMessage(error.response?.data?.message || "✖ Failed to delete product", "error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center pr-1">
        <h1 className="text-2xl font-bold text-gray-800 px-1 py-2">
          Product List
        </h1>
        <button
          onClick={fetchProducts}
          className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1 flex items-center gap-1 text-sm hover:bg-[#012471] hover:text-white transition"
        >
          <img className="w-5 h-5 mt-1" src={refreshIcon} alt="refresh" />
          Refresh
        </button>
      </div>

      <div className="mx-1 mt-8 rounded-xl shadow-md">
        <h2 className="bg-blue-100 text-lg rounded-t-xl p-4 font-semibold flex gap-2">
          <img className="w-7 h-7" src={filterIcon} alt="filter" />
          Search & Filter Products
        </h2>

        <div className="flex justify-between items-center py-5 px-6">
          <div className="w-[77%]">
            <input
              type="text"
              placeholder=" 🔍 Search products by name or category...   "
              className="border border-gray-400 rounded-lg w-full pl-2 py-2 text-sm "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <select
              className="border border-gray-400 rounded-lg p-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All Categories</option>
              <option>Box Camera</option>
              <option>PTZ Camera</option>
              <option>Dome Camera</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🎮 Minecraft-style message */}
      {message && (
        <div className="flex justify-end my-3">
          <div
            className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all
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

      <div className="mx-1 mt-8 rounded-xl shadow-lg">
        <h3 className="bg-blue-100 text-lg rounded-t-xl p-4 font-semibold flex gap-2">
          <img className="w-6 h-6" src={packingListIcon} alt="products" />
          Product List ({filteredProducts.length} items)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-semibold">
            <thead className="bg-gray-100 font-bold text-gray-600 border-b">
              <tr>
                <th className="p-3">PRODUCT</th>
                <th className="p-3">BRAND</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">PRICE</th>
                <th className="p-3">STOCK</th>
                <th className="p-3">ADDED</th>
                <th className="p-3">STATUS</th>
                {currentUser?.role === "admin" && (
                  <th className="p-3">CREATED BY</th>
                )}
                <th className="p-3">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={currentUser?.role === "admin" ? 9 : 8} className="p-4 text-center">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={currentUser?.role === "admin" ? 9 : 8} className="p-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3 text-gray-600">{p.brand}</td>
                    <td className="p-3 text-gray-600">{p.category}</td>
                    <td className="p-3">₹{p.price}</td>
                    <td className="p-3">{p.quantity}</td>
                    <td className="p-3 text-gray-600">
                      {new Date(p.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`font-medium ${
                          p.quantity > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {p.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    
                    {/* Created By column - only for admin */}
                    {currentUser?.role === "admin" && (
                      <td className="p-3 text-gray-600">
                        {p.createdBy?.email || p.createdBy?.name || "Unknown"}
                      </td>
                    )}
                    
                    <td className="p-3">
                      {/* Only show edit/delete buttons if user has permission */}
                      {canModify(p) && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 hover:shadow-md transform transition duration-150 active:scale-95"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => openDeleteModal(p._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 hover:shadow-md transform transition duration-150 active:scale-95"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✏️ EDIT PRODUCT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[420px]">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <input
                type="text"
                name="name"
                value={editForm.name || ""}
                onChange={handleEditChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />

              <input
                type="number"
                name="price"
                value={editForm.price || ""}
                onChange={handleEditChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />

              <input
                type="number"
                name="quantity"
                value={editForm.quantity || ""}
                onChange={handleEditChange}
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

      {/* 🗑️ DELETE PRODUCT MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[380px]">
            <h2 className="text-xl font-bold mb-3 text-red-600">
              Delete Product
            </h2>

            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this product?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteProduct}
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

export default ProductList;