global.self = global;

import { THREE } from 'expo-three';
import React from 'react';
import { ScreenOrientation } from 'expo';
import MainScreen from './Main.js';

console.ignoredYellowBox = ['Module', 'Class'];


export default class App extends React.Component {
  componentDidMount() {
    ScreenOrientation.allow(ScreenOrientation.Orientation.ALL);
    THREE.suppressExpoWarnings();
  }

  render() {
    return <MainScreen />;
  }
}
