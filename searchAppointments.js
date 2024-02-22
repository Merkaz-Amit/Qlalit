// import * as React from 'react';
// import Box from '@mui/material/Box';
// import { DataGrid } from '@mui/x-data-grid';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import { alpha } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import { useState}
// //const [selected, setSelected] = React.useState([]);

// // const handleClick = (event, id) => {
// //     const selectedIndex = selected.indexOf(id);
// //     let newSelected = [];

// //     if (selectedIndex === -1) {
// //       newSelected = newSelected.concat(selected, id);
// //     } else if (selectedIndex === 0) {
// //       newSelected = newSelected.concat(selected.slice(1));
// //     } else if (selectedIndex === selected.length - 1) {
// //       newSelected = newSelected.concat(selected.slice(0, -1));
// //     } else if (selectedIndex > 0) {
// //       newSelected = newSelected.concat(
// //         selected.slice(0, selectedIndex),
// //         selected.slice(selectedIndex + 1),
// //       );
// //     }
// //     setSelected(newSelected);
// //   };
// function EnhancedTableToolbar(props) {
//     const { numSelected } = props;
  
//     return (
//       <Toolbar
//         sx={{
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//           ...(numSelected > 0 && {
//             bgcolor: (theme) =>
//               alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//           }),
//         }}
//       >
//         {numSelected > 0 ? (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             color="inherit"
//             variant="subtitle1"
//             component="div"
//           >
//             {numSelected} selected
//           </Typography>
//         ) : (
//           <Typography
//             sx={{ flex: '1 1 100%' }}
//             variant="h6"
//             id="tableTitle"
//             component="div"
//           >
//             Nutrition
//           </Typography>
//         )}
  
//         {numSelected > 0 ? (
//           <Tooltip title="Delete">
//             <IconButton>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         ) : (
//           <Tooltip title="Filter list">
//             <IconButton>
//               <FilterListIcon />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Toolbar>
//     );
//   }
  
// const columns = [
//     {
//         field: 'date',
//         headerName: 'date',
//         width: 90
//     },
//     {
//         field: 'firstName',
//         headerName: 'First name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'lastName',
//         headerName: 'Last name',
//         width: 150,
//         editable: true,
//     },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 110,
//         editable: true,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// export default function DataGridDemo() {
//     return (
//         <Box sx={{ height: 400, width: '100%' }}>
//             <EnhancedTableToolbar/>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{
//                     pagination: {
//                         paginationModel: {
//                             pageSize: 5,
//                         },
//                     },
//                 }}
//                 pageSizeOptions={[5]}
//                 checkboxSelection
//                 disableRowSelectionOnClick
//             />
//         </Box>
//     );
// }