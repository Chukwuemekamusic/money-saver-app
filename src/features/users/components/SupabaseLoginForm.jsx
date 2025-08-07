import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginWithSupabase,
  loginWithGoogle,
  resetPassword,
} from "../../auth/supabaseAuthActions";
import {
  SelectAuthLoading,
  SelectAuthError,
  SelectIsAuthenticated,
  SelectPasswordResetSent,
  clearError,
} from "../../auth/authSliceNew";

const SupabaseLoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(SelectAuthLoading);
  const error = useSelector(SelectAuthError);
  const isAuthenticated = useSelector(SelectIsAuthenticated);
  const passwordResetSent = useSelector(SelectPasswordResetSent);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      dispatch(loginWithSupabase(formData));
    }
  };

  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    if (resetEmail) {
      dispatch(resetPassword({ email: resetEmail }));
    }
  };

  if (passwordResetSent && showResetForm) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Check Your Email
          </h2>
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to {resetEmail}
          </p>
          <button
            onClick={() => {
              setShowResetForm(false);
              dispatch(clearError());
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (showResetForm) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

        <form onSubmit={handlePasswordReset}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setShowResetForm(false);
                dispatch(clearError());
              }}
              className="text-blue-500 hover:text-blue-700"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

      <form onSubmit={handleSubmit}>
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

        <div className="mb-6">
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-center mb-4">
          <button
            type="button"
            onClick={() => setShowResetForm(true)}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Forgot your password?
          </button>
        </div>

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

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
        >
          Sign in with Google
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SupabaseLoginForm;
