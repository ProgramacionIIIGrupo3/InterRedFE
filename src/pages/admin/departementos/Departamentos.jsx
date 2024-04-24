import FormDepartamento from "../../../components/admin/formDepartamento/FormDepartamento";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

const Departamentos = () => {
  return (
    <div className="departamentos">
    <div className="content">
      <Navbar title="Departamentos"/>
      <FormDepartamento/>
    </div>
    <Sidebar />
  </div>
  )
}

export default Departamentos