/**
 * 
 * Uses THREE.OrbitControls and THREE.DeviceOrientationControls libraries (see https://github.com/mrdoob/three.js/tree/master/examples/js/controls)
 * Requires three cameras 
 * 
 * camera 		- THREE.PerspectiveCamera
 * position 	- THREE.Vector3
 * offset 		- THREE.Vector3
 * domElement 	- Render dom element
 * 
*/

KNOX.CameraControls = function(scene, camera, position, offset, domElement ) {
	
    var horizontalPivot 					= new THREE.PerspectiveCamera( camera.fov , camera.aspect, camera.near, camera.far);
    var verticalPivot 					    = new THREE.PerspectiveCamera( camera.fov , camera.aspect, camera.near, camera.far);
    
    camera.position.copy(offset);
    horizontalPivot.position.copy(offset);
    verticalPivot.position.copy(position);
    
    scene.add(horizontalPivot);
    horizontalPivot.add(verticalPivot);
    verticalPivot.add(camera)
    
    this.orientationControl 					= null;
    
    this.dragControlVertical 					= new THREE.OrbitControls( camera, domElement );
    this.dragControlVertical.target				= position;
	this.dragControlVertical.minAzimuthAngle    = 0; 
    this.dragControlVertical.maxAzimuthAngle    = 0;
	this.dragControlVertical.enableDamping      = true;
	this.dragControlVertical.dampingFactor      = 0.10;
	this.dragControlVertical.enableZoom         = false;
	
	this.dragControlHorizontal 					= new THREE.OrbitControls( horizontalPivot, domElement );
    this.dragControlHorizontal.target			= position;
	this.dragControlHorizontal.minPolarAngle  	= Math.PI/2; 
    this.dragControlHorizontal.maxPolarAngle	= Math.PI/2;
	this.dragControlHorizontal.enableDamping    = true;
	this.dragControlHorizontal.dampingFactor    = 0.10;
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
        scope.orientationControl = new THREE.DeviceOrientationControls(verticalPivot);
        scope.orientationControl.connect();
        scope.orientationControl.update();
        window.removeEventListener('deviceorientation', setOrientationControls, true);
    }
	
	var scope = this;
}