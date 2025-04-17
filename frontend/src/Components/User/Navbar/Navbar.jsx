import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logoArcite from "../../../assets/logoArcite.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../Redux/Slices/AuthSlice";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userdata);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between px-8 md:px-20 py-6 bg-white border-b border-gray-200">
      {/* Logo with left margin */}
      <div className="ml-[30px]">
        <img src={logoArcite} alt="ARCITE" height={70} width={160} />
      </div>

      {/* Vertical line separator */}
      <div className="hidden md:block h-10 w-[2px] bg-gray-400 mx-6"></div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden">
        <button onClick={toggleMenu}>
          <img
            className={menuOpen ? "hidden" : "block"}
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
            alt="Menu"
          />
          <img
            className={menuOpen ? "block" : "hidden"}
            src="https://img.icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
            alt="Close"
          />
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`w-full flex-grow md:flex md:items-center md:w-auto ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center space-x-6 text-bold mt-5 md:mt-0">
          <Link
            to="https://technical.arcite.in/"
            className="text-black font-semibold hover:text-teal-700 px-3 py-3"
          >
            Home
          </Link>

          {/* Conditional Logout Button */}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-teal-400 text-black font-semibold hover:text-teal-900 px-5 py-2 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;