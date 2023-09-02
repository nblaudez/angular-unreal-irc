import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchatPopupJoinRoomComponent } from './tchat-popup-join-room.component';

describe('TchatPopupJoinRoomComponent', () => {
  let component: TchatPopupJoinRoomComponent;
  let fixture: ComponentFixture<TchatPopupJoinRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TchatPopupJoinRoomComponent]
    });
    fixture = TestBed.createComponent(TchatPopupJoinRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
