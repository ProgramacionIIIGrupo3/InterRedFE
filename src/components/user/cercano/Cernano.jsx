import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NearMeIcon from '@mui/icons-material/NearMe';
import './cercano.scss'
import { GetTop10Cercanos } from '../../../services/user/rutaService';

const Cernano = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([])

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };

    const fetchTopCercanos = async ()=>{
        const response = await GetTop10Cercanos();
        if(!response.error){
            setData(response.data)
        }
    }
     
    useEffect(()=>{
        fetchTopCercanos();
    },[])

    console.log(data)

    const list = () => (
      <Box sx={{ width: 450, padding: 2, height:'200vh', backgroundColor:'#121212'}} role="presentation">
        <div className='cercanos'>
            <h2 className="title">
                Top 10 Lugares mas cercanos a la capital.
            </h2>
            {data.map((departamento) => (
            <div className='container' key={departamento.id}>
                {departamento.imagen && (
                    <img className="img" src={`${import.meta.env.VITE_API_URL_IMG}${departamento.imagen}`} alt={departamento.nombre}  />
                )}
                <div className="titles">
                    <h2 className='title-depto'>{departamento.nombre}</h2>
                    <p className='parrafo'>{departamento.descripcion}</p>
                </div>
            </div>
            ))}
        </div>
      </Box>
    );
  
    return (
      <div>
        <Button onClick={toggleDrawer(true)}>
            {<NearMeIcon sx={{color:'white', fontSize:'30px'}}/>}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default Cernano