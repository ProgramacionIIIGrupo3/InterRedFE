import {  Box, Button, Drawer } from '@mui/material';
import { Controller, useForm } from "react-hook-form";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import './formTuristicoEdit.scss';
import { useEffect, useState } from 'react';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { UpdateLugarTuristico, GetLugarTuristicoById } from '../../../../services/admin/lugarTuristicoService';
import { convertImagePath} from '../../../../utils/admin/convertImagePath';
import LugaresTuristicos from '../../../../pages/admin/lugaresTuristicos/LugaresTuristicos';
import { GetDepartamentos } from '../../../../services/admin/departamentoService';
import { GetMunicipios } from '../../../../services/admin/municipioService';


const FormTuristicoEdit = ({lugaresTuristicosEditar, onClose, recargarLugares}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);

  const {
    register,
    handleSubmit,
    control,
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
    const fetchDepartamentos = async () => {
      const result = await GetDepartamentos();
      if (!result.error) {
        setDepartamentos(result.data);
      }
    };

    fetchDepartamentos();
  }, []);

  useEffect(() => {
    const fetchMunicipios = async () => {
      const result = await GetMunicipios();
      if (!result.error) {
        setMunicipios(result.data);
      }
    };

    fetchMunicipios();
  }, []);

  useEffect(() => {
    if (lugaresTuristicosEditar) {
      GetLugarTuristicoById(lugaresTuristicosEditar.id).then((response) => {
        console.log("que hay aca", response.nombre);
        if (!response.error) {
          reset({
            nombre: response.nombre,
            descripcion: response.descripcion,
            idDepartamento: response.idDepartamento,
            idMunicipio: response.idMunicipio,
          });
          const imageUrl = `${import.meta.env.VITE_API_URL_IMG}${convertImagePath(response.imagen)}`;
          console.log("esta es una imagen?", imageUrl);
          setImagePreview(imageUrl);
        }
      });
    } else {
      reset();
      setImagePreview(null);
    }
  }, [lugaresTuristicosEditar, reset, departamentos, municipios]);


const onSubmit = async (data) => {
  const formData = new FormData();
  formData.append('nombre', data.nombre);
  formData.append('descripcion', data.descripcion);
  formData.append('idDepartamento', data.idDepartamento);
  formData.append('idMunicipio', data.idMunicipio);
  if (typeof imageFile === 'object' && imageFile !== null) {
    formData.append('imagen', imageFile);
  }
  const response = await UpdateLugarTuristico(LugaresTuristicosEditar.id, formData);
  if (!response.error) {
    recargarLugares();
    onClose();
  }
};

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
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
      <form onSubmit={handleSubmit(onSubmit)} className='formTuristic'>
        <div className="containerleft">
          <div className="container">
            <div className={`file ${imagePreview ? 'noVisible' : ''} ${isHovered ? 'hovered' : ''}`}>
              <div className="card" onClick={() => document.getElementById('file-input').click()}>
                <AddAPhotoOutlinedIcon className="addPhotoIcon" sx={{fontSize:'12rem', color:'rgba(28, 27, 31, 0.50)',transition: 'color 0.3s ease','&:hover': {color: 'rgba(28, 27, 31, 1)'},}} />
              </div>
            </div>
            {imagePreview && (
              <div
                className="preview-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => document.getElementById('file-input').click()}
              >
                <img
                  className='previewImg'
                  src={imagePreview}
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
                  {municipios.map((mun) => (
                    <option key={mun.id} value={mun.id}>
                      {mun.nombre}
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
 
      <Drawer anchor="right" open={Boolean(lugaresTuristicosEditar)} onClose={onClose}>
        {list()}
      </Drawer>

  );
}



export default FormTuristicoEdit