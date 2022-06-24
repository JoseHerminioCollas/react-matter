import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { mergeStyles, FontIcon, Modal } from '@fluentui/react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import MatterDOM from 'MatterDOM';
import MatterBodies from 'MatterBodies';
import matterMotor from 'matterMotor';
import nasaMeteor from 'data-conversion/nasa-meteor';
import data from 'meteor.data';

const infoIconClass = mergeStyles({
  fontSize: 25,
  fontWeight: 900,
  height: 25,
  width: 25,
  margin: '0 0.35em',
  cursor: 'pointer',
});
const modalClass = mergeStyles({
  background: '#eee',
  borderRadius: '1em',
  margin: '0 0.35em',
  maxWidth: 500,
  maxHeight: 600,
});
const cancelIconClass = mergeStyles({
  fontSize: 25,
  fontWeight: 900,
  height: 25,
  width: 25,
  margin: '0 0.35em',
  cursor: 'pointer',
});
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          position: 'absolute',
          bottom: '0',
          background: '#999',
          width: '100%',
          height: '50px',
          padding: '0 0.5em',
        }}
      >
        <h3
          style={{ display: 'inline' }}
        >
          100 Heaviest Meteorites&nbsp;
          <a href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh" target="new">Nasa data</a>
          &nbsp;&nbsp;
        </h3>
        <FontIcon
          onClick={() => setIsModalOpen(true)}
          aria-label="Information"
          iconName="info"
          className={infoIconClass}
          style={{ margin: 0 }}
        />
      </div>
      <Modal
        titleAriaId="Goatstone Information"
        onDismiss={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
        isBlocking={false}
        containerClassName={modalClass}
      >
        <div className="modal-header">
          <h3>100 Heaviest Meteorites</h3>
          <FontIcon
            onClick={() => setIsModalOpen(false)}
            aria-label="Close Window"
            iconName="cancel"
            className={cancelIconClass}
          />
        </div>
        <article className="modal-article">
          Data Visualization with 2D Physics
        </article>
      </Modal>
    </div>
  );
}

export default App;
