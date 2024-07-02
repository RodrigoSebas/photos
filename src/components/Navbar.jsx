import {
  Disclosure,
  Menu,
  Transition,
  MenuButton,
  MenuItem,
  MenuItems,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { closeSession } from "../functions/authFunctions";
import { toast } from "react-toastify";
import firebaseErrorsInSpanish from "../utils/firebaseErrorMessages";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const notify = (msg, callback = {}) => toast(msg, callback);

  const handleLogout = async () => {
    try {
      await closeSession();
      notify("Cerro sesion exitosamente", { type: "success" });
    } catch (error) {
      notify(firebaseErrorsInSpanish[error.code], { type: error });
    }
  };

  return (
    <Disclosure as="nav" className="bg-blue-300">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only"> Abrir Menu</span>
                  {open ? (
                    <i className="fa-solid fa-xmark"></i>
                  ) : (
                    <i className="fa-solid fa-bars"></i>
                  )}
                </DisclosureButton>
              </div>

              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold"
                  >
                    Home
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/createproduct"
                    className="text-gray-200 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-semibold"
                  >
                    Subir Foto
                  </Link>
                </div>
              </div>
              {/**DERECHA */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="rounded-full w-6 h-6 inline-block me-2"
                  />
                ) : (
                  <img
                    src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718841600&semt=ais_user"
                    className="rounded-full w-6 h-6 inline-block me-2"
                  />
                )}
                {/* si yo no se si un objeto tiene determinada propiedad puedo anadir ? despues de la propiedad para preguntar si existe, si no existe me dara un undefined*/}
                <Menu>
                  <MenuButton>
                    {user?.displayName ? (
                      <span className="font-bold text-white">
                        {user.displayName}
                      </span>
                    ) : (
                      <span className="font-bold text-white">
                        {user?.email}
                      </span>
                    )}
                  </MenuButton>
                  <MenuItems anchor="bottom">
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="bg-sky-600 text-white px-5 py-4 rounded w-48 font-semibold"
                      >
                        Cerrar sesion
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          <DisclosurePanel className="sm:hidden">
            <div className="my-1 px-2 pb-3 pt-2">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
            </div>

            <div className="my-1 px-2 pb-3 pt-2">
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded px-3 py-2 text-sm font-medium"
              >
                Login
              </Link>
            </div>
            
            <div className="my-1 px-2 pb-3 pt-2">
              <Link
                to="/createproduct"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded px-3 py-2 text-sm font-medium"
              >
                Subir Foto
              </Link>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
