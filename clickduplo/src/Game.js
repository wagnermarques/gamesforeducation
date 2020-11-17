import { Engine  } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { PointerEventTypes } from '@babylonjs/core/Events';

import { Observable } from "@babylonjs/core/Misc/observable";
import { ExecuteAction,
         ActionManager,
         ExecuteCodeAction,
         InterpolateValueAction,
         SetValueAction,
         SetStateAction } from "@babylonjs/core/Actions";

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
        console.log("[constructor(canvasElement){...]");

        this._meshesInScene = [];
        this._sceneKeyEvent = {}; //object for multiple key presses
        
        this._canvas = canvasElement;
        this._engine = new Engine(canvasElement);
        this._scene =  new Scene(this._engine);
        this._sceneSetup();
        
        this._camera = new FreeCamera("camera1", new Vector3(1, 5, -40), this._scene);
        this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
        this._material = new GridMaterial("grid", this._scene);

        this._cameraSetup();
        this._lightSetup();
        this._materialSetup();
                
        this._runEngineRender();

        new MenuGUI(this).showGui();


        //when this game instance start() is calling
        //this_starteAt is setted with new Date();
        //and
        //this_finished when game is finished
        //game os finished when all spheres are double clicqued
        this._startedAt = null;
        this._finishedAt = null;
        this._nomeDoAluno = null;
        this._db = null; //on startup game we will create db
        
        console.log("[constructor(canvasElement){...]");
    }

    
    _materialSetup(){
        console.log("[_materialSetup(){...]");
        console.log("[_materialSetup(){...]");
    }

    
    _lightSetup(){
        console.log("[_lightSetup(){...]");
        this._light.intensity = 0.7;
        console.log("[_lightSetup(){...]");
    }

    
    _cameraSetup(){
        console.log("[_cameraSetup(){...]");
        this._camera.setTarget(Vector3.Zero());
        this._camera.attachControl(this._canvas, true);
        console.log("[_cameraSetup(){...]");
    }


    _sceneSetup(){
        console.log("[_sceneSetup(){..]");

        this._scene.clearColor = new Color3(0.5, 0.8, 0.5);
        this._scene.actionManager = new ActionManager(this._scene);

        console.log("[_sceneSetup(){..] -> this._scene.actionManager.registerActions...");
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
        console.log("[_sceneSetup(){..] -> this._scene.registerAfterRender(function () {...");
        this._scene.registerAfterRender(() => {
            
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
        console.log("[_sceneSetup(){..]");
    }//_sceneSetup(){
    

    _runEngineRender(){
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });
    }


    createSpheres(fase,sizeOfSphere){

        //before createing new spheres, we remove from scene the existents
        //and reinicitialize the its arrays
        this._meshesInScene.forEach((m,i) => {
            m.dispose();
        });
        delete this._meshesInScene;
        this._meshesInScene = [];

        //this._meshesInScene = new Array();
        console.log("[createSpheres(fase,sizeOfSphere){...]"+this._meshesInScene.length);
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
            this._meshesInScene.forEach((m) => this._setOnPointerObservable(m));
            
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
            this._meshesInScene.forEach((m) => this._setOnPointerObservable(m));
            
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
            this._meshesInScene.forEach((m) => this._setOnPointerObservable(m));
            
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
            console.log("[createSpheres(fase,sizeOfSphere){...]");
            this._meshesInScene.forEach((m) => this._setOnPointerObservable(m));
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
        
        this._meshesInScene.forEach((m) => {
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
        //    "myBox"
        //    {height: 5, width: 2, depth: 0.5},
        //    scene);
        // Move the sphere upward 1/2 its height 
    }
    
    _setOnPointerObservable(obj){
        console.log("_setOnPointerObservable(obj){...");
        this._scene.onPointerObservable.add((pointerInfo) => {
            switch (pointerInfo.type) {

            case PointerEventTypes.POINTERDOWN:
	        console.log("POINTER DOWN");
                obj.isPickable = true;
	        this._scene.constantlyUpdateMeshUnderPointer = true;	
                window.addEventListener("dblclick", (e) => {	    
		    if (this._scene.meshUnderPointer === obj) {
                        console.log(this._meshesInScene.length);
                        obj.dispose();
                        console.log(this._meshesInScene.length);
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


    _setOnKeyboardObservable(obj){
        console.log("_setOnKeyboardObservable(obj){...");
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
        console.log("getEngine(){...");
        return this._scene;
    }

    getScene(){
        console.log("getScene(){...");
        return this._scene;
    }

    
    /*      
      Show initial GUI
     */
    start(nomeDoAluno){
        console.log("start(nomeDoAluno){..."+nomeDoAluno);

        delete this._nomeDoAluno;
        this._nomeDoAluno = nomeDoAluno;
        
        delete this._startedAt;
        this._startedAt = new Date();

        if (this._db == null || this._db == undefined){
            this._db = openDatabase('clickduplodb', '1.0', 'clickduplo game db', 2 * 1024 * 1024);
            this._db.transaction((tx) => {   
                tx.executeSql('CREATE TABLE IF NOT EXISTS tb_clickduplo (id INTEGER AUTOINCREMENT, aluno text, startedAt , finishedAt, timeSeconds)'); 
            });
        }
                
        this._db.transaction(function (tx) { 
            tx.executeSql('INSERT INTO tb_clickduplo (aluno, startedAt, finishedAt, timeSeconds) VALUES ('+ this._nomeDoAluno +', datetime(\'now\'))'); 
        }); 
        
    }

    finished(){
        //this._fin
    }
    
    /*
      size: size of the axis
     */
    showWorldAxis(size) {
        console.log("showWorldAxis(size) {...");
        showWorldAxis(size,this._scene);
    }
}
