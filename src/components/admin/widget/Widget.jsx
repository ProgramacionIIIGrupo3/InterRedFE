import "./widget.scss";
import { BarChart, Bar, XAxis, YAxis,  Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Page A', uv: 4000, pv: 0 },
  { name: 'Page B', uv: 3000, pv: 1000 },
  { name: 'Page C', uv: 2000, pv: 2000 },
  { name: 'Page D', uv: 2780, pv: 2380 },
  { name: 'Page E', uv: 1890, pv: 2110 },
];

const Widget = () => {
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
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="uv"
          fill="#EE811E"
          label={{
            position: 'insideTopRight',
            formatter: (value, entry) => entry && entry.name, // Verifica si entry existe antes de acceder a name
          }}
        />
      </BarChart>
    </div>
  )
}

export default Widget

