import React from 'react';
import './App.css';
import {ChatComponent, Piece, SceneComponent, Table} from './components/index.tsx'
import { FreeCamera, Vector3, HemisphericLight, Scene, Vector2, AbstractMesh } from "@babylonjs/core";
import "./App.css";


class KeyHandler {
  keyState: any
  constructor(){
    this.keyState = {}
  }
  handleKey(pressed:boolean) {
    return (e: KeyboardEvent) => {
    this.keyState[e.key.toUpperCase()] = pressed
    }
  }

  isPressed(key:string){
    return Boolean(this.keyState[key.toUpperCase()])
  }


}

const moveCamera = (camera:FreeCamera, keyHandler:KeyHandler ) => {
  const speed = 0.1;

  if(keyHandler.isPressed("W")) camera.position.addInPlace(camera.getDirection(Vector3.Forward()).scale(speed))
  if(keyHandler.isPressed('S')) camera.position.addInPlace(camera.getDirection(Vector3.Backward()).scale(speed));
  

  // Movimento para a esquerda (A) e direita (D)
  if(keyHandler.isPressed('A')) camera.position.addInPlace(camera.getDirection(Vector3.Left()).scale(speed));
  if(keyHandler.isPressed('D')) camera.position.addInPlace(camera.getDirection(Vector3.Right()).scale(speed));


  // Movimento para cima (E) e para baixo (Q)
  if(keyHandler.isPressed('E')) camera.position.addInPlace(Vector3.Up().scale(speed));
  if(keyHandler.isPressed('Q')) camera.position.addInPlace(Vector3.Down().scale(speed));


}


let table;
const keyHandler = new KeyHandler()
let camera;

window.addEventListener("keydown", keyHandler.handleKey(true));
window.addEventListener("keyup", keyHandler.handleKey(false));


const onSceneReady = (scene:Scene) => {

  camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());

  
  //const canvas = scene.getEngine().getRenderingCanvas();
  camera.inputs.removeMouse();

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  var isDragging:any = false;
  var pointerStart:any = null;
  var startPosition:Vector3|null = null;
  table = new Table(
    [
      new Piece(1, {x: 1, y: 1}, scene),
      new Piece(2, {x: 0, y: 0}, scene),
    ],
    {x: 10, y: 10},
    scene
  )
  console.log(table)


  var piece: AbstractMesh;
  scene.onPointerDown = (evt, pickResult) => {
    if(pickResult.hit && pickResult.pickedMesh){
      piece = pickResult.pickedMesh
      isDragging = true;
      pointerStart = new Vector2(evt.clientX, evt.clientY);
      startPosition = piece.position.clone();

    }
  }
  scene.onPointerMove = function (evt) {
    if (isDragging) {
      const x = evt.clientX;
      const y = evt.clientY;
      var pointerMove = new Vector2(x, y);
      var deltaX = pointerMove.x - pointerStart.x;
      var deltaY = pointerMove.y - pointerStart.y;
      if(!startPosition) return

      
      let moveX = Math.round(startPosition.x + deltaX * 0.01);
      let moveZ = Math.round(startPosition.z - deltaY * 0.01);
      
      const {boundingBox} = piece.getBoundingInfo()

      const {x: xMin, y: yMin, z: zMin} = boundingBox.minimum
      const {x: xMax, y: yMax, z: zMax} = boundingBox.maximum

      if(((xMax - xMin) % 2 ) !== 0) moveX -= 0.5
      if(((zMax - zMin) % 2 ) !== 0) moveZ -= 0.5

      console.log(startPosition)
      piece.position.x = moveX
      piece.position.z = moveZ// Movimento no eixo Z para arrastar para frente/para trás
    }
  };

  scene.onPointerUp = function () {
      isDragging = false;
  };

};

const renderLoop = () => {
  moveCamera(camera, keyHandler)
}



function App() {
  return (
    <div id="game-page">
    <SceneComponent
        antialias onSceneReady={onSceneReady}
        onRender={undefined}
        id="my-canvas"
        engineOptions={undefined}
        adaptToDeviceRatio={undefined}
        sceneOptions={undefined}
        renderLoop={renderLoop}
        />
    <ChatComponent></ChatComponent>
    </div>

  );
}

export default App;
