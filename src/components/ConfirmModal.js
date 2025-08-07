// ConfirmModal.js
import React from "react";
import Modal from "react-modal";

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, amount, isPermanentSelection = false }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-48 bg-white rounded-lg shadow-md flex flex-col justify-center items-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      {/* <div>
        <p className='text-red-600'>Are you sure you want to save <b>£{amount}</b> for the week?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onRequestClose}>No</button>
      </div> */}
      <div className="text-center px-4">
        {/* Icon */}
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <span className="text-green-600 text-xl">💰</span>
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Complete this week?
        </h3>
        
        {/* Message */}
        <p className="text-gray-600 mb-2">
          You're about to mark <span className="font-bold text-green-600">£{amount}</span> as saved for your next week.
        </p>
        
        {isPermanentSelection && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-4 text-left">
            <div className="flex items-start">
              <span className="text-amber-600 mr-2">⚠️</span>
              <div className="text-sm">
                <p className="text-amber-800 font-medium">Once confirmed, this cannot be changed.</p>
                <p className="text-amber-700">This amount will be permanently marked as completed.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Buttons */}
        <div className="mt-6 flex space-x-3 justify-center">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300 shadow-sm"
          >
            Yes, Complete Week
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-300 shadow-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
