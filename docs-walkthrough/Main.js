import React from 'react';
import { AR, Asset } from 'expo';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
import { View as GraphicsView } from 'expo-graphics';
import { NativeModules } from 'react-native';
import * as lib from './libs';

import * as ARUtils from './ar-utils';
const _ = require('lodash');


const { ExponentAR } = NativeModules;

class MainScreen extends React.Component {
  handleAnchor = (anchor, eventType) => {
    if (eventType === AR.AnchorEventTypes.Add) {
      // Something added!
    } else if (eventType === AR.AnchorEventTypes.Remove) {
      // Now it's changed
    } else if (eventType === AR.AnchorEventTypes.Update) {
      // Now it's gone...
    }
  };

  handlePlane = (anchor, eventType) => {
    if (eventType === AR.AnchorEventTypes.Add) {
      // Something added!
    } else if (eventType === AR.AnchorEventTypes.Remove) {
      // Now it's changed
    } else if (eventType === AR.AnchorEventTypes.Update) {
      // Now it's gone...
    }
  };

  // When the provided image is found in real life, it'll be shown here.
  handleImage = (anchor, eventType) => {
    const { identifier, image, transform } = anchor;
    console.log('Do something with discovered image');
    if (eventType === AR.AnchorEventTypes.Add) {
      // Something added!
    } else if (eventType === AR.AnchorEventTypes.Remove) {
      // Now it's changed
    } else if (eventType === AR.AnchorEventTypes.Update) {
      // Now it's gone...
    }
  };

  handleFace = (anchor, eventType) => {
    if (eventType === AR.AnchorEventTypes.Add) {
      // Something added!
    } else if (eventType === AR.AnchorEventTypes.Remove) {
      // Now it's changed
    } else if (eventType === AR.AnchorEventTypes.Update) {
      // Now it's gone...
    }
  };

  async componentWillMount() {
    AR.onFrameDidUpdate(() => {

      const { lightEstimation, rawFeaturePoints, capturedDepthData, anchors } = AR.getCurrentFrame({
        lightEstimation: true,
        rawFeaturePoints: true,
        capturedDepthData: true,
        anchors: {},
      });
      if(!_.isEmpty(rawFeaturePoints)) {
          console.log('rawFeaturePoints: ', rawFeaturePoints);
        }

      if(!_.isEmpty(lightEstimation)) {
          //console.log('lightEstimation: ', lightEstimation);
        }

      if(!_.isEmpty(capturedDepthData)) {
          console.log('capturedDepthData: ', capturedDepthData);
        }

      if(!_.isEmpty(anchors)) {
          console.log('anchors: ', anchors);
        }


      if (lightEstimation && this.light) {
        // const {
        //   ambientIntensity,
        //   ambientColorTemperature,
        //   // These will only be returned with front facing AR
        //   primaryLightDirection,
        //   primaryLightIntensity,
        // } = lightEstimation;

        this.light.data = lightEstimation;
      }
      // This is the depth info from the iPhoneX front camera
      // if (capturedDepthData) {
      //   const {
      //     depthDataQuality,
      //     depthDataAccuracy,
      //     depthDataFiltered,
      //     cameraCalibrationData,
      //   } = capturedDepthData;

      //   const {
      //     intrinsicMatrix,
      //     intrinsicMatrixReferenceDimensions, // {width, height}
      //     extrinsicMatrix,
      //     pixelSize,
      //     lensDistortionLookupTable,
      //     inverseLensDistortionLookupTable,
      //     lensDistortionCenter, // {x, y}
      //   } = cameraCalibrationData;
      // }

      if (Array.isArray(anchors) && this.planes) {
        const planes = anchors.filter(({ type }) => type === 'ARPlaneAnchor');
        this.planes.data = planes;
      }

      // Really not much to do with raw feature points, so here's this pretty dot visualizer...
      if (this.points) {
        this.points.data = rawFeaturePoints;
      }
      // console.log('A: isLightEstimationEnabled', AR.getAutoFocusEnabled());
      // AR.getAutoFocusEnabled(false);
    });

    AR.onDidFailWithError(({ error }) => {
      console.error(error);
    });

    AR.onAnchorsDidUpdate(({ anchors, eventType }) => {
      // console.log('anchors did update');
      for (let anchor of anchors) {
        // console.log('handle anchor:', anchor.type);
        switch (anchor.type) {
          case AR.AnchorTypes.Anchor:
            this.handleAnchor(anchor, eventType);
            break;
          case AR.AnchorTypes.Plane:
            this.handlePlane(anchor, eventType);
            break;
          case AR.AnchorTypes.Face:
            this.handleFace(anchor, eventType);
            break;
          case AR.AnchorTypes.Image:
            this.handleImage(anchor, eventType);
            break;
          default:
            break;
        }
      }
    });

    AR.onCameraDidChangeTrackingState(({ trackingState, trackingStateReason }) => {});

    AR.onSessionWasInterrupted(() => {
      console.log('Backgrounded App: Session was interrupted');
    });

    AR.onSessionInterruptionEnded(() => {
      console.log('Foregrounded App: Session is no longer interrupted');
    });
  }

  render() {
    const world = AR.TrackingConfigurations.World;
    const face = AR.TrackingConfigurations.Face;

    return (
      <GraphicsView
        style={{ flex: 1 }}
        onContextCreate={this.onContextCreate}
        onRender={this.onRender}
        onResize={this.onResize}
        arTrackingConfiguration={world}
        isArEnabled
        isArRunningStateEnabled
        isArCameraStateEnabled
      />
    );
  }


    // When our context is built we can start coding 3D things.
  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setWorldAlignment(AR.WorldAlignmentTypes.Gravity);
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

    lib.HitTestResultTypes('VerticalPlane');

    console.log('Version: ', AR.getVersion());
    console.log('ARFaceTrackingConfiguration: ', ExponentAR.ARFaceTrackingConfiguration);
    console.log(
      'AROrientationTrackingConfiguration: ',
      ExponentAR.AROrientationTrackingConfiguration
    );
    console.log('ARWorldTrackingConfiguration: ', ExponentAR.ARWorldTrackingConfiguration);

    if (AR.getVersion() === '1.5') {
      AR.setAutoFocusEnabled(true);
      console.log('A: is Auto Focus Enabled', AR.getAutoFocusEnabled());
      AR.setAutoFocusEnabled(false);
      console.log('B: is Auto Focus Enabled', AR.getAutoFocusEnabled());

      AR.setLightEstimationEnabled(true);
      console.log('A: isLightEstimationEnabled', AR.getLightEstimationEnabled());
      AR.setLightEstimationEnabled(false);
      console.log('B: isLightEstimationEnabled', AR.getLightEstimationEnabled());

      console.log('FaceTrackingVideoFormats:', ExponentAR.FaceTrackingVideoFormats);
      console.log('WorldTrackingVideoFormats:', ExponentAR.WorldTrackingVideoFormats);
      console.log('OrientationTrackingVideoFormats:', ExponentAR.OrientationTrackingVideoFormats);

      AR.setProvidesAudioData(true);
      console.log('A: Provides Audio Data', AR.getProvidesAudioData());
      AR.setProvidesAudioData(false);
      console.log('B: Provides Audio Data', AR.getProvidesAudioData());

      Object.keys(AR.PlaneDetectionTypes).forEach(key => {
        const planeDetectionType = AR.PlaneDetectionTypes[key];
        AR.setPlaneDetection(planeDetectionType);
        console.log('Plane Detection: ', key, planeDetectionType, AR.getPlaneDetection());
      });

      Object.keys(AR.WorldAlignmentTypes).forEach(key => {
        const worldAlignmentType = AR.WorldAlignmentTypes[key];
        AR.setWorldAlignment(worldAlignmentType);
        console.log('World Alignment: ', key, AR.getWorldAlignment());
      });

      console.log('isFrontCameraAvailable:', AR.isFrontCameraAvailable());
      console.log('isRearCameraAvailable:', AR.isRearCameraAvailable());

      Object.keys(AR.TrackingConfigurations).forEach(key => {
        const trackingConfiguration = AR.TrackingConfigurations[key];
        // AR.setConfigurationAsync(trackingConfiguration);
        console.log(
          'isConfigurationAvailable:',
          key,
          AR.isConfigurationAvailable(trackingConfiguration)
        );
      });
    }









    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height,
    });

    // We will add all of our meshes to this scene.
    this.scene = new THREE.Scene();
    // This will create a camera texture and use it as the background for our scene
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    // Now we make a camera that matches the device orientation. 
    // Ex: When we look down this camera will rotate to look down too!
    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);
    
    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // Simple color material
    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff,
    });
    
    // Combine our geometry and material
    this.cube = new THREE.Mesh(geometry, material);
    // Place the box 0.4 meters in front of us.
    this.cube.position.z = -10
    // Add the cube to the scene
    this.scene.add(this.cube);
    
    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xffffff));

    // Create this cool utility function that let's us see all the raw data points.
    this.points = new ThreeAR.Points();
    // Add the points to our scene...
    this.scene.add(this.points)

    this.setupARUtils();














  };










  setupARUtils = () => {
    this.points = new ARUtils.Points();
    this.scene.add(this.points);
    this.light = new ARUtils.Light(0x222222);
    this.scene.add(this.light);
    this.planes = new ARUtils.Planes();
    this.scene.add(this.planes);
  };

  onResize = ({ x, y, scale, width, height }) => {

    if (!this.renderer) {
      return;
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  onRender = delta => {

    this.points.update()

    this.renderer.render(this.scene, this.camera);
  };
}
export default MainScreen;
