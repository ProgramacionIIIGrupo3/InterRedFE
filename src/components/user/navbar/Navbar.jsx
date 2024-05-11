import Ruta from '../Ruta/Ruta'
import Cernano from '../cercano/Cernano'
import Departamento from '../departamento/Departamento'
import Lejano from '../lejano/Lejano'
import Top10Turistic from '../top10/Top10Turistic'
import LugaresTuristicos from '../lugaresTuristicos/LugaresTuristicos'
import Top10Visit from '../topVisitas/Top10Visit'

import './navbar.scss'

const Navbar = () => {
  return (
    <div className="navbarUser">
        <Departamento/>
        <Ruta/>
        <Cernano/>
        <Lejano/>
        <Top10Turistic/>
        <Top10Visit/>
        <LugaresTuristicos/>
    </div>
  )
}

export default Navbar