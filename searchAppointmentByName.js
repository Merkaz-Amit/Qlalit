var React = require('react');
var Griddle = require('griddle-react').default;
var LocalPlugin = require('griddle-react').plugins.LocalPlugin;

const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <div>
    <Filter />
    <Table />
    <Pagination />
  </div>
);

const allAppointments = JSON.parse(localStorage.getItem('formData')) || [];

const SearchByName = (props) => {
  document.title = 'Search By Name'
  return (
    <div className="datagrid-style">
      <h1>Search By Name</h1>
      <Griddle
        data={allAppointments}
        plugins={[LocalPlugin]}
        components={{ Layout: NewLayout }}
        styleConfig={{
          styles: {
            Table: {
              border: '1px solid #ccc',
              borderRadius: '6px',
              fontFamily: 'Inter',
              fontSize: '18px',
              width: '100%',
              backgroundColor: "#f5f5f5",
            },
            TableHeadingCell: {
              backgroundColor: '#d9534f',
              color: '#fff',
              fontWeight: 'bold',
              padding: '12px',
              textAlign: 'center',
            },
            TableBodyRow: {
              transition: 'background-color 0.3s ease',
            },
            TableBody: {
              borderBottom: '1px solid #ccc',
              padding: '20px',
              fontSize: '35px',
              textAlign: 'center'
            },
            Pagination: {
              textAlign: 'center',
              marginTop: '30px',
            },
          },
        }}
      />
    </div>
  );
}

export default SearchByName;