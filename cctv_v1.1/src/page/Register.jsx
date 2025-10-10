import { Link } from "react-router-dom";

function Register() {
  return (
    <section id="Register">
      {/* background */}
      <div className="bg-[#96BDF7] flex justify-center items-center py-[1%] px-[20%]">

      {/* Register box & heading*/}
      <div className="mt-10 border-t-4 border-[#012471] bg-white py-12 px-[20%] rounded-xl shadow-2xl hover:scale-105 duration-[0.3s]">
      <div className="flex justify-center space-x-2 mb-8">
        <img className="w-16 h-12" src="src/assets/camera.gif" alt="CCTV" />
        <h1 className="text-4xl font-bold font-sans text-[#012471]">CCTV Manage</h1>
      </div>
      
      {/* Form User input */}
      <form className="flex flex-col justify-center items-center space-y-8">
      
      <input
        type="text"
        placeholder="Full Name"
        className="border border-gray-400 rounded-lg pr-[77%] pl-3 py-3 text-xl hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
        required
      />
      
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-400 rounded-lg pr-[77%] pl-3 py-3 text-xl hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
        required
      />
      
      <input
        type="password"
        placeholder="Confirm Password"
        className="border border-gray-400 rounded-lg pr-[77%] pl-3 py-3 text-xl hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
        required
      />
      
      {/* Register button */}
      <button type="submit"
       className="mt-8 bg-[#012471] text-white text-2xl font-bold px-[64%] py-3 rounded-lg hover:scale-105 hover:bg-[#16213D] transition duration-300">
       Register</button>
      
      </form>

      {/* last line */}
      <div className="flex justify-center text-xl mt-2">
      <p>Do have an account?{' '}
      <Link 
       to="/login" 
       className={`text-blue-400 cursor-pointer hover:border-b hover:border-b-blue-400`} 
       >Login
      </Link>
      </p>
      </div>

      </div>
      </div>
    </section>
  );
}

export default Register;