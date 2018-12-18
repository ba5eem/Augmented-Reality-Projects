import React from 'react';
import { AR, Asset } from 'expo';

const _ = require('lodash');

export const onFrameDidUpdate = () => {
	// https://docs.expo.io/versions/v31.0.0/sdk/AR#onframedidupdate----
	// use this to console log any frame updates
	AR.onFrameDidUpdate((data) => { 
	  if(!_.isEmpty(data)) {
	    console.log('FrameDidUpdate: ', data);
	    return data;
	  }
	});

}


export const onCameraDidChangeTrackingState = () => {
	// https://docs.expo.io/versions/v31.0.0/sdk/AR#oncameradidchangetrackingstate--trackingstate-trackingstate-trackingstatereason-trackingstatereason-
	AR.onCameraDidChangeTrackingState( ({ trackingState: TrackingState, trackingStateReason: TrackingStateReason }) => {
		// outputs tips / reasons why things may not be tracking
		// can use to set state to help user understand why it may not be working
	  console.log('TrackingState: ',TrackingState); 
	  console.log('TrackingStateReason', TrackingStateReason);

	  return { 
	  	trackingState: TrackingState, 
	  	trackingStateReason: TrackingStateReason 
	  }
	})
}


export const HitTestResultTypes = ( type ) => {
	// https://docs.expo.io/versions/v31.0.0/sdk/AR#performhittestpoint-types-hittestresulttype
	// this will adds points when camera hits something as it moves
	let hitType = `${type}`
	AR.HitTestResultTypes.hitType;
}




AR.HitTestResultTypes.VerticalPlane;

