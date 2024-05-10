import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css'
import HomeAdmin from "./pages/admin/home/Home.jsx";
import HomeUser from "./pages/user/home/Home.jsx";
import LugaresTuristicos from "./pages/admin/lugaresTuristicos/LugaresTuristicos.jsx";
import Departamentos from "./pages/admin/departementos/Departamentos.jsx";
import Municipios from "./pages/admin/municipios/Municipios.jsx";
import LogIn from "./pages/admin/logIn/LogIn.jsx";
import ProtectedRoute from "./components/admin/protectedRoute/ProtectedRoute.jsx";

function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomeUser/>}/>
          </Route>
          <Route path="/logIn" element={<LogIn/>}/>
          <Route path="/admin">
            <Route index element={<HomeAdmin/>}/>
            <Route path="turistic" element={<ProtectedRoute><LugaresTuristicos/></ProtectedRoute>}/>
            <Route path="municipio" element={<ProtectedRoute><Municipios/></ProtectedRoute>}/>
            <Route path="departamento" element={<ProtectedRoute><Departamentos/></ProtectedRoute>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
