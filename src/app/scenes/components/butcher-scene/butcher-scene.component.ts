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

@Component({
  selector: 'app-butcher-scene',
  standalone: true,
  imports: [],
  templateUrl: './butcher-scene.component.html',
  styleUrl: './butcher-scene.component.scss'
})
export class ButcherSceneComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('butcherCanvas', {static: false}) butcherCanvas?: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null = null;
  isBrowser: boolean;
  hamX = 64;
  lastTime: number = 0;

  private animationFrameId!: number;


  hamImage!: HTMLImageElement;


  ngOnInit(): void {
    console.log("init component");
    if (this.isBrowser) {
      this.loadSprites();
    }
  }

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object // Injection de la plateforme actuelle
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.hamImage = new Image();
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      console.log("destroy butcher scene");
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      console.log("ngAfterViewInit");
      if (this.butcherCanvas) {
        console.log("canvas set");
        this.context = this.butcherCanvas.nativeElement.getContext('2d');
        if (this.context) {
          this.startAnimation(this.context, this.butcherCanvas.nativeElement, 0);
        }
      }
    }
  }

  startAnimation(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, timestamp: number): void {
    const deltaTime = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;
    this.ngZone.runOutsideAngular(() => {
      this.update(deltaTime);
      this.drawOnCanvas(ctx, canvas);
      this.animationFrameId = window.requestAnimationFrame((timestamp: number) => this.startAnimation(ctx, canvas, timestamp));
    });
  }

  loadSprites(): void {
    const spritesPath = "sprites";
    this.hamImage.src = `${spritesPath}/Sprite-ham.png`;
    this.hamImage.onload = () => {
      // nothing for the moment :)
    }
  }

  update(deltaTime: number): void {
    this.hamX += 10 * deltaTime;
  }

  drawOnCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const cxt = canvas.getContext('2d');
    if (!cxt) {
      console.error("canvas - Fail to get context");
      return;
    }

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = this.hamImage.width;
    const imgHeight = this.hamImage.height;

    const x = this.hamX;// (canvasWidth - imgWidth) / 2; // Centre horizontal
    const y = (canvasHeight - imgHeight) / 2; // Centre vertical

    // Effacer le canvas et dessiner l'image centrée
    this.clearCanvas()
    ctx.drawImage(this.hamImage, x, y, imgWidth, imgHeight);
  }

  private clearCanvas() {
    const width = this.butcherCanvas?.nativeElement?.width || 0;
    const height = this.butcherCanvas?.nativeElement?.height || 0;
    this.context?.clearRect(0, 0, width, height);
  }
}
