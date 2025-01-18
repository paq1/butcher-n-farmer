import { Injectable } from '@angular/core';
import {ScoresModel} from '../models/scores.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  scores: ScoresModel;

  constructor() {
    this.scores = {
      bones: 0,
      multiplicateurMouvement: 0.1,
    }
  }

  addBones(value: number) { this.scores.bones += value; }

  get bones() { return this.scores.bones; }
  get multiplicateurMouvement() { return this.scores.multiplicateurMouvement; }
}
