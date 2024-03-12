import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../auth/authActions";
import useCustomNavigation from "../../../utils/useCustomNavigation";
import CustomError from '../../../components/CustomError'

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const { navigateHome } = useCustomNavigation();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const validationSchema = yup.object().shape({
    first_name: yup.string().required("First Name is required"),
    last_name: yup.string().required("Last Name is required"),
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    if (success) {
      dispatch(loginUser(data))
    }
    // Handle form submission logic here
    console.log(data);
  };

  // useEffect(() => {
  //   if (success) {
  //     navigateHome()
  //   }

  //   return () => {};
  // }, [success]);

  return (
    <div>
      {error && <CustomError error={error} />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first_name"> First Name: </label>
        <input
          type="text"
          id="first_name"
          {...register("first_name")}
          placeholder="first name..."
        />
        {errors.first_name && (
          // <span style={{ color: "red" }}>{errors.first_name.message}</span>
          <CustomError error={errors.first_name.message} />
        )}

        <label htmlFor="last_name"> Last Name: </label>
        <input
          type="text"
          id="last_name"
          {...register("last_name")}
          placeholder="last name..."
        />
        {errors.last_name && (
          // <span style={{ color: "red" }}>{errors.last_name.message}</span>
          <CustomError error={errors.last_name.message} />
        )}

        <label htmlFor="email"> Email: </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="email..."
        />
        {errors.email && (
          // <span style={{ color: "red" }}>{errors.email.message}</span>
          <CustomError error={errors.email.message} />
        )}

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="password..."
        />
        {errors.password && (
          // <span style={{ color: "red" }}>{errors.password.message}</span>
          <CustomError error={errors.password.message} />
        )}

        <label htmlFor="confirm-password"> Confirm Password: </label>
        <input
          type="password"
          id="confirm-password"
          {...register("confirmPassword")}
          placeholder="confirm password..."
        />
        {errors.confirmPassword && (
          // <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
          <CustomError error={errors.confirmPassword.message} />
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
