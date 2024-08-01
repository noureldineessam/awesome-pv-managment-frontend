import { useState } from 'react';
import { TextField, Button, Typography, Container, CircularProgress } from '@mui/material';

const SignupForm = ({ onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Typography variant="h5" component="h1" gutterBottom>Signup</Typography>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }} autoComplete="off">
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    type="text"
                    autoComplete="off"
                    inputProps={{ autoComplete: 'off' }}
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ autoComplete: 'off' }}
                    required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                    autoComplete="off"
                    inputProps={{ autoComplete: 'off' }}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{
                        position: 'relative',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {loading && (
                        <CircularProgress size={24} style={{ position: 'absolute' }} />
                    )}
                    {!loading && 'Signup'}
                </Button>
                {error && <Typography color="error">{error.message || 'An error occurred.'}</Typography>}
            </form>
        </Container>
    );
};

export default SignupForm;
