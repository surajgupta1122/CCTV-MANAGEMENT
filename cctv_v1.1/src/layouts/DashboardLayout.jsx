import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div
        className={`flex-1 bg-gray-50 transition-all duration-300
          ${isOpen ? "ml-[22%]" : "ml-[9%]"}`}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
