'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARTrackingTargets,
  ViroARObjectMarker,
  ViroBox,
  ViroImage,
  ViroGeometry,
  ViroMaterials
} from 'react-viro';





export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }


  

  render() {
    const materials = ViroMaterials.createMaterials({
      redMaterial: {
        diffuseColor: 'red'
      }
    });
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroGeometry 
          position={[-2.5, 0, -0.1]} 
          scale={[1.0, 1.0, 1.0]}
          materials="redMaterial"
          vertices={[ [1, 0, 0], [0, 1, 0], [-1, 0, 0] ]}
          normals={[ [0, 0, 1], [0, 0, 1], [0, 0, 1] ]}
          texcoords={[ [1, 0], [0, 1], [-1, 0] ]}
          triangleIndices={[ [0, 1, 2 ] ]} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldSceneAR;
