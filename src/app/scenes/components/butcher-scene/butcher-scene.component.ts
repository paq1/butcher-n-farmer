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

  @ViewChild('butcherCanvas', {static: false}) butcherCanvas?: ElementRef<HTMLCanvasElement>;
  context: CanvasRenderingContext2D | null = null;
  isBrowser: boolean;
  ham = {
    x: 64,
    y: 64,
  }
  lastTime: number = 0;
  private animationFrameId!: number;
  hamImage!: HTMLImageElement;


  ngOnInit(): void {
    console.log("init component");
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
      const imgWidth = this.hamImage.width;
      const imgHeight = this.hamImage.height;

      // this.ham.x += 10 * dt;
      this.ham.x = (canvasWidth - imgWidth) / 2;
      this.ham.y = (canvasHeight - imgHeight) / 2;
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
      return ;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("butcher - Fail to get context");
      return;
    }

    const imgWidth = this.hamImage.width;
    const imgHeight = this.hamImage.height;

    const x = this.ham.x;
    const y = this.ham.y;

    ctx.drawImage(this.hamImage, x, y, imgWidth, imgHeight);
  }

  private clearCanvas() {
    const width = this.butcherCanvas?.nativeElement?.width || 0;
    const height = this.butcherCanvas?.nativeElement?.height || 0;
    this.context?.clearRect(0, 0, width, height);
  }
}
