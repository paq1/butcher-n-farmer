import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {DynamicCanvasDirective} from '../../../directives/dynamic-canvas.directive';
import {HamModel} from '../../../models/butcher/ham.model';
import {RendererDebugService} from '../../../renderer/services/renderer-debug.service';

@Component({
  selector: 'app-butcher-scene',
  standalone: true,
  imports: [
    DynamicCanvasDirective
  ],
  templateUrl: './butcher-scene.component.html',
  styleUrl: './butcher-scene.component.scss'
})
export class ButcherSceneComponent implements OnInit, AfterViewInit, OnDestroy {

  isBrowser: boolean; // on est en ssr, donc on veut savoir si c du code client ou serveur

  @ViewChild('butcherCanvas', {static: false}) butcherCanvas?: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null = null;

  ham: HamModel;
  hamImage!: HTMLImageElement;
  // dt
  lastTime: number = 0;
  private animationFrameId!: number;

  ngOnInit(): void {
    console.log("init component");
    this.ham = this.initHam();
  }

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object // Injection de la plateforme actuelle
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.hamImage = new Image();
    }

    this.ham = this.initHam();
  }

  initHam(): HamModel {
    return {
      x: 64,
      y: 64,
      scale: 2,
      minScale: 2,
      maxScale: 3,
      scaleFactor: 1,
      angle: 0,
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      console.log("destroy butcher scene");
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  ngAfterViewInit(): void {
    console.log("after init component");
    if (this.isBrowser) {
      this.loadSprites();
    }

    if (this.isBrowser) {
      console.log("ngAfterViewInit");
      if (this.butcherCanvas) {
        console.log("canvas set");
        this.context = this.butcherCanvas.nativeElement.getContext('2d');
        if (this.context) {
          this.startAnimation();
        }
      }
    }
  }

  startAnimation(timestamp?: number): void {

    const deltaTime = ((timestamp || 0) - this.lastTime) / 1000;
    this.lastTime = timestamp || 0;
    this.ngZone.runOutsideAngular(() => {
      this.update(deltaTime);
      this.draw();
      this.animationFrameId = window.requestAnimationFrame((timestamp: number) => this.startAnimation(timestamp));
    });
  }

  load(): void {
    this.loadSprites();
  }

  update(dt: number): void {

    const canvas = this.butcherCanvas?.nativeElement;
    if (canvas) {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const hamWidth = this.hamImage.width;
      const hamHeight = this.hamImage.height;

      // this.ham.x += 10 * dt;
      this.ham.x = (canvasWidth - hamWidth * this.ham.scale) / 2;
      this.ham.y = (canvasHeight - hamHeight * this.ham.scale) / 2;

      // update scale
      this.ham.scale += 0.2 * dt * this.ham.scaleFactor;
      if (this.ham.scale > this.ham.maxScale) {
        this.ham.scaleFactor = -1;
        this.ham.scale = this.ham.maxScale;
      }
      if (this.ham.scale < this.ham.minScale) {
        this.ham.scaleFactor = 1;
        this.ham.scale = this.ham.minScale;
      }

      // update angle
      this.ham.angle += 50 * dt;
      if (this.ham.angle >= 360) {
        this.ham.angle = 0;
      }

    }
  }

  draw(): void {
    if (this.context && this.butcherCanvas) {
      this.clearCanvas();
      this.drawOnCanvas();
    }
  }

  private loadSprites(): void {
    const spritesPath = "sprites";
    this.hamImage.src = `${spritesPath}/Sprite-ham.png`;
    this.hamImage.onload = () => {
      // nothing for the moment :)
    }
  }

  private drawOnCanvas(): void {
    const canvas = this.butcherCanvas?.nativeElement;
    if (!canvas) {
      console.error("butcher - Fail load canvas");
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("butcher - Fail to get context");
      return;
    }
    ctx.imageSmoothingEnabled = false;

    const imgWidth = this.hamImage.width;
    const imgHeight = this.hamImage.height;
    const hamScale = this.ham.scale;

    // ctx.drawImage(this.hamImage, x, y, imgWidth, imgHeight);
    ctx.save();
    ctx.translate(this.ham.x + imgWidth * this.ham.scale / 2, this.ham.y + imgHeight * this.ham.scale / 2);
    ctx.rotate((this.ham.angle * Math.PI) / 180);
    ctx.drawImage(
      this.hamImage,
      0,
      0,
      imgWidth,
      imgHeight,
      -imgWidth * hamScale / 2,
      -imgHeight * hamScale / 2,
      imgWidth * hamScale,
      imgHeight * hamScale
    );
    ctx.restore();

    RendererDebugService.traceCentralDebug(ctx, canvas);
  }

  private clearCanvas() {
    const width = this.butcherCanvas?.nativeElement?.width || 0;
    const height = this.butcherCanvas?.nativeElement?.height || 0;
    this.context?.clearRect(0, 0, width, height);
  }
}
