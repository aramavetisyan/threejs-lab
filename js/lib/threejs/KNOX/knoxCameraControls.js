/**
 *
 * Uses THREE.OrbitControlsCustom (modified for better UX) and THREE.DeviceOrientationControls libraries
 * Requires three cameras
 *
 * scene		- THREE.Scene()
 * camera 		- THREE.PerspectiveCamera
 * position 	- THREE.Vector3
 * offset 		- THREE.Vector3
 * domElement 	- Render dom element
 *
 */

KNOX.CameraControls = function(scene, camera, position, offset, domElement ) {


	var cameraStand = new THREE.Object3D();

	var horizontalPivot = new THREE.PerspectiveCamera( camera.fov , camera.aspect, camera.near, camera.far);
	var verticalPivot = new THREE.PerspectiveCamera( camera.fov , camera.aspect, camera.near, camera.far);
	var backSet = new THREE.Vector3(position.x + offset.x, position.y + offset.y, position.z + offset.z);
	var frontSet = new THREE.Vector3(position.x - 2*offset.x, position.y - 2*offset.y, position.z - 2*offset.z);

	scene.add(cameraStand);
	cameraStand.add(horizontalPivot);
	horizontalPivot.position.copy(backSet);

	horizontalPivot.add(verticalPivot);
	verticalPivot.position.copy(frontSet);

	verticalPivot.add(camera)
	camera.position.copy(backSet);

	/*	var horizontalPivotHelper = new THREE.CameraHelper( horizontalPivot );
	 scene.add( horizontalPivotHelper );
	 var verticalPivotHelper = new THREE.CameraHelper( verticalPivot );
	 scene.add( verticalPivotHelper );
	 var cameraHelper = new THREE.CameraHelper( camera );
	 scene.add( cameraHelper );*/

	this.enabled = true;

	this.orientationControl = null;

	this.dragControlVertical = new THREE.OrbitControls( camera, domElement );
	this.dragControlVertical.target = position;
	this.dragControlVertical.minAzimuthAngle = 0;
	this.dragControlVertical.maxAzimuthAngle = 0;
	this.dragControlVertical.enableDamping = true;
	this.dragControlVertical.dampingFactor = 0.10;
	this.dragControlVertical.enableZoom = false;

	this.dragControlHorizontal = new THREE.OrbitControls( horizontalPivot, domElement );
	this.dragControlHorizontal.target = position;
	this.dragControlHorizontal.minPolarAngle = Math.PI/2;
	this.dragControlHorizontal.maxPolarAngle = Math.PI/2;
	this.dragControlHorizontal.enableDamping = true;
	this.dragControlHorizontal.dampingFactor = 0.10;
	this.dragControlHorizontal.enableZoom = false;

	this.enableDrag = function(){
		scope.dragControlVertical.enabled = true;
		scope.dragControlHorizontal.enabled = true;
	}

	this.disableDrag = function(){
		scope.dragControlVertical.enabled = false;
		scope.dragControlHorizontal.enabled = false;
	}
	this.enableOrientation = function(){
		if(scope.orientationControl){
			scope.orientationControl.enabled = true;
		}
	}

	this.disableOrientation = function(){
		if(scope.orientationControl) {
			scope.orientationControl.enabled = false;
		}
	}

	this.enable = function(){
		scope.enableDrag();
		scope.enableOrientation();
		scope.enabled = true;
	}

	this.disable = function(){
		scope.disableDrag();
		scope.disableOrientation();
		scope.enabled = false;
	}

	this.reset = function(){

		if(scope.dragControlHorizontal){
			scope.dragControlHorizontal.reset()
		}

		if(scope.dragControlVertical){
			scope.dragControlVertical.reset()
		}

		if(scope.orientationControl){
			scope.orientationControl.disconnect();
			scope.orientationControl = new THREE.DeviceOrientationControls(verticalPivot);
			scope.orientationControl.connect();
			scope.orientationControl.update();
		}
	}

	this.update = function(){
		if(!scope.enabled) return;

		if(scope.dragControlHorizontal){
			scope.dragControlHorizontal.update()
		}

		if(scope.dragControlVertical){
			scope.dragControlVertical.update()
		}

		if(scope.orientationControl){
			scope.orientationControl.update()
		}
	};

	this.previewControls = function(){
		if(scope.dragControlHorizontal){
			scope.dragControlHorizontal.previewControls()
		}
	}


	window.addEventListener('deviceorientation', setOrientationControls, true);
	function setOrientationControls(e) {
		if (!e.alpha) {
			return;
		}
		cameraStand.rotation.y = Math.PI;
		scope.orientationControl = new THREE.DeviceOrientationControls(verticalPivot);
		scope.orientationControl.connect();
		scope.orientationControl.update();
		window.removeEventListener('deviceorientation', setOrientationControls, true);
	}
	var scope = this;
	camera.updateMatrixWorld();
}