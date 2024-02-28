import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import Doctors from '../../compenents/doctors';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';

function DoctorsManagement() {
    document.title = 'Doctors Management';
    const [doctorsNames, setDoctorsNames] = useState(JSON.parse(localStorage.getItem('doctorsNames')) || []);
    const [scheduledAppointments, setScheduledAppointments] = useState(JSON.parse(localStorage.getItem('scheduledAppointments')) || []);
    const [availableAppointments, setAvailableAppointments] = useState(JSON.parse(localStorage.getItem('availableAppointments')) || []);
    const [doctorsAppointments, setDoctorsAppointments] = useState(JSON.parse(localStorage.getItem('doctorsAppointments')) || []);

    const doctors = Array.from(new Set(Doctors.map(appointment => appointment.label)));

    const handleAddDoctor = () => {
        Swal.fire({
            title: "Enter Doctor's Name",
            input: "text",
            inputLabel: "Doctor's Name:",
            showCancelButton: true,
            inputValidator: (value) => {
                const doctorNameList = JSON.parse(localStorage.getItem('doctorsNames')) || [];
                const newDoctor = { label: value, value: value };
                doctorNameList.push(newDoctor);
                localStorage.setItem('doctorsNames', JSON.stringify(doctorNameList));
                console.log(value);
                alert(`Dr. ${value} was added to the system!`)
            }
        });

    };

    const handleDeleteDoctor = (doctor) => {
        // Remove appointments associated with the selected doctor
        const updatedScheduledAppointments = scheduledAppointments.filter(appointment => appointment.selectedDoctor !== doctor);
        setScheduledAppointments(updatedScheduledAppointments);
        localStorage.setItem('scheduledAppointments', JSON.stringify(updatedScheduledAppointments));

        // Remove doctor's appointments from available appointments
        const updatedAvailableAppointments = availableAppointments.filter(appointment => appointment.doctor !== doctor);
        setAvailableAppointments(updatedAvailableAppointments);
        localStorage.setItem('availableAppointments', JSON.stringify(updatedAvailableAppointments));

        // Remove doctor's appointments from doctor's appointments
        const updatedDoctorsAppointments = doctorsAppointments.filter(doctor => doctor.doctor !== doctor);
        setDoctorsAppointments(updatedDoctorsAppointments);
        localStorage.setItem('doctorsAppointments', JSON.stringify(updatedDoctorsAppointments));

        // dsffffffffffffffffffffffffffffffffffffffffffffffff

        const updatedDoctorsNames = doctorsNames.filter(doctorName => doctorName.value !== doctor);
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
                    onClick={() => Swal.fire({
                        title: ("Delete  this doctor?"),
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: ("Doctor was deleted!"),
                                icon: "success",
                                confirmButtonColor: "#d33",
                                confirmButtonText: "close",
                                allowOutsideClick: false,
                                allowEscapeKey: false,

                            })
                                .then((result) => {
                                    if (result.isConfirmed) {
                                        handleDeleteDoctor(params.row.doctor)
                                    }
                                })
                        }
                    })
                    }
                    color="secondary">

                    <DeleteIcon />
                </IconButton >
            )
        }
    ]

    const rows = doctors.map((doctor, index) => ({
        id: index + 1,
        doctor: doctor,
    }));


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 800, width: '100%', textAlign: 'center' }}>
            <IconButton onClick={() => { handleAddDoctor() }}><AddIcon></AddIcon></IconButton>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={1}
                rowsPerPageOptions={[5, 10, 20]}
            />
        </Box>
    );

}
export default DoctorsManagement;
