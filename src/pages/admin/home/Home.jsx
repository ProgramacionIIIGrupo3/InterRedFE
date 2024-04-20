//import React from 'react'
import Navbar from "../../../components/admin/navbar/Navbar.jsx"
import Sidebar from "../../../components/admin/sidebar/Sidebar.jsx"
import Widget from "../../../components/admin/widget/Widget.jsx";
import "./home.scss";

const HomeAdmin = () => {
  return (
    <div className="home">
        <Navbar title="Dashboard"/>
        <Sidebar />
      <div className="containerHome">
        <div className="contenedorFondo" >
          <img className="fondo" src="../../../../public/mapa.svg" alt="" />
        </div>
        <div className="widget">
          <Widget/>
          <Widget/>

        </div>
      </div>
    </div>

  )
}

export default HomeAdmin


/*
    <div className="homeContainer">
        
        

        <div className="resumen">
        </div>
    </div>

*/ 