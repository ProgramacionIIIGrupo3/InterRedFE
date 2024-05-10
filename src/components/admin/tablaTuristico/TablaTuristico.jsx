import './tablaTuristico.scss'
import { DataGrid } from '@mui/x-data-grid';
import {  Box, Button, Drawer } from '@mui/material';
import FormTuristicoEdit from '../Formularios/formTuristicosEdit/FormTuriscoEdit';
import { GetLugaresTuristicos, DeleteLugarTuristico } from '../../../services/admin/lugarTuristicoService';
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
  const [lugaresTuristicosEditar, setLugaresTuristicosEditar] = useState(null);
  const [open, setOpen] = useState(false);


    // UseEffect para cargar los departamentos
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



        // Funcion para abrir el formulario de edicion
        const handleOpenEdit = (lugaresTuristicos) => {
          console.log("que tiene este lugar?", lugaresTuristicos)
          setLugaresTuristicosEditar(lugaresTuristicos);
          setOpen(true);
        }

        // Funcion para cerrar el formulario de edicion
        const handleClose = () => {
          setOpen(false);
          setLugaresTuristicosEditar(null);
        };

        const handleDelete = async (id) => {
          const result = await DeleteLugarTuristico(id);
          if (!result.error) {
            setRows(prevRows => prevRows.filter(row => row.id !== id));
          } else {
            console.error("Error al eliminar el lugar turistico", result.message);
          }
        }

        const recargarLugares = async () => {
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
        }


  const actionColumn = [
    {
      field: 'accion',
      headerName: 'Acción',
      width: 180,
      renderCell: (params) => (
<> 
<Button
            onClick={() => handleOpenEdit(params.row)}
            sx={{
              display: 'inline-flex',
              padding: '5px 10px',
              marginRight: '8px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              border: '2px dashed #729627',
              color: '#729627',
              fontSize: '12px',
              '&:hover': {
                backgroundColor: '#729627', 
              },
            }}
          >
            Edit
          </Button>
          <Button  
            onClick={() => handleDelete(params.row.id)}
            sx={{
              display: 'inline-flex',
              padding: '5px 10px',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              border: '2px dashed #EE1E1E',
              color: '#EE1E1E',
              fontSize: '12px',
              '&:hover': {
                backgroundColor: '#EE1E1E', 
              },
            }} 
          >
            Delete
          </Button>
</>
        
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
          '& .MuiTablePagination-root': {
            color: 'white', 
          },

        }}
        getRowId={(row) => row.id}
      />
            {lugaresTuristicosEditar && (
        <FormTuristicoEdit
          lugaresTuristicosEditar={lugaresTuristicosEditar}
          onClose={handleClose}
          recargarLugares={recargarLugares}
        />
      )}
    </div>
  );
}

export default TablaTuristico