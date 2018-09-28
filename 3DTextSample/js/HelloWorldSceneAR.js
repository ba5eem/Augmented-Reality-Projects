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

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText fontSize={48}
          style={styles.boldFont} 
          position={[0, 0, -8]}
          rotation={[-20,45,0]}
          width={20} 
          height={5} 
          extrusionDepth={8}
          materials={["frontMaterial", "backMaterial", "sideMaterial"]}
          text="ARL" />
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

// Outside render function
          
var styles = StyleSheet.create({
    boldFont: {
         color: '#FFFFFF',
         flex: 1,
         textAlignVertical: 'center',
         textAlign: 'center',
         fontWeight: 'bold',
    },
});

ViroMaterials.createMaterials({
    frontMaterial: {
      diffuseColor: '#FFFFFF',
    },
    backMaterial: {
      diffuseColor: '#FF0000',
    },
    sideMaterial: {
      diffuseColor: '#0000FF',
    },
});

module.exports = HelloWorldSceneAR;
