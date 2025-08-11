import { Link, useLocation } from "react-router-dom";
import useHandleLogout from "../features/auth/utils/useHandleLogout";
import { useSelector } from "react-redux";
import { SelectToken, SelectIsAuthenticated } from "../features/auth/authSliceNew";
import GoogleLoginButton from "./GoogleLoginButton";
import { useAuthModal } from "../contexts/AuthModalContext";

const Navbar = () => {
  const token = useSelector(SelectToken);
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const { pathname } = useLocation();
  const handleLogout = useHandleLogout();
  const { openLoginModal, openRegisterModal } = useAuthModal();

  return (
    <header className="bg-white py-2 justify-center shadow-lg mb-10 bg-opacity-80 backdrop-blur-sm fixed top-0 left-0 right-0 w-full z-100">
      <div className="container mx-auto p-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MoneySaver</Link>
        </div>
        <ul className="flex gap-2 md:gap-3 items-center">
          {(token || isAuthenticated) ? (
            <>
              <li>
                <Link className="text-teal-600 hover:text-teal-700" to="/">Dashboard</Link>
              </li>
              <li className="cursor-pointer text-teal-600 hover:text-teal-700" onClick={handleLogout}>
                Log out
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  onClick={openRegisterModal}
                  className="bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm md:text-base"
                >
                  Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={openLoginModal}
                  className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 text-sm md:text-base"
                >
                  Log In
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;