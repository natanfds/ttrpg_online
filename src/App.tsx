import React from 'react';
import './App.css';
import {ChatComponent, Piece, SceneComponent, Table} from './components/index.tsx'
import { FreeCamera, Vector3, HemisphericLight, Scene, Vector2, AbstractMesh, IPointerEvent, PickingInfo } from "@babylonjs/core";
import "./App.css";
import { KeyHandler } from './handlers/index.tsx';
import { moveCamera, movePieceWithMouse } from './controllers/index.tsx';


let table:any;
let camera:any;
const keyHandler = new KeyHandler()



window.addEventListener("keydown", keyHandler.handleKey(true));
window.addEventListener("keyup", keyHandler.handleKey(false));


const onSceneReady = (scene:Scene) => {

  camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
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

  var piece: AbstractMesh;
  scene.onPointerDown = (evt: IPointerEvent, pickResult:PickingInfo) => {
    if(pickResult.hit && pickResult.pickedMesh){
      piece = pickResult.pickedMesh
      isDragging = true;
      pointerStart = new Vector2(evt.clientX, evt.clientY);
      startPosition = piece.position.clone();

    }
  }

  scene.onPointerMove = (evt: IPointerEvent) => {

    if (isDragging) {
      if(!startPosition) return
      movePieceWithMouse(evt, startPosition, pointerStart, piece)
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
