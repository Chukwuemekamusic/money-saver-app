import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerWithSupabase } from "../../auth/supabaseAuthActions";
import {
  SelectAuthLoading,
  SelectAuthError,
  SelectIsAuthenticated,
  clearError,
} from "../../auth/authSliceNew";
import GoogleLoginButton from "../../../components/GoogleLoginButton";
import { useAuthModal } from "../../../contexts/AuthModalContext";

const SupabaseRegisterForm = ({ onSuccess = null }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openLoginModal } = useAuthModal();

  const loading = useSelector(SelectAuthLoading);
  const error = useSelector(SelectAuthError);
  const isAuthenticated = useSelector(SelectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      if (onSuccess) {
        onSuccess(); // Close modal first
      }
      navigate("/");
    }
  }, [isAuthenticated, navigate, onSuccess]);

  useEffect(() => {
    // Clear errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      return "First name and last name are required";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    const result = await dispatch(
      registerWithSupabase({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      })
    );

    if (registerWithSupabase.fulfilled.match(result)) {
      setRegistrationSuccess(true);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <circle
                className="opacity-25"
                cx="24"
                cy="24"
                r="20"
                fill="currentColor"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification email to <strong>{formData.email}</strong>
            . Please check your inbox and click the verification link to
            activate your account.
          </p>
          <div className="space-y-3">
            <Link
              to="/landing"
              className="block w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-center"
            >
              Go to Landing
            </Link>
            <button
              onClick={() => setRegistrationSuccess(false)}
              className="block w-full text-blue-500 hover:text-blue-700"
            >
              Register Another Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${onSuccess ? '' : 'max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'}`}>
      {!onSuccess && <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
            minLength="6"
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 6 characters long
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white py-2 px-4 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <GoogleLoginButton 
          showLabelOnSmallScreen={true} 
          label="Create account with Google"
          fullWidth={true}
        />

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={openLoginModal}
              className="text-blue-500 hover:text-blue-700 underline"
            >
              Log in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SupabaseRegisterForm;
