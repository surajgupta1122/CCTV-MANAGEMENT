function UserManagement(){
    return (
        <div className="ml-[26%] w-[74%] bg-gray-50 font-sans">
    
        <div className="flex items-center justify-between pr-8">
            <h1 className="text-xl font-bold text-gray-800 px-8 py-8">User Management Dashboard</h1>
        <div className="flex gap-4">
            <button className="bg-[#012471] text-white px-4 py-2 mt-1 rounded-lg hover:bg-blue-600 flex gap-1">
             <img className="w-5 h-5 " src="src/assets/icons/add.png" />New User</button>
            <button className="px-4 py-2 mt-1 rounded-lg border-2 border-[#012471] flex gap-1">
             <img className="w-5 h-5 " src="src/assets/icons/refresh.png" /> Refresh</button>
        </div>
        </div>  
        
        <div className=" px-8 flex justify-between items-center">
        <input
            type="text"
            placeholder=" 🔍 Search users by name or email... "
            className="border border-gray-300 rounded-xl w-full pl-2 py-2 text-sm "
        />
        </div>

        <div className="mx-8 mt-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-lg bg-blue-100 p-2 pl-5 rounded-t-xl flex gap-1 font-semibold">
          <img className="h-6 w-6 mt-1" src="src/assets/icons/user-setting.png" /> Users
        </h1>

        <table className="w-full text-left text-sm">
        <thead className="bg-[#012471] text-white">
        <tr>
           <th className="p-3">ID</th>
           <th className="p-3">NAME</th>
           <th className="p-3">EMAIL</th>
           <th className="p-3">ACTION</th>
        </tr>
        </thead>

        <tbody>
        <tr className="border-b">
          <td className="p-3 font-semibold">#1</td>
          <td className="p-3 font-semibold">Suraj Gupta</td>
          <td className="p-3 font-semibold">sg8120904@gmail.com</td>
          <td className="p-3 flex gap-2">
        <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 flex gap-1 items-center">
          <img className="w-4 h-4" src="src/assets/icons/edit.png" /> Edit
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 flex gap-1 items-center">
          <img className="w-4 h-4" src="src/assets/icons/trash.png" /> Delete
        </button>
        </td>
        </tr>
        </tbody>

        </table>
        </div>
            
        </div>
    );
}

export default UserManagement;