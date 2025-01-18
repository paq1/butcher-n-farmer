import { Injectable } from '@angular/core';
import { Vector2D } from '../../models/maths/Vector2D';
import {MouseInfoModel} from '../models/mouse-info.model';

@Injectable({
  providedIn: 'root'
})
export class MouseService {

  mousesFromCanvas: Record<string, MouseInfoModel>;

  constructor() {
    this.mousesFromCanvas = {};
  }

  initCanvas(idCanvas: string, firstMouseInfo?: MouseInfoModel): void {
    this.mousesFromCanvas[idCanvas] = firstMouseInfo ? firstMouseInfo : this.initDefaultMouseInfo();
  }

  initListerForCanvas(idCanvas: string, canvas: HTMLCanvasElement): void {
    if (!this.mousesFromCanvas[idCanvas]) {
      this.initCanvas(idCanvas);
    }
    canvas.addEventListener("mousemove", (e: MouseEvent) => {
      const canvasPos = canvas.getBoundingClientRect();
      const x = e.clientX - canvasPos.left;
      const y = e.clientY - canvasPos.top;
      this.mousesFromCanvas[idCanvas].position = new Vector2D(x, y);
      const hasFirstMouving = this.mousesFromCanvas[idCanvas].hasFirstMouving;
      if (!hasFirstMouving) this.mousesFromCanvas[idCanvas].hasFirstMouving = true;
    });

    canvas.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.button === 0) {
        this.mousesFromCanvas[idCanvas].isPressedBtnLeft = true;
      } else if (e.button === 2) {
        this.mousesFromCanvas[idCanvas].isPressedBtnRight = true;
      }
    });

    canvas.addEventListener("mouseup", (e: MouseEvent) => {
      if (e.button === 0) {
        this.mousesFromCanvas[idCanvas].isPressedBtnLeft = false;
      } else if (e.button === 2) {
        this.mousesFromCanvas[idCanvas].isPressedBtnRight = false;
      }
    });
  }

  getMouseInfo(idCanvas: string): MouseInfoModel {
    return this.mousesFromCanvas[idCanvas];
  }

  private initDefaultMouseInfo(): MouseInfoModel {
    return {
      position: new Vector2D(0,0),
      isPressedBtnLeft: false,
      isPressedBtnRight: false,
      hasFirstMouving: false,
    };
  }


}
