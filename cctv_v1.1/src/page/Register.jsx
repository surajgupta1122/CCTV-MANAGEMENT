import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters long");
      return;
    }

    // Better email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error — please try again later");
    }
  };

  return (
    <section id="Register">
      <div className="bg-[#96BDF7] flex justify-center items-center py-[1%] px-[20%]">
        <div className="mt-10 border-t-4 border-[#012471] bg-white py-10 px-[18%] rounded-xl shadow-2xl hover:scale-105 duration-[0.3s]">
          <div className="flex justify-center space-x-2 mb-7">
            <img className="w-14 h-10" src="src/assets/camera.gif" alt="CCTV" />
            <h1 className="text-3xl font-bold font-sans text-[#012471]">
              CCTV Manage
            </h1>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center space-y-4"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 rounded-lg pr-[75%] pl-2 py-2 text-lg hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 rounded-lg pr-[75%] pl-2 py-2 text-lg hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 rounded-lg pr-[75%] pl-2 py-2 text-lg hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="border border-gray-400 rounded-lg pr-[75%] pl-2 py-2 text-lg hover:scale-105 hover:border-blue-900 duration-[0.2s] focus:outline-none focus:ring-2 focus:ring-[#012471]"
              required
            />

            <button
              type="submit"
              className="bg-[#012471] text-white text-2xl font-bold px-[62%] py-2.5 rounded-lg hover:scale-105 hover:bg-[#16213D] transition duration-300"
            >
              Register
            </button>
          </form>

          {error && (
            <div className="mt-1 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-1 text-green-600 text-center font-semibold">
              {success}
            </div>
          )}

          <div className="flex justify-center text-lg mt-2">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 cursor-pointer hover:border-b hover:border-b-blue-400"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
