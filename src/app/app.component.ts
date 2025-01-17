import {Component} from '@angular/core';
import {ScenesComponent} from './scenes/scenes.component';
import {ScoreService} from './inventaire/services/score.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScenesComponent, DecimalPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'butcher-n-farmer';

  constructor(private scoreService: ScoreService) {
  }

  get bones(): number { return this.scoreService.bones; }
}
