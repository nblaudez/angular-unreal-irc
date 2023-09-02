import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAuthComponent } from './popup-auth.component';

describe('PopupAuthComponent', () => {
  let component: PopupAuthComponent;
  let fixture: ComponentFixture<PopupAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAuthComponent]
    });
    fixture = TestBed.createComponent(PopupAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
