import { Box, Button, Drawer, TextField } from '@mui/material';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import { styled } from '@mui/material/styles';
import './formDepartamento.scss';
import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FormDepartamento = () => {
  const data = 'Guatemala';
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const handleSave = () => {
    // Lógica para guardar los datos del formulario
    console.log('Datos guardados');
    setOpen(false);
  };

  const list = () => (
    <Box
      role="presentation"
      component="form"
      sx={{ width: 800, padding: 2, '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
      className="form"
    >
      <div className="containerLeft">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddAPhotoOutlinedIcon className="icon" />}
          className="imgContainer"
        >
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <div className="containerRight">
        <TextField
          disabled
          id="outlined-disabled"
          label="Nombre"
          className="input"
          defaultValue={data}
        />
        <TextField
          id="outlined-multiline-static"
          label="Descripción"
          multiline
          rows={4}
          className="input"
          placeholder="Descripcion del departamento"
        />
      </div>
      <div className="btns">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Guardar
        </Button>
        <Button variant="outlined" color="secondary" onClick={toggleDrawer(false)}>
          Cancelar
        </Button>
      </div>
    </Box>
  );

  return (
    <div>
      <Button sx={{ marginLeft: '200px', backgroundColor: 'red' }} onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default FormDepartamento;