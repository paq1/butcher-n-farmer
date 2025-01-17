import {Vector2D} from '../../models/maths/Vector2D';

export interface MouseInfoModel {
  position: Vector2D;
  isPressedBtnLeft: boolean;
  isPressedBtnRight: boolean;
  hasFirstMouving: boolean;
}
