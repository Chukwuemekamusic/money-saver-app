import React from 'react';
import GoogleLogo from '../assets/google-svgrepo-com.svg';


const CustomGoogleButton = ({ onClick, label, showLabelOnSmallScreen = false, fullWidth = false }) => {
    const widthClass = fullWidth 
        ? 'w-full' 
        : showLabelOnSmallScreen 
            ? 'w-auto' 
            : 'w-12 sm:w-auto';

    return (
        <button
        onClick={onClick}
        className={`bg-white text-gray-700 border border-gray-300 rounded shadow flex items-center justify-center ${widthClass} text-sm sm:text-base gap-2 p-2 hover:bg-gray-50 transition-colors`}
    >
            <div className="w-8 ">
                <img
                    src={GoogleLogo}
                alt="Google logo"
                    className="w-full h-full mr-2"
                />
            </div>
            <div className={`${showLabelOnSmallScreen ? 'block' : 'hidden md:block'} text-sm`}>{label}</div>
        </button>
    );
};

export default CustomGoogleButton;