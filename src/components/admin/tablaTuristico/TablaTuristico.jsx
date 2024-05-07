import './tablaTuristico.scss'
import { DataGrid } from '@mui/x-data-grid';
import FormTuristicoEdit from '../Formularios/formTuristicosEdit/FormTuriscoEdit';

//Borrador para que las tablas tengan data en lo que les paso data
const columns = [
  { field: 'id', headerName: 'ID', width: 100, headerClassName: 'custom-header' },
  { field: 'firstName', headerName: 'First name', width: 230, headerClassName: 'custom-header' },
  { field: 'lastName', headerName: 'Last name', width: 230, headerClassName: 'custom-header' },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
    headerClassName: 'custom-header'
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    headerClassName: 'custom-header',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 120,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];


//ejemplo de data 
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const TablaTuristico = () => {

  const actionColumn = [
    {
      field: 'accion',
      headerName: 'Acción',
      width: 162,
      renderCell: () => (
        <div className="cellAction">
          <FormTuristicoEdit />
        </div>
      ),
    },
  ];
  
  
  return (
    <div style={{ height: 400, width: '72vw', margin: '1rem', backgroundColor: '#212121' }}>
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          color: 'white',
          borderColor: '#212121',
          borderRadius: '10px',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#212123',
            color: 'white',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
          },
        }}
        getRowId={(row) => row.id}
      />
    </div>
  );
}

export default TablaTuristico