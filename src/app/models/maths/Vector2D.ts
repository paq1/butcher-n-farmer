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

  produitScalaire(other: Vector2D): number {
    return this.x * other.x + this.y * other.y;
  }

  angleRadiantBetween(other: Vector2D): number {
    const norme = this.norme();
    const otherNorme = other.norme();
    const cos = this.produitScalaire(other) / (norme * otherNorme);
    return Math.acos(cos);
  }

  angleDegresBetween(other: Vector2D): number {
    return this.angleRadiantBetween(other) * 180 / Math.PI;
  }
}
