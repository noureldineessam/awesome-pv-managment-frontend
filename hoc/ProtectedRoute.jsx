import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            router.push('/');
        } else {
            setLoading(false);
        }
    }, [router]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return children;
};

export default ProtectedRoute;
