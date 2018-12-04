# Augmented Reality
AR Apps Repo - Each branch represent a different demo/feature - check readme for setup guide

### Branch [objectDetection](https://docs.viromedia.com/docs/viroimage)
 - Download [Scanning App](https://developer.apple.com/documentation/arkit/scanning_and_detecting_3d_objects)
 - Open in xcode
 - Run on iOS device
 - Scan object
 - Save object in work dir of ViroReact Project
 - Open Sample ViroMedia Project add in [ViroARObjectMarker](https://docs.viromedia.com/v2.11.0/docs/viroarobjectmarker)
 - Change source to your scanned .arobject file
 - Run app
 - Allow phone to focus on object, ensure you have a good amount of light

### Branch [custom geometry](https://docs.viromedia.com/v2.11.0/docs/virogeometry)
 - Working on this as you read this...unsolved

### Branch [3D Text](https://docs.viromedia.com/v2.11.0/docs/virotext2#section-3d-text)
 - Introduction extrusionDepth with ViroReact
 - Simple example of rendering 3D text
 - All you need for setup is your own API Key from ViroMedia

### Branch [Animated Image](https://docs.viromedia.com/docs/viroanimatedimage)
 - Simple example of gif in AR
 - Two gifs at once - feel free to change uri
 - All you need for setup is your own API Key from ViroMedia

### Branch [Plane Anchoring](https://docs.viromedia.com/docs/viroarplaneselector)
 - Plane detected
 - Object appears in space
 - Working on placing object on Place detected
 - All you need for setup is your own API Key from ViroMedia

### The Math - [Location Based AR](https://github.com/viromedia/viro/issues/131)

```js
const _latLongToMerc=(lat_deg, lon_deg) => {
   let lon_rad = (lon_deg / 180.0 * Math.PI)
   let lat_rad = (lat_deg / 180.0 * Math.PI)
   let sm_a = 6378137.0 // Earth Radius
   let xmeters  = sm_a * lon_rad;
   let ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
   return ({x:xmeters, y:ymeters});
}

const transformPointToAR = (lat, long, deviceLatitude, deviceLongitude) => {
  let objPoint = _latLongToMerc(lat, long);
  let devicePoint = _latLongToMerc(deviceLatitude, deviceLongitude);
  let objFinalPosZ = objPoint.y - devicePoint.y;
  let objFinalPosX = objPoint.x - devicePoint.x;
  return ({x:objFinalPosX, z:-objFinalPosZ});
}```
