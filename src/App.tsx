import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import MatterDOM from 'MatterDOM';
import matterMotor from 'matterMotor';
import nasaMeteor from 'data-conversion/nasa-meteor';
import 'App.css';
import data from 'meteor.data';

const focusId$ = new BehaviorSubject(null);
const width = window.innerWidth - 30;
const height = window.innerHeight - 30;
const config = nasaMeteor(data);

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
          // find the config element that corresponds to the body element
          const configElement = config.find((eC) => eC.id === e.id);
          const name = configElement?.name;
          const detailDisplay = (e.width < 110) ? 'none' : 'block';

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
              }}
            >
              <h3
                style={{
                  fontSize: (name && [...name].length > 8) ? '0.9em' : '1.2em',
                  display: 'inline-block',
                  margin: '18px 0 0 0',
                  padding: '2px',
                  backgroundColor: 'rgba(220, 220, 220, 0.5)',
                  borderRadius: '10%',
                }}
              >
                <span style={{
                  opacity: 1.0,
                }}
                >
                  {name}
                </span>
              </h3>
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontWeight: 900,
                }}
              >
                {configElement?.mass}
                <ul
                  style={{
                    display: detailDisplay,
                    margin: 0,
                    padding: '0.5em 0',
                    listStyle: 'none',
                    fontWeight: 500,
                  }}
                >
                  {configElement
                    && Object
                      .entries(configElement.details)
                      .map(([k, v]) => (
                        <li
                          style={{
                            display: 'inline-block',
                            padding: 0,
                          }}
                        >
                          <em
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                              borderRadius: '10%',
                            }}
                          >
                            {k}
                          </em>
                          {' : '}
                          <span
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.5)',
                              borderRadius: '10%',
                            }}
                          >
                            {`${v}`}
                          </span>
                        </li>
                      ))}
                </ul>
              </p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
