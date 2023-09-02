import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupKickComponent } from './popup-kick.component';

describe('PopupKickComponent', () => {
  let component: PopupKickComponent;
  let fixture: ComponentFixture<PopupKickComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupKickComponent]
    });
    fixture = TestBed.createComponent(PopupKickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
