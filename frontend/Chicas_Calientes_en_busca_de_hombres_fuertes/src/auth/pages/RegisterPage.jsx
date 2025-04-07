import { useState } from "react";
import { useForm } from "../../hooks";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import images from "../../assets/images";


const initForm = {
  email: "",
  password: "",
  name: "",
  lastName: "",
  username: "",
};

export const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const { email, password, name, lastName, username, onInputChange } = useForm(initForm);

  const onRegister = async (event) => {
    event.preventDefault();
    const isValidRegister = await register(email, password, name, lastName, username);

    if (isValidRegister) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center bg-gray-300">
        <img src={images.inicio1} alt="Background" className="w-70 h-70 object-cover" />
      </div>

      <div className="w-3/4 flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg py-12">
          <h2 className="text-2xl font-bold mb-4 text-black">Register</h2>
          <form onSubmit={onRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Enter name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onInputChange}
                placeholder="Enter last name"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onInputChange}
                placeholder="Enter username"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="Enter email"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="Enter password"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              onClick={onRegister}
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-600"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-700">
            <span>Do you have an existing account?</span>
            <Link to="/login" className="text-black ml-1">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};