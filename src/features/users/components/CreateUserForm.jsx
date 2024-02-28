import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const CreateUserForm = () => {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    password: yup.string().required("Password is required"),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Repeat Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="first-name"> First Name: </label>
        <input
          type="text"
          id="first-name"
          {...register("firstName")}
          placeholder="first name..."
        />
        {errors.firstName && (
          <span style={{ color: "red" }}>{errors.firstName.message}</span>
        )}

        <label htmlFor="last-name"> Last Name: </label>
        <input
          type="text"
          id="last-name"
          {...register("lastName")}
          placeholder="last name..."
        />
        {errors.lastName && (
          <span style={{ color: "red" }}>{errors.lastName.message}</span>
        )}

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="password..."
        />
        {errors.password && (
          <span style={{ color: "red" }}>{errors.password.message}</span>
        )}

        <label htmlFor="repeat-password"> Repeat Password: </label>
        <input
          type="password"
          id="repeat-password"
          {...register("repeatPassword")}
          placeholder="repeat password..."
        />
        {errors.repeatPassword && (
          <span style={{ color: "red" }}>{errors.repeatPassword.message}</span>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
