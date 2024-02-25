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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
const tomorrow = dayjs().add(1, 'day');
const specialties = [
  {
    value: '',
    label: 'Select The Treatment That You Desire',
  },
  {
    value: 'Skin',
    label: 'Skin',
  },
  {
    value: 'Bones',
    label: 'Bones',
  },
  {
    value: 'Brain',
    label: 'Brain',
  },
];
function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    medicalHelp: '',
    reason: '',
    selectedDate: null
  });


  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleDateChange = (date) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const saveDataToLocalStorage = JSON.parse(localStorage.getItem('formData')) || []; 
    const updatedAppointments = Array.isArray(saveDataToLocalStorage) ? [...saveDataToLocalStorage, formData] : [formData];
    localStorage.setItem('formData', JSON.stringify(updatedAppointments));
    console.log(formData);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px' }}>
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
          //id="age"
          name="age"
          label="Age"
          type='number'
          value={formData.age = formData.age>=1 ? formData.age: 1}
          onChange={handleInputChange}
          margin="normal"
          required
          fullWidth
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-simple-select-label">Med Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="medicalHelp"
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
          <DateTimePicker
            label="Date of appointment"
            id="meetingDate"
            minDate={tomorrow}
            value={formData.selectedDate}
            onChange={handleDateChange}
            inputFormat="yyyy-MM-dd hh:mm a"
            renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
            disablePast
          />
        </LocalizationProvider>
        <Button type= {formData.selectedDate==null? "button":"submit"} onClick={() => formData.selectedDate==null?alert('You Forgot The Date!'):null} variant="contained" fullWidth>
          Submit
        </Button>
      </form>
    
    </Box>
  );
}
document.title='New  Appointment'
export default AppointmentForm;