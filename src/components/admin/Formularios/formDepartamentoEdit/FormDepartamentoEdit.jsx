import './formDepartamentoEdit.scss';
import {  Box, Button, Drawer } from '@mui/material';
import { useForm } from "react-hook-form";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useEffect, useState } from 'react';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { UpdateDepartamento, GetDepartamentoById } from '../../../../services/admin/departamentoService';

const FormDepartamentoEdit = ({departamentoEditar, onClose, recargarDepartamentos}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  useEffect(() => {
    if (departamentoEditar) {
      GetDepartamentoById(departamentoEditar.id).then(response => {
        if (!response.error) {
          reset({
            nombre: response.data.nombre,
            descripcion: response.data.descripcion,
          });
          const imageUrl = `${import.meta.env.VITE_API_URL}${response.data.imagen}`; // Asegura que VITE_API_URL está configurada correctamente
          setImagePreview(imageUrl); // Esto asignará la URL completa a la vista previa de la imagen
        }
      });
    } else {
      reset();
      setImagePreview(null); // Limpiar la vista previa al cerrar o abrir un nuevo formulario
    }
  }, [departamentoEditar, reset]);
  
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    if (typeof imageFile === 'object' && imageFile !== null) {
      formData.append('imagen', imageFile); // Solo añadir si es un archivo nuevo
    }
    const response = await UpdateDepartamento(departamentoEditar.id, formData);
    if (!response.error) {
      recargarDepartamentos();
      onClose();
    }
  };


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Actualizar la vista previa con el nuevo archivo
    }
  };

  const handleCancel = () => {
    reset();
    setImagePreview(null);
    onClose();
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

      <Drawer anchor="right" open={Boolean(departamentoEditar)} onClose={onClose}>
        {list()}
      </Drawer>

  );
}

export default FormDepartamentoEdit