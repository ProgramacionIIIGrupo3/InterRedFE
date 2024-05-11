import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import './top10Visit.scss'
import { GetTopLugaresTuristicos } from '../../../services/admin/lugarTuristicoService';
import { useEffect } from 'react';
import PlaceIcon from '@mui/icons-material/Place';

const Top10Visit = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };


    const fetchTopRated = async ()=>{
        const response = await GetTopLugaresTuristicos();
        if(!response.error){
            setData(response.data)
        }
    }
     
    useEffect(()=>{
        fetchTopRated();
    },[])

   

    console.log("esto tiene data", data)
    const list = () => (
      <Box sx={{ width: 450, padding: 2, height:'900vh', backgroundColor:'#121212'}} role="presentation">
        <div className='topCalificados'>
            <h2 className="title">
                Top 10 Lugares Turisticos mas Visitados
            </h2>
            {data.map((lugarTuristico) => (
            <div className='container' key={lugarTuristico.lugarTuristico.id}>
              {console.log("esto tiene lugar turistico", lugarTuristico)}
                {lugarTuristico.lugarTuristico.imagen && (
                    <img className="img" src={`${import.meta.env.VITE_API_URL_IMG}${lugarTuristico.lugarTuristico.imagen}`} alt={lugarTuristico.lugarTuristico.nombre}  />
                )}
                <div className="titles">
                  <div className='title-rated'>
                    <h2 className='title-depto'>{lugarTuristico.lugarTuristico.nombre}</h2>
                    <div className='starIcon'>
                    <h3 className='rated'>{Number(lugarTuristico.cantidadVisitas)}</h3>
                    <PlaceIcon sx={{color:'white', fontSize:'25px'}}/>
                    </div>
                    </div>
                    <p className='parrafo'>{lugarTuristico.lugarTuristico.descripcion}</p>
                    
                </div>
            </div>
            ))}
        </div>
      </Box>
    );
  
    return (
      <div>
        <Button onClick={toggleDrawer(true)}>
            {<PersonPinCircleIcon sx={{color:'white', fontSize:'30px'}}/>}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default Top10Visit