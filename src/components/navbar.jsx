import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../ui/button";
import { IoIosMenu, IoLogoWhatsapp } from "react-icons/io";
import { RiTelegram2Fill } from "react-icons/ri";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [showButtons, setShowButtons] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);

  const location = useLocation();

  // Toggle social buttons
  const handleClick = () => setShowButtons(!showButtons);
  // Toggle mobile menu
  const handleClickMenu = () => setShowMenu(!showMenu);
  // Open modal
  const handleModalOpen = () => {
    setModalOpen(true);
    setShowButtons(false);
    setShowMenu(false);
  };
  // Close modal
  const handleModalClose = () => setModalOpen(false);

  // Close menus on route change
  useEffect(() => {
    setShowButtons(false);
    setShowMenu(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Click outside to close social buttons
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowButtons(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-w-[1920px] mx-auto px-22 h-22 grid grid-cols-3 items-center relative max-md:px-4 max-md:h-[50px] max-md:border-b max-md:border-[#f3f3f3]"
    >
      {/* Desktop links */}
      <ul className="flex custom-gap max-md:hidden">
        <li><Link to={"/"}>Главная</Link></li>
        <li><Link to={"/projects"}>Проекты</Link></li>
        <li><Link to={"/services"}>Услуги</Link></li>
        <li><Link to={"/about"}>О&nbsp;нас</Link></li>
        <li><Link to={"/contacts"}>Контакты</Link></li>
        <li><Link to={"/galery"}>Галерея</Link></li>
      </ul>

      {/* Mobile social icons */}
      <div className="md:hidden flex gap-2">
        <a href="https://wa.me/998901234567" target="_blank" rel="noopener noreferrer">
          <IoLogoWhatsapp className="text-lg" />
        </a>
        <a href="https://t.me/your_telegram_username" target="_blank" rel="noopener noreferrer">
          <RiTelegram2Fill className="text-lg" />
        </a>
      </div>

      {/* Logo */}
      <div className="flex justify-center">
        <img src="/logo.svg" alt="Logo" className="max-md:h-[18px]" />
      </div>

      {/* Desktop "Написать нам" button */}
      <div className="flex justify-end max-md:hidden">
        <Button width="180px" text="Написать нам" onClick={handleClick} />
      </div>

      {/* Mobile menu icon */}
      <div className="md:hidden flex justify-end text-2xl">
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
            className="px-6 py-8 flex flex-col gap-4 absolute right-0 w-full bg-white top-[50px] z-[999]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={"/"} onClick={() => setShowMenu(false)}>Главная</Link>
            <Link to={"/projects"} onClick={() => setShowMenu(false)}>Проекты</Link>
            <Link to={"/services"} onClick={() => setShowMenu(false)}>Услуги</Link>
            <Link to={"/about"} onClick={() => setShowMenu(false)}>О&nbsp;нас</Link>
            <Link to={"/contacts"} onClick={() => setShowMenu(false)}>Контакты</Link>
            <Link to={"/galery"} onClick={() => setShowMenu(false)}>Галерея</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Social Buttons Panel with Animations */}
      <AnimatePresence>
        {showButtons && (
          <motion.div
            className="mt-4 flex flex-col gap-2 absolute right-5 top-[60px] z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/** Telegram */}
            <motion.a
              href="https://t.me/mebelberluc"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex"
            >
              <Button width="300px" icon={<RiTelegram2Fill className="text-lg" />} text="Telegram" />
            </motion.a>

            {/** Instagram */}
            <motion.a
              href="https://instagram.com/_berluc_"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex"
            >
              <Button width="300px" icon={<FaInstagram className="text-lg" />} text="Instagram" />
            </motion.a>

            {/** TikTok */}
            <motion.a
              href="https://www.tiktok.com/@berluc.uzb"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex"
            >
              <Button width="300px" icon={<IoLogoTiktok className="text-lg" />} text="TikTok" />
            </motion.a>

            {/** Youtube */}
            <motion.a
              href="https://www.youtube.com/@BERLUCMEBEL"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex"
            >
              <Button width="300px" icon={<FaYoutube className="text-lg" />} text="Youtube" />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-[white] bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-[744px] mx-auto bg-white max-md:px-4 p-6 rounded-lg">
              <h2 className="text-[80px] mb-4 max-md:text-2xl max-md:text-center max-md:font-semibold">
                Отправить заявку
              </h2>
              <p className="text-2xl mb-4 text-center max-md:text-[16px]">
                Заполните форму и мы свяжемся с вами
              </p>
              <input
                type="text"
                placeholder="Имя"
                className="text-[#989898] py-2 px-0.5 w-full border-b border-black mb-6"
              />
              <input
                type="text"
                placeholder="Номер телефона"
                className="text-[#989898] py-2 px-0.5 w-full border-b border-black mb-8"
              />
              <Button text="Отправить" />
              <div className="flex mt-6 gap-4 md:items-center max-md:gap-2">
                <input type="checkbox" id="check" className="w-6 h-6 accent-[#989898]" />
                <label htmlFor="check" className="cursor-pointer max-md:text-sm">
                  Нажимая на кнопку, вы даете согласие на обработку персональных данных и соглашаетесь с&nbsp;
                  <Link to="/privacy-policy" className="font-medium">политикой конфиденциальности</Link>
                </label>
              </div>
            </div>

            <button
              onClick={handleModalClose}
              className="absolute top-8 right-8 text-black text-3xl z-50 max-md:text-xl max-md:top-4 max-md:right-4"
            >
              <AiOutlineClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}