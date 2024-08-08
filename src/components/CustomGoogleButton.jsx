import React from 'react';
import GoogleLogo from '../assets/google-svgrepo-com.svg';


const CustomGoogleButton = ({ onClick, label }) => {
    return (
        <button
            onClick={onClick}
            className="bg-white text-gray-700 border border-gray-300 rounded shadow  flex items-center justify-center w-12  sm:w-auto text-sm sm:text-base gap-2 p-2"
        >
            <div className="w-8 ">
                <img
                    src={GoogleLogo}
                alt="Google logo"
                    className="w-full h-full mr-2"
                />
            </div>
            <div className="hidden md:block text-sm">{label}</div>
        </button>
    );
};

export default CustomGoogleButton;