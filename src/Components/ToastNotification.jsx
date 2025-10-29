// src/Components/ToastNotification.jsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = forwardRef(({ delay = 3000 }, ref) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('success'); // 'success', 'danger', 'info'

  // Expose a function to parent components to show the toast
  useImperativeHandle(ref, () => ({
    showToast(msg, type = 'success') {
      setMessage(msg);
      setVariant(type);
      setShow(true);
    },
  }));

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay]);

  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1050 }}>
      <Toast onClose={() => setShow(false)} show={show} delay={delay} autohide bg={variant}>
        <Toast.Header>
          <strong className="me-auto">{variant === 'success' ? 'Success' : (variant === 'danger' ? 'Error' : 'Info')}</strong>
        </Toast.Header>
        <Toast.Body className={variant === 'light' ? 'text-dark' : 'text-white'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
});

export default ToastNotification;