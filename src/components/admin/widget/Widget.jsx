import "./widget.scss";
import { BarChart, Bar, XAxis, YAxis,  Tooltip, Legend } from 'recharts';
import { GetTopLugaresTuristicos} from '../../../services/admin/lugarTuristicoService'
import { useEffect, useState } from 'react';

const Widget = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const result = await GetTopLugaresTuristicos();
      if (!result.error) {
        const formattedData = result.data.slice(0, 5).map(item => ({
          name: item.lugarTuristico.nombre,
          visitas: item.cantidadVisitas,
          pv: 0
        }));
        setData(formattedData);
      }
    };

    loadData();
  }, []);


  return (
    <div className="widget">
      <h3 className='title'>Top 5: Lugares mas visitados</h3>
      <BarChart
        width={470}
        height={230}
        data={data}
        layout="vertical"
        barSize={20}
        margin={{ top: 20, right: 80, left: 30, bottom: 5 }}
      >
        <XAxis type="number" hide /> {/* Oculta el eje x */}
        <YAxis 
        type="category" 
        dataKey="name" 
        fontSize={15}
        width={100}
        tick={{ fill: 'white' }}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="visitas"
          fill="#EE811E"
          label={{
            position: 'insideTopRight',
            fill: 'white',
            fontSize: 15,
            formatter: (value) => `${value} visitas` 
          }}
        />
      </BarChart>
    </div>
  )
}

export default Widget

