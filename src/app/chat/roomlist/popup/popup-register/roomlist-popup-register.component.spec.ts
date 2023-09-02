import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomlistPopupRegisterComponent } from './roomlist-popup-register.component';

describe('RoomlistPopupRegisterComponent', () => {
  let component: RoomlistPopupRegisterComponent;
  let fixture: ComponentFixture<RoomlistPopupRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomlistPopupRegisterComponent]
    });
    fixture = TestBed.createComponent(RoomlistPopupRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
