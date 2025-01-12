import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButcherSceneComponent } from './butcher-scene.component';

describe('ButcherSceneComponent', () => {
  let component: ButcherSceneComponent;
  let fixture: ComponentFixture<ButcherSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButcherSceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButcherSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
