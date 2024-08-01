import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import Papa from 'papaparse';
import graphql from '@/graphql/index';
import FacilityDetailView from '@/components/FacilityDetailView';
import { format } from 'date-fns';
import { CircularProgress, Box, Button, Snackbar, Alert, Container } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import LogoutButton from '@/components/common/LogoutButton';
import { ChevronLeft } from '@mui/icons-material';




const FacilityDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { isAuthenticated, loading: authLoading, logout } = useAuth();


    const { data: facilityData, loading: dataLoading, error: facilityDataError } = useQuery(graphql.queries.facilities.GET_FACILITY, {
        variables: { id },
        skip: !id
    });
    const { data: reportData, refetch: refetchReportData, loading: reportLoading, error: reportDataError } = useQuery(graphql.queries.reports.FACILITY_REPORTS, { variables: { facilityId: id } });
    const [uploadReport, { loading: uploadLoading }] = useMutation(graphql.mutations.reports.CREATE_REPORT);
    const [updateFacility] = useMutation(graphql.mutations.facilities.UPDATE_FACILITY);

    const [file, setFile] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (reportData?.facilityReports?.length) {
            const dataPoints = reportData.facilityReports.flatMap(report => report.dataPoints);
            dataPoints.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            const timestamps = dataPoints.map(item => format(new Date(item.timestamp), 'MM/dd/yyyy HH:mm'));
            const powerData = dataPoints.map(item => item.active_power_kW);
            const energyData = dataPoints.map(item => item.energy_kWh);
            const nominalPower = Number((powerData.reduce((acc, val) => acc + val, 0) / powerData.length).toFixed(4));
            updateFacility({
                variables: {
                    id: id,
                    facility: {
                        nominialPower: nominalPower
                    }
                }
            });

            setChartData({
                labels: timestamps,
                datasets: [
                    {
                        label: 'Active Power (kW)',
                        data: powerData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Energy (kWh)',
                        data: energyData,
                        borderColor: 'rgba(153, 102, 255, 1)',
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [reportData]);

    useEffect(() => {
        if (facilityDataError || reportDataError) {
            setErrorMessage(facilityDataError?.message || reportDataError?.message || 'An error occurred.');
            setSnackbarOpen(true);
        }
    }, [facilityDataError, reportDataError]);

    const handleUpload = async () => {
        if (!file) return;

        try {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: async (results) => {
                    const dataPoints = results.data.map(row => {
                        try {
                            const parsedDate = new Date(row.timestamp);
                            if (isNaN(parsedDate.getTime())) {
                                throw new Error('Invalid date');
                            }

                            return {
                                timestamp: parsedDate.toISOString(),
                                active_power_kW: parseFloat(row.active_power_kW),
                                energy_kWh: parseFloat(row.energy_kWh),
                            };
                        } catch (error) {
                            console.error('Error parsing row:', row, error);
                            return null;
                        }
                    }).filter(point => point !== null);

                    if (dataPoints.length === 0) {
                        throw new Error('No valid data points');
                    }

                    await uploadReport({
                        variables: {
                            report: { dataPoints },
                            facilityId: id,
                        },
                    });

                    setFile(null);
                    refetchReportData();
                },
                error: (error) => {
                    console.error('Error parsing CSV:', error);
                    setErrorMessage('Error parsing CSV file.');
                    setSnackbarOpen(true);
                }
            });
        } catch (err) {
            console.error('Error uploading report:', err);
            setErrorMessage('Error uploading report.');
            setSnackbarOpen(true);
        }
    };

    const handleFileDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const handleBackClick = () => {
        router.back();
    };

    //Handle unauthenticated user
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
        router.push('/dashboard');
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', m: 5, position: 'relative' }}>

                {/* Loading Spinner Overlay */}
                {(dataLoading || reportLoading) && (
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

                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        onClick={handleBackClick}
                        variant="contained"
                        sx={{ mb: 2, alignSelf: 'flex-start', position: 'relative', height: '48px' }}
                        startIcon={<ChevronLeft />}
                    >
                        Back
                    </Button>

                    <LogoutButton logout={logout} />
                </Box>

                <FacilityDetailView
                    facility={facilityData?.facility || {}}
                    onUpload={handleUpload}
                    onFileDrop={handleFileDrop}
                    file={file}
                    chartData={chartData}
                    uploadLoading={uploadLoading}
                />

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={errorMessage}
                    action={
                        <Button color="inherit" onClick={handleCloseSnackbar}>
                            Close
                        </Button>
                    }
                >
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default FacilityDetailPage;
