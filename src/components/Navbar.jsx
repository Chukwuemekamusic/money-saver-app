import { Link, useLocation } from "react-router-dom";
import useHandleLogout from "../features/auth/utils/useHandleLogout";
import { useSelector } from "react-redux";
import { SelectToken } from "../features/auth/authSlice";
import GoogleLoginButton from "./GoogleLoginButton";

const Navbar = () => {
  const token = useSelector(SelectToken);
  const { pathname } = useLocation();
  const handleLogout = useHandleLogout();

  return (
    <header className="bg-white py-2 justify-center shadow-lg mb-10 bg-opacity-80 backdrop-blur-sm fixed top-0 left-0 right-0 w-fullz-100">
      <div className="container mx-auto p-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">MoneySaver</Link>
        </div>
        <ul className="flex gap-5 items-center">
          {token ? (
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
              <li className="" >
                <GoogleLoginButton />
              </li>
              <li>
                <Link
                  className={`${
                    pathname === "/landing/login"
                      ? "bg-teal-600 hover:bg-teal-700/90"
                      : "bg-teal-600/55 hover:bg-sky-700"
                  } text-white font-bold py-2 px-3 rounded-2xl`}
                  to="/landing/login"
                >
                  Log In
                </Link>
              </li>
             
              <li>
                <Link
                  className={`${
                    pathname === "/landing/register"
                      ? "bg-teal-600 hover:bg-teal-700/90"
                      : "bg-teal-600/45 hover:bg-sky-700"
                  } text-white font-bold py-2 px-3 rounded-2xl`}
                  to="/landing/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;