import Navbar from "../../../components/admin/navbar/Navbar"
import Sidebar from "../../../components/admin/sidebar/Sidebar"

const LugaresTuristicos = () => {
  return (
    <div className="lugaresTuristicos">
      <div className="content">
        <Navbar title="Lugares Turisticos"/>
      </div>
      <Sidebar />
    </div>
  )
}

export default LugaresTuristicos