'use client'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import s from './Toast.module.css';
import { FaPlus } from 'react-icons/fa';

const ToastItem = ({ toast, removeToast }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false); 
      setTimeout(() => {
        removeToast(toast.id);
      }, 500); 
    }, toast.duration || 3000);

    return () => {
      clearTimeout(timeoutId); 
    };
  }, [toast, removeToast]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      removeToast(toast.id);
    }, 500); 
  };

  return (
    <div
      className={`${s.toast} ${isVisible ? s.slideIn : s.slideOut} border-b border-slate-400`}
    >
      <p className={s.text}>{toast.message}</p>
      <FaPlus onClick={handleClose} className={`${s.icon} rotate-45`} data-testid="CloseIcon" />
    </div>
  );
};

ToastItem.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  removeToast: PropTypes.func.isRequired,
};

export default ToastItem;