import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';

const FacilityForm = ({ onSubmit, initialValues = {}, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                {initialValues?.name ? 'Edit Facility' : 'New Facility'}
            </Typography>
            <TextField
                fullWidth
                label="Facility Name"
                {...register('name', { required: 'Facility Name is required' })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
        </Box>
    );
};

export default FacilityForm;
