import Navbar from "../../../components/admin/navbar/Navbar.jsx"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import Tabla from "../../../components/admin/tabla/Tabla.jsx";
import "./departamentos.scss";

const Departamentos = () => {
  return (
    <div className="departamento">
        <Sidebar />
      <div className="conteiner">
        <Navbar title="Departamentos"/>
        <div className="rightConteiner">
          <Tabla/>
        </div>
      </div>
    </div>
  )
}

export default Departamentos