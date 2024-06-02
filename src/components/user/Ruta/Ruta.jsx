import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import './ruta.scss';
import { Controller, useForm } from "react-hook-form";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { GetDepartamentos } from '../../../services/admin/departamentoService';
import { GetRutasMultiples } from '../../../services/user/rutaService';
import { GetMunicipios } from '../../../services/admin/municipioService';
import AsyncSelect from 'react-select/async';
import { useNavigate } from 'react-router-dom';

const Ruta = () => {
    const [open, setOpen] = useState(false);
    const { control, reset, formState: { errors }, setValue } = useForm();
    const [datos, setDatos] = useState([]);
    const [data, setData] = useState([]);
    const [selectedOrigen, setSelectedOrigen] = useState(null);
    const [selectedFin, setSelectedFin] = useState(null);
    const navigate = useNavigate();

    const fetchDepartamentos = async (inputValue = '') => {
        const response = await GetDepartamentos();
        if (!response.error) {
            const filteredDepartamentos = response.data.filter(depto => 
                depto.nombre.toLowerCase().includes(inputValue.toLowerCase())
            );
            return filteredDepartamentos.map(depto => ({
                label: depto.nombre,
                value: depto.idX,  // asegurate que el valor es idX
                key: depto.id
            }));
        }
    };

    const fetchMunicipios = async (inputValue = '') => {
        const response = await GetMunicipios();
        if (!response.error) {
            const filteredMunicipios = response.data.filter(muni => 
                muni.nombre.toLowerCase().includes(inputValue.toLowerCase())
            );
            return filteredMunicipios.map(muni => ({
                label: muni.nombre,
                value: muni.idX,  // asegurate que el valor es idX
                key: muni.id
            }));
        }
    };

    const loadOptions = async (inputValue) => {
        const departamentos = await fetchDepartamentos(inputValue);
        const municipios = await fetchMunicipios(inputValue);
        return [...departamentos, ...municipios];
    };

    const fetchRutas = async (origen, fin) => {
        const response = await GetRutasMultiples(origen, fin);
        if (!response.error) {
            setData(response.data);
        } else {
            setData([]);
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(open);
        reset();
    };

    const handleOrigenChange = (selectedOption) => {
        setSelectedOrigen(selectedOption);
        setValue('idDepartamentoDestino', selectedOption.value); // asegurate de que el valor se actualiza en el formulario
    };

    const handleFinChange = (selectedOption) => {
        setSelectedFin(selectedOption);
        setValue('idDepartamentoFin', selectedOption.value); // asegurate de que el valor se actualiza en el formulario
    };

    const handleRouteClick = (ruta) => {
        navigate('/prueba', { state: { data: ruta } });
    };

    useEffect(() => {
        if (selectedOrigen && selectedFin) {
            fetchRutas(selectedOrigen.value, selectedFin.value);
            console.log(selectedOrigen.value, selectedFin.value);
        }
    }, [selectedOrigen, selectedFin]);

    useEffect(() => {
        const loadInitialData = async () => {
            const departamentos = await fetchDepartamentos();
            setDatos(departamentos);
        };
        loadInitialData();
    }, []);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#121212',
            color: 'white'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white'
        }),
        input: (provided) => ({
            ...provided,
            color: 'white'
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#121212',
            color: 'white'
        })
    };

    console.log(datos)
    const list = () => (
        <Box sx={{ width: 450, padding: 2, height: '200vh', backgroundColor: '#121212' }} role="presentation">
            <div className="ruta-principal">
                <form className='rutas'>
                    <div className="titles">
                        <h1 className="title">
                            @InterRedGT
                        </h1>
                        <h5 className='slogan'>
                            Descubre Guatemala con Interred, tu mapa confiable
                        </h5>
                    </div>
                    <div className="" style={{marginBottom: "1rem"}}>
                        <label className="title">Departamento de Destino:</label>
                        <Controller
                            name="idDepartamentoDestino"
                            control={control}
                            className= "campo"
                            defaultValue=""
                            rules={{ required: 'Debes seleccionar un departamento de destino' }}
                            render={({ field }) => (
                                <AsyncSelect
                                    {...field}
                                    styles={customStyles}
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={loadOptions}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        handleOrigenChange(selectedOption);
                                    }}
                                    value={selectedOrigen}  // Asegurando que el valor seleccionado se mantenga visible
                                    className={`select ${errors.idDepartamentoDestino ? 'error-input' : ''}`}
                                    placeholder="Selecciona el departamento de destino"
                                    noOptionsMessage={() => 'No se encontraron opciones'}
                                />
                            )}
                        />
                        {errors.idDepartamentoDestino && (
                            <p className="error">
                                <ReportProblemIcon
                                    sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }}
                                />
                                {errors.idDepartamentoDestino.message}
                            </p>
                        )}
                    </div>
                    <div className="container">
                        <label className='title'>Departamento de Fin:</label>
                        <Controller
                            name="idDepartamentoFin"
                            control={control}
                            defaultValue=""
                            sx={{margin:'6rem'}}
                            rules={{ required: 'Debes seleccionar un departamento de fin' }}
                            render={({ field }) => (
                                <AsyncSelect
                                    {...field}
                                    styles={customStyles}
                                    cacheOptions
                                    defaultOptions
                                    loadOptions={loadOptions}
                                    onChange={(selectedOption) => {
                                        field.onChange(selectedOption);
                                        handleFinChange(selectedOption);
                                    }}
                                    value={selectedFin}  // Asegurando que el valor seleccionado se mantenga visible
                                    className={`select ${errors.idDepartamentoFin ? 'error-input' : ''}`}
                                    placeholder="Selecciona el departamento de fin"
                                    noOptionsMessage={() => 'No se encontraron opciones'}
                                />
                            )}
                        />
                        {errors.idDepartamentoFin && (
                            <p className='error'>
                                <ReportProblemIcon sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }} />
                                {errors.idDepartamentoFin.message}
                            </p>
                        )}
                    </div>
                </form>

                <div className="ruta-seleccionada">
                    {data.map((ruta, index) => (
                        <div className='container' key={index}>
                            <div className="titles">
                                <h3 className='title'>Ruta {index + 1}</h3>
                                <p className='subtitle'>Distancia total: {ruta.distanciaTotal} km</p>
                            </div>
                            <p className='parrafo'>
                                Pasa primero por{' '}
                                {ruta.ruta.$values.map((departamento, depIndex) => {
                                    if (depIndex === ruta.ruta.$values.length - 1) {
                                        return `hasta llegar a ${departamento.nombre}.`;
                                    } else if (depIndex === ruta.ruta.$values.length - 2) {
                                        return `${departamento.nombre} y `;
                                    } else {
                                        return `${departamento.nombre}, `;
                                    }
                                })}
                            </p>
                            <button onClick={() => handleRouteClick(ruta)}>Ver recorrido</button>
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer(true)}>
                <DirectionsCarIcon sx={{ color: 'white', fontSize: '30px' }} />
            </Button>
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
};

export default Ruta;
