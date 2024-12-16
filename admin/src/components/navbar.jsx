import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-66 bg-white z-50 shadow-lg overflow-y-auto">
      <div className="p-4 flex items-center bg-gray-100">
        <Link to="/dashboard" className="flex items-center">
          <img src="./car.png" className="w-14" alt="Logo" />
          <h1 className="text-color text-sm font-bold ml-2">
            Vehicle Management System
          </h1>
        </Link>
      </div>
      {/* Hamburger Icon */}
      <button
        className="md:hidden fixed top-4 right-4 p-2 rounded-lg bg-gray-200 z-50"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>
      <ul
        className={`flex flex-col ${isMenuOpen ? "block" : "hidden"} md:flex`}
      >
        <li>
          <Link to="/" className="p-4 hover:bg-gray-300 font-bold block">
            Dashboard
          </Link>
        </li>
        <hr className="border-t border-gray-200" />
        <li>
          <Link to="/cars" className="p-4 hover:bg-gray-300 font-bold block">
            Cars
          </Link>
        </li>
        <hr className="border-t border-gray-200" />
        <li>
          <Link to="/new-car" className="p-4 hover:bg-gray-300 font-bold block">
            New Car
          </Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default SideBar;
