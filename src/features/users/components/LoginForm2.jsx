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
  };

  useEffect(() => {
    if (userInfo) {
      navigateHome();
    }
  }, [userInfo]);

  return (
    <div className="mx-auto w-full max-w-xs text-start mt-4">
      {error && <CustomError error={error} />}
      <form
        className="rounded-md bg-white shadow-md pt-6 pb-8 px-6 mb-4 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <label htmlFor="email" className="block font-bold text-gray-700 mb-2">
            Email:{" "}
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="email..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-100/10"
          />
          {errors.email && <CustomError error={errors.email.message} />}
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block font-bold text-gray-700 mb-2"
          >
            Password:{" "}
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="password..."
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && <CustomError error={errors.password.message} />}
        </div>

        <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Login
        </button>
        {/* #TODO FIX THE INDEX ISSUE */}
        {/* <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a> */}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
