import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

const AvailableDates = () => {
  document.title = 'Available Dates';
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('availableAppointments')) || []);
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();
  const totalDaysInMonth = dayjs().daysInMonth();

  const dates = [];
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const currentDate = dayjs(`${currentYear}-${currentMonth + 1}-${i}`);
    if (currentDate.isAfter(dayjs(), 'day')) {
      dates.push(currentDate);
    }
  }

  const takenDates = formData.map(appointment => dayjs(appointment.date).format('YYYY-MM-DD'));

  const availableDates = dates.filter(date => takenDates.includes(date.format('YYYY-MM-DD')));

  const rows = availableDates.map((date, index) => ({
    id: index + 1,
    date: date.format('YYYY-MM-DD'),
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
    <div style={{ height: 400, width: '100%' }}>
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
