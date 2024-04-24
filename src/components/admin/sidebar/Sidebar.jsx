import LocationCityIcon from '@mui/icons-material/LocationCity';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined';
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  const baseRoute = "/admin"; // Ruta base para las páginas de administración

  return (
    <div className="sidebar">
      <div className="top">
        <Link to={baseRoute} style={{ textDecoration: "none" }}>
          <h2 className="title">Inter Red GT</h2>
        </Link>
      </div>
      <div className="container">
        <ul className="section">
          <li className="page">
            <Link to={baseRoute} style={{ textDecoration: "none", margin:0 }}>
              <DashboardOutlinedIcon className="icon" />
              <span className="direction">Dashboard</span>
            </Link>
          </li>
          <li className="page">
            <Link to={`${baseRoute}/turistic`} style={{ textDecoration: "none", margin:0 }}>
              <AirportShuttleIcon className="icon" />
              <span className="direction">Lugares Turísticos</span>
            </Link>
          </li>
          <li className="page">
            <Link to={`${baseRoute}/municipio`} style={{ textDecoration: "none", margin:0 }}>
              <BungalowOutlinedIcon className="icon" />
              <span className="direction">Municipios</span>
            </Link>
          </li>
          <li className="page">
            <Link to={`${baseRoute}/departamento`} style={{ textDecoration: "none", margin:0 }}>
              <LocationCityIcon className="icon" />
              <span className="direction">Departamentos</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;