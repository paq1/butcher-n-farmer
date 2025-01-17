export class Vector2D {
  constructor(public x: number, public y: number) {}

  plusOther(o: Vector2D): Vector2D {
    return new Vector2D(this.x + o.x, this.y + o.y);
  }

  minusOther(o: Vector2D): Vector2D {
    return new Vector2D(this.x - o.x, this.y - o.y);
  }

}
