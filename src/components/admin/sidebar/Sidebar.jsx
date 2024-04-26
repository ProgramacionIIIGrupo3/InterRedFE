import LocationCityIcon from '@mui/icons-material/LocationCity';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined';
import { Link } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <h2 className="title">Inter Red GT</h2>
        </Link>
      </div>
      <div className="container">
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
      </div>
    </div>
  );
};

export default Sidebar;