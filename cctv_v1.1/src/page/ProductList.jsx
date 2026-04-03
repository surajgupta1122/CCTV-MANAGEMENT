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

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 1000);
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
      console.error("Error fetching products:", error);
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
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.category?.toLowerCase().includes(search.toLowerCase())
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
    setEditForm({
      name: product.name || "",
      modelNumber: product.modelNumber || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price || "",
      quantity: product.quantity || "",
      resolution: product.resolution || "",
      lens: product.lens || "",
      poe: product.poe || false,
      nightVision: product.nightVision || false
    });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm({ 
      ...editForm, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`/products/${selectedProduct._id}`, editForm);
      setProducts(products.map((p) => (p._id === selectedProduct._id ? res.data : p)));
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

  // Get unique categories for filter
  const categories = ["All Categories", ...new Set(products.map(p => p.category).filter(Boolean))];

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Product List
        </h1>
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm hover:bg-[#012471] hover:text-white transition w-full sm:w-auto justify-center"
        >
          <img className="w-4 h-4 sm:w-5 sm:h-5" src={refreshIcon} alt="refresh" />
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Search & Filter */}
      <div className="rounded-xl shadow-md bg-white">
        <h2 className="bg-blue-100 text-base sm:text-lg rounded-t-xl p-3 sm:p-4 font-semibold flex gap-2 items-center">
          <img className="w-5 h-5 sm:w-6 sm:h-6" src={filterIcon} alt="filter" />
          Search & Filter Products
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 py-4 sm:py-5 px-4 sm:px-6">
          <div className="w-full sm:flex-1">
            <input
              type="text"
              placeholder="🔍 Search products by name or category..."
              className="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#012471]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-48">
            <select
              className="border border-gray-300 rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#012471]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="flex justify-end my-3">
          <div
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg text-sm sm:text-base
              ${messageType === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
          >
            {message}
          </div>
        </div>
      )}

      {/* Product Table */}
      <div className="mt-6 rounded-xl shadow-lg bg-white">
        <h3 className="bg-blue-100 text-base sm:text-lg rounded-t-xl p-3 sm:p-4 font-semibold flex gap-2 items-center">
          <img className="w-5 h-5 sm:w-6 sm:h-6" src={packingListIcon} alt="products" />
          Product List ({filteredProducts.length} items)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-100 font-semibold text-gray-700 border-b">
              <tr>
                <th className="p-2 sm:p-3">PRODUCT</th>
                <th className="p-2 sm:p-3 hidden sm:table-cell">BRAND</th>
                <th className="p-2 sm:p-3 hidden md:table-cell">CATEGORY</th>
                <th className="p-2 sm:p-3">PRICE</th>
                <th className="p-2 sm:p-3 hidden sm:table-cell">STOCK</th>
                <th className="p-2 sm:p-3 hidden lg:table-cell">ADDED</th>
                <th className="p-2 sm:p-3">STATUS</th>
                <th className="p-2 sm:p-3">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    <div className="flex justify-center items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#012471]"></div>
                      Loading products...
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50 transition">
                    <td className="p-2 sm:p-3 font-medium">{p.name || "N/A"}</td>
                    <td className="p-2 sm:p-3 text-gray-600 hidden sm:table-cell">{p.brand || "N/A"}</td>
                    <td className="p-2 sm:p-3 text-gray-600 hidden md:table-cell">{p.category || "N/A"}</td>
                    <td className="p-2 sm:p-3 font-semibold text-blue-600">₹{p.price || 0}</td>
                    <td className="p-2 sm:p-3 hidden sm:table-cell">{p.quantity || 0}</td>
                    <td className="p-2 sm:p-3 text-gray-500 hidden lg:table-cell text-xs">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-2 sm:p-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        p.quantity > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>
                        {p.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-2 sm:p-3">
                      <div className="flex flex-row gap-1 sm:gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(p._id)}
                          className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
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
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-[#012471]">Edit Product</h2>

            <form onSubmit={handleUpdateProduct} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Number</label>
                <input
                  type="text"
                  name="modelNumber"
                  value={editForm.modelNumber}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <select
                    name="brand"
                    value={editForm.brand}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                  >
                    <option value="">Select Brand...</option>
                    <option>Hikvision</option>
                    <option>Dahua Technology</option>
                    <option>CP Plus</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                  >
                    <option value="">Select Category...</option>
                    <option>Box Camera</option>
                    <option>PTZ Camera</option>
                    <option>Dome Camera</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resolution</label>
                  <select
                    name="resolution"
                    value={editForm.resolution}
                    onChange={handleEditChange}
                    className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                  >
                    <option value="">Select Resolution...</option>
                    <option>1920×1080</option>
                    <option>1440×900</option>
                    <option>1366×768</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lens</label>
                  <input
                    type="text"
                    name="lens"
                    value={editForm.lens}
                    onChange={handleEditChange}
                    placeholder="eg., 2.8mm, varifocal"
                    className="border border-gray-300 rounded-lg p-2 w-full text-sm focus:ring-2 focus:ring-[#012471] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="poe"
                    checked={editForm.poe}
                    onChange={handleEditChange}
                    className="w-4 h-4 rounded"
                  />
                  Power over Ethernet (PoE)
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    name="nightVision"
                    checked={editForm.nightVision}
                    onChange={handleEditChange}
                    className="w-4 h-4 rounded"
                  />
                  Night Vision
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#012471] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#0a2a8a] transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-full max-w-sm">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-red-600">
              Delete Product
            </h2>
            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
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