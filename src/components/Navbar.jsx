import { Link, useLocation } from "react-router-dom";
import useHandleLogout from "../features/auth/utils/useHandleLogout";
import { useSelector } from "react-redux";
import { SelectToken } from "../features/auth/authSlice";

const Navbar = () => {
  //   const token = JSON.parse(localStorage.getItem("userToken")) ?? "";
  const token = useSelector(SelectToken);
  const {pathname} = useLocation()
  console.log('pathname', pathname)

  const handleLogout = useHandleLogout();
  return (
    <header>
      <div className="bg-white p-5 justify-center shadow-lg mb-10 bg-opacity-5">
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
              <li >
                <Link className={`${pathname == '/landing/login' ? 'bg-teal-600 hover:bg-teal-700/90' : 'bg-teal-600/55 hover:bg-sky-700'}  text-white font-bold  py-2 px-3 rounded-2xl`} to="/landing/login">Log In</Link>
              </li>
              <li>
                <Link className={`${pathname == '/landing/register' ? 'bg-teal-600 hover:bg-teal-700/90' : 'bg-teal-600/45 hover:bg-sky-700'}  text-white font-bold  py-2 px-3 rounded-2xl mr-2 mx-1`} to="/landing/register">Register</Link>
              </li>
            </>
          )}
          {/* #TODO fix the login button  */}
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
