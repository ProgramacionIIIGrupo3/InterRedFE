import {  Box, Button, Drawer } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import './formTuristicoEdit.scss';
import { useState } from 'react';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

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

const Films = [
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


const FormTuristicoEdit = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const onSubmit = (data) => {
    console.log(data);
    JSON.stringify(data);
    reset();
    setImageFile(null);
    setOpen(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleCancel = () => {
    reset();
    setImageFile(null);
    setOpen(false);
  };

  
  const list = () => (
    <Box 
      role="presentation"
      sx={{ width: 800, padding: 2, backgroundColor: '#121212', height: '200vh', '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <form onSubmit={handleSubmit(onSubmit)} className='formTuristic'>
        <div className="containerleft">
          <div className="container">
            <div className={`file ${imageFile ? 'noVisible' : ''} ${isHovered ? 'hovered' : ''}`}>
              <div className="card" onClick={() => document.getElementById('file-input').click()}>
                <AddAPhotoOutlinedIcon className="addPhotoIcon" sx={{fontSize:'12rem', color:'rgba(28, 27, 31, 0.50)',transition: 'color 0.3s ease','&:hover': {color: 'rgba(28, 27, 31, 1)'},}} />
              </div>
            </div>
            {imageFile && (
              <div
                className="preview-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => document.getElementById('file-input').click()}
              >
                <img
                  className='previewImg'
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  style={{ border: isHovered ? '2px solid blue' : 'none' }}
                />
              </div>
            )}
            <input
              type="file"
              id="file-input"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="containerRight">  
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

          <div className="container">
            <label className='title'>Municipio:</label>
            <Controller
              name="idMunicipio"
              control={control}
              defaultValue=""
              rules={{ required: 'Debes seleccionar un municipio' }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`select ${errors.idMunicipio ? 'error-input' : ''}`}
                >
                  <option value="">Selecciona el municipio</option>
                  {/* Ejemplo con array */}
                  {Films.map((film) => (
                    <option key={film.label} value={film.label}>
                      {film.label} ({film.year})
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.idMunicipio && (
              <p className='error'>
                {<ReportProblemIcon sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }} />}
                {errors.idMunicipio.message}
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
                      message: 'El nombre del lugar turistico no puede exceder los 20 caracteres',
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
            <label className='title'>Descripción:</label>
            <textarea
              className={`input ${errors.descripcion ? 'error-input' : ''}`}
              id="descripcion"
              rows={2}
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
       </div>
      </form>
    </Box>
  );


  return (
    <div>
      <Button  
        sx={{
          display: 'inline-flex',
          padding: '5px 10px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          border: '2px dashed #729627',
          color: '#729627',
          fontFamily: "Montserrat Alternates",
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '800',
          marginRight: '1rem',
            '&:hover': {
              backgroundColor: '#729627', 
            },
        }} 
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Button  
        sx={{
          display: 'inline-flex',
          padding: '5px 10px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '5px',
          border: '2px dashed #EE1E1E',
          color: '#EE1E1E',
          fontFamily: "Montserrat Alternates",
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '800',
            '&:hover': {
              backgroundColor: '#729627', 
            },
        }} 
      >
        Delete
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}



export default FormTuristicoEdit