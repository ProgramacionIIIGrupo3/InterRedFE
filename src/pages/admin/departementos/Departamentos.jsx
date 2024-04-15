import FormDepartamentos from "../../../components/admin/formDepartamentos/FormDepartamentos"
import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"

const Departamentos = () => {
  return (
    <div className="departamentos">
    <div className="content">
      <Navbar title="Departamentos"/>
      <FormDepartamentos/>
    </div>
    <Sidebar />
  </div>
  )
}

export default Departamentos