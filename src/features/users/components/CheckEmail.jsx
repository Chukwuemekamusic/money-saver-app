import React from 'react';

const CheckEmail = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h1>
                <p className="text-gray-600">
                    Please check your email for a verification link to activate your account.
                </p>
            </div>
        </div>
    );
};

export default CheckEmail;