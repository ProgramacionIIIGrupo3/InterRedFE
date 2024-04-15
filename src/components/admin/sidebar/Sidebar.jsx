import LocationCityIcon from '@mui/icons-material/LocationCity';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import BungalowIcon from '@mui/icons-material/Bungalow';
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
            <Link to={`${baseRoute}`} style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span className="direction">Dashboard</span>
            </Link>
          </li>
          <li className="page">
            <Link to={`${baseRoute}/turistic`} style={{ textDecoration: "none" }}>
              <AirportShuttleIcon className="icon" />
              <span className="direction">Lugares Turísticos</span>
            </Link>
          </li>
          <li className="page">
            <Link to={`${baseRoute}/municipio`} style={{ textDecoration: "none" }}>
              <BungalowIcon className="icon" />
              <span className="direction">Municipios</span>
            </Link>
          </li>
          <li className="page">
            <Link to={`${baseRoute}/departamento`} style={{ textDecoration: "none" }}>
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