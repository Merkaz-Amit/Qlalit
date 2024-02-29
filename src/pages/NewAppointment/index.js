import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import specialties from '../../compenents/Util/specialties';
import jsonParse from '../../compenents/Util/jsonParse';
import swalAlerts from '../../compenents/Util/swalAlerts';
import TimeFormat from '../../compenents/Util/timeFormat';

function AppointmentForm() {
    document.title = 'New Appointment';
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        medicalHelp: '',
        reason: '',
        selectedDate: null,
        doctor: null
    });
    const doctorList = jsonParse('doctorsAppointments');
    const [takenDates, setTakenDates] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);

    useEffect(() => {
        const savedFormData = localStorage.getItem('scheduledAppointments');
        if (savedFormData) {
            setFormData(JSON.parse(savedFormData));
        }

        const savedAppointments = jsonParse('availableAppointments');
        const dates = savedAppointments.map(appointment => TimeFormat(appointment.date));
        setTakenDates(dates);

        const today = dayjs().startOf('day');
        const futureDates = savedAppointments.filter(appointment => dayjs(appointment.date).isAfter(today));
        setAvailableDates(futureDates);
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        const selectedDoctorName = (doctorList.filter(doctor => TimeFormat(doctor.date) === TimeFormat(date))[0]).doctor;
        setFormData({ ...formData, selectedDate: TimeFormat(date), doctor: selectedDoctorName });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        const saveDataToLocalStorage = jsonParse('scheduledAppointments');
        const updatedAppointments = Array.isArray(saveDataToLocalStorage) ? [...saveDataToLocalStorage, formData] : [formData];
        localStorage.setItem('scheduledAppointments', JSON.stringify(updatedAppointments));

        const updatedAvailableDates = availableDates.filter(appointment => !dayjs(appointment.date).isSame(formData.selectedDate, 'day'));
        localStorage.setItem('availableAppointments', JSON.stringify(updatedAvailableDates));
        swalAlerts('appointmentFormSubmission')
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px' }} onChange={handleInputChange}>
                <TextField
                    id="fullName"
                    name="fullName"
                    label="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    pattern="[a-z]"
                    type="text"
                    fullWidth
                />
                <span class="validity"></span>
                <TextField
                    name="age"
                    label="Age"
                    type='number'
                    value={formData.age = formData.age >= 1 ? formData.age : ''}
                    onChange={handleInputChange}
                    placeholder='Age'
                    margin="normal"
                    required
                    fullWidth
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="demo-simple-select-label">Med Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        name="medicalHelp"
                        value={formData.medicalHelp}
                        label="Med Type"
                        onChange={handleInputChange}
                        required
                    >
                        {specialties.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="reason"
                    name="reason"
                    label="Reason for searching Medical Help"
                    value={formData.reason}
                    onChange={handleInputChange}
                    margin="normal"
                    required
                    fullWidth
                    multiline
                    rows={4}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date of appointment"
                        id="meetingDate"
                        minDate={dayjs().startOf('day')}
                        value={formData.selectedDate}
                        onChange={handleDateChange}
                        inputFormat="yyyy-MM-dd"
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                        disablePast
                        shouldDisableDate={(day) => !takenDates.includes(TimeFormat(day)) || day.isBefore(dayjs().startOf('day'))}
                    />
                </LocalizationProvider>
                <Button type={formData.selectedDate == null ? "button" : "submit"} onClick={() => formData.selectedDate == null ? alert('You Forgot To Add A Date!') : null} variant="contained" fullWidth>
                    Submit
                </Button>
            </form>
        </Box>
    );
}

export default AppointmentForm;
