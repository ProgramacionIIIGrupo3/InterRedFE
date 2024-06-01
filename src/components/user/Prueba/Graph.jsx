import { ForceGraph2D } from 'react-force-graph';

const Graph = () => {
  const data = {
    nodes: [],
    links: [],
  };

  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel="name"
      nodeAutoColorBy="id"
      linkDirectionalArrowLength={3.5}
      linkDirectionalArrowRelPos={1}
      linkCurvature={0.25}
      width={800}
      height={600}
    />
  );
};

export default Graph;