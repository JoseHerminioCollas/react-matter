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
  margin: '0 1em',
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
        <img src="2d-data.svg" width="40" alt="logo" />
        <h1>2DPhysics Data</h1>
        &nbsp; &nbsp;Data From&nbsp;: &nbsp;
        <a href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh" target="new">Nasa</a>
        &nbsp;&nbsp;
        <h3
          style={{ display: 'inline' }}
        >
          100 Heaviest Meteorites&nbsp;
        </h3>
        <FontIcon
          onClick={() => setIsModalOpen(true)}
          aria-label="Information"
          iconName="info"
          className={infoIconClass}
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
          <h3>
            2DPhysics Data:
            <small> Data Visualization with 2D Physics</small>
          </h3>
          <FontIcon
            onClick={() => setIsModalOpen(false)}
            aria-label="Close Window"
            iconName="cancel"
            className={cancelIconClass}
          />
        </div>
        <article className="modal-article">
          <img src="2d-data.svg" width="60" alt="logo" />
          The data displayed is 100 of the Heaviest Meteorites from&nbsp;
          <a href="https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh" target="new">NASA&apos;s Open Data Portal</a>
          <p>
            2DPhysics Data is an exploration of visualizing data with a 2D physics layout.
          </p>
          <p>
            Each data element is represented as a physical body.
            This physical body can move according to the 2D physics it is simulating.
            Data details can be shown or hidden by clicking on the body.
            Tabbing through the elements shows and hides details.
            The resizing of the data elements results in a reflow of the bodies,
            ideally laying out the elements in a way that represents the data clearly.
          </p>
          <a href="https://github.com/JoseHerminioCollas/react-matter/" target="new">GitHub repository</a>
          <p>
            Developed and Designed by&nbsp;
            <a href="https:/goatstone.com" target="new">Goatstone</a>
          </p>
        </article>
      </Modal>
    </div>
  );
}

export default App;
