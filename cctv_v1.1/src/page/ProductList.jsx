function ProductList() {

  return (
    <div className="ml-[26%] w-[74%] bg-gray-50 font-sans">
        
    <div className="flex justify-between items-center pr-8">
      <h1 className="text-2xl font-bold font-bold text-gray-800 px-8 py-8">Product List</h1>
      <button className="px-3 py-1 rounded-lg border-2 border-[#012471] flex gap-1">
       <img className="w-5 h-5 mt-1" src="src/assets/icons/refresh.png" /> Refresh</button>
    </div>

    <div className="mx-8 mt-4 rounded-xl shadow-md">
      <h2 className="bg-blue-100 text-lg rounded-t-xl p-4 font-semibold flex gap-2">
        <img className="w-7 h-7" src="src/assets/icons/filter.png"/>Search & Filter Products</h2>
        
    <div className="flex justify-between items-center py-5 px-6">

    <div className="w-[77%]">
      <input
        type="text"
        placeholder=" 🔍 Search products by name or category...   "
        className="border border-gray-400 rounded-lg w-full pl-2 py-2 text-sm "
      />
    </div>

    <div>
      <select className="border border-gray-400 rounded-lg p-2 text-sm">
        <option>All Categories</option>
        <option>Electronics</option>
        <option>Home Appliances</option>
        <option>Clothing</option>
        <option>Books</option>
      </select>
    </div>

    </div>
    </div>

    <div className="mx-8 mt-4 rounded-xl shadow-lg">
    <h3 className="bg-blue-100 text-lg rounded-t-xl p-4 font-semibold flex gap-2">
      <img className="w-6 h-6" src="src/assets/icons/packing-list.png"/>Product List (2 items)</h3>

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
    </tr>
    </thead>

    <tbody>

    <tr className="border-t">
      <td className="p-3">Wireless CCTV C...</td>
      <td className="p-3 text-gray-600">CP Plus</td>
      <td className="p-3 text-gray-600">Bullet</td>
      <td className="p-3">₹2,030.00</td>
      <td className="p-3">11</td>
      <td className="p-3 text-gray-600">01/10/2024 at 01:15:51 pm</td>
      <td className="p-3">
      <span className="text-green-600 font-medium">In Stock</span>
      </td>
    </tr>

    <tr className="border-t">
      <td className="p-3">2MP Dome Cam...</td>
      <td className="p-3 text-gray-600">Hikvision</td>
      <td className="p-3 text-gray-600">Dome</td>
      <td className="p-3">₹3,650.00</td>
      <td className="p-3">27</td>
      <td className="p-3 text-gray-600">01/10/2024 at 01:15:51 pm</td>
      <td className="p-3">
      <span className="text-green-600 font-medium">In Stock</span>
      </td>
    </tr>
            
    </tbody>
          
    </table>
    </div> 
    
    </div>
    );
}

export default ProductList;