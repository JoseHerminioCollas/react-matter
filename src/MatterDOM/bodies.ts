import Matter from 'matter-js';

const {
  Bodies,
} = Matter;
const wallColor = '#111';
export default (width: number, height: number) => {
  const wall = Bodies.rectangle(0, height / 2, 10, height, {
    isStatic: true,
    render: {
      fillStyle: wallColor,
    },
  });
  const wallB = Bodies.rectangle(width - 3, height / 2, 10, height, {
    isStatic: true,
    render: {
      fillStyle: wallColor,
    },
  });
  const floor = Bodies.rectangle(width / 2, height, width, 20, {
    isStatic: true,
    render: {
      fillStyle: wallColor,
    },
  });
  const floorC = Bodies.rectangle(width / 2, 12, width, 20, {
    isStatic: true,
    render: {
      fillStyle: wallColor,
    },
  });
  return {
    floor, wall, wallB, floorC,
  };
};
