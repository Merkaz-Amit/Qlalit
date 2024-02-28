import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';

const SearchByName = (props) => {
  document.title = 'Search Appointments';
  const [searchText, setSearchText] = useState('');
  const allAppointments = JSON.parse(localStorage.getItem('scheduledAppointments')) || [];
  const filteredData = allAppointments.map((item, index) => ({ ...item, id: index + 1 }))
    .filter(item => (item.fullName.toLowerCase() == searchText.toLowerCase()) && (item.fullName !== undefined));



  const columns = allAppointments.length > 0 ?
    Object.keys(allAppointments[0]).map(key => ({
      field: key,
      headerName: (key.charAt(0).toUpperCase() + key.slice(1)).match(/[A-Z][a-z]+|[0-9]+/g).join(" "),
      width: 150,
      flex: 1
    }))
    : [];


  return (
    <div className="datagrid-style">
      <h1>Search By Name</h1>
      <TextField
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        fullWidth
        style={{ marginBottom: '20px' }}
      />
      <div style={{ height: 400, width: '100%' }}>
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

export default SearchByName;
