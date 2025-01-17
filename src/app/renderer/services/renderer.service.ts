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
    fromCenter: boolean,
    position: Vector2D,
    sizeImage: Vector2D,
    angle?: number
  ): void {
    if (sprite.complete) {
      const sanitizePos = fromCenter ? position.minusOther(new Vector2D(sizeImage.x / 2, sizeImage.y / 2)) : position;

      if (angle) {
        canvasCtx?.save();
        canvasCtx?.translate(sanitizePos.x + sizeImage.x / 2, sanitizePos.y + sizeImage.y / 2);
        canvasCtx?.rotate((angle * Math.PI) / 180);
        canvasCtx?.drawImage(sprite, -sizeImage.x / 2, -sizeImage.y / 2, sizeImage.x, sizeImage.y);
        canvasCtx?.restore();
      } else {
        canvasCtx?.drawImage(sprite, sanitizePos.x, sanitizePos.y, sizeImage.x, sizeImage.y);
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
