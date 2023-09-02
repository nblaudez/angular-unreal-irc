import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhilosophieComponent } from './philosophie.component';

describe('PhilosophieComponent', () => {
  let component: PhilosophieComponent;
  let fixture: ComponentFixture<PhilosophieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhilosophieComponent]
    });
    fixture = TestBed.createComponent(PhilosophieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
