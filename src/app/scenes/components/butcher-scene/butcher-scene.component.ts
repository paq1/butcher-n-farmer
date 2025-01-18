import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {HamCanvasComponent} from './ham-canvas/ham-canvas.component';

@Component({
  selector: 'app-butcher-scene',
  standalone: true,
  imports: [
    HamCanvasComponent
  ],
  templateUrl: './butcher-scene.component.html',
  styleUrl: './butcher-scene.component.scss'
})
export class ButcherSceneComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}
}
