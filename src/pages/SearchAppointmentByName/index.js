import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import { Box } from '@mui/material';
import jsonParse from '../../compenents/Util/jsonParse';

const SearchByName = (props) => {
  document.title = 'Search Appointments';
  const [searchText, setSearchText] = useState('');
  const allAppointments = jsonParse('scheduledAppointments');
  const filteredData = allAppointments.map((item, index) => ({ ...item, id: index + 1 }))
    .filter(item => (item.fullName.toLowerCase().includes(searchText.toLowerCase())));

  const columns = [
    { field: 'fullName', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 0.5 },
    { field: 'medicalHelp', headerName: 'Medical Help', flex: 1 },
    { field: 'reason', headerName: 'Reason', flex: 1 },
    { field: 'selectedDate', headerName: 'Selected Date', flex: 1 },
    { field: 'doctor', headerName: 'Doctor', flex: 1 },
  ];

  return (
    <div>
      <Box fullWidth
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100px',
          padding: '50px',
          fontFamily: 'Inter',
          alignContent: 'center',
          fullWidth: true,
          textAlign: 'center'
        }}>
        <h1>Search By Name</h1>
        <TextField
          label="Name"
          variant="outlined"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          fullWidth
          style={{ marginBottom: '20px' }}
        />


      </Box>
      <Box sx={{ maxHeight: '650px', height: '650px' }}>
        <DataGrid
          rows={filteredData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          fullWidth

        /></Box>

    </div>
  );
};

export default SearchByName;
