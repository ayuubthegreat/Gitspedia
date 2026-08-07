import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticationFirewall = ({ children, needsAuthentication }) => {
    const { user } = useSelector((state) => state.user);
    if (needsAuthentication && !user) {
        return <Navigate to="/login" />;
    }
    if (!needsAuthentication && user) {
        return <Navigate to="/" />;
    }
    return children;
};

export default AuthenticationFirewall;