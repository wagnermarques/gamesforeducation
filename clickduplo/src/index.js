import { Game } from "./Game.js";

const canvas = document.getElementById("renderCanvas");
const game = new Game(canvas);

game.createSpheres(4,3);
//game.showWorldAxis(10);



