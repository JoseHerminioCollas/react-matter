import React, { useEffect, useRef, useState } from 'react';
import Matter, { Runner } from 'matter-js';
import './App.css';

const width = document.body.clientWidth;
const height = window.screen.height;
const {
  Engine,
  Render,
  Bodies,
  Body,
  Composite,
  Composites,
  Mouse,
  MouseConstraint,
  Events
} = Matter;
const wall = Bodies.rectangle(0, height / 2, 10, height, {
  isStatic: true,
  render: {
    fillStyle: 'blue',
  }
});
const wallB = Bodies.rectangle(width - 3, height / 2, 10, height, {
  isStatic: true,
  render: {
    fillStyle: 'blue',
  }
});
const floor = Bodies.rectangle(width / 2, height, width, 20, {
  isStatic: true,
  render: {
    fillStyle: 'blue',
  },
})
const ball = Bodies.circle(150, 0, 100, {
  restitution: 0.9,
  render: {
    fillStyle: 'yellow',
  },
})
var stack = Composites.stack(0, 0, 12, 4, 0, 0, function (x: number, y: number) {
  return Bodies.rectangle(x, y, 40, 20);
});
var stack2 = Composites.stack(0, 0, 1, 1, 0, 0, function (x: number, y: number) {
  return Bodies.circle(x, y, 40, {
    render: {
      fillStyle: 'red',
    },
  });
});
const allBodies = [floor, ball, stack, stack2, wall, wallB]

function App() {
  const [l, setL] = useState(200);
  const [t, setT] = useState(100);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const appEngine = (coords: any) => {
    setL(coords.x);
    setT(coords.y);
  };
  useEffect(() => {
    const engine = Engine.create(undefined)
    const render = Render.create({
      element: boxRef.current ? boxRef.current : undefined,
      engine: engine,
      canvas: canvasRef.current ? canvasRef.current : undefined,
      options: {
        width,
        height,
        background: '#ccc',
        wireframes: false,
      },
    });
    const mouse = Mouse.create(render.canvas);
    const constraint: any = {
      stiffness: 0.2,
      render: { visible: false }
    };
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint
    });
    Events.on(mouseConstraint, 'mousedown', () => {
      Composite.scale(stack2, 1.1, 1.1, {
        x: 0,
        y: 0
      });
    });
    Events.on(engine, "afterUpdate", (e) => {
      const { x, y } = e.source.world.bodies[1].bounds.min;
      appEngine({ x, y })
    });
    Runner.run(engine);
    Render.run(render);
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, allBodies);
  }, [])

  return (
    <div className="App">
      <div
        id="frame"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'red',
        }}
      >
        <div style={{
          position: 'absolute',
          left: l,
          top: t,
          fontSize: 120,
          pointerEvents: 'none',
        }}>xxx</div>
        <div
          ref={boxRef}
          style={{
            width,
            // height: 500,
          }}
        >
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div >
  );
}

export default App;
