import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField'; // Import TextField from Material-UI
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; // Ensure to import the locale you want to use
import specialties from '../../compenents/specialties';

function WorkingDays() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMedicalType, setSelectedMedicalType] = useState('');

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleMedicalTypeChange = (event) => {
        setSelectedMedicalType(event.target.value);
    };

    const handleSubmit = () => {
        // Save selected date and medical type to local storage
        const workDays = JSON.parse(localStorage.getItem('workDays')) || [];
        const newWorkDay = { date: selectedDate.format(), medicalType: selectedMedicalType };
        workDays.push(newWorkDay);
        localStorage.setItem('workDays', JSON.stringify(workDays));

        // Show success message
        Swal.fire({
            title: 'Success!',
            text: 'The working day was added!',
            icon: 'success',
        });
    };

    return (
        <div>
            <h2>Add Working Day</h2>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale="en">
                <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
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
            <Button onClick={handleSubmit} variant="contained" color="primary">
                Submit
            </Button>
        </div>
    );
}

export default WorkingDays;
