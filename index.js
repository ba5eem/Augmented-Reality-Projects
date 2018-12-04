console.log('sanisssty');
let northElem = document.getElementById('north');
let southElem = document.getElementById('south');
let eastElem = document.getElementById('east');
let westElem = document.getElementById('west');
//console.log(Object.keys(sphere))
//console.log(sphere.object3D.position)
//sphere.object3D.position.y = 2;


function _latLongToMerc(lat_deg, lon_deg){
   let lon_rad = (lon_deg / 180.0 * Math.PI) // longitude radius
   let lat_rad = (lat_deg / 180.0 * Math.PI) // latitude radius
   let sm_a = 6378137.0 // Earth Radius
   let xmeters  = sm_a * lon_rad;
   let ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad))
   return ({x:xmeters, y:ymeters});
}

function transformPointToAR(lat, long, deviceLatitude, deviceLongitude){
  let objPoint = _latLongToMerc(lat, long);
  let devicePoint = _latLongToMerc(deviceLatitude, deviceLongitude);
  let objFinalPosZ = objPoint.y - devicePoint.y;
  let objFinalPosX = objPoint.x - devicePoint.x;
  return ({x:objFinalPosX, z:-objFinalPosZ});
}

let obs = {
  lat: 21.309078,
  lng: -157.808682
};

let N = {
  lat: 21.309479,
  lng: -157.808682
};

let S = {
  lat: 21.308597,
  lng: -157.808685
};

let E = {
  lat: 21.309051,
  lng: -157.808213
};

let W = {
  lat: 21.309059,
  lng: -157.809173
};



let north = {
	x: transformPointToAR(N.lat, N.lng, obs.lat, obs.lng).x,
	z: transformPointToAR(N.lat, N.lng, obs.lat, obs.lng).z
}

let south = {
	x: transformPointToAR(S.lat, S.lng, obs.lat, obs.lng).x,
	z: transformPointToAR(S.lat, S.lng, obs.lat, obs.lng).z
}

let east = {
	x: transformPointToAR(E.lat, E.lng, obs.lat, obs.lng).x,
	z: transformPointToAR(E.lat, E.lng, obs.lat, obs.lng).z
}

let west = {
	x: transformPointToAR(W.lat, W.lng, obs.lat, obs.lng).x,
	z: transformPointToAR(W.lat, W.lng, obs.lat, obs.lng).z
}

console.log(north)
northElem.object3D.position.x = north.x;
northElem.object3D.position.z = -north.z;
console.log(south)
southElem.object3D.position.x = south.x;
southElem.object3D.position.z = -south.z;
console.log(east)
eastElem.object3D.position.x = east.x;
eastElem.object3D.position.z = -east.z;
console.log(west)
westElem.object3D.position.x = west.x;
westElem.object3D.position.z = -west.z;




