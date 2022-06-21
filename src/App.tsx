import React, { useEffect, useState } from 'react';
import MatterDOM from './MatterDOM';
import matterMotor from './matterMotor';
import './App.css';

const width = window.innerWidth - 30;
const height = window.innerHeight - 30;
// config data, generate bodies from this config data
const config = [...Array(100)].map((e, i) => {
  const x = (i * 50) % 900;
  const y = Math.floor(i / 15) * 15 + 90;
  const size = 40;
  const rand = Math.round(Math.random() * 10 + 5).toString(16)
  const color = `#${rand}${rand}${rand}`;
  return {
    id: i,
    name: ` ${String(i)} `,
    text: 'Lorem ipsum dolor sit amet consectetur '.repeat(5),
    x,
    y,
    size,
    color,
    lineWidth: 2
  }

})
function App() {
  const [bodies, setBodies] = useState<any>(null);
  useEffect(() => {
    matterMotor.listen((bodies: any) => {
      setBodies(bodies);
    })
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
        />
      </div>
      {bodies && bodies
        .map((e: any, i: number) => {
          const configElement = config.find(eC => eC.id === e.id);
          const text = configElement?.text;
          const name = configElement?.name;

          return <div
            tabIndex={i}
            key={e.id}
            style={{
              position: 'absolute',
              left: e.x + 13,
              top: e.y,
              width: e.width,
              height: e.height,
              pointerEvents: 'none',
              overflow: 'hidden',
              border: '1px solid',
              borderRadius: '50%'
            }}
          >
            <h3>{name}</h3>
            <p
              style={{ padding: 0 }}
            >
              {text}
            </p>
          </div>
        })
      }
    </div>
  );
}

export default App;
