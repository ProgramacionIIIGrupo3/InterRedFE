import './tablaMunicipio.scss'
import { DataGrid } from '@mui/x-data-grid';
import {  Box, Button, Drawer } from '@mui/material';
import FormMunicipioEdit from '../Formularios/formMunicipioEdit/FormMunicipioEdit';
import { GetMunicipios, DeleteMunicipio } from '../../../services/admin/municipioService';
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
  const [open, setOpen] = useState(false);
  const [municipioEditar, setMunicipioEditar] = useState(null);
  
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

  // UseEffect para cargar los municipios
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

    // Solo si ya se cargaron los departamentos
    if (Object.keys(departamentos).length > 0){
      fetchMunicipios();
    }
  }, [departamentos]);

  // Función para abrir el formulario de edición
  const handleOpenEdit = (municipio) => {
    setMunicipioEditar(municipio);
    setOpen(true);
  };

  // Función para cerrar el formulario de edición
  const handleClose = () => {
    setOpen(false);
    setMunicipioEditar(null);
  };

  // Función para eliminar un municipio
  const handleDelete = async (id) => {
    const result = await DeleteMunicipio(id);
    if (!result.error) {
      setRows(prevRows => prevRows.filter(row => row.id !== id));
    } else {
      console.error('Error al eliminar municipio', result.message);
    }
  };
 
// Función para recargar los municipios
const recargarMunicipios = async () => {
  const result = await GetMunicipios();
  if (!result.error) {
    setRows(result.data.map((item, index) => ({
      id: item.id,
      seqId: index + 1,
      nombre: item.nombre,
      poblacion: item.poblacion,
      departamento: departamentos[item.idDepartamento] || "Desconocido",
    })));
  }
};


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
          '& .MuiDataGrid-filler': {
            backgroundColor: '#212123', 
          },
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
{municipioEditar && (
  <FormMunicipioEdit
    municipioEditar={municipioEditar}
    onClose={handleClose}
    recargarMunicipios={recargarMunicipios}
  />
)}

    </div>
  );
};


export default TablaMunicipio