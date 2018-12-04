<!DOCTYPE html>
<html>
  <head>
    <style>
    p {

      font-family: verdana;
      font-size: 40px;
      color: black;

    }

    #container {
    	position: fixed;
    	right: 5px;
    	top: 1px;
    	transform: rotate(-90deg);
    }
    </style>
    <title>Compass</title>
<!--     <script src="./compass.js"></script> -->
    <script src="https://aframe.io/releases/0.7.1/aframe.min.js"></script>
		<script src="https://google-ar.github.io/three.ar.js/dist/three.ar.js"></script>
		<script src="https://rawgit.com/chenzlabs/aframe-ar/827e9db/dist/aframe-ar.min.js"></script>
  </head>
  <body>
    <br><br>
			<a-scene ar>
    		<div id="container"><p id="heading">203</p></div>
    		<a-sphere id="north" position="0 -0.2 -1.25" radius="1" color="red"></a-sphere>
		    <a-sphere id="south" position="0 -0.2 -1.25" radius="1" color="orange"></a-sphere>
		    <a-sphere id="east" position="0 -0.2 -1.25" radius="1" color="green"></a-sphere>
		    <a-sphere id="west" position="0 -0.2 -1.25" radius="1" color="blue"></a-sphere>

		    <a-entity camera></a-entity>
			</a-scene>

  </body>
<!--   <script src="./index.js"></script> -->
</html>