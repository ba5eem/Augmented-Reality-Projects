import React from 'react';
import { AR, Asset } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import * as lib from './libs';
import {AR as ArrayMethods} from './AR-Object-Methods';
import TouchableView from './TouchableView';
import { clear } from './ClearScreen.js';
const _ = require('lodash');
clear();

export default class MainScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      data: true
    }
  }
  touch = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  updateTouch = (e) => {
    let x = e.locationX;
    let y = e.locationY;
    console.log(Object.keys(e))
    this.touch.x = x / 375 * 2 - 1;
    this.touch.y = -(y / 812) * 2 + 1;
    //this.runHitTest();
  };

  runHitTest = () => {
    this.raycaster.setFromCamera(this.touch, this.camera);
    const intersects = this.raycaster.intersectObjects(this.planes.children);
    for (const intersect of intersects) {
      const { distance, face, faceIndex, object, point, uv } = intersect;
      this.sphere.position.set(point.x, point.y, point.z);
      this.sphere.visible = true;
    }
  };

  componentWillMount() {
    THREE.suppressExpoWarnings(true);
  }
  componentWillUnmount() {
    THREE.suppressExpoWarnings(false);
  }


  render() {
    // Create an `ExpoGraphics.GLView` covering the whole screen, tell it to call our
    // `onContextCreate` function once it's initialized.
    return (
      <TouchableView
        style={{ flex: 1 }}
        onTouchesBegan={(e)=>this.updateTouch(e)}
        onTouchesMoved={({ locationX, locationY }) =>
          this.updateTouch({ x: locationX, y: locationY })}
        onTouchesEnded={() => console.log('ended')}>
        <GraphicsView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          isArRunningStateEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={AR.TrackingConfigurations.World}
        />
      </TouchableView>
    );
  }

  onContextCreate = async ({ gl, canvas, width, height, scale: pixelRatio }) => {

    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });



    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);

    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
    console.log(width, height)

    const inch = 0.0254;
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    });
    
    // Combine our geometry and material
    this.cube = new THREE.Mesh(geometry, material);
    // Add the cube to the scene
    this.cube.position.z = -10;
    this.scene.add(this.cube);
    this.cube = this.cube;


  };



  onResize = ({ width, height, scale }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = () => {
    if (this.arSession) {
      this.points.updateWithSession(this.arSession);
      this.planes.updateWithSession(this.arSession);
    }

    this.renderer.render(this.scene, this.camera);
  };
}
