import { ChangeEvent, FormEvent, useState } from "react";
import { LoginCredentials } from "../types/AuthTypes";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Utils";
import { ToastContainer } from "react-toastify";
import LoginImg from "../components/svg/LoginImg";

function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
    console.log(loginInfo);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Please fill the required fields");
    }
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await res.json();

      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(error ? error[0]?.message : message);
      }
    } catch (err) {
      handleError(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-8 right-8 sm:top-5 sm:right-16">
        <Link
          to="/register"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Register
        </Link>
      </div>
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">Login Now</h1>
        <p className="text-center mb-6">Hi, Welcome back 👋</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginInfo.email}
              className="w-full p-3 mt-2 border rounded-lg bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={loginInfo.password}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <Link to="/forgot-password" className="text-pink-600">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Login
          </button>

          <p className="text-center mt-4">
            Not registered yet?{" "}
            <Link to="/register" className="text-pink-600">
              Create an account
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden lg:flex items-center justify-center w-1/2 p-10">
        <LoginImg />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
