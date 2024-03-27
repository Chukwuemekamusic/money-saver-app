import React, { useState, useEffect } from "react";
import LoginForm from "../features/users/components/LoginForm2";
import CreateUserForm from "../features/users/components/CreateUserForm";
import { Link, useParams } from "react-router-dom";

const LandingPage = () => {
  const [formType, setFormType] = useState(null);
  const {id} = useParams()

  useEffect(() => {
    if (id === 'login' || id === 'register') {
      setFormType(id)
    }
  
  }, [id])
  

  const handleOpenForm = (type) => {
    setFormType(type);
  };
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold ">Welcome to Weekly Money Saver App</h1>
      <p>
        Your personal savings guide! Set your financial goals and track your
        progress with our tailored weekly savings plans.
      </p>
      <p>
        Ready to get started?
        <span className="text-teal-600 ml-1 hover:text-teal-800">
        <Link to="#" onClick={() => handleOpenForm("login")}>
          Log in
        </Link>{" "}
        </span>
        or
        <span className="text-teal-600 ml-1 hover:text-teal-800">
        <Link to="#" onClick={() => handleOpenForm("register")}>
          Register
        </Link>
        </span>
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
