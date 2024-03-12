import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../auth/authActions";
import useCustomNavigation from "../../../utils/useCustomNavigation";
import CustomError from "../../../components/CustomError";
import { SelectUserInfo } from "../../auth/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { navigateHome } = useCustomNavigation();
  const { loading, error } = useSelector((state) => state.auth);
  const userInfo = useSelector(SelectUserInfo);
  
  const validationSchema = yup.object().shape({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    // Handle form submission logic here
    console.log(data);
  };

  useEffect(() => {
    if (userInfo) {
      navigateHome();
    }
  }, [userInfo]);

  return (
    <div>
      {error && <CustomError error={error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email"> Email: </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="email..."
        />
        {errors.email && <CustomError error={errors.email.message} />}

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="password..."
        />
        {errors.password && <CustomError error={errors.password.message} />}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
