import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const SearchAppointments = (props) => {
  const [searchText, setSearchText] = useState('');
  const allAppointments = JSON.parse(localStorage.getItem('formData')) || [];

  const filteredData = allAppointments.map((item, index) => ({ ...item, id: index + 1 }))
    .filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchText.toLowerCase())
      )&&
      item.fullName!==undefined
    );

  const columns = allAppointments.length > 0 ? 
    Object.keys(allAppointments[0]).map(key => ({
      field: key,
      headerName: key === 'fullName' ? 'Full Name' : key.charAt(0).toUpperCase() + key.slice(1),
      width: 150,
      flex: 1
    })) 
    : [];

    columns.forEach(column => {
      if (column.field === 'fullName') {
        column.headerName = 'Full Name';
      }
      if (column.field === 'medicalHelp') {
        column.headerName = 'Medical Help';
      }
      if (column.field === 'selectedDate') {
        column.headerName = 'Selected Date And Hour';
      }
    });
  return (
    <div className="datagrid-style">
      <h1>Search Appointments</h1>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default SearchAppointments;
