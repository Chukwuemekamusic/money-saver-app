import React, { useState } from "react";
import useCustomNavigation from "../../../utils/useCustomNavigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigateHome } = useCustomNavigation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here, e.g., make an API request to authenticate the user
    console.log("Login submitted:", { email, password });
    // Clear form fields after submission if needed
    setEmail("");
    setPassword("");
    navigateHome();
  };

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
