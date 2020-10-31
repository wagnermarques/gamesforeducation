import { Engine  } from "@babylonjs/core/Engines/engine";
import { Observable } from "@babylonjs/core/Misc/observable";
import { ExecuteAction,
         ActionManager,
         ExecuteCodeAction,
         InterpolateValueAction,
         SetValueAction,
         SetStateAction} from "@babylonjs/core/Actions";

import { Scene } from "@babylonjs/core/scene";
import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import { Color3 } from '@babylonjs/core/Maths/math.color';
import { PointerEventTypes } from '@babylonjs/core/Events';

import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";

import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
import { FireMaterial } from "@babylonjs/materials/fire";
import { SimpleeMaterial } from "@babylonjs/materials/simple";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";



// Required side effects to populate the Create methods on the mesh class.
//Without this, the bundle would be smaller but the createXXX methods
//from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";

//G L O B A L   V A R I A B L E S
let meshesInScene = [];
var sceneKeyEvent = {}; //object for multiple key presses

//MESHES CREATOR FUNCTIONS
/**
   https://doc.babylonjs.com/api/classes/babylon.meshbuilder
   Creates a plane polygonal mesh. By default, this is a disc

 * Creates a plane polygonal mesh.  By default, this is a disc. Please consider using the same method from the MeshBuilder class instead
 * @param name defines the name of the mesh to create
 * @param radius sets the radius size (float) of the polygon (default 0.5)
 * @param tessellation sets the number of polygon sides (positive integer, default 64). So a tessellation valued to 3 will build a triangle, to 4 a square, etc
 * @param scene defines the hosting scene
 * @param updatable defines if the mesh must be flagged as updatable
 * @param sideOrientation defines the mesh side orientation (http://doc.babylonjs.com/babylon101/discover_basic_elements#side-orientation)
 * @returns a new Mesh
 */
let createDiscs = (discName = "disc",
                   discRadius = 3,
                   discTessellation = "",
                   scene = "",
                   updatable = "",
                   sideOrientation = "",
                  discMaterial) => {
                       
                       for(let i = 0; i < 10; i++){
                           console.log(" # Creating Disc"+i);
                           let disc = Mesh.CreateDisc(
                               discName+i,
                               discRadius +i,
                               discTessellation + 1,
                               scene);
                           disc.position.y = i;
                           disc.material = material;                
                       }                      
                   }


let createSpheres = (name,material) => {   
    //Name: This is the Name of the sphere.
    //Segments: This shows the number of segments.
    //Size: This is the size of the sphere.
    //Scene: This is the scene to be attached.
    //Boolean: This is updatable if the mesh needs to be modified later.
    //BABYLON.Mesh.DEFAULTSIDE: This is the optional side orientation.

    let sphereMat = new StandardMaterial("ground", scene);
    sphereMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    sphereMat.specularColor = new Color3(0.4, 0.4, 0.4);
    sphereMat.emissiveColor = Color3.Purple();
    

    for(let i = 0; i < 10; i++){
        console.log(" # Creating sphere"+i);
        let sphere = Mesh.CreateSphere("sphere"+i, i+2, 1, scene);
        sphere.material = sphereMat;
        sphere.actionManager = new ActionManager(scene);
        sphere.actionManager.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            function (evt) {
                console.log("let doConsoleLogOnMeschClick = new ExecuteCodeAction(...");
            }));
        //setMeshActAsButton(sphere, Color3.Green(), light);
        
        //var myBox = MeshBuilder.CreateBox(
        //    "myBox",
        //    {height: 5, width: 2, depth: 0.5},
        //    scene);
        // Move the sphere upward 1/2 its height
        sphere.position.y = i;
        sphere.position.x = i;
        meshesInScene.push(sphere);
    }
}



// POINT EVENT SETTER
let setOnPointerObservable = (obj,fn) => {
    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
        case PointerEventTypes.POINTERDOWN:
	    console.log("POINTER DOWN");
            obj.isPickable = true;
	    scene.constantlyUpdateMeshUnderPointer = true;	
            window.addEventListener("dblclick", function (e) {	    
		if (scene.meshUnderPointer === obj) {
                    console.log(obj);
		}
	});
	    break;
        case PointerEventTypes.POINTERUP:
	    console.log("POINTER UP");
	    break;
        case PointerEventTypes.POINTERMOVE:
	    console.log("POINTER MOVE");
	    break;
        case PointerEventTypes.POINTERWHEEL:
	    console.log("POINTER WHEEL");
	    break;
        case PointerEventTypes.POINTERPICK:
	    console.log("POINTER PICK");
	    break;
        case PointerEventTypes.POINTERTAP:
	    console.log("POINTER TAP");
	    break;
        case PointerEventTypes.POINTERDOUBLETAP:
	    console.log("POINTER DOUBLE-TAP");
	    break;
        }
    })};

let setOnKeyboardObservable = (obj) => {
    obj.onKeyboardObservable.add((kbInfo) => {
        switch (kbInfo.type) {
        case BABYLON.KeyboardEventTypes.KEYDOWN:
	    console.log("KEY DOWN: ", kbInfo.event.key);
	    break;
        case BABYLON.KeyboardEventTypes.KEYUP:
	    console.log("KEY UP: ", kbInfo.event.keyCode);
	    break;
        }
    })};



// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");

 
// Associate a Babylon Engine to it.
const engine = new Engine(canvas);


// Create our first scene.
var scene = new Scene(engine);
scene.debugLayer.show();
scene.actionManager = new ActionManager(scene);

scene.actionManager.registerAction(
    new ExecuteCodeAction(
        ActionManager.OnKeyDownTrigger,
        function (evt) {
            sceneKeyEvent[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";            
        }));

scene.actionManager.registerAction(
    new ExecuteCodeAction(
        ActionManager.OnKeyUpTrigger,
        function (evt) {            
            sceneKeyEvent[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

scene.actionManager.registerAction(
    new ExecuteCodeAction(
        ActionManager.OnPickTrigger ,
        function (evt) {
            console.log("Got Pick Action");
        }));

/****************************Move Sphere*******************************/

scene.registerAfterRender(function () {
    
    if ((sceneKeyEvent["q"] || sceneKeyEvent["Q"])) {
        meshesInScene.forEach((sph) => sph.position.z += 0.1);
    };
    
    if ((sceneKeyEvent["e"] || sceneKeyEvent["E"])) {
        meshesInScene.forEach((sph) => sph.position.z -= 0.1);
    };
    
    if ((sceneKeyEvent["a"] || sceneKeyEvent["A"])) {
        meshesInScene.forEach((sph) => sph.position.x -= 0.1);
    };
    
    if ((sceneKeyEvent["d"] || sceneKeyEvent["D"])) {
        meshesInScene.forEach((sph) => sph.position.x += 0.1);
    };
    
    if ((sceneKeyEvent["s"] || sceneKeyEvent["S"])) {
        meshesInScene.forEach((sph) => sph.position.y -= 0.1);
    };
    
    if ((sceneKeyEvent["w"] || sceneKeyEvent["W"])) {
        meshesInScene.forEach((sph) => sph.position.y += 0.1);
    };
});


// This creates and positions a free camera (non-mesh)
var camera = new FreeCamera(
    "camera1",
    new Vector3(1, 5, -30), scene);
//new ArcRotateCamera(name: string,
//alpha: number,
//beta: number,
//radius: number,
//target: Vector3,
//scene: Scene, setActiveOnSceneIfNoneActive?: boolean)
//var camera = new ArcRotateCamera(
//    "camera1",
//    new Vector3(1, 5, -10), scene);

camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);


// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;


// Create a grid material
var material = new GridMaterial("grid", scene);
//let material = new FireMaterial("fire", scene);
//var material = new SkyMaterial("skyMaterial", scene);
//let material = new StandardMaterial("texture1", scene);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
//https://doc.babylonjs.com/babylon101/discover_basic_elements
createSpheres();
meshesInScene.forEach((m) => setOnPointerObservable(m));
//createDiscs();


//****** ground *****//
// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
//var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
// Affect a material
//ground.material = material;


var ground = Mesh.CreateGround("ground", 50, 50, 1, scene, false);
ground.material = material;


// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});
