import {Vector2D} from '../maths/Vector2D';

export interface HamModel {
  position: Vector2D;
  scale: number,
  minScale: number,
  maxScale: number,
  scaleFactor: number,
  angle: number,
}
