import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/auth.store';

export const PrivateRoute = ({
    children,
}: {
    permission?: string;
    children: React.ReactNode;
}) => {
    const user = useAuthStore.getState().user;

    if (!user) {
        return (
            <Navigate
                to="/login"
                state={{ error: 'Session expired. Please log in again.' }}
                replace
            />
        );
    }

    return <>{children}</>;
};
