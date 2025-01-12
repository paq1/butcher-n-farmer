import {Directive, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Directive({
  selector: '[appDynamicCanvas]',
  standalone: true
})
export class DynamicCanvasDirective implements OnInit {
  private ctx?: CanvasRenderingContext2D | null;
  private canvas!: HTMLCanvasElement;
  private isBrowser: boolean;

  constructor(
    private el: ElementRef<HTMLCanvasElement>,
    private renderer: Renderer2,
  @Inject(PLATFORM_ID) private platformId: object // Injection de la plateforme actuelle
  ) {
    this.canvas = el.nativeElement;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.ctx = this.canvas.getContext('2d');
      this.setupCanvas();
      // this.draw();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.isBrowser) {
      this.setupCanvas();
      // this.draw();
    }
  }

  private setupCanvas(): void {
    const canvas = this.el.nativeElement;
    const parent = this.canvas.parentElement;

    const parentWidth = parent?.offsetWidth || 1;
    const parentHeight = parent?.offsetHeight || 1;

    this.renderer.setAttribute(canvas, 'width', parentWidth + 'px');
    this.renderer.setAttribute(canvas, 'height', parentHeight + 'px');
  }

  // private startAnimation() {
  //   const updateCanvas = () => {
  //     this.clearCanvas();
  //     this.draw();
  //     this.animationFrameId = requestAnimationFrame(updateCanvas); // Demande le prochain appel de la fonction à la prochaine frame
  //   };
  //
  //   this.animationFrameId = requestAnimationFrame(updateCanvas);
  // }

  // private clearCanvas() {
  //   const width = this.canvas.width;
  //   const height = this.canvas.height;
  //   this.ctx?.clearRect(0, 0, width, height);
  // }

  // private draw(): void {
  //   if (this.drawFunction) {
  //     console.log("draw function OK");
  //   }
  //
  //   if (this.ctx) {
  //     console.log("ctx OK");
  //   }
  //
  //   if (this.drawFunction && this.ctx) {
  //     console.log("draw");
  //     // Appelle la fonction de dessin passée via [drawFunction]
  //     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  //     this.drawFunction(this.ctx, this.canvas);
  //   }
  // }
}
