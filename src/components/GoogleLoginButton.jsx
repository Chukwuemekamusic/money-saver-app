import React, { useEffect } from 'react';
// import GoogleButton from 'react-google-button';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { googleLogin } from '../features/auth/authActions';
import { SelectUserInfo } from '../features/auth/authSlice';
import useCustomNavigation from '../utils/useCustomNavigation';
import CustomGoogleButton from './CustomGoogleButton';

const GoogleLoginButton = ({ showLabelOnSmallScreen = false }) => {
    const dispatch = useDispatch();
    const { navigateHome } = useCustomNavigation();
    // const { error } = useSelector((state) => state.auth); // loading,
    const userInfo = useSelector(SelectUserInfo);

    // TODO: redirect to homepage after successful login
    useEffect(() => {
        // console.log('userInfo changed:', userInfo);
        if (userInfo) {
            navigateHome();
        }
    }, [userInfo, navigateHome]);

    const handleGoogleLogin = async (codeResponse) => {
        // console.log('codeResponse', codeResponse)
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

    return (
        <CustomGoogleButton 
            onClick={login} 
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