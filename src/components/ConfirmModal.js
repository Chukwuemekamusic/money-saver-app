// ConfirmModal.js
import React from 'react';
import Modal from 'react-modal';

const ConfirmModal = ({ isOpen, onRequestClose, onConfirm, amount }) => {
    const customStyles = {
        content: {
          width: '300px',
          height: '200px',
          margin: 'auto',
          border: '1px solid #ccc',
          borderRadius: '8px',
          background: '#fff',
          padding: '20px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        //   transform: 'translate(-50%, -50%)'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 2
        },
      };
      
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      style={customStyles}
    >
      <div>
        <p style={{color:'red'}}>Are you sure you want to save <b>£{amount}</b> for the week?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onRequestClose}>No</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
