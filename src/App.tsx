import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import MatterDOM from 'MatterDOM';
import matterMotor from 'matterMotor';
import 'App.css';
import data from 'meteor.data';

const focusId$ = new BehaviorSubject(null);
const width = window.innerWidth - 30;
const height = window.innerHeight - 30;
const config = data
  .slice(0, 100)
  .map((e, i) => {
    const x = (i * 50) % 900;
    const y = Math.floor(i / 15) * 15 + 90;
    const size = 40;
    const rand = Math.round(Math.random() * 5 + 10).toString(16);
    const color = `#${rand}${rand}${rand}`;
    return {
      id: i,
      name: e.name,
      text: e.mass,
      x,
      y,
      size,
      color,
      lineWidth: 2,
    };
  });
function App() {
  const [bodies, setBodies] = useState<any>(null);
  useEffect(() => {
    matterMotor.listen((matterMotorBodies: any) => {
      setBodies(matterMotorBodies);
    });
  }, []);

  return (
    <div className="App">
      <div
        id="frame"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: 'green',
        }}
      >
        <MatterDOM
          width={width}
          height={height}
          matterMotor={matterMotor}
          config={config}
          focusId$={focusId$}
        />
      </div>
      {bodies && bodies
        .map((e: any, i: number) => {
          const configElement = config.find((eC) => eC.id === e.id);
          const text = configElement?.text;
          const name = configElement?.name;

          return (
            <div
              className="matter-dom"
              tabIndex={i}
              key={e.id}
              onFocus={() => focusId$.next(e.id)}
              style={{
                fontSize: '0.9em',
                position: 'absolute',
                left: e.x,
                top: e.y,
                width: e.width,
                height: e.height,
                pointerEvents: 'none',
                overflow: 'hidden',
                padding: '0 12px',
                margin: 0,
                // borderRadius: '50%',
                // border: '3px solid blue',
                // background: 'red',
              }}
            >
              <h3
                style={{ margin: '18px 0' }}
              >
                {name}
              </h3>
              <p
                style={{ padding: 0 }}
              >
                {text}
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
