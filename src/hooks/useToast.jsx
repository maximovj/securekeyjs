import { useCallback } from 'react';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const useToast = () => {
    const showToast = useCallback((message, type) => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 2700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
        });
    }, []);

    return showToast;
}