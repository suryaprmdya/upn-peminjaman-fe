import React, {useEffect, useState, useRef} from "react";
import LayoutHeader from "../components/LayoutHeader";
import Sidebar from "../components/Dashboard/Sidebar";
import {BellIcon, ChevronDownIcon, MenuIcon} from "lucide-react";
import ApplicationLogo from "../components/ApplicationLogo";
import DropdownUser from "../components/Dashboard/DropdownUser";
import axios from "axios";
import {Outlet, useNavigate} from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [UserData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  // Click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {data} = await axios.get(
          "https://upn-peminjaman-be.vercel.app/user/profile",
          {withCredentials: true}
        );
        setUserData(data.user);
      } catch (error) {
        console.error("Token invalid, redirecting...");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!UserData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HEADER */}
      <LayoutHeader>
        <div className="flex items-center justify-between">
          {/* Menu (mobile) */}
          <button onClick={toggleSidebar} className="lg:hidden text-gray-600">
            <MenuIcon className="w-6 h-6" />
          </button>

          {/* Logo */}
          <div className="hidden lg:flex">
            <ApplicationLogo />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-5">
            {/* Notification */}
            <div className="relative">
              <BellIcon className="w-6 h-6 text-gray-600 hover:text-orange-500 cursor-pointer" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                3
              </span>
            </div>

            {/* User Dropdown */}
            <div ref={dropdownRef} className="relative">
              <div
                onClick={toggleDropdown}
                className="flex items-center space-x-2 p-1 rounded-lg cursor-pointer hover:bg-gray-100">
                <img
                  src="https://placehold.co/40x40/f97316/white?text=S"
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border-2 border-orange-500"
                />

                <div className="hidden md:block">
                  <p className="font-semibold text-sm text-gray-800">
                    {UserData.username}
                  </p>
                  <p className="text-xs text-gray-500">{UserData.npm}</p>
                </div>

                <ChevronDownIcon className="w-4 h-4 text-gray-500 hidden md:block" />
              </div>

              {/* Dropdown */}
              <DropdownUser isOpen={isDropdownOpen} />
            </div>
          </div>
        </div>
      </LayoutHeader>

      {/* CONTENT */}
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} role={UserData.role} />

        {isSidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/30 z-10 lg:hidden"></div>
        )}

        <main className="flex-1 p-4 sm:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
