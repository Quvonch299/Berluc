import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (typeof window === "undefined") return;

    // Foydalanuvchi ma'lumotlarini saqlash
    const user = { email, password, image };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("loggedIn", "true");

    alert("Ro‘yxatdan o‘tish muvaffaqiyatli ✅");
    navigate("/profile"); // Profil sahifaga yo‘naltirish
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Ro‘yxatdan o‘tish</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        {image && (
          <img
            src={image}
            alt="profile"
            className="w-24 h-24 object-cover rounded-full mx-auto"
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Ro‘yxatdan o‘tish
        </button>
      </form>
    </div>
  );
}