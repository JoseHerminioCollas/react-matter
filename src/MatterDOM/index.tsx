import React, { useEffect, useRef, useState } from 'react';
import Matter, { Runner } from 'matter-js';
import { floor, ball, stack, stack2, wall, wallB } from './bodies';

const width = document.body.clientWidth;
const height = window.screen.height;
const {
  Engine,
  Render,
  Composite,
  Mouse,
  MouseConstraint,
  Events
} = Matter;

function MatterDOM() {
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
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, [floor, ball, stack, stack2, wall, wallB]);
    Runner.run(engine);
    Render.run(render);
  }, [])

  return (
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
  );
}

export default MatterDOM;
