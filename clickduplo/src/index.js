//import {AdvancedDynamicTexture} from "@babylonjs/gui/2D";
//import { StackPanel, TextBlock, Button, Control }from "@babylonjs/gui/2D/controls";


import { Game } from "./Game.js";


// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");
const game = new Game(canvas);

game.showWorldAxis(10);
game.createSpheres(4,3);




