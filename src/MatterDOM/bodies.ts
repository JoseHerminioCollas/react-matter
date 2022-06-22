import Matter from 'matter-js';

const {
  Bodies,
} = Matter;

export default (width: number, height: number) => {
  const wall = Bodies.rectangle(0, height / 2, 10, height, {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  });
  const wallB = Bodies.rectangle(width - 3, height / 2, 10, height, {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  });
  const floor = Bodies.rectangle(width / 2, height, width, 20, {
    isStatic: true,
    render: {
      fillStyle: 'blue',
    },
  });

  return {
    floor, wall, wallB,
  };
};
