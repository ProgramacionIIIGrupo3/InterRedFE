import FormMunicipios from "../../../components/admin/formMunicipios/FormMunicipios"
import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"

const Municipios = () => {
  return (
    <div className="municipios">
      <div className="content">
        <Navbar title="Municipios"/>
        <div className="btn">
          <FormMunicipios/>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}

export default Municipios