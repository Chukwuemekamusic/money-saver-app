import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../../auth/authActions";
import useCustomNavigation from "../../../utils/useCustomNavigation";
import CustomError from "../../../components/CustomError";

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const { navigateHome } = useCustomNavigation();
  // #TODO handle that logged in users can't access this page
  const { error, success } = useSelector( 
    (state) => state.auth
  ); // loading, userInfo, 
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

  const onSubmit = async (data) => {
    await dispatch(registerUser(data)).then(async (result) => {
      console.log("result", result);
      if (result.type === "auth/register/fulfilled") {
        await dispatch(loginUser(data)).then(() => navigateHome());
      }
    });
    console.log("last_catch success", success);
  };

  // useEffect(() => {
  //   if (success) {
  //     navigateHome()
  //   }
  // }, [success]);

  return (
    <div className="mx-auto w-full max-w-xs text-start mt-4">
      {error && <CustomError error={error} />}
      <form
        className="rounded-md bg-white shadow-md pt-6 pb-8 px-6 mb-4 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="first_name"
          className="block font-bold text-gray-700 mb-2"
        >
          {" "}
          First Name:{" "}
        </label>
        <input
          type="text"
          id="first_name"
          {...register("first_name")}
          placeholder="first name..."
          className="style-input"
        />
        {errors.first_name && (
          // <span style={{ color: "red" }}>{errors.first_name.message}</span>
          <CustomError error={errors.first_name.message} />
        )}

        <label
          htmlFor="last_name"
          className="block font-bold text-gray-700 mb-2"
        >
          {" "}
          Last Name:{" "}
        </label>
        <input
          type="text"
          id="last_name"
          {...register("last_name")}
          placeholder="last name..."
          className="style-input"
        />
        {errors.last_name && (
          // <span style={{ color: "red" }}>{errors.last_name.message}</span>
          <CustomError error={errors.last_name.message} />
        )}

        <label htmlFor="email" className="block font-bold text-gray-700 mb-2">
          {" "}
          Email:{" "}
        </label>
        <input
          type="email"
          id="email"
          {...register("email")}
          placeholder="email..."
          // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-yellow-100/10"
          className="style-input"
        />
        {errors.email && (
          // <span style={{ color: "red" }}>{errors.email.message}</span>
          <CustomError error={errors.email.message} />
        )}

        <label
          htmlFor="password"
          className="block font-bold text-gray-700 mb-2"
        >
          {" "}
          Password:{" "}
        </label>
        <input
          type="password"
          id="password"
          {...register("password")}
          placeholder="password..."
          className="style-input"
        />
        {errors.password && (
          // <span style={{ color: "red" }}>{errors.password.message}</span>
          <CustomError error={errors.password.message} />
        )}

        <label
          htmlFor="confirm-password"
          className="block font-bold text-gray-700 mb-2"
        >
          {" "}
          Confirm Password:{" "}
        </label>
        <input
          type="password"
          id="confirm-password"
          {...register("confirmPassword")}
          placeholder="confirm password..."
          className="style-input"
        />
        {errors.confirmPassword && (
          // <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
          <CustomError error={errors.confirmPassword.message} />
        )}
         <div className="flex items-center justify-between">
        <button
          className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          type="submit"
        >Register</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
