import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import jsonParse from '../../compenents/Util/jsonParse';
import TimeFormat from '../../compenents/Util/timeFormat';

const AvailableDates = () => {
  document.title = 'Available Dates';
  const [formData, setFormData] = useState(jsonParse('availableAppointments'));
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();
  const totalDaysInMonth = ((dayjs().daysInMonth())+((dayjs().daysInMonth(currentMonth+1))));

  const dates = [];
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const currentDate = dayjs(`${currentYear}-${currentMonth + 1}-${i}`);
    if (currentDate.isAfter(dayjs(), 'day')) {
      dates.push(currentDate);
    }
  }


  const takenDates = formData.map(appointment => TimeFormat(appointment.date));

  const availableDates = dates.filter(date => takenDates.includes(TimeFormat(date)));

  const rows = availableDates.map((date, index) => ({
    id: index + 1,
    date: TimeFormat(date),
  }));

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 150 },
    {
      field: 'action',
      headerName: 'Set Date Unavailable',
      flex: 0.5,
      minWidth: 100,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDeleteDate(params.row.date)}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleDeleteDate = (date) => {
    const updatedFormData = [...formData, { date: date }];
    setFormData(updatedFormData);
    localStorage.setItem('availableAppointments', JSON.stringify(updatedFormData));
  };

  return (
    <div style={{ height: 770, width: '100%', fontFamily: 'Inter' }}>
    <center><h1>Available dates in the next 60 days:</h1></center>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
      />
    </div>
  );
};

export default AvailableDates;
