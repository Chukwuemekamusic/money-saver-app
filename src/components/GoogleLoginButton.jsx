import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../features/auth/authActions';
import { SelectUserInfo } from '../features/auth/authSlice';
import useCustomNavigation from '../utils/useCustomNavigation';

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const { navigateHome } = useCustomNavigation();
    // const { error } = useSelector((state) => state.auth); // loading,
    const userInfo = useSelector(SelectUserInfo);

    // TODO: redirect to homepage after successful login
    useEffect(() => {
        console.log('userInfo changed:', userInfo);
        if (userInfo) {
            navigateHome();
        }
    }, [userInfo]);

    const handleGoogleLogin = async (codeResponse) => {
        const authorizationCode = codeResponse.code;
        dispatch(googleLogin({ code: authorizationCode }));

    };

    const login = useGoogleLogin({
        onSuccess: handleGoogleLogin,
        onError: () => {
            console.log('Login Failed');
        },
        flow: 'auth-code',
    });

    return <GoogleButton onClick={login} label="Login with Google"/>;
};

export default GoogleLoginButton;