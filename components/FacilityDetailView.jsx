import { Box, Container, Typography, Button, CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { useDropzone } from 'react-dropzone';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Upload } from '@mui/icons-material';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FacilityDetailView = ({ facility, onUpload, onFileDrop, file, chartData, uploadLoading }) => {
    const { getRootProps, getInputProps } = useDropzone({
        accept: '.csv',
        onDrop: onFileDrop,
    });

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>{facility.name}</Typography>
            <Typography variant="h6">Nominal Power: {facility.nominialPower} kW</Typography>

            <Box sx={{ my: 3 }}>
                <Typography variant="h6">Upload CSV Report</Typography>
                <Box {...getRootProps()} sx={{ border: '2px dashed #ccc', padding: 2, textAlign: 'center', cursor: 'pointer' }}>
                    <input {...getInputProps()} />
                    <Typography>{file ? file.name : 'Drag & drop a CSV file here, or click to select one'}</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onUpload}
                    disabled={!file || uploadLoading}
                    sx={{ mt: 2, height: '48px' }}
                    startIcon={<Upload />}
                >
                    {uploadLoading ? (
                        <CircularProgress size={24} />
                    ) : (
                        'Upload Report'
                    )}
                </Button>
            </Box>

            {chartData && (
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>Facility Data Overview</Typography>
                    <Line data={chartData} />
                </Box>
            )}
        </Container>
    );
};

export default FacilityDetailView;
