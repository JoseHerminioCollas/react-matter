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
const floor = Bodies.rectangle(width / 2, 500, width, 20, {
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
  const [l, setL] = useState(200)
  const [t, setT] = useState(100)
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const appEngine = (coords: any) => {
    setL(coords.x);
    setT(coords.y);
  }
  useEffect(() => {
    const engine = Engine.create(undefined)
    const render = Render.create({
      element: boxRef.current ? boxRef.current : undefined,
      engine: engine,
      canvas: canvasRef.current ? canvasRef.current : undefined,
      options: {
        width,
        height: 500,
        background: '#ccc',
        wireframes: false,
      },
    })
    Runner.run(engine)
    Render.run(render)
    const comp = Composite.add(engine.world, allBodies,);
    const c: any = {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
    var mouse = Mouse.create(render.canvas),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: c
      });
    Events.on(engine, "afterUpdate", (e) => {
      const { x, y } = e.source.world.bodies[1].bounds.min;
      appEngine({ x, y })
    })
    Events.on(mouseConstraint, 'mousedown', function (event) {
      const ball = Bodies.circle(27.01568998035037, 274.3160486715391, 54, {
        id: 999999,
        inertia: Infinity,
        frictionAir: 0.0001,
        slop: 1,
        friction: 0.8,
        restitution: 0.9,
        render: {
          fillStyle: 'yellow',
        },
      })
      // Composite.add(engine.world, ball);
    })
    Composite.add(engine.world, mouseConstraint);
  }, [])
  const handleClick = () => {
    Composite.scale(stack2, 1.1, 1.1, {
      x: 10,
      y: 10
    });
  }

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
          onClick={handleClick}
          ref={boxRef}
          style={{
            width,
            height: 500,
          }}
        >
          <canvas ref={canvasRef} />
        </div>
        frame
      </div>
    </div >
  );
}

export default App;
