// Verification.js - Updated for Supabase Auth
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSliceNew';


const Verification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleEmailVerification = async () => {
            try {
                // Check if this is a Supabase email confirmation callback
                const accessToken = searchParams.get('access_token');
                const refreshToken = searchParams.get('refresh_token');
                const type = searchParams.get('type');

                if (type === 'signup' || type === 'email_change') {
                    // Handle Supabase email verification
                    if (accessToken && refreshToken) {
                        const { data, error } = await supabase.auth.setSession({
                            access_token: accessToken,
                            refresh_token: refreshToken
                        });

                        if (error) throw error;

                        if (data.user) {
                            dispatch(setUser({
                                token: accessToken,
                                user: data.user
                            }));
                            setMessage("Email verified successfully! You are now logged in.");
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        }
                    } else {
                        // Handle email confirmation without tokens (email-only verification)
                        setMessage("Email verified successfully! Please login to continue.");
                        setTimeout(() => {
                            navigate('/landing/login');
                        }, 3000);
                    }
                } else if (type === 'recovery') {
                    // Handle password reset
                    setMessage("Password reset link is valid. You can now set a new password.");
                    setTimeout(() => {
                        navigate('/reset-password');
                    }, 2000);
                } else {
                    // Default case - just show success message
                    setMessage("Email verification successful! Please login to continue.");
                    setTimeout(() => {
                        navigate('/landing/login');
                    }, 3000);
                }
            } catch (error) {
                console.error('Verification error:', error);
                setError(error.message || "Email verification failed. Please try again.");
                setTimeout(() => {
                    navigate('/landing/login');
                }, 5000);
            } finally {
                setIsLoading(false);
            }
        };

        handleEmailVerification();
    }, [searchParams, dispatch, navigate]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h1 className="text-xl font-semibold text-gray-700">Verifying your email...</h1>
                    <p className="text-gray-500">Please wait while we process your verification.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                {message && (
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                            <circle className="opacity-25" cx="24" cy="24" r="20" fill="currentColor"></circle>
                            <path className="opacity-75" fill="currentColor" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"></path>
                        </svg>
                        <h1 className="text-xl font-semibold text-green-600 mt-4">Success!</h1>
                        <p className="text-gray-600 mt-2">{message}</p>
                    </div>
                )}
                
                {error && (
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                            <circle className="opacity-25" cx="24" cy="24" r="20" fill="currentColor"></circle>
                            <path className="opacity-75" fill="currentColor" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zM24 14c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2s2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                        </svg>
                        <h1 className="text-xl font-semibold text-red-600 mt-4">Verification Failed</h1>
                        <p className="text-gray-600 mt-2">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Verification;