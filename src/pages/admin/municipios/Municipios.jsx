import FormMunicipio from "../../../components/admin/Formularios/formMunicipio/FormMunicipio";
import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import TablaMunicipio from "../../../components/admin/tablaMunicipio/TablaMunicipio";
import "./municipios.scss";

const Municipios = () => {
  return (
    <div className="municipios">
      <Sidebar />
      <div className="content">
        <Navbar title="Municipios"/>
        <div className="container">
          <div className="form">
            <FormMunicipio/>
          </div>
          <div className="tabla">
            <TablaMunicipio/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Municipios