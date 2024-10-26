/* eslint-disable react/prop-types */
// Modal.js
import './modal.style.css';

const Modal = ({ isOpen, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Inactivité Détectée</h2>
        <p>Vous êtes inactif depuis un moment. Voulez-vous rester connecté ?</p>
        <button onClick={onConfirm}>Oui</button>
      </div>
    </div>
  );
};

export default Modal;