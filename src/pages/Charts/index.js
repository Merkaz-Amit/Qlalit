import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import jsonParse from '../../compenents/Util/jsonParse';

const AppointmentsByDoctorChart = () => {
    document.title= 'Doctors Chart';
    const [doctorAppointments, setDoctorAppointments] = useState(jsonParse('availableAppointments'));
    const [doctorList, setDoctorList] = useState(jsonParse('doctorsNames'));
    const [doctorName, setDoctorName] = useState('');

    const appointmentsCount = doctorList.map(doctor => {
        const count=doctorAppointments.filter(appointment => appointment.doctor === doctor.value).length;
        return {
            doctor: doctor.label,
            count: count
        };
    });

    const handleClick = (event, itemIdentifier, item) => {
        setDoctorName(item.label);
      };

    const data = appointmentsCount.map(doctor => ({
        label: doctor.doctor,
        value: doctor.count
    }));

    const filteredData = doctorAppointments.map((item, index) => ({ ...item, id: index + 1 })).filter(item => item.doctor== doctorName)==''?
      doctorAppointments.map((item, index) => ({ ...item, id: index + 1 })):
      doctorAppointments.map((item, index) => ({ ...item, id: index + 1 })).filter(item => item.doctor== doctorName);
  
    const columns = doctorAppointments.length > 0 ? 
      Object.keys(doctorAppointments[0]).map(key => ({
        field: key,
        headerName: key,
        width: 150,
        flex: 1
      })) : [];

    return (
        <>
          <Box sx={{fontFamily: 'Inter'}}>
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
          
        />
        </>
    );
};

export default AppointmentsByDoctorChart;
