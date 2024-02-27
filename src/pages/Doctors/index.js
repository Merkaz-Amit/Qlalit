import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import Doctors from '../../compenents/doctors';
import Swal from 'sweetalert2';
const DoctorsList = () => {
    const [scheduledAppointments, setScheduledAppointments] = useState(JSON.parse(localStorage.getItem('scheduledAppointments')) || []);
    const [availableAppointments, setAvailableAppointments] = useState(JSON.parse(localStorage.getItem('availableAppointments')) || []);

    const doctors = Array.from(new Set(Doctors.map(appointment => appointment.label)));

    const columns = [
        { field: 'doctor', headerName: 'Doctor', flex: 1, minWidth: 150 },
        {
            field: 'action',
            headerName: 'Delete Appointments',
            flex: 0.5,
            minWidth: 200,
            renderCell: (params) => (
                <IconButton
                    onClick={() => Swal.fire({
                        title: ("Delete all appointments assigned to this doctor?"),
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: ("Appointments have been deleted!"),
                                icon: "success",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "close",
                                allowOutsideClick: false,
                                allowEscapeKey: false,

                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        handleDeleteAppointments(params.row.doctor)
                                    }
                                })
                        }
                    })
                    }
                    color="secondary"
                >
                    <DeleteIcon />
                </IconButton >
            ),
        },
    ];

    const rows = doctors.map((doctor, index) => ({
        id: index + 1,
        doctor: doctor,
    }));

    const handleDeleteAppointments = (doctor) => {
        // Remove appointments associated with the selected doctor
        const updatedScheduledAppointments = scheduledAppointments.filter(appointment => appointment.selectedDoctor !== doctor);
        setScheduledAppointments(updatedScheduledAppointments);
        localStorage.setItem('scheduledAppointments', JSON.stringify(updatedScheduledAppointments));

        // Remove doctor's appointments from available appointments
        const updatedAvailableAppointments = availableAppointments.filter(appointment => appointment.doctor !== doctor);
        setAvailableAppointments(updatedAvailableAppointments);
        localStorage.setItem('availableAppointments', JSON.stringify(updatedAvailableAppointments));

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
