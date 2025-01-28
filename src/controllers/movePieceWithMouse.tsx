import { AbstractMesh, IPointerEvent, Vector2, Vector3 } from "@babylonjs/core";

export const movePieceWithMouse = (evt: IPointerEvent, startPosition:Vector3, pointerStart:any, piece:AbstractMesh) => {
  const x = evt.clientX;
  const y = evt.clientY;
  var pointerMove = new Vector2(x, y);
  var deltaX = pointerMove.x - pointerStart.x;
  var deltaY = pointerMove.y - pointerStart.y;

  
  let moveX = Math.round(startPosition.x + deltaX * 0.01);
  let moveZ = Math.round(startPosition.z - deltaY * 0.01);
  
  const {boundingBox} = piece.getBoundingInfo()

  const {x: xMin, y: yMin, z: zMin} = boundingBox.minimum
  const {x: xMax, y: yMax, z: zMax} = boundingBox.maximum

  if(((xMax - xMin) % 2 ) !== 0) moveX -= 0.5
  if(((zMax - zMin) % 2 ) !== 0) moveZ -= 0.5

  piece.position.x = moveX
  piece.position.z = moveZ// Movimento no eixo Z para arrastar para frente/para trás
}