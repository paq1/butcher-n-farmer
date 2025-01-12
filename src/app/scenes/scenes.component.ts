import {Component} from '@angular/core';
import {SceneEnum} from '../enums/scene.enum';
import {SceneManagerService} from './services/scene.manager.service';
import {NgClass} from '@angular/common';
import {ButcherSceneComponent} from './components/butcher-scene/butcher-scene.component';
import {FarmerSceneComponent} from './components/farmer-scene/farmer-scene.component';
import {BossSceneComponent} from './components/boss-scene/boss-scene.component';

@Component({
  selector: 'app-scenes',
  standalone: true,
  imports: [
    NgClass,
    ButcherSceneComponent,
    FarmerSceneComponent,
    BossSceneComponent
  ],
  templateUrl: './scenes.component.html',
  styleUrl: './scenes.component.scss'
})
export class ScenesComponent {

  constructor(private readonly sceneManagerService: SceneManagerService) {}

  get currentScene(): SceneEnum { return this.sceneManagerService.kindCurrentScene; }

  get isButcher(): boolean { return this.sceneManagerService.kindCurrentScene === SceneEnum.BUTCHER; }
  get isFarmer(): boolean { return this.sceneManagerService.kindCurrentScene === SceneEnum.FARMER; }
  get isBoss(): boolean { return this.sceneManagerService.kindCurrentScene === SceneEnum.BOSS; }

  switchScene(scene: SceneEnum): void {
    this.sceneManagerService.switchScene(scene);
  }

  protected readonly SceneEnum = SceneEnum;
}
