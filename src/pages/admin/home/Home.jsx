import Chart from "../../../components/admin/charts/Chart.jsx";
import Navbar from "../../../components/admin/navbar/Navbar.jsx"
import Sidebar from "../../../components/admin/sidebar/Sidebar.jsx"
import Widget from "../../../components/admin/widget/Widget.jsx";
import "./home.scss";

const HomeAdmin = () => {
  return (
    <div className="home">
        <Sidebar />
        <div className="dashboard">
          <Navbar title="Dashboard"/>
          <div className="container">
            <div className="fondoContainer">
              <img className="fondo" src="../../../../public/mapa.svg" alt="" />
            </div>
            <div className="widgets">
              <div className="group">
                <Widget/>
                <Chart/>
              </div>
            </div>
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