import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCustomNavigation from "../../../utils/useCustomNavigation";
import { loginUser } from "../../auth/authActions";
import { SelectUserInfo } from "../../auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const userInfo = useSelector(SelectUserInfo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigateHome } = useCustomNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
    console.log("Login submitted:", { email, password });
    // Clear form fields after submission if needed
    setEmail("");
    setPassword("");
    navigateHome();
  };

  useEffect(() => {
    if (userInfo) {
      navigateHome();
    }
  }, [userInfo]);

  return (
    <div className="mx-auto bg-white p-8 rounded-md">
      <form className="" onSubmit={handleSubmit}>
        <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        </div>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="style-input"
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
