import './formDepartamentoEdit.scss';
import {  Box, Button, Drawer } from '@mui/material';
import { useForm } from "react-hook-form";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from 'react';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';

const FormDepartamentoEdit = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
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
      <form onSubmit={handleSubmit(onSubmit)} className='formDepto'>
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
              className={`textarea ${errors.descripcion ? 'error-input' : ''}`}
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
            '&:hover': {
              backgroundColor: '#729627', 
            },
        }} 
        onClick={() => setOpen(true)}
      >
        Edit
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}

export default FormDepartamentoEdit