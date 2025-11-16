import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import Login from "./Login.jsx"; // <-- .jsx extension add kiya
import Logout from "./Logout.jsx"; // <-- .jsx extension add kiya

function Navbar() {
  const [authUser, setAuthUser] = useAuth();

  // --- DARK MODE LOGIC START ---
  // 1. Theme state (dark/light)
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  // 2. useEffect jo theme change hone par <HTML> tag par class add/remove karega
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // 3. Button click karne par theme badalne wala function
  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  // --- DARK MODE LOGIC END ---

  const navItems = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/course">Course</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/about">About</Link></li>
    </>
  );
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container md:px-20 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {navItems}
              </ul>
            </div>
            <a className=" text-2xl font-bold cursor-pointer">bookStore</a>
          </div>
          <div className="navbar-end space-x-3">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div className="hidden md:block">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>

            {/* --- DARK MODE TOGGLE BUTTON --- */}
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                className="theme-controller"
                // 4. onClick aur checked status add karein
                onClick={handleTheme}
                defaultChecked={theme === "dark"}
              />
              {/* sun icon */}
              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {/* ... (sun icon path) ... */}
                <path d="M5.64,17l-1.42,1.42L2.81,17,4.22,15.59ZM12,6a6,6,0,0,0-6,6H2a8,8,0,0,1,8-8V2a1,1,0,0,1,2,0V4a8,8,0,0,1,8,8H18A6,6,0,0,0,12,6Zm6.36,11-1.42-1.42L18.36,17l1.42,1.42ZM12,20a6,6,0,0,0,6-6H20a8,8,0,0,1-8,8V22a1,1,0,0,1-2,0V20a8,8,0,0,1-8-8H4A6,6,0,0,0,12,20Z"/>
              </svg>
              {/* moon icon */}
              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {/* ... (moon icon path) ... */}
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22a10.14,10.14,0,0,0,9.57,9.57,8.14,8.14,0,0,1-5,3Z"/>
              </svg>
            </label>
            {/* --- END OF TOGGLE BUTTON --- */}

            {authUser ? (
              <Logout />
            ) : (
              <div>
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;