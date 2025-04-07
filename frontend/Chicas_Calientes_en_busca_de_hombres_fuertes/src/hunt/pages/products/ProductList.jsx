import React from "react";
import { NavLink } from "react-router-dom";
export const ProductList = () => {
  return (
    <>
      <div>TWEETS</div>
      <div>
        <ul>
          <li>
            <NavLink
              to="/addPoduct"
              className="nav-link flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500"
            >
              Edit tweets
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
