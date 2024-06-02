import { ForceGraph2D } from 'react-force-graph';
import { useLocation } from 'react-router-dom';

const Graph = () => {
  const location = useLocation();
  const { data } = location.state;

  // Extraer los nodos y enlaces del objeto data
  const nodes = data.ruta.$values.map((node) => ({
    id: node.id,
    name: node.nombre,
  }));

  const links = data.ruta.$values.slice(0, -1).map((node, index) => ({
    source: node.id,
    target: data.ruta.$values[index + 1].id,
  }));

  return (
    <ForceGraph2D
      graphData={{ nodes, links }}
      nodeLabel="name"
      nodeAutoColorBy="id"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
      linkColor={() => 'white'}
      width={1200} // Aumentar el ancho del grafo
      height={800} // Aumentar el alto del grafo
    />
  );
};

export default Graph;