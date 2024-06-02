import { useState } from 'react';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Link } from "react-router-dom";
import "./sidebar.scss";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open);
  };

  const list = () => (
    <Box sx={{ width: 250, padding: 2, backgroundColor:'#121212', height: '100%' }} role="presentation">
      <>
        <div className="top">
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <h2 className="title">Inter Red GT</h2>
          </Link>
        </div>
        <ul className="section">
          <Link to="/admin" style={{ textDecoration: "none", margin: 0 }}>
            <li className="page">
              <DashboardOutlinedIcon className="icon" />
              <span className="direction">Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/turistic" style={{ textDecoration: "none", margin: 0 }}>
            <li className="page">
              <AirportShuttleIcon className="icon" />
              <span className="direction">Lugares Turísticos</span>
            </li>
          </Link>
          <Link to="/admin/municipio" style={{ textDecoration: "none", margin: 0 }}>
            <li className="page">
              <BungalowOutlinedIcon className="icon" />
              <span className="direction">Municipios</span>
            </li>
          </Link>
          <Link to="/admin/departamento" style={{ textDecoration: "none", margin: 0 }}>
            <li className="page">
              <LocationCityIcon className="icon" />
              <span className="direction">Departamentos</span>
            </li>
          </Link>
        </ul>
      </>
    </Box>
  );

  return (
    <div>
      {/* Botón para mostrar/ocultar el drawer en dispositivos móviles */}
      <div className="mobile-menu">
        <Button onClick={toggleDrawer(true)}>
          <DragHandleIcon sx={{color:'white', fontSize:'30px'}} />
        </Button>
      </div>

      {/* Sidebar con estilos para pantallas grandes */}
      <div className="sidebar">
        <div className="container">
          {list()}
        </div>
      </div>

      {/* Drawer para dispositivos móviles */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;