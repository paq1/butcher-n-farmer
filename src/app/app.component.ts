import {Component} from '@angular/core';
import {ScenesComponent} from './scenes/scenes.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScenesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'butcher-n-farmer';
}
