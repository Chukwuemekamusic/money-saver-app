import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAuthCallback } from "../../auth/supabaseAuthActions";
import {
  SelectAuthLoading,
  SelectAuthError,
  SelectIsAuthenticated,
} from "../../auth/authSliceNew";

const AuthCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(SelectAuthLoading);
  const error = useSelector(SelectAuthError);
  const isAuthenticated = useSelector(SelectIsAuthenticated);

  useEffect(() => {
    // Handle the OAuth callback with a slight delay to ensure URL parameters are loaded
    const timer = setTimeout(() => {
      dispatch(handleAuthCallback());
    }, 100);

    return () => clearTimeout(timer);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to home page on successful authentication
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else if (error) {
      // Redirect to login on error
      setTimeout(() => {
        navigate("/landing/login");
      }, 3000);
    }
  }, [isAuthenticated, error, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">
            Signing you in...
          </h2>
          <p className="text-gray-500">
            Please wait while we complete your authentication.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
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
                d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zM24 14c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Authentication Failed
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
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
          <h2 className="text-xl font-semibold text-green-600 mb-4">
            Success!
          </h2>
          <p className="text-gray-600 mb-4">
            You have been successfully signed in.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">
          Processing authentication...
        </h2>
      </div>
    </div>
  );
};

export default AuthCallback;
