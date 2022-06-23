import React, { useEffect, useRef } from 'react';
import Matter, { Runner } from 'matter-js';
import bodies from 'MatterDOM/bodies';

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

function MatterDOM({
  width, height, matterMotor, config, focusId$,
}: {
  width: number,
  height: number,
  matterMotor: any,
  config: any,
  focusId$: any
}) {
  const { floor, wall, wallB } = bodies(width, height);
  const allBalls = config.map((e: {
    id: any, label: string, x: number, y: number, size: number, color: string, lineWidth: any,
  }) => Bodies.circle(e.x, e.y, e.size, {
    id: e.id,
    restitution: 0.9,
    render: {
      fillStyle: e.color,
      lineWidth: e.lineWidth,
    },
  }));
  const ballComposite = Composite.create({});
  Composite.add(ballComposite, allBalls);
  const floorC = Bodies.rectangle(width / 2, 12, width, 20, {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  });
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const engine = Engine.create({
    gravity: { x: 0.1, y: 0.1 },
  });
  useEffect(() => {
    focusId$.subscribe((id: number) => {
      // TODO add onBlur$
      if (id !== 0) {
        const focusBall2: any = Composite.get(ballComposite, id - 1, 'body');
        focusBall2.render.fillStyle = config[id].color;
        Body.scale(focusBall2, 0.5, 0.5);
      }
      const focusBall: any = Composite.get(ballComposite, id, 'body');
      focusBall.render.fillStyle = '#fff';
      Body.scale(focusBall, 2, 2);
    });
    const render = Render.create({
      element: boxRef.current ? boxRef.current : undefined,
      engine,
      canvas: canvasRef.current ? canvasRef.current : undefined,
      options: {
        width,
        height,
        background: '#777',
        wireframes: false,
      },
    });
    const mouse = Mouse.create(render.canvas);
    const constraint: any = {
      stiffness: 0.2,
      render: { visible: false },
    };
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint,
    });
    Events.on(mouseConstraint, 'mousedown', (e: any) => {
      const mousePosition = e.mouse.position;
      const matchedBodies = Matter.Query.point(
        Composite.allBodies(engine.world),
        mousePosition,
      );
      if (matchedBodies.length > 0 && matchedBodies[0].label === 'Circle Body') {
        if (matchedBodies[0].circleRadius && matchedBodies[0].circleRadius < 50) {
          Body.set(matchedBodies[0], 2, 2);
          matchedBodies[0].render.fillStyle = '#fff'; // TODO highlightColor
          Body.scale(matchedBodies[0], 2, 2);
        } else {
          Body.scale(matchedBodies[0], 0.5, 0.5);
        }
      }
    });
    const boundsA = Matter.Bounds.create([{ x: 0, y: 0 }, { x: width, y: height }]);
    Events.on(engine, 'afterUpdate', () => {
      ballComposite.bodies.forEach((body) => {
        const isInside = Matter.Bounds.contains(boundsA, body.position);
        if (!isInside) {
          // TODO find a random position to place the body
          Matter.Body.setPosition(body, { x: 100, y: 100 });
        }
      });
      const emitBodies = ballComposite.bodies.map((e: any) => ({
        id: e.id,
        x: e.bounds.min.x,
        y: e.bounds.min.y,
        width: e.bounds.max.x - e.bounds.min.x,
        height: e.bounds.max.y - e.bounds.min.y,
      }
      ));
      matterMotor.emit(emitBodies);
    });
    Composite.add(engine.world, mouseConstraint);
    Composite.add(engine.world, [floor, floorC, ballComposite, wall, wallB]);
    Runner.run(engine);
    Render.run(render);
  }, []);

  return (
    <div
      ref={boxRef}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default MatterDOM;
