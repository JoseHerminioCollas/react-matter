import React, { useEffect, useState } from 'react';
import MatterDOM from './MatterDOM';
import matterMotor from './matterMotor';
import './App.css';

const width = window.innerWidth - 30;
const height = window.innerHeight - 30;

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
            key={e.id}
            style={{
              position: 'absolute',
              left: e.x,
              top: e.y,
              width: e.width,
              height: e.height,
              border: '1px solid red',
              pointerEvents: 'none',
              overflow: 'hidden',
              borderRadius: '50px'
            }}
          >
            <h3>{e.id}</h3>
            <p
              style={{ padding: 0 }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto doloribus blanditiis, voluptatibus hic deleniti fugit, debitis mollitia impedit corrupti, recusandae voluptas soluta et aliquam odio veritatis facere maxime dolorem culpa! ;
            </p>
          </div>
        })
      }
    </div>
  );
}

export default App;
