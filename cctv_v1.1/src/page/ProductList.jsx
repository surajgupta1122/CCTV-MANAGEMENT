import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { getCurrentUser } from "../utils/auth";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const [currentUser, setCurrentUser] = useState(null);

  // Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  // 🔥 Load user (IMPORTANT FIX)
  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    loadUser();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (error) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter
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

  // ✅ Permission check
  const canModify = (product) => {
    if (!currentUser) return false;

    if (currentUser.role === "admin") return true;

    let ownerId =
      typeof product.createdBy === "string"
        ? product.createdBy
        : product.createdBy?._id;

    return ownerId === currentUser.id;
  };

  // ---------------- EDIT ----------------
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditForm({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setIsEditOpen(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `/products/${selectedProduct._id}`,
        editForm
      );

      setProducts(
        products.map((p) =>
          p._id === selectedProduct._id ? res.data : p
        )
      );

      setIsEditOpen(false);
    } catch (error) {
      alert("Update failed");
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
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Product List</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            filteredProducts.map((p) => (
              <tr key={p._id} className="border-t">
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₹{p.price}</td>

                <td>
                  {canModify(p) ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="bg-green-500 text-white px-2 py-1"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => openDeleteModal(p._id)}
                        className="bg-red-500 text-white px-2 py-1"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">
                      No Permission
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handleUpdateProduct}
            className="bg-white p-6 rounded"
          >
            <h2 className="mb-3 font-bold">Edit Product</h2>

            <input
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              className="border p-2 mb-2 w-full"
            />

            <input
              name="price"
              value={editForm.price}
              onChange={handleEditChange}
              className="border p-2 mb-2 w-full"
            />

            <input
              name="quantity"
              value={editForm.quantity}
              onChange={handleEditChange}
              className="border p-2 mb-2 w-full"
            />

            <div className="flex gap-2 mt-3">
              <button className="bg-blue-500 text-white px-3 py-1">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE MODAL */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded">
            <p>Are you sure?</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleDeleteProduct}
                className="bg-red-500 text-white px-3 py-1"
              >
                Yes
              </button>
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="border px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;