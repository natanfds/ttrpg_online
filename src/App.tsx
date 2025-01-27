import React from 'react';
import './App.css';
import {ChatComponent, Piece, SceneComponent, Table} from './components/index.tsx'
import { FreeCamera, Vector3, HemisphericLight, Scene, Vector2 } from "@babylonjs/core";
import "./App.css";

let table;

const onSceneReady = (scene:Scene) => {

  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  camera.setTarget(Vector3.Zero());
  //const canvas = scene.getEngine().getRenderingCanvas();
  camera.inputs.removeMouse();

  const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
  light.intensity = 0.8;

  var isDragging:any = false;
  var pointerStart:any = null;
  var startPosition:any = null;
  table = new Table(
    [
      new Piece(1, {x: 1, y: 1}, scene),
      new Piece(2, {x: 0, y: 0}, scene),
    ],
    {x: 10, y: 10},
    scene
  )
  console.log(table)


  var piece: any;
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
        var pointerMove = new Vector2(evt.clientX, evt.clientY);
        var deltaX = pointerMove.x - pointerStart.x;
        var deltaY = pointerMove.y - pointerStart.y;

        // Convertendo os movimentos do mouse em movimento no espaço 3D
        piece.position.x = Math.round(startPosition.x + deltaX * 0.01);
        piece.position.z = Math.round(startPosition.z - deltaY * 0.01); // Movimento no eixo Z para arrastar para frente/para trás
      }
  };

  scene.onPointerUp = function () {
      isDragging = false;
  };

};




function App() {
  return (
    <div id="game-page">
    <SceneComponent antialias onSceneReady={onSceneReady} onRender={undefined} id="my-canvas" engineOptions={undefined} adaptToDeviceRatio={undefined} sceneOptions={undefined} />
    <ChatComponent></ChatComponent>
    </div>

  );
}

export default App;
