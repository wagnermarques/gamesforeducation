import { Engine  } from "@babylonjs/core/Engines/engine";
import { Observable } from "@babylonjs/core/Misc/observable";
import { ExecuteAction,
         ActionManager,
         ExecuteCodeAction,
         InterpolateValueAction,
         SetValueAction,
         SetStateAction} from "@babylonjs/core/Actions";

import { Scene } from "@babylonjs/core/scene";
import { PointerEventTypes } from '@babylonjs/core/Events';

import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version

import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from "@babylonjs/core/Maths/math";


import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";

import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { GridMaterial } from "@babylonjs/materials/grid";
import { FireMaterial } from "@babylonjs/materials/fire";
import { SimpleeMaterial } from "@babylonjs/materials/simple";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";


import { showWorldAxis } from "./world-axes.js"


// Required side effects to populate the Create methods on the mesh class.
//Without this, the bundle would be smaller but the createXXX methods
//from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";


//import {AdvancedDynamicTexture} from "@babylonjs/gui/2D";
//import { StackPanel, TextBlock, Button, Control }from "@babylonjs/gui/2D/controls";
import { MenuGUI } from "./GUI.js";

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


/*
  Name: This is the Name of the sphere.
  Segments: This shows the number of segments.
  Size: This is the size of the sphere.
  Scene: This is the scene to be attached.
  Boolean: This is updatable if the mesh needs to be modified later.
  BABYLON.Mesh.DEFAULTSIDE: This is the optional side orientation.
*/
let createSpheres = (fase,sizeOfSphere,) => {   

    let sphereMat = new StandardMaterial("ground", scene);
    sphereMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
    sphereMat.specularColor = new Color3(0.4, 0.4, 0.4);
    sphereMat.emissiveColor = Color3.Purple();

    if (fase == 1){

        //just 4 spheres in each corner

        let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,scene);
        let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,scene);
        let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,scene);
        let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,scene);

        sphere1.position.x = -25;
        sphere1.position.y = -10;
        sphere1.position.z = 0;
        meshesInScene.push(sphere1);

        sphere2.position.x = 25;
        sphere2.position.y = 10;
        sphere2.position.z = 0;
        meshesInScene.push(sphere2);

        sphere3.position.x = -25;
        sphere3.position.y = 10;
        sphere3.position.z = 0;
        meshesInScene.push(sphere3);

        sphere4.position.x = 25;
        sphere4.position.y = -10;
        sphere4.position.z = 0;
        meshesInScene.push(sphere4);

    }else if(fase == 2){
        
        //8 spheres in each corner

        let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,scene);
        let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,scene);
        let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,scene);
        let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,scene);
        let sphere5 = Mesh.CreateSphere("s5",10,sizeOfSphere,scene);
        let sphere6 = Mesh.CreateSphere("s6",10,sizeOfSphere,scene);
        let sphere7 = Mesh.CreateSphere("s7",10,sizeOfSphere,scene);
        let sphere8 = Mesh.CreateSphere("s8",10,sizeOfSphere,scene);

        sphere1.position.x = -25;
        sphere1.position.y = -10;
        sphere1.position.z = 0;
        meshesInScene.push(sphere1);

        sphere2.position.x = 25;
        sphere2.position.y = 10;
        sphere2.position.z = 0;
        meshesInScene.push(sphere2);

        sphere3.position.x = -25;
        sphere3.position.y = 10;
        sphere3.position.z = 0;
        meshesInScene.push(sphere3);

        sphere4.position.x = 25;
        sphere4.position.y = -10;
        sphere4.position.z = 0;
        meshesInScene.push(sphere4);

        
        sphere5.position.x = -5;
        sphere5.position.y = -5;
        sphere5.position.z = 0;
        meshesInScene.push(sphere5);

        sphere6.position.x = 5;
        sphere6.position.y = 5;
        sphere6.position.z = 0;
        meshesInScene.push(sphere6);

        sphere7.position.x = -5;
        sphere7.position.y = 5;
        sphere7.position.z = 0;
        meshesInScene.push(sphere7);

        sphere8.position.x = 5;
        sphere8.position.y = -5;
        sphere8.position.z = 0;
        meshesInScene.push(sphere8);

        
    }else if(fase == 3){

        //just 4 spheres in each corner but with different distances (z axis)
        //now we put the ground to help with z axis perception
        let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,scene);
        let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,scene);
        let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,scene);
        let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,scene);

        sphere1.position.x = -25;
        sphere1.position.y = -10;
        sphere1.position.z = 20;
        meshesInScene.push(sphere1);

        sphere2.position.x = 25;
        sphere2.position.y = 10;
        sphere2.position.z = 20;
        meshesInScene.push(sphere2);

        sphere3.position.x = -25;
        sphere3.position.y = 10;
        sphere3.position.z = 0;
        meshesInScene.push(sphere3);

        sphere4.position.x = 25;
        sphere4.position.y = -10;
        sphere4.position.z = 0;
        meshesInScene.push(sphere4);

        //****** ground *****//
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        let ground = Mesh.CreateGround("ground1", 56, 56, 2, scene);
        ground.material = material;
        ground.position.y = -15
        
        
    }else if(fase == 4){
        //8 spheres in each corner

        let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,scene);
        let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,scene);
        let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,scene);
        let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,scene);
        let sphere5 = Mesh.CreateSphere("s5",10,sizeOfSphere,scene);
        let sphere6 = Mesh.CreateSphere("s6",10,sizeOfSphere,scene);
        let sphere7 = Mesh.CreateSphere("s7",10,sizeOfSphere,scene);
        let sphere8 = Mesh.CreateSphere("s8",10,sizeOfSphere,scene);

        sphere1.position.x = -25;
        sphere1.position.y = -10;
        sphere1.position.z = 20;
        meshesInScene.push(sphere1);

        sphere2.position.x = 25;
        sphere2.position.y = 10;
        sphere2.position.z = 20;
        meshesInScene.push(sphere2);

        sphere3.position.x = -25;
        sphere3.position.y = 10;
        sphere3.position.z = 0;
        meshesInScene.push(sphere3);

        sphere4.position.x = 25;
        sphere4.position.y = -10;
        sphere4.position.z = 0;
        meshesInScene.push(sphere4);

        
        sphere5.position.x = -5;
        sphere5.position.y = -5;
        sphere5.position.z = -18;
        meshesInScene.push(sphere5);

        sphere6.position.x = 5;
        sphere6.position.y = 5;
        sphere6.position.z = -18;
        meshesInScene.push(sphere6);

        sphere7.position.x = -5;
        sphere7.position.y = 5;
        sphere7.position.z = 20;
        meshesInScene.push(sphere7);

        sphere8.position.x = 5;
        sphere8.position.y = -5;
        sphere8.position.z = 20;
        meshesInScene.push(sphere8);

        //****** ground *****//
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        let ground = Mesh.CreateGround("ground1", 56, 56, 2, scene);
        ground.material = material;
        ground.position.y = -15

    }

    /*
    for(let i = 0; i < numOfSpheres; i++){
        console.log(" # Creating sphere"+i);
        let randomX = Math.floor(Math.random()*31) - 10
        let randomy = Math.floor(Math.random()*31) - 10
        let randomz = Math.floor(Math.random()*31) - 10
*/
        /*
        let sphere = Mesh.CreateSphere(
            sufixSphereName+i,
            Math.floor(Math.random() * (positionMaxValue - positionMinValue) + positionMinValue),
            Math.floor(Math.random() * (positionMaxValue - positionMinValue) + positionMinValue),
            scene);
        */
    
    meshesInScene.forEach((m) => {
        m.material = sphereMat;
        m.actionManager = new ActionManager(scene);
        m.actionManager.registerAction(new ExecuteCodeAction(
            ActionManager.OnPickTrigger,
            function (evt) {
                console.log("let doConsoleLogOnMeschClick = new ExecuteCodeAction(...");
            }));
    });
        
        //setMeshActAsButton(sphere, Color3.Green(), light);
        
        //var myBox = MeshBuilder.CreateBox(
        //    "myBox",
        //    {height: 5, width: 2, depth: 0.5},
        //    scene);
        // Move the sphere upward 1/2 its height 
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
                    obj.dispose();
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
showWorldAxis(10,scene);
scene.clearColor = new Color3(0.5, 0.8, 0.5);
//scene.debugLayer.show();
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
    new Vector3(1, 5, -40), scene);
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
//creating 20 spheres

/* 
  createSpheres parameters 
  fase
  spheres size
*/
createSpheres(4,3);
meshesInScene.forEach((m) => setOnPointerObservable(m));
//createDiscs();

MenuGUI.showGui();


// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});
