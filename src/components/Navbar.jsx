import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white m-2 p-3">
      <ul className="flex gap-5 justify-end">
        <li>
          <Link to="/landing">Dashboard</Link>
        </li>
        <li>
          <Link to="/landing/login">Log In</Link>
        </li>
        <li>
          <Link to="/landing/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
