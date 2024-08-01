import { TextField, Button, Typography, CircularProgress, Container, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onSubmit, loading, error }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    type="email"
                    {...register('email', { required: 'Email is required' })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    {...register('password', { required: 'Password is required' })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1em' }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Login'}
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        type="link"
                        sx={{ mt: 2 }}
                        href="/signup"
                    >
                        {'Sign Up'}
                    </Button>

                </Box>
                {error && <Typography color="error" variant="body2" marginTop={2}>{error.message}</Typography>}
            </form>
        </Container>
    );
};

export default LoginForm;
