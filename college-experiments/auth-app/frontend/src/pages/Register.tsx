import { ChangeEvent, FormEvent, useState } from "react";
import { RegisterCredentials } from "../types/AuthTypes";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Utils";
import { ToastContainer } from "react-toastify";
import RegisterImg from "../components/svg/RegisterImg";

function Register() {
  const [userInfo, setUserInfo] = useState<RegisterCredentials>({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password } = userInfo;
    if (!name || !email || !password) {
      return handleError("Please fill the required fields");
    }
    try {
      const url = "http://localhost:3000/auth/register";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const result = await res.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        handleError(error ? error[0]?.message : message);
      }
    } catch (err) {
      handleError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-pink-100 p-5">
      <div className="absolute top-8 right-8">
        <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Login</Link>
      </div>
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">Register Now</h1>
        <p className="text-center mb-6">Hi, Welcome 👋</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Enter your name"
              value={userInfo.name}
              className="w-full p-3 mt-2 border rounded-lg bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userInfo.email}
              className="w-full p-3 mt-2 border rounded-lg bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={userInfo.password}
                className="w-full p-3 mt-2 border rounded-lg bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Register
          </button>

          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-pink-600">Login</Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex items-center justify-center w-1/2 p-10">
      <RegisterImg/>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
