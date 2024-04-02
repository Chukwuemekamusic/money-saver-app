import { Link } from "react-router-dom";
import useHandleLogout from "../features/auth/utils/useHandleLogout";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SelectToken } from "../features/auth/authSlice";

const Navbar = () => {
  //   const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
  const token = useSelector(SelectToken);

  const handleLogout = useHandleLogout();
  return (
    <header>
      <div className="bg-white p-5 justify-center shadow-lg mb-4 bg-opacity-5">
        <ul className="flex gap-5 justify-end">
          {token ? (
            <>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li className="cursor-pointer" onClick={handleLogout}>
                Log out
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/landing/login">Log In</Link>
              </li>
              <li>
                <Link to="/landing/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

//   const [authenticated, setAuthenticated] = useState(false)
//   useEffect(() => {
//     if (token) {
//         setAuthenticated(true)
//     }else {
//         setAuthenticated(false)
//     }
//   }, [token])
