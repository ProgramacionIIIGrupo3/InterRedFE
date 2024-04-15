import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


const FormMunicipios = () => {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpen(open);
    };
  
    const list = () => (
      <Box sx={{ width: 450, padding: 2 }} role="presentation">
        <form>
          <h1>Hola</h1>
        </form>
      </Box>
    );
  
    return (
      <div>
        <Button sx={{margin: "30rem"}} onClick={toggleDrawer(true)}>Agregar</Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </div>
    );
}

export default FormMunicipios