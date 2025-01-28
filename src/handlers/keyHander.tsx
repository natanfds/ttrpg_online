export class KeyHandler {
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