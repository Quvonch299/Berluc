import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedIn = localStorage.getItem("loggedIn");

  if (!user || loggedIn !== "true") {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    alert("Logout successful ✅");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Profil</h2>
      {user.image && (
        <img
          src={user.image}
          alt="profile"
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
      )}
      <p className="mb-4">Email: {user.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}   