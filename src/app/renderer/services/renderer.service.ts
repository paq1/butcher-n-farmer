import { Injectable } from '@angular/core';
import {Vector2D} from '../../models/maths/Vector2D';

@Injectable({
  providedIn: 'root'
})
export class RendererService {

  constructor() { }

  static draw(
    canvasCtx: CanvasRenderingContext2D,
    sprite: HTMLImageElement,
    position: Vector2D,
    size: Vector2D,
    angle?: number
  ): void {
    if (sprite.complete) {
      if (angle) {
        canvasCtx?.save();
        canvasCtx?.translate(position.x, position.y);
        canvasCtx?.rotate((angle * Math.PI) / 180);
        const widthImage = sprite.width;
        const heightImage = sprite.height;
        canvasCtx?.drawImage(sprite, -widthImage / 2, -heightImage / 2, size.x, size.y);
        canvasCtx?.restore();
      } else {
        canvasCtx?.drawImage(sprite, position.x, position.y, size.x, size.y);
      }
    }
  }
}
