import React, { useEffect, useState } from 'react';
import MatterDOM from './MatterDOM';
import matterMotor from './matterMotor';
import './App.css';

const width = document.body.clientWidth;
const height = window.screen.height;

function App() {
  const [l, setL] = useState(200);
  const [t, setT] = useState(100);
  useEffect(() => {
    matterMotor.listen((coords: number[]) => {
      setL(coords[0]);
      setT(coords[1]);
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
        <div style={{
          position: 'absolute',
          left: l,
          top: t,
          fontSize: 120,
          pointerEvents: 'none',
        }}>ABC</div>
      </div>
    </div>
  );
}

export default App;
