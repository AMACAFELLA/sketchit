import React, { createContext, useContext } from 'react';
import Toast from '../components/UI/Toast';
import { useToast } from '../hooks/useToast';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const toastHelper = useToast();
  
  return (
    <ToastContext.Provider value={toastHelper}>
      {children}
      <Toast
        message={toastHelper.toast.message}
        type={toastHelper.toast.type}
        isVisible={toastHelper.toast.isVisible}
      />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};