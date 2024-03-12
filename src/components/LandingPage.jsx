import React, { useState } from "react";
import LoginForm from "../features/users/components/LoginForm2";
import CreateUserForm from "../features/users/components/CreateUserForm";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [formType, setFormType] = useState(null);

  const handleOpenForm = (type) => {
    setFormType(type);
  };
  return (
    <div>
      <h1>Welcome to Weekly Money Saver App</h1>
      <p>
        Your personal savings guide! Set your financial goals and track your
        progress with our tailored weekly savings plans.
      </p>
      <p>
        Ready to get started?
        {/* <a href="/login">Log in</a> or <a href="/register">Register</a>. */}
        <Link to="#" onClick={() => handleOpenForm("login")}>
          Log in
        </Link>{" "}
        or{" "}
        <Link to="#" onClick={() => handleOpenForm("register")}>
          Register
        </Link>
      </p>
      {formType === "login" && (
        <>
          <LoginForm />
          {/* <p>
            if not register, click{" "}
            <Link to="#" onClick={handleOpenForm("register")}></Link>
          </p> */}
        </>
      )}
      {formType === "register" && <CreateUserForm />}
    </div>
  );
};

export default LandingPage;
