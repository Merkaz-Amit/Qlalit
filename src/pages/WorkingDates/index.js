import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';

import 'dayjs/locale/en';
import specialties from '../../compenents/Util/specialties';
import jsonParse from '../../compenents/Util/jsonParse';
import SwalAlerts from '../../compenents/Util/swalAlerts';
import TimeFormat from '../../compenents/Util/timeFormat';

function WorkingDays() {
    document.title = 'New Work Date';
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [selectedMedicalType, setSelectedMedicalType] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const savedAppointments = jsonParse('availableAppointments');
    const doctorsAppointments = jsonParse('doctorsAppointments');
    const [doctorNames, setDoctorsNames] = useState(jsonParse('doctorsNames'));
    const dates = doctorsAppointments.map(appointment => TimeFormat(appointment.date));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };
    const handleMedicalTypeChange = (event) => {
        setSelectedMedicalType(event.target.value);
    };
    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
    };

    const handleSubmit = () => {
        let result = (selectedDate.isBefore(selectedEndDate) || selectedDate.isSame(selectedEndDate));
        let count = 1;
        while (result) {
            const newDoctorsAppointments = { date: TimeFormat(selectedDate.add(count, 'day')), doctor: selectedDoctor };
            const newWorkDay = { date: TimeFormat(selectedDate.add(count, 'day')), medicalType: selectedMedicalType, doctor: selectedDoctor };
            savedAppointments.push(newWorkDay);
            doctorsAppointments.push(newDoctorsAppointments);
            count++;
            result = (selectedDate.add(count, 'day').isBefore(selectedEndDate) || selectedDate.add(count, 'day').isSame(selectedEndDate));
        }
        localStorage.setItem('doctorsAppointments', JSON.stringify(doctorsAppointments));
        localStorage.setItem('availableAppointments', JSON.stringify(savedAppointments));
        SwalAlerts('assignDoctor');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100px', padding: '50px', fontFamily: 'Inter' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <h1>Add a new day! :D</h1>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                        label="Start Date"
                        value={selectedDate}
                        id='startDate'
                        margin='normal'
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="YYYY-MM-DD"
                        disablePast
                        maxDate={selectedEndDate}
                        shouldDisableDate={(day) => dates.includes(TimeFormat(day)) || day.isBefore(dayjs().startOf('day'))}

                    />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                    <DatePicker
                        label="End Date"
                        value={selectedEndDate}
                        id='endDate'
                        margin='normal'
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        inputFormat="YYYY-MM-DD"
                        disablePast
                        minDate={selectedDate}
                        shouldDisableDate={(day) => dates.includes(TimeFormat(day)) || day.isBefore(dayjs().startOf('day'))}

                    />
                </LocalizationProvider>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="medical-type-label">Medical Type</InputLabel>
                    <Select
                        labelId="medical-type-label"
                        margin='normal'
                        value={selectedMedicalType}
                        onChange={handleMedicalTypeChange}
                    >
                        {specialties.map((specialty) => (
                            <MenuItem key={specialty.value} value={specialty.value}>
                                {specialty.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="doctor-label" marginTop='10'>Doctor</InputLabel>
                    <Select
                        labelId="doctor-label"
                        margin='normal'
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                    >
                        {doctorNames.map((doctors) => (
                            <MenuItem key={doctors.value} value={doctors.value}>
                                {doctors.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
            </form>
        </Box>

    );
}

export default WorkingDays;
