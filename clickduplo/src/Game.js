import { Engine  } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { PointerEventTypes } from '@babylonjs/core/Events';

import { Observable } from "@babylonjs/core/Misc/observable";
import { ExecuteAction,
         ActionManager,
         ExecuteCodeAction,
         InterpolateValueAction,
         SetValueAction,
         SetStateAction} from "@babylonjs/core/Actions";

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

// Required side effects to populate the Create methods on the mesh class.
//Without this, the bundle would be smaller but the createXXX methods
//from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";
import "@babylonjs/core/Debug/debugLayer"; // Augments the scene with the debug methods
import "@babylonjs/inspector"; // Injects a local ES6 version of the inspector to prevent automatically relying on the none compatible version


import { showWorldAxis } from "./world-axes.js"
import { MenuGUI } from "./GUI.js";

export class Game{

    /*
      
     */
    constructor(canvasElement){
        console.log("Instantiante a new Game instance...");

        this._meshesInScene = [];
        this._sceneKeyEvent = []; //object for multiple key presses
        
        this._canvas = canvasElement;
        this._engine = new Engine(canvasElement);
        this._scene =  new Scene(this._engine);
        this._camera = new FreeCamera("camera1", new Vector3(1, 5, -40), this._scene);
        this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
        this._material = new GridMaterial("grid", this._scene);
        this._sceneSetup();
        this._cameraSetup();
        this._lightSetup();
        this._materialSetup();
                
       

        this._meshesInScene.forEach((m) => this._setOnPointerObservable(m));
        this._runEngineRender();
        MenuGUI.showGui();
    }

    _materialSetup(){
        
    }
    
    _lightSetup(){
        this._light.intensity = 0.7;
    }

    _cameraSetup(){
        this._camera.setTarget(Vector3.Zero());
        this._camera.attachControl(this._canvas, true);
    }


    _sceneSetup(){
        console.log("_sceneSetup(){..");

        this._scene.clearColor = new Color3(0.5, 0.8, 0.5);
        this._scene.actionManager = new ActionManager(this._scene);

        this._scene.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnKeyDownTrigger,
                function (evt) {
                    this._sceneKeyEvent[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";            
                }));
        
        this._scene.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnKeyUpTrigger,
                function (evt) {            
                    this._sceneKeyEvent[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
                }));
        
        this._scene.actionManager.registerAction(
            new ExecuteCodeAction(
                ActionManager.OnPickTrigger ,
                function (evt) {
                    console.log("Got Pick Action");
                }));
        
        /****************************Move Sphere*******************************/
        
        this._scene.registerAfterRender(function () {
            
            if ((this._sceneKeyEvent["q"] || this._sceneKeyEvent["Q"])) {
                this._meshesInScene.forEach((sph) => sph.position.z += 0.1);
            };
            
            if ((this._sceneKeyEvent["e"] || this._sceneKeyEvent["E"])) {
                this._meshesInScene.forEach((sph) => sph.position.z -= 0.1);
            };
            
            if ((this._sceneKeyEvent["a"] || this._sceneKeyEvent["A"])) {
                this._meshesInScene.forEach((sph) => sph.position.x -= 0.1);
            };
            
            if ((this._sceneKeyEvent["d"] || this._sceneKeyEvent["D"])) {
                this._meshesInScene.forEach((sph) => sph.position.x += 0.1);
            };
            
            if ((this._sceneKeyEvent["s"] || this._sceneKeyEvent["S"])) {
                this._meshesInScene.forEach((sph) => sph.position.y -= 0.1);
            };
            
            if ((this._sceneKeyEvent["w"] || this._sceneKeyEvent["W"])) {
                this._meshesInScene.forEach((sph) => sph.position.y += 0.1);
            };
        });
        
    }
    

    _runEngineRender(){    
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });        
    }


    createSpheres(fase,sizeOfSphere){
        let sphereMat = new StandardMaterial("sphereStandardMaterial", this._scene);
        sphereMat.diffuseColor = new Color3(0.4, 0.4, 0.4);
        sphereMat.specularColor = new Color3(0.4, 0.4, 0.4);
        sphereMat.emissiveColor = Color3.Purple();

        if (fase == 1){

            //just 4 spheres in each corner

            let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,this._scene);
            let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,this._scene);
            let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,this._scene);
            let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,this._scene);

            sphere1.position.x = -25;
            sphere1.position.y = -10;
            sphere1.position.z = 0;
            this._meshesInScene.push(sphere1);
            
            sphere2.position.x = 25;
            sphere2.position.y = 10;
            sphere2.position.z = 0;
            this._meshesInScene.push(sphere2);
            
            sphere3.position.x = -25;
            sphere3.position.y = 10;
            sphere3.position.z = 0;
            this._meshesInScene.push(sphere3);
            
            sphere4.position.x = 25;
            sphere4.position.y = -10;
            sphere4.position.z = 0;
            this._meshesInScene.push(sphere4);
            
        }else if(fase == 2){
            
            //8 spheres in each corner
            
            let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,this._scene);
            let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,this._scene);
            let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,this._scene);
            let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,this._scene);
            let sphere5 = Mesh.CreateSphere("s5",10,sizeOfSphere,this._scene);
            let sphere6 = Mesh.CreateSphere("s6",10,sizeOfSphere,this._scene);
            let sphere7 = Mesh.CreateSphere("s7",10,sizeOfSphere,this._scene);
            let sphere8 = Mesh.CreateSphere("s8",10,sizeOfSphere,this._scene);
            
            sphere1.position.x = -25;
            sphere1.position.y = -10;
            sphere1.position.z = 0;
            this._meshesInScene.push(sphere1);
            
            sphere2.position.x = 25;
            sphere2.position.y = 10;
            sphere2.position.z = 0;
            this._meshesInScene.push(sphere2);
            
            sphere3.position.x = -25;
            sphere3.position.y = 10;
            sphere3.position.z = 0;
            this._meshesInScene.push(sphere3);
            
            sphere4.position.x = 25;
            sphere4.position.y = -10;
            sphere4.position.z = 0;
            this._meshesInScene.push(sphere4);
            
            
            sphere5.position.x = -5;
            sphere5.position.y = -5;
            sphere5.position.z = 0;
            this._meshesInScene.push(sphere5);
            
            sphere6.position.x = 5;
            sphere6.position.y = 5;
            sphere6.position.z = 0;
            this._meshesInScene.push(sphere6);
            
            sphere7.position.x = -5;
            sphere7.position.y = 5;
            sphere7.position.z = 0;
            this._meshesInScene.push(sphere7);
            
            sphere8.position.x = 5;
            sphere8.position.y = -5;
            sphere8.position.z = 0;
            this._meshesInScene.push(sphere8);
            
            
        }else if(fase == 3){
            
            //just 4 spheres in each corner but with different distances (z axis)
            //now we put the ground to help with z axis perception
            let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,this._scene);
            let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,this._scene);
            let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,this._scene);
            let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,this._scene);
            
            sphere1.position.x = -25;
            sphere1.position.y = -10;
            sphere1.position.z = 20;
            this._meshesInScene.push(sphere1);
            
            sphere2.position.x = 25;
            sphere2.position.y = 10;
            sphere2.position.z = 20;
            this._meshesInScene.push(sphere2);
            
            sphere3.position.x = -25;
            sphere3.position.y = 10;
            sphere3.position.z = 0;
            this._meshesInScene.push(sphere3);
            
            sphere4.position.x = 25;
            sphere4.position.y = -10;
            sphere4.position.z = 0;
            this._meshesInScene.push(sphere4);
            
            //****** ground *****//
            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
            let ground = Mesh.CreateGround("ground1", 56, 56, 2, this._scene);
            ground.material = this._material;
            ground.position.y = -15
            
            
        }else if(fase == 4){
            //8 spheres in each corner
            
            let sphere1 = Mesh.CreateSphere("s1",10,sizeOfSphere,this._scene);
            let sphere2 = Mesh.CreateSphere("s2",10,sizeOfSphere,this._scene);
            let sphere3 = Mesh.CreateSphere("s3",10,sizeOfSphere,this._scene);
            let sphere4 = Mesh.CreateSphere("s4",10,sizeOfSphere,this._scene);
            let sphere5 = Mesh.CreateSphere("s5",10,sizeOfSphere,this._scene);
            let sphere6 = Mesh.CreateSphere("s6",10,sizeOfSphere,this._scene);
            let sphere7 = Mesh.CreateSphere("s7",10,sizeOfSphere,this._scene);
            let sphere8 = Mesh.CreateSphere("s8",10,sizeOfSphere,this._scene);
            
            sphere1.position.x = -25;
            sphere1.position.y = -10;
            sphere1.position.z = 20;
            this._meshesInScene.push(sphere1);
            
            sphere2.position.x = 25;
            sphere2.position.y = 10;
            sphere2.position.z = 20;
            this._meshesInScene.push(sphere2);
            
            sphere3.position.x = -25;
            sphere3.position.y = 10;
            sphere3.position.z = 0;
            this._meshesInScene.push(sphere3);
            
            sphere4.position.x = 25;
            sphere4.position.y = -10;
            sphere4.position.z = 0;
            this._meshesInScene.push(sphere4);
            
            
            sphere5.position.x = -5;
            sphere5.position.y = -5;
            sphere5.position.z = -18;
            this._meshesInScene.push(sphere5);
            
            sphere6.position.x = 5;
            sphere6.position.y = 5;
            sphere6.position.z = -18;
            this._meshesInScene.push(sphere6);
            
            sphere7.position.x = -5;
            sphere7.position.y = 5;
            sphere7.position.z = 20;
            this._meshesInScene.push(sphere7);
            
            sphere8.position.x = 5;
            sphere8.position.y = -5;
            sphere8.position.z = 20;
            this._meshesInScene.push(sphere8);
            
            //****** ground *****//
            // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
            let ground = Mesh.CreateGround("ground1", 56, 56, 2, this._scene);
            ground.material = this._material;
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
            m.actionManager = new ActionManager(this._scene);
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
    
    _setOnPointerObservable(obj,fn){
        this._scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
            case PointerEventTypes.POINTERDOWN:
	        console.log("POINTER DOWN");
                obj.isPickable = true;
	        this._scene.constantlyUpdateMeshUnderPointer = true;	
                window.addEventListener("dblclick", function (e) {	    
		    if (this._scene.meshUnderPointer === obj) {
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
        })
    }//_setOnPointerObservable(obj,fn){


    _setOnPointerObservable(obj,fn){
        this._scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {
            case PointerEventTypes.POINTERDOWN:
	        console.log("POINTER DOWN");
                obj.isPickable = true;
	        this._scene.constantlyUpdateMeshUnderPointer = true;	
                window.addEventListener("dblclick", function (e) {	    
		    if (this._scene.meshUnderPointer === obj) {
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
        })
    }//_setOnPointerObservable
    

    _setOnKeyboardObservable(obj){
        obj.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
            case KeyboardEventTypes.KEYDOWN:
	        console.log("KEY DOWN: ", kbInfo.event.key);
	        break;
            case KeyboardEventTypes.KEYUP:
	        console.log("KEY UP: ", kbInfo.event.keyCode);
	        break;
            }
        })
    };


    
    //getters and setters
    getEngine(){
        return this._scene;
    }

    getScene(){
        return this._scene;
    }

    
    /*      
      Show initial GUI
     */
    start(){
        console.log("start = () => {...");
    }

    
    /*
      size: size of the axis
     */
    showWorldAxis(size) {
        showWorldAxis(size,this._scene);
    }
}
