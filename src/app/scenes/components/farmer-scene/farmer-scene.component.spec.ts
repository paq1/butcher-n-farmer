import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerSceneComponent } from './farmer-scene.component';

describe('FarmerSceneComponent', () => {
  let component: FarmerSceneComponent;
  let fixture: ComponentFixture<FarmerSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmerSceneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmerSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
