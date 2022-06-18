import Matter, { Runner } from 'matter-js';

const {
    Bodies,
    Composites,
} = Matter;

export default (width: number, height: number) => {
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
        return Bodies.circle(x, y, 40);
    });
    var stack2 = Composites.stack(0, 0, 1, 1, 0, 0, function (x: number, y: number) {
        return Bodies.circle(x, y, 40, {
            render: {
                fillStyle: 'red',
            },
        });
    });

    return { floor, ball, stack, stack2, wall, wallB };
}