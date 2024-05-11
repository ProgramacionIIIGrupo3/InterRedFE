import { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { GetDepartamentoById, GetDepartamentos } from '../../../services/admin/departamentoService';
import './departamento.scss';
import { GetLugaresTuristicosByDepartamentoId } from '../../../services/admin/lugarTuristicoService';

const Departamento = () => {
  const [open, setOpen] = useState(false);
  const [departamento, setDepartamento] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const [turisticos, setTuristicos] = useState([])

//   const { register, handleSubmit, control, setValue, reset, formState: { errors } } = useForm();

  const { control, reset, formState: { errors } } = useForm();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const fetchDepartamentos = async () => {
    const response = await GetDepartamentos();
    if (!response.error) {
      setDepartamentos(response.data);
    }
  };

  const fetchDepartamento = async (departamentoId) => {
    if (departamentoId) {
      const response = await GetDepartamentoById(departamentoId);
      if (!response.error) {
        setDepartamento(response.data);
      }
    }
  };

  const fetchLugaresTuristicos = async (departamentoId) => {
    if (departamentoId) {
      const response = await GetLugaresTuristicosByDepartamentoId(departamentoId);
      if (!response.error) {
        setTuristicos(response.data);
      }
    }
  };

  useEffect(() => {
    fetchDepartamentos();
    fetchLugaresTuristicos();
  }, []);

  const handleDepartamentoChange = (e) => {
    const selectedDepartamentoId = e.target.value;
    reset();
    fetchDepartamento(selectedDepartamentoId);
    fetchLugaresTuristicos(selectedDepartamentoId)
  };

  console.log(departamento);
  console.log(turisticos)

    const list = () => (
        <Box sx={{ width: 600, padding: 2, height: '500vh', backgroundColor: '#121212' }} role="presentation">
        <div className='VistaDepartamento'>
            <form className="formSeleccion">
            <div className="containerForm">
                <label className='title'>Departamento:</label>
                <Controller
                name="idDepartamento"
                control={control}
                defaultValue=""
                rules={{ required: 'Debes seleccionar un municipio' }}
                render={({ field }) => (
                    <select
                    {...field}
                    onChange={(e) => {
                        field.onChange(e);
                        handleDepartamentoChange(e);
                    }}
                    className={`select ${errors.idDepartamento ? "error-input" : ""}`}
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
            </form>
            <div className='container'>
            {departamento && (
                <>
                    {departamento.imagen && (
                        <img className='img' src={`${import.meta.env.VITE_API_URL_IMG}${departamento.imagen}`} alt={departamento.nombre} />
                    )}
                    <div className='espacio'></div>
                    <div className="arriba">
                        <h1 className='title'>{departamento.nombre}</h1>
                        <p className='parrafo'>{departamento.descripcion}</p>
                        
                        <h3 className='subtitle'>Cabecera Departamental</h3>
                        <table>
                        <thead>
                            <tr>
                            <th className=''></th>
                            <th className=''></th>
                            <th className=''></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td className='data'>Nombre: {departamento.cabecera.nombre}</td>
                            <td className='data'>Descripción: {departamento.cabecera.descripcion}</td>
                            <td className='data'>Población: {departamento.cabecera.poblacion}</td>
                            </tr>
                        </tbody>
                        </table>
                        
                        <h3 className='subtitle'>Municipios</h3>
                        <table>
                        <thead>
                            <tr>
                            <th className='dataTitle'>Nombre</th>
                            <th className='dataTitle'>Descripción</th>
                            <th className='dataTitle'>Población</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departamento.municipios.$values.map((municipio) => (
                            <tr key={municipio.id}>
                                <td className='data'>{municipio.nombre}</td>
                                <td className='data'>{municipio.descripcion}</td>
                                <td className='data'>{municipio.poblacion}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        
                        <p className='data-poblacion'>Población Total: {departamento.poblacionTotal}</p>
                    
                        <h3 className='subtitle'>Lugares Turísticos</h3>
                        {turisticos.map((item) => (
                        <div key={item.id} className="lugar-turistico">
                            {item.imagen && (
                            <img src={`${import.meta.env.VITE_API_URL_IMG}${item.imagen}`} alt={item.nombre} className="lugar-imagen" />
                            )}
                            <div className="container">
                                <h3 className="lugar-nombre">{item.nombre}</h3>
                                <p className="lugar-descripcion">{item.descripcion}</p>
                            </div>
                        </div>
                        ))}

                        </div>
                    </>
                    )}
                </div>
            </div>
        </Box>
    );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        {<LocationCityIcon sx={{ color: 'white', fontSize: '30px' }} />}
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Departamento;