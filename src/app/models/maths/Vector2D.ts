export class Vector2D {
  constructor(public x: number, public y: number) {}

  plusOther(o: Vector2D): Vector2D {
    return new Vector2D(this.x + o.x, this.y + o.y);
  }

  minusOther(o: Vector2D): Vector2D {
    return new Vector2D(this.x - o.x, this.y - o.y);
  }

  div(d: number): Vector2D | null {
    if (d === 0) return null;
    else {
      return new Vector2D(this.x / d, this.y / d);
    }
  }

  product(p: number): Vector2D {
    return new Vector2D(this.x * p, this.y * p);
  }

  norme(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  unitaire(): Vector2D | null {
    return this.div(this.norme());
  }

}
