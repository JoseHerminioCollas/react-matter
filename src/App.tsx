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
      <MatterBodies
        bodies={bodies}
        config={config}
        focusId$={focusId$}
      />
    </div>
  );
}

export default App;
