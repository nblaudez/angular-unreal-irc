import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomparametersComponent } from './roomparameters.component';

describe('RoomparametersComponent', () => {
  let component: RoomparametersComponent;
  let fixture: ComponentFixture<RoomparametersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomparametersComponent]
    });
    fixture = TestBed.createComponent(RoomparametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
