import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './top10.scss'
import { GetTopRatedLugaresTuristicos } from '../../../services/admin/lugarTuristicoService';
import { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';

const Top10Turistic = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };


    const fetchTopRated = async ()=>{
        const response = await GetTopRatedLugaresTuristicos();
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
                Top 10 Lugares Turisticos mejor calificados
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
                    <h3 className='rated'>{Number(lugarTuristico.promedioCalificaciones).toFixed(2)}</h3>
                    <StarIcon sx={{color:'yellow', fontSize:'20px'}}/>
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
            {<FavoriteIcon sx={{color:'white', fontSize:'30px'}}/>}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default Top10Turistic