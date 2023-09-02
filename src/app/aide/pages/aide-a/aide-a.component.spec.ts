import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AideAComponent } from './aide-a.component';

describe('AideAComponent', () => {
  let component: AideAComponent;
  let fixture: ComponentFixture<AideAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AideAComponent]
    });
    fixture = TestBed.createComponent(AideAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
