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
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import specialties from '../../compenents/specialties';
import Doctors from '../../compenents/doctors';


function WorkingDays() {
    document.title = 'New Work Date';
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [selectedMedicalType, setSelectedMedicalType] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const savedAppointments = JSON.parse(localStorage.getItem('availableAppointments')) || [];
    const dates = savedAppointments.map(appointment => dayjs(appointment.date).format('YYYY-MM-DDT'));

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

        const workDays = JSON.parse(localStorage.getItem('availableAppointments')) || [];
        const doctorsAppointments = JSON.parse(localStorage.getItem('doctorsAppointments')) || [];
        let result = (selectedDate.isBefore(selectedEndDate) || selectedDate.isSame(selectedEndDate));
        let count = 1;
        while (result) {
            const newDoctorsAppointments = { date: selectedDate.add(count, 'day').format(), doctor: selectedDoctor };
            const newWorkDay = { date: selectedDate.add(count, 'day').format(), medicalType: selectedMedicalType, doctor: selectedDoctor };
            workDays.push(newWorkDay);
            doctorsAppointments.push(newDoctorsAppointments);
            count++;
            result = (selectedDate.add(count, 'day').isBefore(selectedEndDate) || selectedDate.add(count, 'day').isSame(selectedEndDate));
        }
        localStorage.setItem('doctorsAppointments', JSON.stringify(workDays));
        localStorage.setItem('availableAppointments', JSON.stringify(workDays));
        Swal.fire({
            title: 'Success!',
            text: 'This day was assigned to the doctor!',
            icon: 'success',
        });
    };

    return (
        <div>
            <h2>Add Working Day</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker
                    label="Start Date"
                    value={selectedDate}
                    id='startDate'
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="YYYY-MM-DDT"
                    disablePast
                    //maxDate={selectedEndDate}
                    shouldDisableDate={(day) => dates.includes(day.format('YYYY-MM-DDT')) || day.isBefore(dayjs().startOf('day'))}

                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker
                    label="End Date"
                    value={selectedEndDate}
                    id='endDate'
                    onChange={handleEndDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    inputFormat="YYYY-MM-DDT"
                    disablePast
                    //minDate={selectedDate}
                    shouldDisableDate={(day) => dates.includes(day.format('YYYY-MM-DDT')) || day.isBefore(dayjs().startOf('day'))}

                />
            </LocalizationProvider>
            <FormControl fullWidth>
                <InputLabel id="medical-type-label">Medical Type</InputLabel>
                <Select
                    labelId="medical-type-label"
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
            <FormControl fullWidth>
                <InputLabel id="doctor-label" margin='1'>Doctor</InputLabel>
                <Select
                    labelId="doctor-label"
                    value={selectedDoctor}
                    onChange={handleDoctorChange}
                >
                    {Doctors.map((doctors) => (
                        <MenuItem key={doctors.value} value={doctors.value}>
                            {doctors.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
            </Button>
        </div>
    );
}

export default WorkingDays;
