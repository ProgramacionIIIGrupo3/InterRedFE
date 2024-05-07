import "./chart.scss";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";


const Chart = () => {
  return (
    <div className='chart'>
        <h3 className="title">Mejor lugar para visitar segun los usuarios:</h3>
        <div className="container">
        <CircularProgressbar
          value={70}
          text="70%"
          strokeWidth={10}
          styles={buildStyles({
            pathColor: "#EE811E",
            textColor: "#EDEDED",
            trailColor: "#D9C8A9",
          })}
        />        
        </div>
    </div>
  )
}

export default Chart