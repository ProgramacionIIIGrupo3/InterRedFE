import { DataGrid } from '@mui/x-data-grid';
import FormDepartamentoEdit from '../Formularios/formDepartamentoEdit/FormDepartamentoEdit';
import { GetDepartamentos } from '../../../services/admin/departamentoService';
import { GetMunicipios } from '../../../services/admin/municipioService';
import { useEffect, useState } from 'react';


//Borrador para que las tablas tengan data en lo que les paso data
const columns = [
  { field: 'seqId', headerName: '#', width: 50, headerClassName: 'custom-header' },
  { field: 'nombre', headerName: 'Nombre', width: 230, headerClassName: 'custom-header' },
  { field: 'cabecera', headerName: 'Cabecera', width: 230, headerClassName: 'custom-header' },
  {
    field: 'poblacionTotal',
    headerName: 'Poblacion',
    width: 90,
    headerClassName: 'custom-header'
  },
];


const Tabla = () =>{
  const [rows, setRows] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const result = await GetDepartamentos();
      if (!result.error) {
        let counter = 1;
        setRows(result.data.map(item => ({ // Asegúrate de mapear correctamente los datos
          id: item.id,
          seqId: counter++,
          nombre: item.nombre,
          cabecera: municipios[item.idCabecera] || "Desconocido",
          poblacionTotal: item.poblacionTotal,
        })));
      }
    };

    if (Object.keys(municipios).length > 0){
      fetchDepartamentos();
    }
  }, [municipios]);

  useEffect(() => {
    //cargar mwunicipios (cabeceras)
    const fetchMunicipios = async () => {
      const result = await GetMunicipios();
      if (!result.error) {
        const municipios = result.data.reduce((acc, item) => {
          acc[item.id] = item.nombre;
          return acc;
        }, {});
        setMunicipios(municipios);
      }
    };
    fetchMunicipios();
  }, []);



  const actionColumn = [
    {
      field: 'accion',
      headerName: 'Acción',
      width: 162,
      renderCell: () => (
        <div className="cellAction">
          <FormDepartamentoEdit  />
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

export default Tabla