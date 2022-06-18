import React, { useEffect, useState } from 'react';
import MatterDOM, { strm$ } from './MatterDOM';
import './App.css';

const width = document.body.clientWidth;
const height = window.screen.height;

function App() {
  const [l, setL] = useState(200);
  const [t, setT] = useState(100);
  useEffect(() => {
    strm$.subscribe(([x, y]) => {
      setL(x);
      setT(y);
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
