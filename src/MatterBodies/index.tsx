import React, { useEffect, useState } from 'react';
import { mergeStyles, mergeStyleSets } from '@fluentui/react';
import Matter from 'matter-js';

const bodiesStyle = mergeStyleSets({
  container: {
    fontSize: '0.65em',
    position: 'absolute',
    pointerEvents: 'none',
    // overflow: 'hidden',
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
type MatterBodiesI = (props: {
  bodies: any, config: any, focusId$: any
}) => React.ReactElement

const MatterBodies: MatterBodiesI = function ({ bodies, config, focusId$ }) {
  return (
    <div>
      {bodies && bodies
        .map((e: any, i: number) => {
          // find the config element that corresponds to the body element
          const configElement = config.find((eC: { id: any; }) => eC.id === e.id);
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
                {configElement?.subHeader}
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
};

export default MatterBodies;
