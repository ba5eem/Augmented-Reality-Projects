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
  ViroMaterials,
  ViroAnimatedImage,
  ViroARPlane
} from 'react-viro';


console.disableYellowBox=true;


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
    // the box only appears in the space when a plane is detected, with minwidth and height at 0.05 - pretty much any surface counts - i couldnt get the box to only show up on that specific surface. working on that later.

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroARPlane 
          onAnchorFound={()=>console.log('found')}
          minHeight={.05} 
          minWidth={.05} 
          alignment={"Horizontal"}>
            <ViroBox
              height={0.5}
              length={0.5}
              width={0.5}
              position={[0,0,-3]}
              materials="frontMaterial" />

        </ViroARPlane>    
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
      diffuseColor: 'red',
    },
    backMaterial: {
      diffuseColor: '#FF0000',
    },
    sideMaterial: {
      diffuseColor: '#0000FF',
    },
});

module.exports = HelloWorldSceneAR;
