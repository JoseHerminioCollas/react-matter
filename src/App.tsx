import React, { useEffect, useState } from 'react';
import MatterDOM from './MatterDOM';
import matterMotor from './matterMotor';
import './App.css';

const width = document.body.clientWidth;
const height = window.screen.height;

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
        />
      </div>
      {bodies && bodies
        .map((e: any) => {
          return <div
            style={{
              position: 'absolute',
              left: e.x,
              top: e.y,
              pointerEvents: 'none',
            }}
          >{e.id}</div>;
        })
      }
    </div>
  );
}

export default App;
