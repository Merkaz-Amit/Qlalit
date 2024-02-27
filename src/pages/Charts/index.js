import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Doctors from '../../compenents/doctors';

const DoctorsChart = () => {
    const allAppointments = JSON.parse(localStorage.getItem('scheduledAppointments')) || [];
    const fields = [];
    for (let i = 0; i <= Doctors.length; i++) { //run through the list of doctors
        const currentDoctor = allAppointments.filter(doctorName => doctorName.selectedDoctor===(Doctors[i]))
        fields.push({id: i, value: (currentDoctor.length), label: currentDoctor.doctor});
        console.log("COUNT ", i.label);
        console.log(i);
        console.log(((Doctors)[i]).value);
        //const selectedDoctorName = (doctorList.filter(doctor => dayjs(doctor.date).format('YYYY-MM-DDT') === dayjs(date).format('YYYY-MM-DDT'))[0]).doctor;

        //console.log("NAME ", (Doctors[i]).doctor);
    }
    return (
        <PieChart
            series={[
                {
                    data: fields,
                },
            ]}
            width={400}
            height={200}
        />
    );
}
export default DoctorsChart;