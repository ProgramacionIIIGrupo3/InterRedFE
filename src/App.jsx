import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css'
import HomeAdmin from "./pages/admin/home/Home.jsx";
import HomeUser from "./pages/user/home/Home.jsx";
import LugaresTuristicos from "./pages/admin/lugaresTuristicos/LugaresTuristicos.jsx";
import Departamentos from "./pages/admin/departementos/Departamentos.jsx";
import Municipios from "./pages/admin/municipios/Municipios.jsx";

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomeUser/>}/>
          </Route>
          <Route path="/admin">
            <Route index element={<HomeAdmin/>}/>
            <Route path="turistic" element={<LugaresTuristicos/>}/>
            <Route path="municipio" element={<Municipios/>}/>
            <Route path="departamento" element={<Departamentos/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
