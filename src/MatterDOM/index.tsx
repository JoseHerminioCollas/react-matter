import React, { useEffect, useRef, useState } from 'react';
import Matter, { Runner } from 'matter-js';
import bodies from './bodies';

const {
  Engine,
  Render,
  Composite,
  Mouse,
  MouseConstraint,
  Events
} = Matter;

function MatterDOM({ width, height, matterMotor }: any) {
  const { floor, ball, stack, stack2, wall, wallB } = bodies(width, height);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);

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
      const bodies = e.source.world.composites[0].bodies
      const emitBodies = bodies.map((e: any) => ({
        id: e.id,
        x: e.position.x,
        y: e.position.y,
      }
      ));
      matterMotor.emit(emitBodies)
    });
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, [floor, ball, stack, stack2, wall, wallB]);
    Runner.run(engine);
    Render.run(render);
  }, [])

  return (
    <div
      ref={boxRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default MatterDOM;
