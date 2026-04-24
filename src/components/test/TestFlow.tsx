"use client"
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type EdgeChange,
  type Connection,
  Background,
  Controls,
  MiniMap,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  OnNodeDrag,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ShapeGrid from '../background/ShapeGrid';
// custom card
// export function TextUpdaterNode(props) {
//   const onChange = useCallback((evt) => {
//     console.log(evt.target.value);
//   }, []);

//   return (
//     <div className="text-updater-node bg-amber-400">
//       <div>
//         <label htmlFor="text">Text:</label>
//         <input id="text" name="text" onChange={onChange} className="nodrag" /> {/* class "nodrag" input focus bolganda drag qilmaydi  */}
//       </div>
//       <Handle type="source" position={Position.Top} /> {/* dot line connect */}
//       <Handle type="target" position={Position.Bottom} /> {/* dot line connect */}
//     </div>
//   );
// }
// const nodeTypes = {
//   textUpdater: TextUpdaterNode,
// };

// cardlar
const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];

// deafult ulanish chiziqlar bilan
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

const onNodeDrag: OnNodeDrag = (_, node) => {
  console.log('drag event', node.data);
};

export default function TestFlow() {
  // hamma cardlar
  const [nodes, setNodes] = useState(initialNodes);
  // cardlar line ulanishi 
  const [edges, setEdges] = useState(initialEdges);

  // cardlar drag ozgarish, position ozgarish event 
  const onNodesChange: OnNodesChange = useCallback(
    (changes: any[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  // cardlar line boglanishi ozgarish event
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  // connect qilish line bilan
  const onConnect: OnConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes} // cards
        edges={edges} // lines
        onNodeDrag={onNodeDrag} // on drag bolganda event
        onNodesChange={onNodesChange} // position event
        onEdgesChange={onEdgesChange} // line connect event
        onConnect={onConnect} // connect bolganda event
        fitView // barcha cardlarni ekranga sigdirish
        // nodeTypes={nodeTypes} // custom card
      >
        <Background bgColor='#1c1e1f'/>
        <Controls /> {/* Control panel */}
        <MiniMap nodeStrokeWidth={3} />
        {/* <ShapeGrid
          speed={0}
          squareSize={40}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor="#000000"
          hoverFillColor='#000000'
          shape='square' // square, hexagon, circle, triangle
          hoverTrailAmount={0} // number of trailing hovered shapes (0 = no trail)
          // hoverColor="#222222"
          // size={49}
        /> */}
      </ReactFlow>
    </div>
  );
}