import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle'; import { DataGrid } from '@mui/x-data-grid';
import jsonParse from '../../compenents/Util/jsonParse';
import DeleteIcon from '@mui/icons-material/Delete';
import SwalAlerts from '../../compenents/Util/swalAlerts';
function DoctorsManagement() {
    document.title = 'Doctors Management';
    const [scheduledAppointments, setScheduledAppointments] = useState(jsonParse('scheduledAppointments'));
    const [availableAppointments, setAvailableAppointments] = useState(jsonParse('availableAppointments'));
    const [doctorsAppointments, setDoctorsAppointments] = useState(jsonParse('doctorsAppointments'));
    const [doctorsNames, setDoctorsNames] = useState(jsonParse('doctorsNames'));
    const [rows, setRows] = useState('');

    useEffect(() => {
        const updatedRows = Array.from(new Set(doctorsNames.map(appointment => appointment.label))).map((doctor, index) => ({
            id: index + 1,
            doctor: doctor,
        }));
        setRows(updatedRows)
    }
    )


    const handleDeleteDoctor = (selectedDoctorName) => {
        // Remove appointments associated with the selected doctor
        const updatedScheduledAppointments = scheduledAppointments.filter(doctorName => doctorName.doctor !== selectedDoctorName);
        setScheduledAppointments(updatedScheduledAppointments);
        localStorage.setItem('scheduledAppointments', JSON.stringify(updatedScheduledAppointments));

        // Remove doctor's appointments from available appointments
        const updatedAvailableAppointments = availableAppointments.filter(doctorName => doctorName.doctor !== selectedDoctorName);
        setAvailableAppointments(updatedAvailableAppointments);
        localStorage.setItem('availableAppointments', JSON.stringify(updatedAvailableAppointments));

        // Remove doctor's appointments from doctor's appointments
        const updatedDoctorsAppointments = doctorsAppointments.filter(doctorName => doctorName.doctor !== selectedDoctorName);
        setDoctorsAppointments(updatedDoctorsAppointments);
        localStorage.setItem('doctorsAppointments', JSON.stringify(updatedDoctorsAppointments));

        // Remove doctor's name from doctors names
        const updatedDoctorsNames = doctorsNames.filter(doctorName => doctorName.value !== selectedDoctorName);
        setDoctorsNames(updatedDoctorsNames);
        localStorage.setItem('doctorsNames', JSON.stringify(updatedDoctorsNames));
    };

    const columns = [
        { field: 'doctor', headerName: 'Doctor', flex: 1, minWidth: 1000 },
        {
            field: 'action',
            headerName: 'Delete Doctor',
            flex: 0.5,
            minWidth: 600,
            renderCell: (params) => (
                <IconButton
                    onClick={() => SwalAlerts('doctorDelete', params, handleDeleteDoctor(params.row.doctor))}
                    color="secondary">
                    <DeleteIcon />
                </IconButton>
            )
        }
    ]



    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 1800, width: '100%', textAlign: 'center', fontFamily: 'Inter' }}>
            <IconButton
                onClick={() => { SwalAlerts('newDoctor') }}>
                <AddCircleIcon />
            </IconButton>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </Box>
    );

}
export default DoctorsManagement;
