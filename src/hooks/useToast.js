import { useState, useCallback } from 'react';

export function useToast() {
    const [toast, setToast] = useState(null);

    const showToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToast({ id, message, type });

        setTimeout(() => {
            setToast((current) => (current?.id === id ? null : current));
        }, 3000); // auto-hide after 3 seconds
    }, []);

    return { toast, showToast };
}
