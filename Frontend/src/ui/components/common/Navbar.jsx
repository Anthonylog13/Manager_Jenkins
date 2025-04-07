import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth";
import { ProductHome } from "../../../hunt/pages/ProductHome";
import icon from "../../../assets/icons";
import React, { useContext, useState } from "react";
import images from "../../../assets/images";
import icons from "../../../assets/icons";

export const Navbar = () => {
  const { user, logout, login, logged } = useContext(AuthContext);

  const navigate = useNavigate();
  const onLogin = () => {
    <ProductHome />;
  };

  const onLogout = () => {
    logout();

    navigate("/home", {
      replace: true,
    });
  };
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="bg-white py-4 px-6 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold text-black">
          TWEETS
        </Link>

        <div className="flex items-center">
        {!logged && (
         <NavLink to="/login" className="nav-link text-black mr-96 flex items-center">
            <img src={icon.user} className="w-6 h-6 mr-2" alt="Icon" />
            Login
        </NavLink>
)}

          {logged && (
            <>
              <span className="mr-4 text-gray-900">
                {`Hello, ${user?.username}`}
              </span>
              <div className="relative mr-20">
                <img
                  src={icon.user}
                  alt="User Icon"
                  className="w-8 h-8 cursor-pointer"
                  onClick={toggleMenu}
                />
                {showMenu && (
                  <ul className="absolute z-50 right-0 mt-2 py-2 bg-white border rounded-md shadow-lg min-w-max ">
                    <li>
                      <NavLink
                        to="/perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
