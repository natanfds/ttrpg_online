import { MeshBuilder } from "@babylonjs/core"
import { Piece } from "./piece.tsx"
import { Vector2DType } from "../../types/index.tsx"

export class Table{
  pieces: Piece[]
  size: Vector2DType
  scene:any
  ground:any
  constructor(
    pieces:Piece[],
    size:Vector2DType,
    scene:any
  ){
    this.pieces = pieces
    this.size = size
    this.scene = scene
    const {x, y} = size
    this.ground = MeshBuilder.CreateGround("ground", { width: x, height: y }, scene);
  }
}