import { FreeCamera, Vector3 } from "@babylonjs/core";
import { KeyHandler } from "../handlers/index.tsx";

export const moveCamera = (camera:FreeCamera, keyHandler:KeyHandler ) => {
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

