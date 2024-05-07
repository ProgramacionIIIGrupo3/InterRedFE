import { Box, Button, Drawer } from '@mui/material';
import './formMunicipio.scss';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';


const FormMunicipio = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    JSON.stringify(data);
    reset();
    setOpen(false);
  }; 

  const handleCancel = () => {
    reset();
    setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };



  const list = () => (
    <Box
      role="presentation"
      sx={{ width: 450, padding: 2, backgroundColor: '#121212', height: '200vh', '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
    <form onSubmit={handleSubmit(onSubmit)} className='formMunicipio'>
      <div className="container">
        <label className='title'>Departamento:</label>
        <Controller
          name="idDepartamento"
          control={control}
          defaultValue=""
          rules={{ required: 'Debes seleccionar un municipio' }}
          render={({ field }) => (
            <select
              {...field}
              className={`select ${errors.idDepartamento ? 'error-input' : ''}`} // Aplica la clase aquí
            >
              <option value="">Selecciona el departamento</option>
              {/* Ejemplo con array */}
              {top100Films.map((film) => (
                <option key={film.label} value={film.label}>
                  {film.label} ({film.year})
                </option>
              ))}
            </select>
          )}
        />
        {errors.idDepartamento && (
          <p className='error'>
            {<ReportProblemIcon sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }} />}
            {errors.idDepartamento.message}
          </p>
        )}
      </div>
      <div className='container'>
          <label className='title'>Nombre:</label>
          <input
              className={`input ${errors.nombre ? 'error-input' : ''}`}
              type="text"
              id="nombre"
              {...register('nombre', {
              required: 'Este campo es obligatorio',
              maxLength: {
                  value: 20,
                  message: 'El nombre del municipio no puede exceder los 20 caracteres',
              },
              pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: 'Solo se permiten caracteres alfabéticos',
              }, 
              })}
          />
          {errors.nombre && <p className='error'>{<ReportProblemIcon sx={{color:'rgba(204, 65, 65, 0.849)', fontSize:'12px', margin: '0 .5rem '}}/>}{errors.nombre.message}</p>}
      </div>

      <div className='container'>
          <label className='title'>Poblacion:</label>
          <input
              className={`input ${errors.poblacion ? 'error-input' : ''}`}
              type="number"
              id="poblacion"
              {...register('poblacion', {
              required: 'Este campo es obligatorio',
              pattern: {
                  value: /^[0-9]+$/,
                  message: 'La poblacion no puede tener decimales.',
              },
              })}
          />
          {errors.poblacion && <p className='error'>{<ReportProblemIcon sx={{color:'rgba(204, 65, 65, 0.849)', fontSize:'12px', margin: '0 .5rem '}}/>}{errors.poblacion.message}</p>}
      </div>

      <div className='container'>
        <label className='title'>Descripción:</label>
        <textarea
          className={`input ${errors.descripcion ? 'error-input' : ''}`}
          id="descripcion"
          rows={3}
          style={{ resize: 'none' }} // Agrega esta propiedad inline
          {...register('descripcion', {
            required: 'Este campo es obligatorio',
            pattern: {
              value: /^[A-Za-z0-9\s]+$/,
              message: 'Solo se permiten letras, números y espacios',
            },
          })}
        />
        {errors.descripcion && (
          <p className='error'>
            {<ReportProblemIcon sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }} />}
            {errors.descripcion.message}
          </p>
        )}
      </div>
        <div className="footerButtons">
          <button className='buttonCancel' type="button" onClick={handleCancel}>Cancelar</button>
          <button className='buttonSubmit' type="submit">Guardar</button>
        </div>
      </form>
    </Box>
  );
  
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