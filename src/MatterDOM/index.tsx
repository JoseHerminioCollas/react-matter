import React, { useEffect, useRef, useState } from 'react';
import Matter, { Runner } from 'matter-js';
import bodies from './bodies';

const {
  Engine,
  Render,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Body,
} = Matter;

function MatterDOM({ width, height, matterMotor }: any) {
  const { floor, ball, stack, stack2, wall, wallB } = bodies(width, height);
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const engine = Engine.create(undefined)
  useEffect(() => {
    const render = Render.create({
      element: boxRef.current ? boxRef.current : undefined,
      engine,
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
    Events.on(mouseConstraint, 'mousedown', (e: any) => {
      const mousePosition = e.mouse.position;
      const bodies = Composite.allBodies(engine.world)
      const matchedBodies = Matter.Query.point(bodies, mousePosition)
      if (matchedBodies.length > 0 && matchedBodies[0].label === 'Circle Body') {
        if (matchedBodies[0].circleRadius && matchedBodies[0].circleRadius < 50) {
          Body.scale(matchedBodies[0], 2, 2);
        }
        else {
          Body.scale(matchedBodies[0], 0.5, 0.5);
        }
      }
    });
    Events.on(engine, "afterUpdate", (e) => {
      const bodies = e.source.world.composites[0].bodies
      const emitBodies = bodies.map((e: any) => ({
        id: e.id,
        x: e.bounds.min.x,
        y: e.bounds.min.y,
        width: e.bounds.max.x - e.bounds.min.x,
        height: e.bounds.max.y - e.bounds.min.y,
      }
      ));
      matterMotor.emit(emitBodies)
    });
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, [floor, stack, wall, wallB]);
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
