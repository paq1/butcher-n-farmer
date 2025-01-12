import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesComponent } from './scenes.component';

describe('ScenesComponent', () => {
  let component: ScenesComponent;
  let fixture: ComponentFixture<ScenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
