import React from 'react';


const SciModal = ({ showModal, closeModal, children }) => {
  if (!showModal) return <></>;

  return (
    <>
      
      <div
        className="modal-backdrop"
        onClick={closeModal}
      />

      
      <div className="modal-content-container">
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SciModal;