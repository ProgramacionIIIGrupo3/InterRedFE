import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


const FormTuristicos = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };
  
    const list = () => (
      <Box sx={{ width: 850, padding: 2 }} role="presentation">
        <form className='form'>
          <h1>Hola

          </h1>
        </form>
      </Box>
    );
  
    return (
      <div className=''>
        <Button sx={{margin: "30rem"}} onClick={toggleDrawer(true)}>Agregar</Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default FormTuristicos