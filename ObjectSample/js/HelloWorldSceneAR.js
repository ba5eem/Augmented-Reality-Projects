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
  ViroImage
} from 'react-viro';


ViroARTrackingTargets.createTargets({
    "drone" : {
      source : require('../assets/objects/drone.arobject'),
      type : 'Object',
    },
  });

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
        <ViroARObjectMarker target={"drone"} >
          <ViroImage
            height={2}
            width={2}
            scale={[.1, .1, .1]}
            position={[0, .25, 0]}
            source={require("../assets/logo.png")}/>
        </ViroARObjectMarker>
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