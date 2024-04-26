import FormTuristico from "../../../components/admin/formTuristico/FormTuristico";
import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import TablaTuristico from "../../../components/admin/tablaTuristico/TablaTuristico";
import "./lugaresTuristicos.scss";

const LugaresTuristicos = () => {
  return (
    <div className="lugaresTuristicos">
      <Sidebar />
      <div className="content">
        <Navbar title="Lugares Turisticos"/>
        <div className="form">
          <FormTuristico/>
        </div>
        <div className="tabla">
          <TablaTuristico/>
        </div>
      </div>
    </div>
  )
}

export default LugaresTuristicos