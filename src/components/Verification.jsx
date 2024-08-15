// Verification.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { activateUserURL } from '../api/axiosUtil';
import useCustomNavigation from '../utils/useCustomNavigation';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';


const Verification = () => {
    const { uidb64, token } = useParams(); // Get UID and token from URL
    const { navigateHome } = useCustomNavigation();
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(activateUserURL(uidb64, token)); // Adjust the URL as needed
                alert(response.data.message)
                setMessage(response.data.message); // Show success message
                navigateHome();
                // Dispatch user data and navigate home after dispatch
                dispatch(setUser(response.data));
               
            } catch (error) {
                setError(error.response?.data?.error || "Verification failed."); // Optional chaining for safety
            }
        };

        verifyEmail();
    }, [uidb64, token, dispatch, navigateHome]); // Add dispatch and navigateHome to dependencies

    return (
        <div>
            <h1>Verifying your email...</h1>
            {message && <p className="success-message">{message}</p>} {/* Display success message */}
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
        </div>
    );
};

export default Verification;