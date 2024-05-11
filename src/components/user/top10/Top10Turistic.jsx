import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './top10.scss'

const Top10Turistic = () => {
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
            {<FavoriteIcon sx={{color:'white', fontSize:'30px'}}/>}
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default Top10Turistic