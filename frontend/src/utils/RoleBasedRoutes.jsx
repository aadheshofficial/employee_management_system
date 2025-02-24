import React from 'react'
import { useAuth } from '../../context/authContext'
import { Navigate } from 'react-router-dom'

const RoleBasedRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>
                    <div className="flex items-center justify-center h-max">
                        <div className="w-16 h-16 border-4 border-t-transparent border-teal-600 rounded-full animate-spin"></div>
                    </div>
                </div> 
    }

    if (!user || !requiredRole.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default RoleBasedRoutes;
