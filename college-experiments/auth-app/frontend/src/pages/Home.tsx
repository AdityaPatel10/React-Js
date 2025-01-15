import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/Utils";
import { ToastContainer } from "react-toastify";
import { Product } from "../types/AuthTypes";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setLoggedInUser(user || "");
  }, []);

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3000/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      };
      const res = await fetch(url, headers);
      const result = await res.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err instanceof Error ? err.message : String(err));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-700">
          Welcome {loggedInUser}
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products?.map((item, index) => (
              <div
                key={index}
                className="bg-pink-50 rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-64 flex items-center justify-center p-4 bg-white">
                  <div className="relative w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">
                      {item.name}
                    </h3>
                    <span className="text-lg font-semibold text-indigo-600">
                      ${item.price}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Logout
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
