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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
