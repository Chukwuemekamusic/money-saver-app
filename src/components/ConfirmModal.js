// ConfirmModal.js
import React from "react";
import Modal from "react-modal";

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, amount }) => {

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
      <div className="text-center">
        <p className="text-red-600">
          Are you sure you want to save <b>£{amount}</b> for the week?
        </p>
        <div className="mt-4 space-x-4">
          <button
            onClick={onConfirm}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={onRequestClose}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
          >
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
