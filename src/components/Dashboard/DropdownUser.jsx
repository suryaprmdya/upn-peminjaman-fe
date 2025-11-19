import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const DropdownUser = ({isOpen}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://upn-peminjaman-be.vercel.app/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // 3. Arahkan user kembali ke halaman login
      navigate("/auth/login");
    } catch (error) {
      console.error(
        "Logout gagal:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <>
      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdownInformation"
        className={`z-10 bg-white divide-y divide-gray-200 rounded-lg shadow-md w-44 dark:bg-gray-700 dark:divide-gray-600 border border-gray-200 top-16 right-6 md:right-12 ${
          isOpen ? "absolute" : "hidden"
        }`}>
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownInformationButton">
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Earnings
            </a>
          </li>
        </ul>
        <div className="py-2">
          <button
          onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DropdownUser;
