import { Autocomplete, Box, Button, Drawer, TextField } from '@mui/material';
import './formMunicipio.scss';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const FormMunicipio = () => {
  const [formData, setFormData] = useState({
    idDepartamento: '',
    nombre: '',
    poblacion: '',
    descripcion: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleSave = () => {
    const formDataArray = Object.values(formData);
    console.log(formDataArray);
    setOpen(false);
  };

  const list = () => (
    <Box
      role="presentation"
      component="form"
      sx={{ width: 450, padding: 2, backgroundColor: '#121212', height: '100vh', '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      className="form"
    >
      <div className="container">
      <Autocomplete
            name="idDepartamento"
            onChange={(event, newValue) => {
              setFormData({
                ...formData,
                departamento: newValue,
              });
            }}
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D9D9D9',
                },
                '&:hover fieldset': {
                  borderColor: '#D9D9D9',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D9D9D9',
                },
                backgroundColor: '#292929',
              },
              '& .MuiInputLabel-root': {
                color: '#D9D9D9',
              },
              '& .MuiInputBase-input': {
                color: '#D9D9D9',
              },
            }}
            renderInput={(params) => <TextField {...params} label="Departamento:" />}
        />
        <TextField
          id="outlined-textarea"
          label="Nombre del municipio:"
          placeholder="Nombre del municipio"
          name="nombre"
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#D9D9D9',
              },
              '&:hover fieldset': {
                borderColor: '#D9D9D9',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D9D9D9',
              },
              backgroundColor: '#292929',
            },
            '& .MuiInputLabel-root': {
              color: '#D9D9D9',
            },
            '& .MuiInputBase-input': {
              color: '#D9D9D9',
            },
            marginTop: '.9rem',
          }}
        />
        <TextField
          id="outlined-textarea"
          label="Poblacion:"
          placeholder="Poblacion estimada del municipio"
          name="poblacion"
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#D9D9D9',
              },
              '&:hover fieldset': {
                borderColor: '#D9D9D9',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D9D9D9',
              },
              backgroundColor: '#292929',
            },
            '& .MuiInputLabel-root': {
              color: '#D9D9D9',
            },
            '& .MuiInputBase-input': {
              color: '#D9D9D9',
            },
            marginTop: '.9rem',
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Descripción:"
          placeholder="Descripcion del departamento"
          name="descripcion"
          onChange={handleChange}
          multiline
          rows={4}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#D9D9D9',
              },
              '&:hover fieldset': {
                borderColor: '#D9D9D9',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D9D9D9',
              },
              backgroundColor: '#292929',
            },
            '& .MuiInputLabel-root': {
              color: '#D9D9D9',
            },
            '& .MuiInputBase-input': {
              color: '#D9D9D9',
            },
            marginTop: '.9rem',
          }}
        />
        
      </div>
      <div className="btns">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={toggleDrawer(false)}>
          Cancelar
        </Button>
      </div>
    </Box>
  );
  console.log(formData)
  return (
    <div>
      <Button  
        sx={{
            background: '#EE811E',
            width: '150px',
            height: '40px',
            color: 'white',
            fontSize: '12px',
            '&:hover': {
              backgroundColor: '#FFA64D', 
            },
        }} 
        onClick={() => setOpen(true)}
      >
      {<AddIcon/>} Agregar
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'Spirited Away', year: 2001 },
  { label: 'Saving Private Ryan', year: 1998 },
  { label: 'Once Upon a Time in the West', year: 1968 },
  { label: 'American History X', year: 1998 },
  { label: 'Interstellar', year: 2014 },
  { label: 'Casablanca', year: 1942 },
  { label: 'City Lights', year: 1931 },
  { label: 'Psycho', year: 1960 },
  { label: 'The Green Mile', year: 1999 },
  { label: 'Once Upon a Time in America', year: 1984 },
  { label: 'Witness for the Prosecution', year: 1957 },
  { label: 'Das Boot', year: 1981 },
  { label: 'Citizen Kane', year: 1941 },
  { label: 'North by Northwest', year: 1959 },
  { label: 'Vertigo', year: 1958 },
];


export default FormMunicipio