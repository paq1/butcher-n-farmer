import { Injectable } from '@angular/core';
import {SceneEnum} from '../../enums/scene.enum';

@Injectable({
  providedIn: 'root'
})
export class SceneManagerService {
  private currentScene: SceneEnum;

  constructor() {
    this.currentScene = SceneEnum.BUTCHER;
  }

  switchScene(scene: SceneEnum) {
    this.currentScene = scene;
  }

  get kindCurrentScene(): SceneEnum { return this.currentScene; }
}
