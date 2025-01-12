import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BossSceneComponent } from './boss-scene.component';

describe('BossSceneComponent', () => {
  let component: BossSceneComponent;
  let fixture: ComponentFixture<BossSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BossSceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BossSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
