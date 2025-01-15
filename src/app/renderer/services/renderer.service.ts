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
    sizeImage: Vector2D,
    angle?: number
  ): void {
    if (sprite.complete) {
      if (angle) {
        canvasCtx?.save();
        canvasCtx?.translate(position.x + sizeImage.x / 2, position.y + sizeImage.y / 2);
        canvasCtx?.rotate((angle * Math.PI) / 180);
        canvasCtx?.drawImage(sprite, -sizeImage.x / 2, -sizeImage.y / 2, sizeImage.x, sizeImage.y);
        canvasCtx?.restore();
      } else {
        canvasCtx?.drawImage(sprite, position.x, position.y, sizeImage.x, sizeImage.y);
      }
    }
  }

  static clean(canvasCtx: CanvasRenderingContext2D | null, canvas?: HTMLCanvasElement): void {
    if (canvas && canvasCtx) {
      const width = canvas.width;
      const height = canvas.height;
      canvasCtx.clearRect(0, 0, width, height);
    }

  }
}
