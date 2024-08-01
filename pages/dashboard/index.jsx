import { useQuery, useMutation } from '@apollo/client';
import graphql from '@/graphql/index';
import FacilityForm from '@/components/common/FacilityForm';
import FacilityList from '@/components/common/FacilityList';
import useAuth from '@/hooks/useAuth';
import { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Container, CircularProgress, Box } from '@mui/material';
import LogoutButton from '@/components/common/LogoutButton';

const Dashboard = () => {
    const { isAuthenticated, loading: authLoading, logout } = useAuth();
    const { data, refetch, loading: dataLoading } = useQuery(graphql.queries.facilities.USER_FACILITIES);
    const [createFacility, { loading: createLoading }] = useMutation(graphql.mutations.facilities.CREATE_FACILITY);
    const [updateFacility, { loading: updateLoading }] = useMutation(graphql.mutations.facilities.UPDATE_FACILITY);
    const [deleteFacility] = useMutation(graphql.mutations.facilities.DELETE_FACILITY);
    const [editingFacility, setEditingFacility] = useState(null);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deletingFacilityId, setDeletingFacilityId] = useState(null);

    const handleCreate = async (formData) => {
        try {
            await createFacility({ variables: { facility: { name: formData.name, nominialPower: formData.nominialPower } } });
            setOpenCreateDialog(false);
            refetch();
        } catch (err) {
            console.error('Error creating facility:', err);
        }
    };

    const handleUpdate = async (formData) => {
        try {
            await updateFacility({ variables: { id: editingFacility._id, facility: { name: formData.name, nominialPower: formData.nominialPower } } });
            setOpenEditDialog(false);
            setEditingFacility(null);
            refetch();
        } catch (err) {
            console.error('Error updating facility:', err);
        }
    };

    const handleDelete = async (id) => {
        setDeletingFacilityId(id);
        try {
            await deleteFacility({ variables: { id } });
            refetch();
        } catch (err) {
            console.error('Error deleting facility:', err);
        } finally {
            setDeletingFacilityId(null);
        }
    };

    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', m: 5, position: 'relative' }}>
            {dataLoading && (
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1000
                }}>
                    <CircularProgress />
                </Box>
            )}

            <LogoutButton logout={logout} />
            <FacilityList
                facilities={data?.userFacilities || []}
                onDelete={handleDelete}
                onEdit={(facility) => {
                    setEditingFacility(facility);
                    setOpenEditDialog(true);
                }}
                setOpenCreateDialog={setOpenCreateDialog}
                deletingFacilityId={deletingFacilityId}
            />

            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Create New Facility</DialogTitle>
                <DialogContent>
                    <FacilityForm onSubmit={handleCreate} isLoading={createLoading} />
                </DialogContent>
            </Dialog>

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit Facility</DialogTitle>
                <DialogContent>
                    <FacilityForm onSubmit={handleUpdate} initialValues={editingFacility} isLoading={updateLoading} />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Dashboard;
