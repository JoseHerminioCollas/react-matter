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
  Bodies,
} = Matter;

function MatterDOM({ width, height, matterMotor }: any) {
  const { floor, ball, stack, stack2, wall, wallB } = bodies(width, height);
  const ballB = Bodies.circle(150, 0, 100, {
    restitution: 0.9,
    render: {
      fillStyle: 'red',
    },
  })
  const allBalls = [...Array(100)].map((e, i) => {
    const x = (i * 50) % 900;
    const y = Math.floor(i / 15) * 15 + 90;
    const size = i === 3 ? 80 : 40;
    const rand = Math.round(Math.random() * 10)
    const color = i === 3 ? '#fff' : `#${rand}c${rand}`;
    const ballB = Bodies.circle(x, y, size, {
      id: i,
      restitution: 0.9,
      render: {
        fillStyle: color,
        lineWidth: 12,
      },
    })
    return ballB;
  })
  const ballComposite = Composite.create({});
  Composite.add(ballComposite, allBalls);
  const floorC = Bodies.rectangle(width / 2, 12, width, 20, {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  })
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const engine = Engine.create({
    gravity: { x: 0.1, y: 0.1 },
  })
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
    const boundsA = Matter.Bounds.create([{ x: 0, y: 0 }, { x: width, y: height }])
    Events.on(engine, "afterUpdate", (e) => {
      ballComposite.bodies.forEach(body => {
        const isInside = Matter.Bounds.contains(boundsA, body.position)
        if (!isInside) {
          // TODO find a random position to place the body
          Matter.Body.setPosition(body, { x: 100, y: 100 });
        }
      })
      const emitBodies = ballComposite.bodies.map((e: any) => ({
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
    Composite.add(engine.world, [floor, floorC, ballComposite, wall, wallB]);
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
