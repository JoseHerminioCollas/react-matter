import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { mergeStyles, mergeStyleSets } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import MatterDOM from 'MatterDOM';
import matterMotor from 'matterMotor';
import nasaMeteor from 'data-conversion/nasa-meteor';
import data from 'meteor.data';

const focusId$ = new BehaviorSubject(null);
const width = window.innerWidth - 30;
const height = window.innerHeight - 30;
const config = nasaMeteor(data);
const appStyle = mergeStyles({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: '#ccc',
  textAlign: 'center',
});
const bodiesStyle = mergeStyleSets({
  container: {
    fontSize: '0.9em',
    position: 'absolute',
    pointerEvents: 'none',
    overflow: 'hidden',
    padding: '0 12px',
    margin: 0,
    outline: 'none',
    textAlign: 'center',
  },
  header: {
    display: 'inline-block',
    margin: '18px 0 0 0',
    padding: '2px',
    backgroundColor: 'rgba(220, 220, 220, 0.5)',
    borderRadius: '10%',
  },
  subHeader: {
    margin: 0,
    padding: 0,
    fontWeight: 900,
  },
  details: {
    margin: '0.3em 0.3em',
    padding: 0,
    listStyle: 'none',
    fontWeight: 500,
  },
  detail: {
    display: 'inline-block',
    padding: 0,
  },
  detailBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10%',
  },
  opaque: {
    opacity: 1.0,
  },
});

function App() {
  initializeIcons();
  const [bodies, setBodies] = useState<any>(null);
  useEffect(() => {
    matterMotor.listen((matterMotorBodies: any) => {
      setBodies(matterMotorBodies);
    });
  }, []);

  return (
    <div>
      <div
        id="frame"
        className={appStyle}
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
              className={bodiesStyle.container}
              tabIndex={i}
              key={e.id}
              onFocus={() => focusId$.next(e.id)}
              style={{
                left: e.x,
                top: e.y,
                width: e.width,
                height: e.height,
              }}
            >
              <h3
                className={bodiesStyle.header}
                style={{
                  fontSize: (name && [...name].length > 8) ? '0.9em' : '1.2em',
                }}
              >
                <span className={bodiesStyle.opaque}>
                  {name}
                </span>
              </h3>
              <h5 className={bodiesStyle.subHeader}>
                {configElement?.mass}
              </h5>
              <ul
                className={bodiesStyle.details}
                style={{
                  display: detailDisplay,
                }}
              >
                {configElement
                  && Object
                    .entries(configElement.details)
                    .map(([k, v]: any) => (
                      <li className={bodiesStyle.detail}>
                        <em className={bodiesStyle.detailBackground}>
                          {k}
                        </em>
                        {' : '}
                        <span
                          className={bodiesStyle.detailBackground}
                        >
                          {v}
                        </span>
                      </li>
                    ))}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export default App;
