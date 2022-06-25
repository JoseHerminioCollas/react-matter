# 2DPhysics Data

<img src="art/2d-data.svg" alt="logo" style="width:100px;"/>

## Data Visualization with 2D Physics

The data used is from Nasa: [100 Heaviest Meteorites](https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh)

2DPhysics Data is an exploration of visualizing data with a 2D physics layout. 

Each data element is represented as a physical body. This physical body can move according to the 2D physics it is simulating. Data details can be shown or hidden by clicking on the the body. Tabing through the element can be used to show and hide details. The resizing results in a reflow of the bodies, ideally layiing out the elements in a way that represents the data clearly. 

This layout is inspired by D3s' Force Layout.
D3s' Force layout strategy is limited in what it can do. By using a 2D enging like Matter.js. There are a number of features that can be utilized to aid in the viualization of data. 

Main technologies used:
React.js, Matter.js, RxJS, FluentUI

2D engine to DOM communication

The Matter.js library uses a canvas element to represent the 2D world. In this experiment the values gernerated by the 2D engine are used to run another engine "matterMotor" that runs a DOM simulation of the world. The DOM elements can be utilized for text layout or any effect that the DOM offers. This makes dealing with varialbe size data a lot easier then if if were to be represented in the canvas element. 

## A cicular pattern

MatterCanvas     ----> matterMotor

matterMotor      ----> React State/MatterDom

MatterDom events ----> MatterCanvas

The MatterCanvas powers the matterMotor which then runs MatterDOM. Events from the MatterDOM can control the MatterCanvas. 
Events like the focus of a DOM element can be sent to MatterCanvas to display a body size change. This circular system can cause problems. The clirclar system is a solution for coordinating the Matter canvas display to a DOM display.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

