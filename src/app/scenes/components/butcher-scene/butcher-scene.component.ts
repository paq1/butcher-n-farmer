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
import {Vector2D} from '../../../models/maths/Vector2D';
import {RendererService} from '../../../renderer/services/renderer.service';
import {KnifeModel} from '../../../models/butcher/knife.model';

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

  camera: Vector2D;
  ham: HamModel;
  knife: KnifeModel;
  hamImage!: HTMLImageElement;
  knifeImage!: HTMLImageElement;
  // dt
  lastTime: number = 0;
  private animationFrameId!: number;

  ngOnInit(): void {
    console.log("init butcher");
    this.ham = this.initHam();
    this.knife = this.initKnife();
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      console.log("destroy butcher scene");
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  ngAfterViewInit(): void {
    console.log("after init component");
    if (!this.isBrowser) {
      // osef - do nothing (server side)
      console.log("butcher - server side after view loading");
      return;
    }

    if (!this.butcherCanvas) {
      console.error("butcher - canvas not found");
      return;
    }

    this.load();
    console.log("canvas set");
    this.context = this.butcherCanvas.nativeElement.getContext('2d');

    if (this.context) {
      this.context.imageSmoothingEnabled = false;
      this.startAnimation();
    }
  }

  constructor(
    private ngZone: NgZone,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.hamImage = new Image();
      this.knifeImage = new Image();
    }

    this.ham = this.initHam();
    this.knife = this.initKnife();
    this.camera = new Vector2D(0,0);
  }

  initHam(): HamModel {
    return {
      position: new Vector2D(0, 0),
      scale: 2,
      minScale: 2,
      maxScale: 3,
      scaleFactor: 1,
      angle: 0,
    }
  }

  initKnife(): KnifeModel {
    return {
      position: new Vector2D(0,0),
      distanceHam: 100
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
    if (!canvas) {
      console.error("butcher - failed load canvas");
      return ;
    }

    this.updateCamera(canvas);
    this.updateHam(dt);
  }

  draw(): void {
    if (!this.butcherCanvas) {
      console.error("butcher - canvas error");
      return ;
    }
    if (!this.context) {
      console.error("butcher - context2d error");
      return ;
    }

    this.clearCanvas();
    this.drawOnCanvas(this.butcherCanvas.nativeElement, this.context);
  }

  private loadSprites(): void {
    const spritesPath = "sprites";
    this.hamImage.src = `${spritesPath}/Sprite-ham.png`;
    this.hamImage.onload = () => {
      // nothing for the moment :)
    }
    this.knifeImage.src = `${spritesPath}/Sprite-knife.png`;
  }

  private updateCamera(canvas: HTMLCanvasElement): void {
    this.camera.x = canvas.width / 2;
    this.camera.y = canvas.height / 2;
  }

  private updateHam(dt: number): void {
    // // update scale
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

  private drawOnCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    this.drawHam(ctx);
    this.drawKnife(ctx);

    RendererDebugService.traceCentralDebug(ctx, canvas);
  }

  private drawHam(ctx: CanvasRenderingContext2D): void {
    const hamScale = this.ham.scale;

    RendererService.draw(
      ctx,
      this.hamImage,
      true,
      this.ham.position.plusOther(this.camera),
      new Vector2D(this.hamImage.width * hamScale, this.hamImage.height * hamScale),
      this.ham.angle
    );
  }

  private drawKnife(ctx: CanvasRenderingContext2D): void {
    const scaleKnife = 2;
    RendererService.draw(
      ctx,
      this.knifeImage,
      true,
      this.knife.position.plusOther(this.camera),
      new Vector2D(this.knifeImage.width * scaleKnife, this.knifeImage.height * scaleKnife)
    )
  }

  private clearCanvas() {
    RendererService.clean(this.context, this.butcherCanvas?.nativeElement);
  }
}
