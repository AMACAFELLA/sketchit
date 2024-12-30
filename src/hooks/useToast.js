import { useState, useCallback } from 'react';

export const useToast = () => {
    const [toast, setToast] = useState({
        message: '',
        type: '',
        isVisible: false,
    });

    const showToast = useCallback((message, type = 'error') => {
        setToast({
            message,
            type,
            isVisible: true,
        });

        // Hide toast after 3 seconds
        const timer = setTimeout(() => {
            setToast(prev => ({ ...prev, isVisible: false }));
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);

    return { toast, showToast, hideToast };
};

export default useToast;