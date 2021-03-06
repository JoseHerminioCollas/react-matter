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
  const {
    floor, floorC, wall, wallB,
  } = bodies(width, height);
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
  const boxRef = useRef(null);
  const canvasRef = useRef(null);
  const engine = Engine.create({
    gravity: { x: 0.1, y: 0.1 },
  });
  useEffect(() => {
    focusId$.subscribe((id: number) => {
      if (!id) return; // TODO, why is this id null?
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
          matchedBodies[0].render.fillStyle = '#fff'; // TODO highlightColor
          Body.scale(matchedBodies[0], 2.5, 2.5);
        } else {
          Body.scale(matchedBodies[0], 0.4, 0.4);
        }
      }
    });
    const boundsA = Matter.Bounds.create([{ x: 0, y: 0 }, { x: width, y: height }]);
    Events.on(engine, 'afterUpdate', () => {
      ballComposite.bodies.forEach((body) => {
        const isInside = Matter.Bounds.contains(boundsA, body.position);
        if (!isInside) {
          const offSet = 5;
          const x = offSet + (Math.random() * (width - (offSet * 2)));
          const y = offSet + (Math.random() * (height - (offSet * 2)));
          Matter.Body.setPosition(body, { x, y });
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
