import { Box, Button, Drawer } from '@mui/material';
import './formMunicipio.scss';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Controller, useForm } from 'react-hook-form';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {GetDepartamentos} from '../../../../services/admin/departamentoService';
import { CreateMunicipio } from '../../../../services/admin/municipioService';
import { useEffect } from 'react';



const FormMunicipio = () => {
  const [open, setOpen] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    GetDepartamentos()
      .then((response) => {
        if (!response.error) {
          setDepartamentos(response.data); 
        } else {
          console.error("Error al cargar departamentos:", response.message);
        }
      })
      .catch((error) => {
        console.error("Error al cargar departamentos:", error);
      });
  }, []);

  
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    CreateMunicipio(data)
      .then((response) => {
        if (!response.error) {
          console.log("Municipio creado con éxito:", response.data);
          reset();  // Reiniciar el formulario solo si el municipio se crea correctamente
          setOpen(false);
        } else {
          console.error("Error al crear municipio:", response.message);
        }
      })
      .catch((error) => {
        console.error("Error al crear municipio:", error);
      });
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
  rules={{ required: 'Debes seleccionar un departamento' }}
  render={({ field }) => (
    <select
      {...field}
      className={`select ${errors.idDepartamento ? 'error-input' : ''}`}
    >
      <option value="">Selecciona el departamento</option>
      {departamentos.map((depto) => (
        <option key={depto.id} value={depto.id}>
          {depto.nombre}
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

export default FormMunicipio