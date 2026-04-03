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
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        console.log("Current user loaded:", user);
      } else {
        console.log("No user data found in localStorage");
      }
    } catch (err) {
      console.error("Error parsing user:", err);
    }
  }, []);

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
      console.log("Fetched products:", res.data);
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
    setEditForm({
      name: product.name,
      modelNumber: product.modelNumber,
      brand: product.brand,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      resolution: product.resolution,
      lens: product.lens,
      poe: product.poe,
      nightVision: product.nightVision
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
      console.log("Updating product:", selectedProduct._id);
      console.log("Update data:", editForm);
      
      const res = await axios.put(`/products/${selectedProduct._id}`, editForm);

      setProducts(
        products.map((p) => (p._id === selectedProduct._id ? res.data : p))
      );

      setIsEditOpen(false);
      showMessage("✔ Product updated");
    } catch (error) {
      console.error("Update error:", error);
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
      console.log("Deleting product:", deleteProductId);
      
      await axios.delete(`/products/${deleteProductId}`);

      setProducts(products.filter((p) => p._id !== deleteProductId));
      setIsDeleteOpen(false);
      showMessage("✔ Product deleted");
    } catch (error) {
      console.error("Delete error:", error);
      showMessage(error.response?.data?.message || "✖ Failed to delete product", "error");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pr-1">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 px-1 py-2">
          Product List
        </h1>
        <button
          onClick={fetchProducts}
          className="border-2 border-[#012471] font-semibold rounded-lg px-3 py-1.5 flex items-center gap-1 text-sm hover:bg-[#012471] hover:text-white transition w-full sm:w-auto justify-center"
        >
          <img className="w-5 h-5" src={refreshIcon} alt="refresh" />
          Refresh
        </button>
      </div>

      <div className="mt-6 sm:mt-8 rounded-xl shadow-md">
        <h2 className="bg-blue-100 text-base sm:text-lg rounded-t-xl p-3 sm:p-4 font-semibold flex gap-2 items-center">
          <img className="w-5 h-5 sm:w-6 sm:h-6" src={filterIcon} alt="filter" />
          Search & Filter Products
        </h2>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 py-4 sm:py-5 px-4 sm:px-6">
          <div className="w-full sm:w-[77%]">
            <input
              type="text"
              placeholder="🔍 Search products by name or category..."
              className="border border-gray-400 rounded-lg w-full px-3 py-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full sm:w-auto">
            <select
              className="border border-gray-400 rounded-lg p-2 text-sm w-full sm:w-auto"
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
            className={`px-4 sm:px-6 py-2 rounded-lg font-semibold shadow-lg transition-all text-sm sm:text-base
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

      <div className="mt-6 sm:mt-8 rounded-xl shadow-lg">
        <h3 className="bg-blue-100 text-base sm:text-lg rounded-t-xl p-3 sm:p-4 font-semibold flex gap-2 items-center">
          <img className="w-5 h-5 sm:w-6 sm:h-6" src={packingListIcon} alt="products" />
          Product List ({filteredProducts.length} items)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-semibold">
            <thead className="bg-gray-100 font-bold text-gray-600 border-b">
              <tr>
                <th className="p-2 sm:p-3">PRODUCT</th>
                <th className="p-2 sm:p-3">BRAND</th>
                <th className="p-2 sm:p-3 hidden md:table-cell">CATEGORY</th>
                <th className="p-2 sm:p-3">PRICE</th>
                <th className="p-2 sm:p-3">STOCK</th>
                <th className="p-2 sm:p-3 hidden lg:table-cell">ADDED</th>
                <th className="p-2 sm:p-3">STATUS</th>
                <th className="p-2 sm:p-3">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="p-4 text-center">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p._id} className="border-t hover:bg-gray-50">
                    <td className="p-2 sm:p-3 font-medium">{p.name}</td>
                    <td className="p-2 sm:p-3 text-gray-600">{p.brand}</td>
                    <td className="p-2 sm:p-3 text-gray-600 hidden md:table-cell">{p.category}</td>
                    <td className="p-2 sm:p-3">₹{p.price}</td>
                    <td className="p-2 sm:p-3">{p.quantity}</td>
                    <td className="p-2 sm:p-3 text-gray-600 hidden lg:table-cell text-xs">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 sm:p-3">
                      <span
                        className={`font-medium text-xs sm:text-sm ${
                          p.quantity > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {p.quantity > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    
                    <td className="p-2 sm:p-3">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => openEditModal(p)}
                          className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs hover:bg-green-600 hover:shadow-md transform transition duration-150 active:scale-95"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(p._id)}
                          className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-lg text-xs hover:bg-red-600 hover:shadow-md transform transition duration-150 active:scale-95"
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

      {/* ✏️ EDIT PRODUCT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-full sm:w-[500px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Edit Product</h2>

            <form onSubmit={handleUpdateProduct} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Model Number
                </label>
                <input
                  type="text"
                  name="modelNumber"
                  value={editForm.modelNumber || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  name="brand"
                  value={editForm.brand || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                >
                  <option value="">Select Brand...</option>
                  <option>Hikvision</option>
                  <option>Dahua Technology</option>
                  <option>CP Plus</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={editForm.category || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                >
                  <option value="">Select Category...</option>
                  <option>Box Camera</option>
                  <option>PTZ Camera</option>
                  <option>Dome Camera</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={editForm.quantity || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resolution
                </label>
                <select
                  name="resolution"
                  value={editForm.resolution || ""}
                  onChange={handleEditChange}
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                >
                  <option value="">Select Resolution...</option>
                  <option>1920×1080</option>
                  <option>1440×900</option>
                  <option>1366×768</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lens
                </label>
                <input
                  type="text"
                  name="lens"
                  value={editForm.lens || ""}
                  onChange={handleEditChange}
                  placeholder="eg., 2.8mm, varifocal"
                  className="border border-gray-300 rounded-lg p-2 w-full text-sm"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="poe"
                    checked={editForm.poe || false}
                    onChange={handleEditChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Power over Ethernet (PoE)</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="nightVision"
                    checked={editForm.nightVision || false}
                    onChange={handleEditChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Night Vision</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-[#012471] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:opacity-90 hover:shadow-md transform transition duration-150 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🗑️ DELETE PRODUCT MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-xl p-5 sm:p-6 w-[90%] sm:w-[380px]">
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-red-600">
              Delete Product
            </h2>

            <p className="text-sm sm:text-base text-gray-700 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border rounded-lg text-sm hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm hover:bg-red-600 hover:shadow-md transform transition duration-150 active:scale-95"
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