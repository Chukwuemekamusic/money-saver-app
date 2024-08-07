import React from 'react';
import GoogleButton from 'react-google-button';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
        },
        onError: () => {
            console.log('Login Failed');
        },
        flow: 'auth-code',
    });
    return <GoogleButton onClick={login} label="Login with Google" />;
};

export default GoogleLoginButton;

// import { GoogleLogin } from '@react-oauth/google';

//  <GoogleLogin
//   onSuccess={credentialResponse => {
//     console.log(credentialResponse);
//   }}
//   onError={() => {
//     console.log('Login Failed');
//   }}
// />; 