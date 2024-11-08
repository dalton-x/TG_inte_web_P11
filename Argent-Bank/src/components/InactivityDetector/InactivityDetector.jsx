/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/actions/auth.actions'
import { destroyUser } from '@/redux/actions/user.actions'
import Modal from './Modal'

const InactivityDetector = () => {
  const dispatch = useDispatch();
  
  const [timeoutId, setTimeoutId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActivity = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    const id = setTimeout(() => {
      handleInactivity()
    }, import.meta.env.VITE_DURATION_INACTIVITY)
    setTimeoutId(id)
  };

  const handleInactivity = () => {
    setIsModalOpen(true)
  };

  const handleConfirm = () => {
    setIsModalOpen(false)
    handleActivity()
  };

  const handleClose = () => {
    setIsModalOpen(false)
    sessionStorage.clear()
    localStorage.clear()
    dispatch(logout())
    dispatch(destroyUser())
  };

  useEffect(() => {
    const events = ['keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, handleActivity))

    return () => {
      events.forEach(event => window.removeEventListener(event, handleActivity))
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    };
  }, [timeoutId])

  return (
    <Modal isOpen={isModalOpen} onConfirm={handleConfirm} onCancel={handleClose} />
  );
};

export default InactivityDetector;