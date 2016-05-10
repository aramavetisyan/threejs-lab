/*
Uses THREE.OrbitControls and THREE.DeviceOrientationControls libraries (see https://github.com/mrdoob/three.js/tree/master/examples/js/controls)
Requires three cameras {
	horizontalPivotCamera is for horizontal dragging, this camera must hold the verticalPivotCamera (horizontalPivotCamera.add(verticalPivotCamera)) ,
	verticalPivotCamera is for vertical dragging, this camera must hold the main camera  (verticalPivotCamera.add(camera))
	camera is the camera that is used for rendering
}
*/

KNOX.VRControls = function( horizontalPivotCamera, verticalPivotCamera, camera, domElement ) {
    
    this.orientationControl = null
    
    
    this.dragControlVertical = new THREE.OrbitControls( camera, domElement );
	this.dragControlVertical.minAzimuthAngle    = 0; 
    this.dragControlVertical.maxAzimuthAngle    = 0;
	this.dragControlVertical.enableDamping      = false;
	this.dragControlVertical.enableZoom         = false;
	
	this.dragControlHorizontal = new THREE.OrbitControls( horizontalPivotCamera, domElement );
	this.dragControlHorizontal.minPolarAngle  	= Math.PI/2; 
    this.dragControlHorizontal.maxPolarAngle	= Math.PI/2;
	this.dragControlHorizontal.enableDamping    = false;
	this.dragControlHorizontal.enableZoom       = false;
	
	this.enableDrag = function(){
	    scope.dragControlVertical.enabled       = true;
	    scope.dragControlHorizontal.enabled     = true;
	}	
	
	this.disableDrag = function(){
	    scope.dragControlVertical.enabled       = false;
	    scope.dragControlHorizontal.enabled     = false;
	}	
	this.enableOrientation = function(){
	    scope.orientationControl.enabled        = true;
	}	
	
	this.disableOrientation = function(){
	    scope.orientationControl.enabled        = false;
	}
	
	this.enable = function(){
	    scope.enableDrag();
	    scope.enableOrientation();
	}	
	
	this.disable = function(){
	    scope.disableDrag();
	    scope.disableOrientation();
	}
	
	this.update = function(){
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
	
	
    window.addEventListener('deviceorientation', setOrientationControls, true);
	function setOrientationControls(e) {
        if (!e.alpha) {
            return;
        }
        scope.orientationControl = new THREE.DeviceOrientationControls(verticalPivotCamera);
        scope.orientationControl.connect();
        scope.orientationControl.update();
        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
	
	var scope = this;
}