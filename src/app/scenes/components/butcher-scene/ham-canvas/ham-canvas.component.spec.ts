import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamCanvasComponent } from './ham-canvas.component';

describe('HamCanvasComponent', () => {
  let component: HamCanvasComponent;
  let fixture: ComponentFixture<HamCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamCanvasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
