import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../context";
import { useForm } from "../../hooks";
import images from "../../assets/images";
import { Link } from "react-router-dom";


const initForm = {
  username: "",
  password: "",
};

export const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { username, password, onInputChange } = useForm(initForm);

  const onLogin = async (event) => {
    event.preventDefault();
    const isValidLogin = await login(username, password);
    if (isValidLogin) {
      const lastPath = localStorage.getItem("lastPath") || "/";
      navigate(lastPath, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center bg-gray-300">
        <img
          src={images.inicio1}
          alt="Background"
          className="w-70 h-70 object-cover"
        />
      </div>
      
      <div className="w-3/4 flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full bg-white p-8 shadow-xl rounded-xl ">
        <Link to="/" className="text-lg font-bold text-black flex items-center">
         <img src={images.inicio1} alt="Icon" className=" w-8 h-8 mr-2 object-cover " />
        </Link>
        <h2 className="text-3xl font-bold text-black mb-6 ">Login</h2>

          <form>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
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
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
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
              onClick={onLogin}
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-500">
            <span>Don't have an account?</span>
            <NavLink to="/register" className="text-blue-900 hover:underline">
              {" "}
              Register
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
