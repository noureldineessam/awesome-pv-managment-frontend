import { Box, Button, Typography, CircularProgress, IconButton, Grid } from '@mui/material';
import { Delete, Edit, Add, ChevronRight } from '@mui/icons-material';
import { useRouter } from 'next/router';

const FacilityHeader = ({ onCreate }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ flexGrow: 1 }}>
            Facility List
        </Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={onCreate}
            sx={{ ml: 2 }}
            startIcon={<Add />}
        >
            Create New Facility
        </Button>
    </Box>
);

const FacilityList = ({ facilities, onDelete, onEdit, setOpenCreateDialog, deletingFacilityId }) => {
    const router = useRouter();

    const handleFacilityClick = (id) => {
        router.push(`/dashboard/facility/${id}`);
    }

    return (
        <Box sx={{ width: '50%', margin: '0 auto', mt: 4 }}>
            <FacilityHeader onCreate={() => setOpenCreateDialog(true)} />
            {facilities.length === 0 ? (
                <Typography variant="body1" sx={{ mt: 2 }}>No facilities available.</Typography>
            ) : (
                <Grid container spacing={2}>
                    {facilities.map((facility) => (
                        <Grid item xs={12} md={6} key={facility._id}>
                            <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '4px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                <Box
                                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'space-between' }}
                                >
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', justifyContent: 'center' }}
                                        onClick={() => handleFacilityClick(facility._id)}
                                    >
                                        <Typography variant="h6">
                                            {facility.name}
                                        </Typography>
                                        <ChevronRight />
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <IconButton color="primary" onClick={() => onEdit(facility)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => onDelete(facility._id)} disabled={deletingFacilityId === facility._id}>
                                            {deletingFacilityId === facility._id ? <CircularProgress size={24} /> : <Delete />}
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body2">Nominal Power: {facility.nominialPower}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default FacilityList;
