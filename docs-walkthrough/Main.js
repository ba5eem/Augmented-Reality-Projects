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



const cyan = (arg) => {
    let bgCyan = '\x1b[46m%s\x1b[0m';
    console.log(bgCyan,bgCyan,bgCyan,bgCyan,bgCyan,arg);
};
cyan(ArrayMethods.length);


// Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
const geometry = new THREE.BoxGeometry(2, 2, 2);
// Simple color material
const material = new THREE.MeshPhongMaterial({
  color: 0xff00ff,
});


// review all lib function on libs.js file
// I moved into seperate file so it wasnt so crammed here
// Each function has link to docs for further analysis
// Detection Image please look at Branch: imageDetection for example

class MainScreen extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      docs: false
    }
  }



  


  async componentDidMount() {
    THREE.suppressExpoWarnings(true)


    let isARvailable = await AR.isAvailable(); //  https://docs.expo.io/versions/v31.0.0/sdk/AR#isavailable
    let getVersion = await AR.getVersion(); // https://docs.expo.io/versions/v31.0.0/sdk/AR#getversion

    lib.onFrameDidUpdate(); // libs.js line: 6
    lib.onCameraDidChangeTrackingState(); // libs.js line: 19
    lib.getCurrentFrame() // libs.js line 43

    AR.onDidFailWithError(({ err }) => { console.log(err) });
    // https://docs.expo.io/versions/v31.0.0/sdk/AR#ondidfailwitherror--error----
    AR.onSessionWasInterrupted(() => { console.log("interrupted") });
    // https://docs.expo.io/versions/v31.0.0/sdk/AR#onsessionwasinterrupted----
    AR.onSessionInterruptionEnded(() => { console.log('interruption over') });
    // https://docs.expo.io/versions/v31.0.0/sdk/AR#onsessioninterruptionended----

  }




  
  render() {
    const world = AR.TrackingConfigurations.World;
    const face = AR.TrackingConfigurations.face;

    return (
      <TouchableView
        style={{ flex: 1 }}
        shouldCancelWhenOutside={false}
        onTouchesBegan={this.onTouchesBegan}>

        <GraphicsView
          style={{ flex: 1 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          isArRunningStateEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={world}/>


      </TouchableView>
    );
  }

  onContextCreate = async event => {
    this.arSetup();
    this.commonSetup(event);
  }

  arSetup = () => {
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);
    // https://docs.expo.io/versions/v31.0.0/sdk/AR#plane-detection
    // not quite what i was hoping for - but very easy to setup.
    // to see code example, look at commit: setPlaneDetection
  }

  // When our context is built we can start coding 3D things.
  commonSetup = ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces

    //lib.HitTestResultTypes('VerticalPlane'); // libs.js line: 35
    //lib.getPlaneAnchor(); // check commit history for example: ARPlaneAnchor - libs.js line: 54
    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });



    this.scene = new THREE.Scene();
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  // Called every frame.
  onRender = () => {
    this.renderer.render(this.scene, this.camera);
  };


  onTouchesBegan = async ({ locationX: x, locationY: y }) => {
    if (!this.renderer) {
      return;
    }

    const size = this.renderer.getSize();
    console.log('touch', { x, y, ...size });

    const { hitTest } = await AR.performHitTest(
      {
        x: x / size.width,
        y: y / size.height,
      },
      AR.HitTestResultTypes.HorizontalPlane
    );
    //console.log(hitTest);
    for (let hit of hitTest) {
      console.log('fired- ------>', hit)
      const { worldTransform } = hit;
      if (this.cube) {
        console.log('remove;)')
        this.scene.remove(this.cube);
      }

      const geometry = new THREE.BoxGeometry(0.0254, 0.0254, 0.0254);
      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
      });

      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
      this.cube.matrixAutoUpdate = false;

      const matrix = new THREE.Matrix4();
      matrix.fromArray(worldTransform);

      this.cube.applyMatrix(matrix);
      this.cube.updateMatrix();
    }
  };

}


export default MainScreen;
