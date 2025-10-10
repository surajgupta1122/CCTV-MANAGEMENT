
function Addproduct(){
  return (
    <div className="ml-[26%] w-[74%] bg-gray-50 font-sans">
    <h1 className="text-xl font-bold text-gray-800 px-8 py-8">CCTV Product Form</h1>
    
    <div className="bg-white shadow-lg rounded-lg mx-8 rounded-lg mb-8">
    <div className="flex justify-between items-center px-4 py-5 font-medium bg-blue-100 rounded-t-lg">
    <h1 className="flex gap-2">
      <img className="w-6 h-6 " src="src/assets/icons/add-cart.png"/> Add Product </h1>
    <div className="flex space-x-4 text-sm ">
      <button className="bg-white flex gap-1 border-2 border-[#012471] px-3 py-1 rounded-lg">
        <img className="w-3 h-3 mt-1" src="src/assets/icons/close.png"/>Clear</button>
      <button className="flex gap-1 bg-[#012471] text-white px-3 py-1 rounded-lg">
        <img className="w-4 h-4 mt-1" src="src/assets/icons/bookmark.png"/>Save </button>
    </div>
    </div>

    <form className="p-5">
     <h2 className="font-medium py-5 flex gap-1">
        <img className="w-6 h-6" src="src/assets/icons/box.png"/>Product Information</h2>

    <div className="grid grid-cols-2 gap-6 pb-6">
      <label for="productName" className="flex flex-col text-sm font-semibold ">Product Name*
      <input
        type="text"
        placeholder="e.g., Hikvision 2MP Dome Camera"
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </input>
      </label>

      <label for="Model Number" className="flex flex-col text-sm font-semibold">Model Number*
      <input
        type="text"
        placeholder="e.g., DS-2CD2123G0-I"
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </input>
      </label>
    </div>

    <h2 className="font-medium py-4 flex gap-1">
      <img className="w-5 h-5" src="src/assets/icons/new-poster.png" />Brand & Category</h2>

    <div className="grid grid-cols-2 gap-6 pb-6">
      <label for="brand" className="flex flex-col text-sm font-semibold">Brand*
      <select
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required>

        <option>Select Brand...</option>
        <option>Hikvision</option>
        <option>Dahua Technology</option>
        <option>CP Plus</option>
        <option>Other</option>

      </select>
      </label>

      <label for="category" className="flex flex-col text-sm font-semibold">Category*
      <select
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required>

        <option>Select Category...</option>
        <option>Box Camera</option>
        <option>PTZ Camera</option>
        <option>Dome Camera</option>
        <option>Other</option>
      
      </select>
      </label>
    </div>

    <h2 className="font-medium py-4 flex gap-1">
      <img className="w-5 h-5" src="src/assets/icons/competitive.png"/>Pricing & Inventory</h2>

    <div className="grid grid-cols-2 gap-6 pb-6">
      <label for="price" className="flex flex-col text-sm font-semibold">Price(₹)*
      <input
        type="number"
        placeholder="₹ 0.00"
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </input>
      </label>

      <label for="category" className="flex flex-col text-sm font-semibold">Quantity in Stock*
      <input
        type="number"
        placeholder="# 0"
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </input>
      </label>
    </div>

     <h2 className="font-medium py-4 flex gap-1">
      <img className="w-6 h-6" src="src/assets/icons/processor.png"/>Technical Specification</h2>

    <div className="grid grid-cols-2 gap-6 pb-6">
      <label for="resolution" className="flex flex-col text-sm font-semibold">Resolution*
      <select
       className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
       required >

        <option>Select Resolution...</option>
        <option>1920×1080</option>
        <option>1440×900</option>
        <option>1366×768</option>
        <option>Other</option>
      
      </select>
          
        
      </label>

      <label for="Lens Specification" className="flex flex-col text-sm font-semibold">Lens Specification*
      <input
        type="text"
        placeholder="eg., 2.8mm, varifocal"
        className="w-68 font-normal text-base border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </input>
      </label>
    </div>
  
    <div className="flex flex-col space-y-3 pb-6">
      <label className="py-4 px-2 bg-blue-100 rounded-lg">
      <input type="checkbox" />{" "}
       Power over Ethernet (PoE) Support
      </label>

      <label className="py-4 px-2 bg-blue-100 rounded-lg">
      <input type="checkbox" />{" "}
       Night Vision Capability
      </label>
    </div>


    </form>
    </div>
    </div>
      
  );
}

export default Addproduct;