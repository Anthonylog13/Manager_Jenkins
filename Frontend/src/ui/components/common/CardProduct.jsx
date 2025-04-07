import React, { useContext } from "react";
import icons from "../../../assets/icons";
import { AuthContext } from "../../../auth";
import { useNavigate } from "react-router-dom";

export const CardProduct = (props) => {
  const { logged } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path, {
      state: {
        key: props._id,
        name: props.username,
        url: props.body,
      },
    });
  };

  return (
    <div>
      <div className="flex items-center space-x-2">
        <img
          src={icons.user}
          alt="User Icon"
          className="w-8 h-8 cursor-pointer rounded-full"
        />

        {!logged ? (
          <button
            onClick={() => handleNavigate("/productView")}
            className="nav-link"
          >
            {props.username}
          </button>
        ) : (
          <button
            onClick={() => handleNavigate("/productViewlog")}
            className="nav-link"
          >
            {props.username}
          </button>
        )}
      </div>

      <div>
        <p>{props.body}</p>
      </div>
    </div>
  );
};

