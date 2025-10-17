import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';
import { isTokenExpired } from '../utils/token';

export const useTokenGuard = () => {
    const user = useAuthStore((state: any) => state.user);
    const clearUser = useAuthStore((state: any) => state.clearUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.accessToken && isTokenExpired(user.accessToken)) {
            clearUser();
            navigate('/login', {
                state: { error: 'Your session has expired. Please log in again.' },
            });
        }
    }, [user?.accessToken]);
};
