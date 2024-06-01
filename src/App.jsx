import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css'
import HomeAdmin from "./pages/admin/home/Home.jsx";
import HomeUser from "./pages/user/home/Home.jsx";
import LugaresTuristicos from "./pages/admin/lugaresTuristicos/LugaresTuristicos.jsx";
import Departamentos from "./pages/admin/departementos/Departamentos.jsx";
import Municipios from "./pages/admin/municipios/Municipios.jsx";
import LogIn from "./pages/admin/logIn/LogIn.jsx";
import RutaPage from "./pages/user/rutaPage/RutaPage.jsx";
import Turistic from "./pages/user/turistico/Turistic.jsx";
import Prueba from "./pages/user/prueba/prueba.jsx";

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomeUser/>}/>
            <Route path="ruta" element={<RutaPage/>}/>
            <Route path="prueba" element={<Prueba/>}/>
            <Route path="/turistic/:id" element={<Turistic/>}/>
          </Route>
          <Route path="/logIn" element={<LogIn/>}/>
          <Route path="/admin">
            <Route index element={<HomeAdmin/>}/>
            <Route exact path="turistic" element={<LugaresTuristicos/>}/>
            <Route path="municipio" element={<Municipios/>}/>
            <Route path="departamento" element={<Departamentos/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
