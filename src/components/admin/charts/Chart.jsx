import "./chart.scss";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";
import { GetTopRatedLugaresTuristicos } from "../../../services/admin/lugarTuristicoService";
import { useEffect, useState } from "react";


const Chart = () => {
  const [topPlace, setTopPlace] = useState({nombre: '', porcentaje: 0});

  useEffect(() => {
    const loadData = async () => {
      const result = await GetTopRatedLugaresTuristicos();
      if (!result.error && result.data.length > 0) {
        const topRated = result.data[0];
        setTopPlace({
          nombre: topRated.lugarTuristico.nombre,
          porcentaje: (topRated.promedioCalificaciones / 5) * 100 
        });
      }
    };

    loadData();
  }, []);

  return (
    <div className='chart'>
        <h3 className="title">Mejor lugar para visitar segun los usuarios:</h3>
        <div className="container">
        <CircularProgressbar
          value={topPlace.porcentaje}
          text={`${topPlace.porcentaje.toFixed(0)}%`}
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "#EE811E",
            textColor: "#EDEDED",
            trailColor: "#D9C8A9",
          })}
        />     
        </div>

        <p>{topPlace.nombre}</p> 
    </div>
  )
}

export default Chart