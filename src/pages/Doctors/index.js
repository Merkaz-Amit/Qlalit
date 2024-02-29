import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SwalAlerts from '../../compenents/Util/swalAlerts';
import jsonParse from '../../compenents/Util/jsonParse';
const DoctorsList = () => {
    document.title= 'Doctors';
    const [scheduledAppointments, setScheduledAppointments] = useState(jsonParse('scheduledAppointments'));
    const [availableAppointments, setAvailableAppointments] = useState(jsonParse('availableAppointments'));
    const [doctorsAppointments, setDoctorsAppointments] = useState(jsonParse('doctorsAppointments'));
    const [doctorNames, setDoctorsNames] = useState(jsonParse('doctorsNames'));
    const doctors = Array.from(new Set(doctorNames.map(appointment => appointment.label)));
    const handleClickDelete = (params) => {
        SwalAlerts('appointmentDelete', params, handleDeleteAppointments(params.row.doctor))
    }
    const columns = [
        { field: 'doctor', headerName: 'Doctor', flex: 1, minWidth: 150 },
        {
            field: 'action',
            headerName: 'Delete Appointments',
            flex: 0.5,
            minWidth: 200,
            renderCell: (params) => (
                <IconButton
                    onClick={() => handleClickDelete(params)}
                    color="secondary">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    const rows = doctors.map((doctor, index) => ({
        id: index + 1,
        doctor: doctor,
    }));

    const handleDeleteAppointments = (selectedDoctorName) => {
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
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </div>
    );
};

export default DoctorsList;
