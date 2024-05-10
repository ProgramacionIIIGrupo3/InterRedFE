import { DataGrid } from '@mui/x-data-grid';
import {  Box, Button, Drawer } from '@mui/material';
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
  const [departamentoEditar, setDepartamentoEditar] = useState(null);
  const [open, setOpen] = useState(false);

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

// Funcion para abrir el formulario de edicion
const handleOpenEdit = (departamento) => {
  setDepartamentoEditar(departamento);
  setOpen(true);
  };

  // Funcion para cerrar el formulario de edicion
  const handleClose = () => {
    setOpen(false);
    setDepartamentoEditar(null);
  };

  // Funcion para recargar los departamentos
  const recargarDepartamentos = async () => {
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
  }

  const actionColumn = [
    {
      field: 'accion',
      headerName: 'Acción',
      width: 162,
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
        }}
        getRowId={(row) => row.id}
      />
      {departamentoEditar && (
        <FormDepartamentoEdit
          departamentoEditar={departamentoEditar}
          onClose={handleClose}
          recargarDepartamentos={recargarDepartamentos}
        />
      )}

    </div>
  );
}

export default Tabla