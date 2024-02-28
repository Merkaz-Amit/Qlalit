import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import Doctors from '../../compenents/doctors';
import { DataGrid } from '@mui/x-data-grid';

const AppointmentsByDoctorChart = () => {
    document.title = 'Doctors Chart';
    const [scheduledAppointments, setScheduledAppointments] = useState(JSON.parse(localStorage.getItem('scheduledAppointments')) || []);
    const [availableAppointments, setAvailableAppointments] = useState(JSON.parse(localStorage.getItem('availableAppointments')) || []);
    const [doctorName, setDoctorName] = useState('');

    const appointmentsCount = Doctors.map(doctor => {
        const scheduledCount = scheduledAppointments.filter(appointment => appointment.selectedDoctor === doctor.value).length;
        const availableCount = availableAppointments.filter(appointment => appointment.doctor === doctor.value).length;
        return {
            doctor: doctor.label,
            count: scheduledCount + availableCount
        };
    });
    const handleClick = (event, itemIdentifier, item) => {
        setDoctorName(item.label);
    };

    const data = appointmentsCount.map(doctor => ({
        label: doctor.doctor,
        value: doctor.count
    }));
    const allAppointments = JSON.parse(localStorage.getItem('doctorsAppointments')) || [];

    const filteredData = allAppointments.map((item, index) => ({ ...item, id: index + 1 }))
        .filter(item => item.doctor == doctorName);



    const columns = allAppointments.length > 0 ?
        Object.keys(allAppointments[0]).map(key => ({
            field: key,
            headerName: (key.charAt(0).toUpperCase() + key.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(" "),
            width: 150,
            flex: 1
        }))
        : [];
    return (
        <>
            <Box>
                <center> <h2 >Appointments by Doctor</h2></center>
                <PieChart
                    series={[
                        {
                            data: data,
                        },
                    ]}
                    onClick={handleClick}
                    width={1800}
                    height={350}
                    slotProps={{
                        legend: { hidden: true },
                    }}
                />
            </Box>
            <DataGrid
                rows={filteredData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                checkboxSelection
            />
        </>
    );
};

export default AppointmentsByDoctorChart;
