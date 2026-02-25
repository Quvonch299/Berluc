import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickMenu = () => setShowMenu(!showMenu);

  // Foydalanuvchi ma'lumotlarini olish va online users
  useEffect(() => {
    setShowMenu(false);
    setDropdown(false);

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedUser && loggedIn === "true") {
      setUser(loggedUser);
    } else {
      setUser(null);
    }

    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    setOnlineUsers(allUsers.filter(u => u.loggedIn));
  }, [location.pathname]);

  const toggleDropdown = () => setDropdown(prev => !prev);

  const confirmLogout = () => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const updatedUsers = allUsers.map(u =>
      u.email === user.email ? { ...u, loggedIn: false } : u
    );
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user"); // Qo'shimcha: user ni ham o'chirib tashlash
    setUser(null);
    setShowLogoutModal(false);
    navigate("/login");
  };

  const handleLogoutClick = () => {
    setDropdown(false); // Dropdown ni yopish
    setShowLogoutModal(true);
  };

  // Admin: foydalanuvchini o'chirish
  const removeUser = (email) => {
    const allUsers = JSON.parse(localStorage.getItem("allUsers")) || [];
    const updatedUsers = allUsers.filter(u => u.email !== email);
    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));
    setOnlineUsers(updatedUsers.filter(u => u.loggedIn));
  };

  return (
    <div className="max-w-7xl m-auto  h-20 flex items-center justify-between relative  "> {/* Ko'rinishni yaxshilash: shadow qo'shildi */}
      <Link to="/">
<img src="/logo.jpg" className="w-[80px] h-[78px]" alt=""/>
      </Link> 
      <ul className="hidden md:flex gap-8 font-medium">
        <li><Link to="/" className="hover:text-blue-600 transition">Bosh sahifa</Link></li>
        <li><Link to="/courses" className="hover:text-blue-600 transition">Kurslar</Link></li>
        <li><Link to="/mentors" className="hover:text-blue-600 transition">Mentorlar</Link></li>
        <li><Link to="/contact" className="hover:text-blue-600 transition">Aloqa</Link></li>
      </ul>

      {/* Desktop Auth / Profile */}
      <div className="hidden md:flex items-center gap-4 relative">
        {user ? (
          <div className="relative">
            {user.image && (
              <img
                src={user.image}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-blue-600" // Ko'rinishni yaxshilash: border qo'shildi
                onClick={toggleDropdown}
              />
            )}
            {dropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 flex flex-col z-50 border border-gray-200"> {/* Ko'rinishni yaxshilash: border qo'shildi */}
                <Link to="/profile/edit" className="px-4 py-2 hover:bg-blue-100 transition">Profilni tahrirlash</Link> {/* Profil edit qilish uchun yangi link qo'shildi */}
                <button
                  onClick={handleLogoutClick}
                  className="px-4 py-2 text-left hover:bg-red-100 transition text-red-600"
                >
                  Chiqish
                </button>

                {/* Faqat admin uchun online users */}
                {user.email === "admin@example.com" && (
                  <>
                    <hr className="my-2"/>
                    <p className="px-4 py-1 text-gray-500 font-medium">Online foydalanuvchilar:</p>
                    {onlineUsers.length === 0 ? (
                      <p className="px-4 py-1 text-gray-400 text-sm">Hech kim yo'q</p>
                    ) : (
                      onlineUsers.map(u => (
                        <div key={u.email} className="flex justify-between items-center px-4 py-1 hover:bg-gray-50 transition"> {/* Hover effect qo'shildi */}
                          <span className="text-sm">{u.email}</span>
                          <button
                            onClick={() => removeUser(u.email)}
                            className="text-red-500 text-xs hover:underline"
                          >
                            O'chirish
                          </button>
                        </div>
                      ))
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              Kirish
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Ro'yxatdan o'tish
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden text-3xl cursor-pointer">
        {!showMenu ? (
          <IoIosMenu onClick={handleClickMenu} />
        ) : (
          <AiOutlineClose onClick={handleClickMenu} />
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col gap-4 p-6 z-50 border-t border-gray-200" // Ko'rinishni yaxshilash: border qo'shildi
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">Bosh sahifa</Link>
            <Link to="/courses" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">Kurslar</Link>
            <Link to="/mentors" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">Mentorlar</Link>
            <Link to="/contact" onClick={() => setShowMenu(false)} className="hover:text-blue-600 transition">Aloqa</Link>

            <hr />

            {user ? (
              <>
                {user.image && (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover mx-auto border-2 border-blue-600" // Ko'rinishni yaxshilash: border qo'shildi
                  />
                )}
                <Link to="/profile" onClick={() => setShowMenu(false)} className="text-center hover:text-blue-600 transition">Profil</Link>
                <Link to="/profile/edit" onClick={() => setShowMenu(false)} className="text-center hover:text-blue-600 transition">Profilni tahrirlash</Link> {/* Profil edit qilish uchun yangi link qo'shildi */}
                <button
                  onClick={() => { setShowMenu(false); setShowLogoutModal(true); }}
                  className="bg-red-500 text-white text-center py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Chiqish
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-600 font-medium hover:text-blue-800 transition"
                  onClick={() => setShowMenu(false)}
                >
                  Kirish
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setShowMenu(false)}
                >
                  Ro'yxatdan o'tish
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-medium mb-4 text-center">Chiqishni tasdiqlaysizmi?</h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Otmena
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Chiqish
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}