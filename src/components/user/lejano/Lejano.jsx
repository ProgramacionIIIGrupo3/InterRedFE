import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import NearMeDisabledIcon from '@mui/icons-material/NearMeDisabled';
import './lejano.scss'

const Lejano = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };
  
    const list = () => (
      <Box sx={{ width: 450, padding: 2, height:'200vh', backgroundColor:'#121212'}} role="presentation">
        <form>
          <h1>Hola</h1>
        </form>
      </Box>
    );
  
    return (
      <div>
        <Button onClick={toggleDrawer(true)}>
            {<NearMeDisabledIcon sx={{color:'white', fontSize:'30px'}}/>}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default Lejano