import React, { useState, useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold ">
        Welcome to Weekly Money Saver App
      </h1>
      <p>
        Your personal savings guide! Set your financial goals and track your
        progress with our tailored weekly savings plans.
      </p>

      <p>
        Ready to get started?
        <span className="text-teal-600 ml-1 hover:text-teal-800">
          <Link to="login">Log in</Link>
        </span>
        or
        <span className="text-teal-600 ml-1 hover:text-teal-800">
          <Link to="register">Register</Link>
        </span>
      </p>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPage;

  // const [formType, setFormType] = useState(null);
  // const {id} = useParams()

  // useEffect(() => {
  //   if (id === 'login' || id === 'register') {
  //     setFormType(id)
  //   }
  
  // }, [id]) 
  // const handleOpenForm = (type) => {
  //   setFormType(type);
  // };
