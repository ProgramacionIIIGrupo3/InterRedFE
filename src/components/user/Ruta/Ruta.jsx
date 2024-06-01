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
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';

const Ruta = () => {
    const [open, setOpen] = useState(false);
    const { control,reset, formState: { errors } } = useForm();
    // const [departamentos, setDepartamentos] = useState([]);
    // const [municipio, setMunicipio] = useState([]);
    const [datosSelect, setDatosSelect] = useState([]);
    const [data, setData]= useState([]);

    const fetchDepartamentos = async () => {
        const response = await GetDepartamentos();
        if (!response.error) {
            setDatosSelect(response.data);
        }
    };

    const fetchMunicipio = async ()=>{
        const response = await GetMunicipios();
        if(!response.error){
            setDatosSelect(response.data)
        }
    }

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
        reset()
    };

    const [origen, setOrigen] = useState('');
    const [fin, setFin] = useState('');
    
    const handleOrigenChange = (e) => {
      setOrigen(e.target.value);
    };
    
    const handleFinChange = (e) => {
      setFin(e.target.value);
    };

    useEffect(() => {
        if (origen && fin) {
          fetchRutas(origen, fin);
          console.log(origen,fin)
        }
    }, [origen, fin]);
    
    useEffect(() => {
        fetchDepartamentos();
        fetchMunicipio();
    }, []);

    console.log(data)
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
                <div className="containerForm">
                    <label className='title'>Departamento de Destino:</label>
                    <Controller
                        name="idDepartamentoDestino"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Debes seleccionar un departamento de destino' }}
                        render={({ field }) => (
                        <Combobox
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e);
                                handleOrigenChange(e);
                            }}
                            className={`select ${errors.idDepartamentoDestino ? "error-input" : ""}`}
                        >
                            <ComboboxInput
                                aria-label="Departamento de Destino"
                                displayValue={(data) => data?.nombre}
                            />
                            <ComboboxOptions anchor="bottom" className="empty:hidden">
                            {datosSelect.map((data) => (
                                <ComboboxOption
                                key={data.id}
                                value={data.idX}
                                className="data-[focus]:bg-blue-100"
                                >
                                {data.nombre}
                                </ComboboxOption>
                            ))}
                            </ComboboxOptions>
                        </Combobox>
                        )}
                    />
                    {errors.idDepartamentoDestino && (
                        <p className='error'>
                        {<ReportProblemIcon sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }} />}
                        {errors.idDepartamentoDestino.message}
                        </p>
                    )}
                    </div>
                <div className="containerForm">
                    <label className='title'>Departamento de Fin:</label>
                    <Controller
                        name="idDepartamentoFin"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Debes seleccionar un departamento de fin' }}
                        render={({ field }) => (
                        <select
                            {...field}
                            onChange={(e) => {
                            field.onChange(e);
                            handleFinChange(e);
                            }}
                            className={`select ${errors.idDepartamentoFin ? "error-input" : ""}`}
                        >
                            <option value="">Selecciona el departamento de fin</option>
                            {datosSelect.map((depto) => (
                            <option key={depto.id} value={depto.id}>
                                {depto.nombre}
                            </option>
                            ))}
                        </select>
                        )}
                    />
                    {errors.idDepartamentoFin && (
                        <p className='error'>
                        {<ReportProblemIcon sx={{ color: 'rgba(204, 65, 65, 0.849)', fontSize: '12px', margin: '0 .5rem' }} />}
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
                    </div>
                ))}
            </div>
        </div>
        </Box>
    );

    return (
        <div>
        <Button onClick={toggleDrawer(true)}>
            {<DirectionsCarIcon sx={{ color: 'white', fontSize: '30px' }} />}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {list()}
        </Drawer>
        </div>
    );
};

export default Ruta;