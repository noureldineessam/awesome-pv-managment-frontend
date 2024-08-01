// logou
import { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Logout } from '@mui/icons-material';


const LogoutButton = ({ logout }) => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const handleLogout = async () => {
        setLogoutLoading(true);
        logout();
        setLogoutLoading(false);
    };
    return (
        <Button
            onClick={handleLogout}
            variant="contained"
            color="secondary"
            sx={{ mb: 2, alignSelf: 'flex-end', position: 'relative', height: '48px' }}
            disabled={logoutLoading}
            startIcon={<Logout />}
        >
            {logoutLoading ? (
                <CircularProgress size={24} style={{ position: 'absolute' }} />
            ) : (
                'Logout'
            )}
        </Button>
    );
};

export default LogoutButton;