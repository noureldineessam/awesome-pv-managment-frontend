import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        router.push('/');
    };

    return { isAuthenticated, loading, login, logout };
};

export default useAuth;
