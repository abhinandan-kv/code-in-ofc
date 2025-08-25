import React from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiClipboard,
  FiList,
  FiLogOut,
} from "react-icons/fi";
import profilelogo from "../../assets/image.png";
import logo from "../../assets/logo.svg";

const VendorLayout = ({ children }) => {
  function clearLocalStorage(){
      localStorage.clear()
   }
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link to="/" className="flex items-center ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Best Ecommerce
                </span>
              </Link>
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={profilelogo}
                  alt="user photo"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform
                   -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0
                   dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/vendor/dashboard"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FiHome className="w-5 h-5 text-gray-500" />
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/products" 
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FiBox className="w-5 h-5 text-gray-500" />
                <span className="ms-3">Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/vendor/orders"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FiClipboard className="w-5 h-5 text-gray-500" />
                <span className="ms-3">Order Status</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/vendor/total-orders"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <FiList className="w-5 h-5 text-gray-500" />
                <span className="ms-3">Total Orders</span>
              </Link>
            </li> */}
          </ul>

          <ul className="space-y-2 font-medium border-t border-gray-200 pt-4 dark:border-gray-700">
            <li>
              <Link
                to="/login"
                onClick={clearLocalStorage}
                className="flex items-center p-2 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-gray-700"
              >
                <FiLogOut className="w-5 h-5" />
                <span className="ms-3 font-semibold">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </>
  );
};

export default VendorLayout;
