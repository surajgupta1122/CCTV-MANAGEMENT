import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import camera from "/src/assets/camera.gif";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar only for Register */}
      <Navbar />
      
    <section className="bg-[#96BDF7] flex justify-center items-center h-[86.8vh]">
      <div className="border-t-4 border-[#012471] bg-white p-10 rounded-xl shadow-2xl w-[500px]">
        <div className="flex flex-row justify-center ">
        <img className="w-14 h-10" src={camera} alt="CCTV" />
        <h1 className="text-3xl font-bold text-[#012471] ml-2 mb-6">
          CCTV Manage
        </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-400 rounded-lg p-2 w-full hover:border-blue-900 duration-[0.1s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 rounded-lg p-2 w-full hover:border-blue-900 duration-[0.1s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-400 rounded-lg p-2 w-full hover:border-blue-900 duration-[0.1s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="border border-gray-400 rounded-lg p-2 w-full hover:border-blue-900 duration-[0.1s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#012471] text-white w-full py-2 rounded-lg font-bold hover:bg-[#16213D] hover:scale-105 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 cursor-pointer hover:border-b hover:border-b-blue-400">
            Login
          </Link>
        </p>
      </div>
    </section>
    </>
  );
}

export default Register;
