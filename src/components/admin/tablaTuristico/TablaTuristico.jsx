import './tablaTuristico.scss'
import { DataGrid } from '@mui/x-data-grid';
import FormTuristicoEdit from '../Formularios/formTuristicosEdit/FormTuriscoEdit';
import { GetLugaresTuristicos } from '../../../services/admin/lugarTuristicoService';
import { GetDepartamentos } from '../../../services/admin/departamentoService';
import { GetMunicipios} from '../../../services/admin/municipioService';
import { useEffect, useState } from 'react';

//Borrador para que las tablas tengan data en lo que les paso data
const columns = [
  { field: 'seqId', headerName: '#', width: 50, headerClassName: 'custom-header' },
  // { field: 'id', headerName: 'ID', width: 50, headerClassName: 'custom-header' },
  { field: 'nombre', headerName: 'Nombre', width: 220, headerClassName: 'custom-header' },
  { field: 'departamento', headerName: 'Departamento', width: 220, headerClassName: 'custom-header' },
  {
    field: 'municipio',
    headerName: 'Municipio',
    width: 220,
    headerClassName: 'custom-header'
  },
  {
    field: 'valoracion',
    headerName: 'Valoración',
    headerClassName: 'custom-header',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 100,
    valueGetter: (params) => params && params.row ? (params.row.calificaciones ? params.row.calificaciones : 'N/A') : 'N/A'
  },
];



const TablaTuristico = () => {
  const [rows, setRows] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    const fetchLugaresTuristicos = async () => {
        const result = await GetLugaresTuristicos();
        if (!result.error) {
          let counter = 1;
          setRows(result.data.map(item => ({ // Asegúrate de mapear correctamente los datos
            id: item.id,
            seqId: counter++,
                nombre: item.nombre,
                departamento: departamentos[item.idDepartamento] || "Desconocido",
                municipio: municipios[item.idMunicipio] || "Desconocido",
                calificaciones: item.calificaciones
              })));
            }
          };
        
          if (Object.keys(departamentos).length > 0 && Object.keys(municipios).length > 0){
            fetchLugaresTuristicos();
          }
        }, [departamentos, municipios]);

        useEffect(() => {
          // Cargar departamentos
          const fetchDepartamentos = async () => {
            const response = await GetDepartamentos();
            if (!response.error) {
              const depMap = {};
              response.data.forEach(dep => {
                depMap[dep.id] = dep.nombre;
              });
              setDepartamentos(depMap);
            }
          };
        
          fetchDepartamentos();
        }, []);

        useEffect(() => {
          // Cargar municipios
          const fetchMunicipios = async () => {
            const response = await GetMunicipios();
            if (!response.error) {
              const munMap = {};
              response.data.forEach(mun => {
                munMap[mun.id] = mun.nombre;
              });
              setMunicipios(munMap);
            }
          };
        
          fetchMunicipios();
        }, []);
        
  const actionColumn = [
    {
      field: 'accion',
      headerName: 'Acción',
      width: 180,
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