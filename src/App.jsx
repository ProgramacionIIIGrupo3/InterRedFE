import { BrowserRouter, Route, Routes  } from "react-router-dom";
import './App.css'
//import UserRoutes from "./routes/user/UserRoutes.jsx";


function App() {

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/"/>
          <Route path="/admin"/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
