import { Navigate } from 'react-router';
import useAuth from '../../../hooks/useAuth.ts';
import * as React from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to='/login' replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
