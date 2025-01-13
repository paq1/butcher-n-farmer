import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RendererDebugService {

  constructor() { }

  static traceCentralDebug(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.strokeStyle = 'red'; // Couleur de la ligne
    ctx.lineWidth = 2; // Largeur de la ligne
    // Dessiner une ligne
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2); // Point de départ (x1, y1)
    ctx.lineTo(canvas.width, canvas.height / 2); // Point d'arrivée (x2, y2)
    ctx.stroke(); // Appliquer le tracé

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0); // Point de départ (x1, y1)
    ctx.lineTo(canvas.width / 2, canvas.height); // Point d'arrivée (x2, y2)
    ctx.stroke(); // Appliquer le tracé
  }
}
