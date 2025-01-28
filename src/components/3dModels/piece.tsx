import { Mesh, MeshBuilder } from "@babylonjs/core";
import { Vector2DType } from "../../types/index.tsx";

export class Piece{
  mesh: Mesh;
  constructor(
    size:number,
    position: Vector2DType,
    scene: any
  ){
    this.mesh = MeshBuilder.CreateBox("box", { size: size}, scene);
    let {x, y} = position;

    const isOdd = ((size % 2) !== 0)

    if(isOdd){
      x -= 0.5;
      y -= 0.5
    }

    this.mesh.position.x = x;
    this.mesh.position.y = size/2;
    this.mesh.position.z = y;
  }
}