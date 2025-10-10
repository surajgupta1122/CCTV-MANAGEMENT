import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation(); // tells which page we are on

  return (
    
  <div className="bg-gradient-to-r to-[100%] from-white  to-[#012471] flex justify-between items-center px-8 py-5">
      
    {/* Left side - logo and name */}
    <div className="flex items-center space-x-2">
      <img className="w-14 h-11" src="src/assets/camera.gif" alt="CCTV" />
      <h1 className="text-3xl font-bold text-blue-900">CCTV Manage</h1>
    </div>

    {/* Right side - menu links */}
    <ul className="flex text-white text-2xl font-semibold space-x-8">
    {/* Login link */}
      <li>

      <Link to="/login"
        className={`inline-block p-1 transition-all duration-300 transform 
        ${ location.pathname === "/login" ? "border-b-2 border-white scale-110" : "border-b-2 border-transparent text-gray-300 hover:text-white hover:border-white hover:scale-110" }`}>
        Login
      </Link>
        
      </li>

    {/* Register link */}
      <li>
          
      <Link to="/register"
        className={`inline-block p-1 transition-all duration-300 transform 
        ${ location.pathname === "/register" ? "border-b-2 border-white scale-110" : "border-b-2 border-transparent text-gray-300 hover:text-white hover:border-white hover:scale-110" }`}>
          Register
        </Link>
        
      </li>
    
    </ul>
  
  </div>
  );
}

export default Navbar;
