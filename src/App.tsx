import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { mergeStyles } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import MatterDOM from 'MatterDOM';
import MatterBodies from 'MatterBodies';
import matterMotor from 'matterMotor';
import nasaMeteor from 'data-conversion/nasa-meteor';
import data from 'meteor.data';

const focusId$ = new BehaviorSubject(null);
const width = window.innerWidth;
const height = window.innerHeight - 50;
const config = nasaMeteor(data);
const appStyle = mergeStyles({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: '#ccc',
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
    <div className={appStyle}>
      <MatterDOM
        width={width}
        height={height}
        matterMotor={matterMotor}
        config={config}
        focusId$={focusId$}
      />
      <MatterBodies
        bodies={bodies}
        config={config}
        focusId$={focusId$}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          background: '#999',
          width: '100%',
          height: '50px',
        }}
      >
        xxx
      </div>
    </div>
  );
}

export default App;
