import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from '../features/auth/supabaseAuthActions';
import { SelectUserInfo, SelectIsAuthenticated } from "../features/auth/authSliceNew";
import useCustomNavigation from '../utils/useCustomNavigation';
import CustomGoogleButton from './CustomGoogleButton';

const GoogleLoginButton = ({ showLabelOnSmallScreen = false }) => {
    const dispatch = useDispatch();
    const { navigateHome } = useCustomNavigation();
    const userInfo = useSelector(SelectUserInfo);
    const isAuthenticated = useSelector(SelectIsAuthenticated);

    // Redirect to homepage after successful login
    useEffect(() => {
        if (userInfo && isAuthenticated) {
            navigateHome();
        }
    }, [userInfo, isAuthenticated, navigateHome]);

    const handleGoogleLogin = async () => {
        try {
            console.log('🔵 User clicked Google login button');
            // Use Supabase OAuth instead of custom backend integration
            // This handles both login for existing users AND signup for new users
            await dispatch(loginWithGoogle()).unwrap();
            console.log('🔵 Redirecting to Google for authentication...');
            // Redirect is handled by Supabase - user will be redirected to /auth/callback
        } catch (error) {
            console.error('🔴 Google login failed:', error);
            // You could add a toast notification here
        }
    };

    return (
        <CustomGoogleButton 
            onClick={handleGoogleLogin} 
            label="Login with Google" 
            showLabelOnSmallScreen={showLabelOnSmallScreen}
        />
    );
    // return (
    //     <div className="">
    //         <GoogleButton 
    //             onClick={login} 
    //             label="Login with Google" 
    //             type="light"
    //             className="w-full sm:w-auto text-sm sm:text-base"
    //         />
    //     </div>
    // );
};

export default GoogleLoginButton;