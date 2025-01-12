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
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (this.isBrowser) {
      this.setupCanvas();
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
}
