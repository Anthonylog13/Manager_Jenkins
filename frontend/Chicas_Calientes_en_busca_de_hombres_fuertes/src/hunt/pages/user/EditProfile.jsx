import images from "../../../assets/images";
import { Drawer } from "../../../ui/components/products/Drawer";
import { Navbar } from "../../../ui/components/common/Navbar";
import { NavLink } from "react-router-dom";

export const EditProfile = () => {
  return (
    <>
      <Navbar />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-6 text-teal-800 sm:text-4xl">
          Edit profile
        </h2>

        <div className="text-center mb-2">
          <img
            src={images.img5}
            className="w-30 h-40 mx-auto rounded-lg shadow-md"
            alt="Profile Picture"
          />
        </div>
        <p className="mt-2 mb-6 text-lg leading-8 text-gray-800">
          Edit your personal information
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div className="flex justify-between ">
            <div className="w-1/2 pl-0 mr-6 flex flex-col items-center">
              <span className="font-bold">Name*</span>
              <Drawer />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="phone" className="font-bold mr-2">
                Phone*
              </label>
              <div className="relative flex">
                <select className="absolute inset-y-0 left-0 py-2 px-3 border-r border-gray-300 rounded-l-md focus:outline-none">
                  <option>+57</option>
                  <option>+1</option>
                  <option>+34</option>
                  <option>+20</option>
                </select>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="block text-sm font-semibold leading-6 text-gray-900">
            <span className="font-bold ">E-mail*</span>
            <Drawer />
          </div>

          <div className="block text-sm font-semibold leading-6 text-gray-900">
            <span className="font-bold ">Password*</span>
            <Drawer />
          </div>

          <div className="block text-sm font-semibold leading-6 text-gray-900">
            <span className="font-bold ">Confirm password*</span>
            <Drawer />
          </div>

          <div className="block text-sm font-semibold leading-6 text-gray-900">
            <span className="font-bold ">Biography*</span>
            <textarea className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300" />
          </div>

          <div>
            <ul>
              <li>
                <NavLink
                  to="/perfil"
                  className="nav-link flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500"
                >
                  Save changes
                </NavLink>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};
