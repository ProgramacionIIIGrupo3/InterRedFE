import './tablaMunicipio.scss'
import { DataGrid } from '@mui/x-data-grid';
import FormMunicipioEdit from '../Formularios/formMunicipioEdit/FormMunicipioEdit';
import { GetMunicipios } from '../../../services/admin/municipioService';
import { GetDepartamentos } from '../../../services/admin/departamentoService';
import { useEffect, useState } from 'react';


//Borrador para que las tablas tengan data en lo que les paso data
const columns = [
  { field: 'seqId', headerName: '#', width: 50, headerClassName: 'custom-header' },
  { field: 'nombre', headerName: 'Nombre', width: 230, headerClassName: 'custom-header' },
  { field: 'poblacion', headerName: 'Poblacion', width: 230, headerClassName: 'custom-header' },
  {
    field: 'departamento',
    headerName: 'Departamento',
    width: 230,
    headerClassName: 'custom-header'
  },
];

const TablaMunicipio = () => {
  const [rows, setRows] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);

  useEffect(() => {
    const fetchMunicipios = async () => {
      const result = await GetMunicipios();
      if (!result.error) {
        let counter = 1;
        setRows(result.data.map(item => ({ // Asegúrate de mapear correctamente los datos
          id: item.id,
          seqId: counter++,
          nombre: item.nombre,
          poblacion: item.poblacion,
          departamento: departamentos[item.idDepartamento] || "Desconocido",
        })));
      }
    };

    if (Object.keys(departamentos).length > 0){
      fetchMunicipios();
    }
  }, [departamentos]);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      const result = await GetDepartamentos();
      if (!result.error) {
        const departamentos = result.data.reduce((acc, item) => {
          acc[item.id] = item.nombre;
          return acc;
        }, {});
        setDepartamentos(departamentos);
      }
    };
    fetchDepartamentos();
  }, []);

  const actionColumn = [
    {
      field: 'accion',
      headerName: 'Acción',
      width: 162,
      renderCell: (params) => (
        <FormMunicipioEdit municipioId={params.row.id} onEditar={handleEditar} />
      ),
    },
  ];
  

  const handleEditar = (municipio) => {
    setMunicipioEditar(municipio);
    onEditar(municipio); // <-- Llamar a la función onEditar aquí
    setOpen(true);
  };

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
};

export default TablaMunicipio